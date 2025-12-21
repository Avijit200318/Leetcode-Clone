import { connectToDb } from "@/lib/dbConnect";
import problemModel from "@/models/Problem";
import { createProblemValidation } from "@/schemas/createProblemSchema";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req:NextRequest) {
    const token = getToken({req, secret: process.env.NEXTAUTH_SECRET});
    if(!token){
        return NextResponse.json({
            success: false,
            message: "Unauthorized"
        }, {status: 400});
    }

    const { searchParams } = new URL(req.url);
    const problemId = searchParams.get("problemId");
    if(!problemId){
        return NextResponse.json({
            success: false,
            message: "Required ProblemId"
        }, {status: 400});
    }

    await connectToDb();

    try {
        const body = await req.json();
        const parsedData = createProblemValidation.safeParse(body);
        if(!parsedData.success){
            return NextResponse.json({
                success: false,
                message: parsedData.error.issues[0].message
            })
        }

        const updatedProblem = await problemModel.findByIdAndUpdate(
            problemId,
            body,
            {new: true}
        );

        return NextResponse.json({
            success: true,
            message: "Problem updated successfully",
            problem: updatedProblem
        }, {status: 200});
    } catch (error) {
        console.log("Something went wrong while updating problem: ", error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong while updating problem"
        }, {status: 500})
    }
}