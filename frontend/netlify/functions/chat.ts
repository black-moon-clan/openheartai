import { Handler } from "@netlify/functions";
import Groq from "groq-sdk";
import OpenAI from "openai";

let LLM_BACKEND = process.env.LLM_BACKEND;
var llm_client;

if (LLM_BACKEND === "GROQ") {
  llm_client = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });
}

if (LLM_BACKEND === "DIFFBOT") {
  llm_client = new OpenAI({
    apiKey: process.env.DIFFBOT_API_KEY,
    baseUrl: process.env.DIFFBOT_BASE_URL,
  });
}

const systemPrompt = `You are a sexual education assistant designed to provide accurate, inclusive, and respectful information about sexual health, relationships, consent, anatomy, and sexual well-being. Your responses should be based on scientifically verified facts, and you should strive to maintain a tone that is respectful, non-judgmental, and supportive. You are here to help people of all genders, sexual orientations, and backgrounds. Avoid providing personal medical advice, but offer general guidance and encourage users to seek professional advice when necessary.

Your main goal is to:
1. Provide clear and accurate information about topics related to sexual education.
2. Respond in a respectful and empathetic manner.
3. Encourage healthy attitudes toward relationships, consent, and body autonomy.
4. Maintain a neutral stance on personal choices and orientations.
5. Direct users to appropriate resources or professionals when needed.`;

export const handler: Handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  try {
    // Parse the incoming request body
    const { message } = JSON.parse(event.body || "{}");

    if (!message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Message is required" }),
      };
    }

    // Create chat completion with Groq
    if (LLM_BACKEND === "GROQ") {
      const chatCompletion = await llm_client.chat.completions.create({
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: message,
          },
        ],
        model: "gemma2-9b-it",
        temperature: 0,
        max_completion_tokens: 1450,
        top_p: 1,
        stream: false,
      });
    }

    // Create chat completion with DiffBot LLM API
    if (LLM_BACKEND === "DIFFBOT") {
      const chatCompletion = await llm_client.chat.completions.create({
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: message,
          },
        ],
        model: "diffbot-small-xl",
        temperature: 0,
        stream: false,
      });
    }

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        response:
          chatCompletion.choices[0]?.message?.content ||
          "No response generated",
      }),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
