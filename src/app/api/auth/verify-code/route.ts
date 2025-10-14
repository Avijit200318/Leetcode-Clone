import { connectToDb } from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import userModel from "@/models/User";
import { verifyCodeValidation } from "@/schemas/verifyCodeSchema";


export async function POST(req: NextRequest){
    await connectToDb();
    
    try {
        const { id, code } = await req.json();

        if(!id || !code){
            return NextResponse.json({
                success: false,
                message: "All fields are required"
            }, { status: 400 });
        }

        // zod validation
        const parsedData = verifyCodeValidation.safeParse({code});
        if(!parsedData.success){
            return NextResponse.json({
                success: false,
                message: parsedData.error.issues[0].message,
            }, {status: 400});
        }

        const decodedId = decodeURIComponent(id);
        const user = await userModel.findById(decodedId);

        if(!user){
            return NextResponse.json({
                success: false,
                message: "User not found"
            }, { status: 404 });
        }

        if(user.isVerified){
            return NextResponse.json({
                success: false,
                message: "This account is already verified"
            }, { status: 400 });
        }

        const isCodeValid = user.verifyCode === code;
        const isCodeNotExpired = user.verifyCodeExpiry > new Date();

        if(isCodeValid && isCodeNotExpired){
            user.isVerified = true;
            await user.save();

            return NextResponse.json({
                success: true,
                message: "Account verified successfully"
            }, {status: 200});
        } else if(!isCodeNotExpired){
            return NextResponse.json({
                success: false,
                message: "Verification code expired, please signup again to get a new code"
            }, {status: 400});
        }
        else{
            return NextResponse.json({
                success: false,
                message: "Incorrect verification code"
            }, {status: 400});
        }
    } catch (error) {
        console.error("Error veifying code: ", error);
        return NextResponse.json({
            success: false,
            message: "Error verifying code"
        }, { status: 500 });
    }
}