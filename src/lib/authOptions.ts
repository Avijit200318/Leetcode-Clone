import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDb } from "./dbConnect";
import userModel from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: any): Promise<any> {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Missing error and password");
                }

                try {
                    await connectToDb();

                    const user = await userModel.findOne({ email: credentials.email });

                    if (!user) {
                        throw new Error("No user found through this email");
                    }

                    if (!user.isVerified) {
                        throw new Error("Please verify your account first");
                    }

                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

                    if (isPasswordCorrect) {
                        return user;
                    } else {
                        throw new Error("Incorrect Password");
                    }
                } catch (error: any) {
                    throw new Error(error);
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user}) {
            if(user){
                token._id = user._id?.toString(),
                token.isVerified = user.isVerified,
                token.username = user.username,
                token.email = user.email,
                token.avatar = user.avatar,
                token.userType = user.userType
            }
            
            return token
        },

        async session({ session, token }) {
            if(token){
                session.user._id = token._id,
                session.user.isVerified = token.isVerified
                session.user.username = token.username
                session.user.email = token.email
                session.user.avatar = token.avatar
                session.user.userType = token.userType
            }

            return session
        }
    },
    pages: {
        signIn: "/sign-in",
        error: "/sign-in"
    },
    session: {
        strategy: "jwt",
        maxAge: 1 * 24 * 60 * 60
    },
    secret: process.env.NEXTAUTH_SECRET
}