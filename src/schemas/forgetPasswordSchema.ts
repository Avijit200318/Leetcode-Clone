import {z} from "zod";

export const emailValidation = z.object({
    email: z.email({message: "Invalid email address"})
})

export const forgetPasswordValidation = z.object({
    email: z.email({message: "Invalid email address"}),
    password: z.string().min(8, {message: "Password must be atleast 8 charecters"}),
    code: z.string().min(6, {message: "Verificaion code must be 6 digits"})
});