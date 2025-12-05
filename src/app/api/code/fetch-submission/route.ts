import { connectToDb } from "@/lib/dbConnect";
import submissionModel from "@/models/Submission";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import "@/models/Problem";

export async function GET(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
        return NextResponse.json({
            success: false,
            message: "Unauthorized"
        }, { status: 400 });
    }

    await connectToDb();

    try {
        const { searchParams } = new URL(req.url);
        const submissionId = searchParams.get("submissionId");

        if (!submissionId) {
            return NextResponse.json({
                success: false,
                message: "Submission ID is required",
            }, { status: 400 });
        }

        const submission = await submissionModel.findById(submissionId).populate({path: "problemId", select: "title"});

        if (!submission) {
            return NextResponse.json({
                success: false,
                message: "Submitted code not found",
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: "Submission details found successfully",
            submissionOutput: submission
        }, { status: 200 });

    } catch (error) {
        console.log("Something went wrong while fetching submission details: ", error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong while fetching submission details"
        }, { status: 500 });
    }
}