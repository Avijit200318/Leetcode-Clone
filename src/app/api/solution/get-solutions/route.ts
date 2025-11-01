import { connectToDb } from "@/lib/dbConnect";
import solutionModel from "@/models/Solution";
import { mongodbObjectId } from "@/schemas/similarQuestionSchema";
import { NextRequest, NextResponse } from "next/server";
import "@/models/User";

export async function GET(req: NextRequest) {
    await connectToDb();

    try {
        const { searchParams } = new URL(req.url);
        const problemId = searchParams.get("problemId");

        if (!problemId) {
            return NextResponse.json({
                success: false,
                message: "Submission ID is required",
            }, { status: 400 });
        }


        const parsedData = mongodbObjectId.safeParse(problemId);
        if (!parsedData.success) {
            return NextResponse.json({
                success: false,
                message: parsedData.error.issues[0].message,
            }, { status: 400 });
        }

        const allSolutions = await solutionModel.find({ problemId }).populate({ path: "userId", select: "" });

        return NextResponse.json({
            success: true,
            message: "All solutions are fetched successfully",
            solutions: allSolutions
        }, { status: 200 });
    } catch (error) {
        console.log("Something went wrong while fetching all solutions: ", error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong while fetching all solutions"
        }, { status: 500 });
    }
}