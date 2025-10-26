import { NextResponse, NextRequest } from "next/server";
import { codeRunValidation } from "@/schemas/codeRunSchema";
import { runJudge0Batch } from "@/lib/judge0ApiFunction";
import { getToken } from "next-auth/jwt";

export async function POST(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
        return NextResponse.json({
            success: false,
            message: "Unauthorized"
        }, { status: 400 });
    }

    try {
        const body = await req.json();
        const { sourceCode, languageId, testCases } = body;

        const parsedData = codeRunValidation.safeParse(body);

        if (!parsedData.success) {
            console.log(parsedData.error.issues[0].message)
            return NextResponse.json({
                success: false,
                message: parsedData.error.issues[0].message,
            }, { status: 400 });
        }

        // call judge0 api
        const response = await runJudge0Batch(sourceCode, languageId, testCases);

        if (!response.success) {
            return NextResponse.json({
                success: false,
                message: response.result,
            }, { status: 400 });
        }

        return NextResponse.json({
            success: true,
            message: "Code executed successfully",
            results: response.result,
        }, { status: 200 });
    } catch (error) {
        console.error("Something went wrong while submitting code into api:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong while submitting code into api",
            }, { status: 500 });
    }
}