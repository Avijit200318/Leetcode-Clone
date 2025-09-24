import {z} from "zod";

export const verifyCodeValidation = z.object({
    code: z.string().min(6, {message: "Verificaion code must be 6 digits"})
});