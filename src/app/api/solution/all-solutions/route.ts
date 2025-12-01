import { connectToDb } from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import "@/models/User";
import solutionModel from "@/models/Solution";

export async function GET(req: NextRequest){
    await connectToDb()

    try {
        const allSolutions = await solutionModel.find().populate({path: "userId", select: ""});
        return NextResponse.json({
            success: true,
            message: "All solutions are fetched successfully",
            solutions: allSolutions
        }, {status: 200})
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Something went wrong while fetching all solutions"
        }, {status: 500})
    }
}