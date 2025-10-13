import {z} from "zod"

export const codeRunValidation = z.object({
    sourceCode: z.string().min(20, {message: "The Source code must be atleast 20 charecters"}),
    languageId: z.number().refine(
      (id) => [50, 54, 62, 93, 71].includes(id),
      { message: "Invalid language ID. Allowed: C, C++, Java, Python, JavaScript this languages" }
    ),
    testCases: z.array(
        z.object({
            input: z.string().min(1, { message: "Input is required" }),
            output: z.string().min(1, { message: "Output is required" }),
        })
    )
})