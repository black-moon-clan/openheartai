import { Handler } from "@netlify/functions";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

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
    const chatCompletion = await groq.chat.completions.create({
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
      model: "mixtral-8x7b-32768",
      temperature: 0.5,
      max_tokens: 1024,
      top_p: 1,
      stream: false,
    });

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
      body: JSON.stringify({
        error: "Internal Server Error",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
    };
  }
};
