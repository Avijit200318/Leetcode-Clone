import { connectToDb } from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import userModel from "@/models/User";
import "@/models/Problem";

export async function GET(req: NextRequest) {
    await connectToDb();

    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");

        const user = await userModel.findById(userId)
            .populate({ path: "solvedQuestions", select: "" });

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found"
            }, { status: 404 });
        }


        return NextResponse.json({
            success: true,
            message: "User found successfully",
            user
        }, { status: 200 });
    } catch (error) {
        console.log("Error while fetching the user info: ", error);
        return NextResponse.json({
            success: false,
            message: "Error while fetching the user info"
        }, { status: 400 });
    }
}