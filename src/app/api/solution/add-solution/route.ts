import { connectToDb } from "@/lib/dbConnect";
import problemModel from "@/models/Problem";
import solutionModel from "@/models/Solution";
import userModel from "@/models/User";
import { solutionValidation } from "@/schemas/solutiionSchema";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

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
        const body = await req.json();
        const { problemId, title, tags, explanation, sourceCode } = body;
        const parsedData = solutionValidation.safeParse(body);

        if (!parsedData.success) {
            return NextResponse.json({
                success: false,
                message: parsedData.error.issues[0].message
            }, { status: 400 })
        }

        const existingUser = await userModel.findById(token._id);

        if(!existingUser){
            return NextResponse.json({
                success: false,
                message: "User not found"
            }, { status: 404 })
        }

        const existedProblem = await problemModel.findById(problemId);

        if(!existedProblem){
            return NextResponse.json({
                success: false,
                message: "Problem not found"
            }, { status: 404 })
        }

        const newSolution = await solutionModel.create({
            userId: token._id,
            problemId,
            tags,
            title,
            explanation,
            sourceCode
        });

        if(!newSolution){
            console.log("Submission Failed");
            return NextResponse.json({
                success: false,
                message: "Submission Failed",
            }, { status: 400 });
        }

        existingUser.solutions.push(newSolution._id);
        await existingUser.save();
        existedProblem.solutions.push(newSolution._id);
        await existedProblem.save();

        return NextResponse.json({
            success: true,
            message: "Solution submitted successfully",
            solution: newSolution
        }, { status: 201 })

    } catch (error) {
        console.error("Something went wrong while adding solution: ", error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong while adding solution"
        }, { status: 500 });
    }
}