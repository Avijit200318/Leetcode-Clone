import { resend } from "@/lib/resend";
import { ApiResponse } from "@/types/ApiResponse";
import ForgetPasswordVerificationEmail from "../../emails/ForgetPasswordEmail";


export const sendForgetPasswordVerificationEmail = async (email: string, username: string, verifyCode: string): Promise<ApiResponse> => {
    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: "Leetcode-Clone (NEXT JS Project) Forget Password",
            react: ForgetPasswordVerificationEmail({username, otp: verifyCode})
        });
        
        return { success: true, message: "Verification email send successfully" };
    } catch (error) {
        console.error("Error sending forget password email: ", error);
        return { success: false, message: "Failed to send verification email" }
    }
}