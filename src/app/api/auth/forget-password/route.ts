import { connectToDb } from "@/lib/dbConnect";
import { forgetPasswordValidation } from "@/schemas/forgetPasswordSchema";
import { NextRequest, NextResponse } from "next/server";
import userModel from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
    await connectToDb();

    try {
        const body = await req.json();
        const {email, password, code } = body;

        if (!password || !code) {
            return NextResponse.json({
                success: false,
                message: "All fields are required"
            }, { status: 400 });
        }

        // zod validation
        const parseData = forgetPasswordValidation.safeParse(body);
        if(!parseData.success){
            return NextResponse.json({
                success: false,
                message: parseData.error.issues[0].message
            }, {status: 400})
        }

        const user = await userModel.findOne({email});

        if(!user){
            return NextResponse.json({
                success: false,
                message: "User not found"
            }, { status: 404 });
        }

        const isCodeValid = user.verifyCode === code;
        const isForgetPasswordNotExpired = user.forgetPasswordExpiry > new Date();
        const hashedPassword = await bcrypt.hash(password, 10);

        if(isCodeValid && isForgetPasswordNotExpired){
            user.password = hashedPassword;
            user.forgetPasswordExpiry = null;
            await user.save();

            return NextResponse.json({
                success: true,
                message: "Password updated successfully"
            }, {status: 200});
        } else if(!isForgetPasswordNotExpired){
            return NextResponse.json({
                success: false,
                message: "Verification code expired"
            }, {status: 400});
        } else{
            return NextResponse.json({
                success: false,
                message: "Incorrect verification code"
            }, {status: 400});
        }
    } catch (error) {
        console.error("Error changing password: ", error);
        return NextResponse.json({
            success: false,
            message: "Error changing password"
        }, { status: 500 });
    }
}