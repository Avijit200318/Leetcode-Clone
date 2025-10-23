import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { getToken } from "next-auth/jwt";

const runtime = "edge";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.error("GEMINI_API_KEY is not set in environment variables!");
}

const ai = new GoogleGenAI({
    apiKey: apiKey!,
})

export async function POST(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    
        if (!token) {
            return NextResponse.json({
                success: false,
                message: "Unauthorized"
            }, { status: 400 });
        }

    try {
        const { sourceCode, inputMessage } = await req.json();

        if (!sourceCode || !inputMessage) {
            return NextResponse.json({
                success: false,
                message: "Source code and Input message required",
            }, { status: 400 });
        }

        const prompt = `
You are an expert code reviewer.
I will give you a piece of source code inside curly braces {} and a user message for context.
Analyze the code based on the user's message and respond in 2 to 4 lines only.
Do not rewrite the code. Just point out possible mistakes, logic issues, or give helpful hints to improve it.

User message: "${inputMessage}"

This is the code:
{
${sourceCode}
}
`;


        const result = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt
        });

        const text = result.text;

        return NextResponse.json({
            success: true,
            message: "Generated output successfully",
            output: text
        }, { status: 200 });
    } catch (error) {
        console.error("Gemini API Error:", error);
        return NextResponse.json({
            success: false,
            message: "Gemini api error or server error",
        }, { status: 400 });
    }
}