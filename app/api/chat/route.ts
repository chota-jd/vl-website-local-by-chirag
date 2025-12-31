import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are the "VersionLabs AI Assistant", a representative of a world-class government technology firm specializing in digital infrastructure.
Your goal is to help government officials and public sector stakeholders understand how VersionLabs can transform their national platforms.

Key points about VersionLabs:
- Expertise: Government Portals, Enterprise LMS (Learning Management Systems), and Strategic AI Automation.
- Core Values: Digital Sovereignty, Security, Multi-tenant Scalability, and Citizen-Centric UI/UX.
- National Impact: Managing mission-critical platforms with millions of users.

Tone Guidelines:
- Professional, authoritative, and helpful.
- Focus on security and compliance (NIC/GIGW).
- For project inquiries, direct them to "Request a Proposal" or "Schedule a Discovery Session".
`;

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...(history || []),
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        topP: 0.9,
      }
    });

    return NextResponse.json({
      text: response.text || "I apologize, but I am unable to process that request at the moment. Please contact VersionLabs support for urgent inquiries."
    });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { 
        text: "An error occurred while connecting to the VersionLabs enterprise AI systems. Please try again shortly.",
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

