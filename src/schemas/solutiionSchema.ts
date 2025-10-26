import { z } from "zod";
import { mongodbObjectId } from "./similarQuestionSchema";

export const solutionValidation = z.object({
  problemId: mongodbObjectId,
  title: z.string().min(4, { message: "Title must be must be 4 charecters long" }),
  tags: z.array(
    z.string().min(3, { message: "Tags must be 3 charecters long" })
  ),
  explanation: z.string().min(20, { message: "Explanation must be 20 charecters long" }),
  sourceCode: z.string().min(10, { message: "The source code at least 10 charecters long" }),
});