import { NextRequest, NextResponse } from "next/server";
import userModel from "@/models/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import { connectToDb } from "@/lib/dbConnect";

import { signUpValidation } from "@/schemas/signUpSchema";

export async function POST(req: NextRequest) {
    await connectToDb();

    try {
        const body = await req.json();
        const {username, email , password} = body;

        if(!username || !email || !password){
            return NextResponse.json({
                success: false,
                message: "All fields are required"
            }, {status: 400});
        }

        // zod validation
        const parsedData = signUpValidation.safeParse(body);

        if(!parsedData.success){
            return NextResponse.json({
                success: false,
                message: parsedData.error.issues[0].message,
            }, {status: 400});
        }

        const existingVerifiedUser = await userModel.findOne({email, isVerified: true});

        if(existingVerifiedUser){
            return NextResponse.json({
                success: false,
                message: "User is already registered with this email"
            }, {status: 400});
        }

        const existingUserButNotVerified = await userModel.findOne({email});
        const verifyCode = Math.floor(10000 + Math.random() * 900000).toString();
        const hashPassword = await bcrypt.hash(password, 10);
        // to track our userid
        let userId;

        if(existingUserButNotVerified){
            // we have to update password, username and send verification email
            existingUserButNotVerified.password = hashPassword;
            existingUserButNotVerified.username = username;
            existingUserButNotVerified.verifyCode = verifyCode;
            existingUserButNotVerified.verifyCodeExpiry = new Date(Date.now() + (5 * 60 * 1000));

            await existingUserButNotVerified.save();
            userId = existingUserButNotVerified._id;
        }
        else{
            const expiryDate = new Date();
            expiryDate.setMinutes(expiryDate.getMinutes() + 5);

            const newUser = await userModel.create({
                username,
                email,
                password: hashPassword,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                solutions: [],
                submissions: [],
                solvedQuestions: []
            });

            userId = newUser._id;
        }

        // send verification email
        const emailResponse = await sendVerificationEmail(email, username, verifyCode);

        if(!emailResponse.success){
            return NextResponse.json({
                success: false,
                message: emailResponse.message
            }, {status: 500});
        }

        return NextResponse.json({
            success: true,
            message: "User registered successfully. Please verify your email",
            userId
        }, {status: 201});
    } catch (error) {
        console.error("Error registering user: ", error);
        return NextResponse.json({
            success: false,
            message: "Error registering user"
        }, {status: 500});   
    }
}