import { NextResponse, NextRequest } from "next/server";
import axios from "axios";
import { codeRunValidation } from "@/schemas/codeRunSchema";

const judge0ApiLink = process.env.JUDGE0_BATCH_API_BATCH_LINK || '';

const judge0Headers = {
    "content-type": "application/json",
    "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
    "X-RapidAPI-Key": process.env.JUDGE0_BATCH_API_KEY
};

export async function POST(req: NextRequest) {
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

        const submissions = testCases.map((tc: any) => ({
            source_code: sourceCode,
            language_id: languageId,
            stdin: tc.input,
            expected_output: tc.output,
            base64_encoded: false
        }));

        // Step 1: Create batched submissions
        let submission;
        try {
            submission = await axios.post(
                judge0ApiLink,
                { submissions },
                { headers: judge0Headers }
            );
        } catch (err: any) {
            console.error("Failed to create batch submission:", err.response?.data || err.message);

            return NextResponse.json({
                success: false,
                message: err.response?.data || err.message,
            }, { status: 400 });
        }

        const tokens = submission.data.map((s: any) => s.token);

        // Step 2: Fetch batched results
        let results;
        while (true) {
            results = await axios.get(
                `${judge0ApiLink}?tokens=${tokens.join(",")}`,
                { headers: judge0Headers }
            );

            const allDone = results.data.submissions.every(
                (r: any) => r.status.id > 2 // not "In Queue" or "Processing"
            );

            if (!allDone) {
                await new Promise((r) => setTimeout(r, 1000));
            } else {
                break;
            }
        }

        return NextResponse.json({
            success: true,
            message: "Code executed successfully",
            results: results.data.submissions,
        }, { status: 200 });
    } catch (error) {
        console.error("Error while submitting code into api:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Error while submitting code into api",
            }, { status: 500 });
    }
}