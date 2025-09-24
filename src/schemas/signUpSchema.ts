import {z} from "zod";

export const signUpValidation = z.object({
    username: z.string().min(6, {message: "Username must be atleast 6 charecters"}),
    email: z.email({message: "Invalid email address"}),
    password: z.string().min(8, {message: "Password must be atleast 8 charecters"})
})