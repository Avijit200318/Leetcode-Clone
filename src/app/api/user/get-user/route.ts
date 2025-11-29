import { connectToDb } from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import userModel from "@/models/User";
import "@/models/Problem";
import { getToken } from "next-auth/jwt";

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
        const userId = searchParams.get("userId");

        const user = await userModel.findById(userId).select("-password")
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
        console.log("Something went wrong while fetching the user info: ", error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong while fetching the user info"
        }, { status: 500 });
    }
}