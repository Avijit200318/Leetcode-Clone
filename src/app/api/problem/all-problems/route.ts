import { connectToDb } from "@/lib/dbConnect";
import problemModel from "@/models/Problem";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    await connectToDb();

    try {
        const allProblems = await problemModel.find();
        if (allProblems.length === 0) {
            return NextResponse.json({
                success: false,
                message: "No problem to show, contact the admin"
            }, { status: 400 })
        }

        return NextResponse.json({
            success: true,
            message: "All the problems found successfully",
            allProblems
        }, { status: 200 })
    } catch (error) {
        console.log("Error while fetching all problems: ", error);
        return NextResponse.json({
            success: false,
            message: "Error while fetching all problems"
        }, { status: 401 });
    }
}
