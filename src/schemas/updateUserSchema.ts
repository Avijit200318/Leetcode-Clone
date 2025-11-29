import { z } from "zod";
import { mongodbObjectId } from "./similarQuestionSchema";

export const updateUserValidation = z.object({
    username: z.string().min(6, { message: "Username must be atleast 6 charecters" }),
    bio: z.string().min(10, { message: "Bio must be atleast 10 charecter long" }).optional(),
    country: z.string().min(3, { message: "Country name must be atleast 3 charecter long" }),
    university: z.string().min(3, { message: "University name must be atleast 3 charecter long" }),
    github: z.string(),
    linkdin: z.string(),
})