import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Use AI to classify the message type and generate a smart auto-reply
    const aiResponse = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 300,
      messages: [
        {
          role: "user",
          content: `Classify this contact form message and write a brief, professional auto-reply for Omkar More's portfolio.

Name: ${name}
Email: ${email}
Subject: ${subject || "No subject"}
Message: ${message}

Respond with JSON:
{
  "category": "job_opportunity" | "collaboration" | "project_inquiry" | "general",
  "priority": "high" | "medium" | "low",
  "autoReply": "A warm 2-3 sentence reply acknowledging their message and letting them know Omkar will get back to them"
}`,
        },
      ],
    });

    let parsed = { category: "general", priority: "medium", autoReply: "" };
    try {
      const text = aiResponse.content[0].type === "text" ? aiResponse.content[0].text : "{}";
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) parsed = JSON.parse(jsonMatch[0]);
    } catch {
      // fallback
    }

    // In production you'd send an email here (e.g. via Resend/SendGrid)
    // For now we return the classification and auto-reply
    return NextResponse.json({
      success: true,
      category: parsed.category,
      priority: parsed.priority,
      autoReply: parsed.autoReply || `Hi ${name}! Thanks for reaching out. Omkar will get back to you at ${email} soon!`,
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ error: "Failed to process message" }, { status: 500 });
  }
}
