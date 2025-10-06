import { z } from "zod";

export const createProblemValidation = z.object({
    title: z.string().min(3, { message: "Title must be atleast 3 charecters" }),
    level: z.string(),
    description: z.string(),
    examples: z.string(),
    constraints: z.string(),
    testCases: z.array(
        z.object({
            input: z.string().min(1, { message: "Input is required" }),
            output: z.string().min(1, { message: "Output is required" }),
        })
    ),
    like: z.number().optional(),
    dislike: z.number().optional(),
    topics: z.string(),
    companies: z.string().optional()
})