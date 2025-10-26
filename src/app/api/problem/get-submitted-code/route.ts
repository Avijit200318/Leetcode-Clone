import { connectToDb } from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import userModel from "@/models/User";
import problemModel from "@/models/Problem";
import mongoose from "mongoose";

export async function GET(req: NextRequest) {

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
        return NextResponse.json({
            success: false,
            message: "Unauthorized"
        }, { status: 400 });
    }

    const { searchParams } = new URL(req.url);
    const problemId = searchParams.get("problemId");

    if (!problemId) {
        return NextResponse.json({
            success: false,
            message: "Required problemId"
        }, { status: 400 });
    }

    await connectToDb();
    try {
        const existedProblem = await problemModel.findById(problemId);
        if (!existedProblem) {
            return NextResponse.json({
                success: false,
                message: "Problem not found"
            }, { status: 404 });
        }

        const submittedCodes = await userModel.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(token._id) } },
            {
                $lookup: {
                    from: "submissions",
                    let: {
                        subIds: "$submissions",
                        targetProblemId: new mongoose.Types.ObjectId(problemId)
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $in: ["$_id", "$$subIds"] },
                                        { $eq: ["$problemId", "$$targetProblemId"] }
                                    ]
                                }
                            }
                        },
                        { $sort: { createdAt: -1 } }
                    ],
                    as: "submissionDetails"
                }
            },
            {
                $project: {
                    submissionDetails: 1
                }
            }
        ]);

        return NextResponse.json({
            success: true,
            message: "Submission fetched successfully",
            solutions: submittedCodes[0]?.submissionDetails || []
        });
    } catch (error) {
        console.error("Something went wrong while fetching submissions for this problem: ", error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong while fetching submissions for this problem"
        }, { status: 500 });
    }
}