import { connectToDb } from "@/lib/dbConnect";
import { mongodbObjectId } from "@/schemas/similarQuestionSchema";
import { NextRequest, NextResponse } from "next/server";
import submissionModel from "@/models/Submission";
import "@/models/Problem";
import { getToken } from "next-auth/jwt";

export async function POST(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
        return NextResponse.json({
            success: false,
            message: "Unauthorized"
        }, { status: 400 });
    }
    await connectToDb();

    try {
        const { userId } = await req.json();
        if (!userId) {
            return NextResponse.json({
                success: false,
                message: "User id is required"
            }, { status: 400 })
        }

        const parsedData = mongodbObjectId.safeParse(userId);
        if (!parsedData.success) {
            return NextResponse.json({
                success: false,
                message: parsedData.error.issues[0].message
            }, { status: 400 })
        }

        const allSubmissions = await submissionModel.find({
            userId
        }).populate({ path: "problemId", select: "" });

        return NextResponse.json({
            success: true,
            message: "All submission are fetched successfully",
            submissions: allSubmissions
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Something went wrong while fetching all solutions"
        }, { status: 500 })
    }
}