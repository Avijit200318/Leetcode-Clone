import { NextRequest, NextResponse } from "next/server";
import { emailValidation } from "@/schemas/forgetPasswordSchema";
import userModel from "@/models/User";
import { sendForgetPasswordVerificationEmail } from "@/helpers/sendForgetPasswordVerificationEmail";
import { connectToDb } from "@/lib/dbConnect";

export async function POST(req: NextRequest) {
    await connectToDb();

    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({
                success: false,
                message: "Email is required"
            }, { status: 400 });
        }

        const parseData = emailValidation.safeParse({ email });
        if (!parseData.success) {
            return NextResponse.json({
                success: false,
                message: parseData.error.issues[0].message
            }, { status: 400 });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found"
            }, { status: 404 });
        }
        
        const verifyCode = Math.floor(10000 + Math.random() * 900000).toString();

        user.forgetPasswordExpiry = new Date(Date.now() + (5 * 60 * 1000));
        user.verifyCode = verifyCode;
        await user.save();

        const emailResponse = await sendForgetPasswordVerificationEmail(user.email, user.username, verifyCode);

        if (!emailResponse.success) {
            return NextResponse.json({
                success: false,
                message: emailResponse.message
            }, { status: 500 });
        }

        return NextResponse.json({
            success: true,
            message: "Email send successfully",
        }, {status: 200});
    } catch (error) {
        console.error("Error sending forget password email: ", error);
        return NextResponse.json({
            success: false,
            message: "Error while sending forget password email"
        }, { status: 500 });
    }
}