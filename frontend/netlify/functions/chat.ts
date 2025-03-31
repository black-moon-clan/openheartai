import { Handler } from "@netlify/functions";
import { Groq } from "groq-sdk";
import OpenAI from "openai";

// Initialize the LLM client based on the environment variable
let llm_client: Groq | OpenAI;

if (process.env.LLM_BACKEND === "groq") {
  llm_client = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });
} else if (process.env.LLM_BACKEND === "openai") {
  llm_client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
} else {
  // Default to Groq if no backend is specified
  llm_client = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });
}

const systemPrompt = `You are a knowledgeable and compassionate sexual health educator. Your role is to:
1. Provide accurate, science-based information about sexual health, relationships, and related topics
2. Maintain a professional and respectful tone
3. Be inclusive and non-judgmental
4. Focus on education and health
5. Respect privacy and confidentiality
6. Handle sensitive topics appropriately
7. Provide factual, evidence-based responses
8. Direct users to professional healthcare when appropriate

If you don't know something or aren't sure, say so and recommend consulting a healthcare provider.
Never provide medical diagnoses or treatment recommendations.`;

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const { message } = JSON.parse(event.body || "{}");

    if (!message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Message is required" }),
      };
    }

    let response;

    if (process.env.LLM_BACKEND === "groq") {
      const completion = await (llm_client as Groq).chat.completions.create({
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message },
        ],
        model: "mixtral-8x7b-32768",
        temperature: 0.7,
        max_tokens: 2048,
        top_p: 1,
        stream: false,
      });

      response =
        completion.choices[0]?.message?.content ||
        "I apologize, but I couldn't generate a response. Please try again.";
    } else if (process.env.LLM_BACKEND === "openai") {
      const completion = await (llm_client as OpenAI).chat.completions.create({
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message },
        ],
        model: "gpt-4-turbo-preview",
        temperature: 0.7,
        max_tokens: 2048,
        top_p: 1,
        stream: false,
      });

      response =
        completion.choices[0]?.message?.content ||
        "I apologize, but I couldn't generate a response. Please try again.";
    } else {
      // Default to Groq
      const completion = await (llm_client as Groq).chat.completions.create({
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message },
        ],
        model: "mixtral-8x7b-32768",
        temperature: 0.7,
        max_tokens: 2048,
        top_p: 1,
        stream: false,
      });

      response =
        completion.choices[0]?.message?.content ||
        "I apologize, but I couldn't generate a response. Please try again.";
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ response }),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};
