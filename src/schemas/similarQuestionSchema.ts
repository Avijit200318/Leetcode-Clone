import { z } from "zod";

// Example: you might define ObjectId as a string for validation
const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId");

export const similarQuestionValidation = z.object({
    _id: objectId,
    title: z.string().min(6, {message: "Titel mustbe atleast 6 charecters"}),
    level: z.string().max(6, {message: "Level consist maximum 6 charecters"})
})