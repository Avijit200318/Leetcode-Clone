import axios from "axios";

const judge0ApiLink = process.env.JUDGE0_BATCH_API_BATCH_LINK || '';

const judge0Headers = {
    "content-type": "application/json",
    "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
    "X-RapidAPI-Key": process.env.JUDGE0_BATCH_API_KEY
};

export const runJudge0Batch = async (sourceCode: string, languageId: string, testCases: [{ input: string, output: string }]) => {
    try {
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
            console.error("Failed to create batch submission:", err.response?.data.message);

            return {
                success: false,
                result: err.response?.data.message
            }
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

        return {
            success: true,
            result: results.data.submissions
        }
    } catch (error: any) {
        console.error("Judge0 batch error:", error.response?.data);
        return {
            success: false,
            message: error.response?.data?.message || "Judge0 API error",
        };
    }
}