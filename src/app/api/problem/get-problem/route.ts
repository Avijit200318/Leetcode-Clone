import { connectToDb } from "@/lib/dbConnect";
import problemModel from "@/models/Problem";
import { mongodbObjectId } from "@/schemas/similarQuestionSchema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    await connectToDb();

    try {
        const { searchParams } = new URL(req.url);
        const problemId = searchParams.get("problemId");

        if (!problemId) {
            return NextResponse.json({
                success: false,
                message: "Problem ID is required",
            }, { status: 400 });
        }

        const parsedData = mongodbObjectId.safeParse(problemId);

        if (!parsedData.success) {
            return NextResponse.json({
                success: false,
                message: "Invalid mongodb id"
            }, { status: 401 });
        }

        const problem = await problemModel.findById(problemId);
        if (!problem) {
            return NextResponse.json({
                success: false,
                message: "Problem not found"
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: "Problem found successfully",
            problem
        }, { status: 200 });
    } catch (error) {
        console.log("Error while fetching the problem: ", error);
        return NextResponse.json({
            success: false,
            message: "Error while fetching the problem"
        }, { status: 401 });
    }
}