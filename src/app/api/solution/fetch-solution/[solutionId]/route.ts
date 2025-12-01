import { connectToDb } from "@/lib/dbConnect";
import solutionModel from "@/models/Solution";
import { NextRequest, NextResponse } from "next/server";
import "@/models/User";

export async function GET(req: NextRequest, {params }: { params: { solutionId: string } }){
    await connectToDb()

    try {
        const { solutionId } = await params;

        const solution = await solutionModel.findById(solutionId).populate({path: "userId", select: "username avatar"});

        return NextResponse.json({
            success: true,
            message: "Solution fetched successfully",
            solution
        }, {status: 200})
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Something went wrong while fetching solution"
        }, {status: 500})
    }
}