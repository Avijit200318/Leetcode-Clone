import { z } from "zod";
import { mongodbObjectId } from "./similarQuestionSchema";

// _id: "68fdc8000d9ab8b9d1b2cba3"
// avatar: "https://firebasestorage.googleapis.com/v0/b/x-next-e5030.appspot.com/o/default%20profile.png?alt=media&token=30c25630-f81e-41a3-97c3-e531c4e66825" -> X
// createdAt: "2025-10-26T07:04:32.041Z" -> X
// forgetPasswordExpiry: null -> X
// isVerified: true -> X
// password: "$2b$10$RRXhtOfU//FgI6CPCcz2T.BvBQnp.KHCYXfSZwdZLxNYVtTCQHd6S" -> X
// solutions: Array["6905b015bfefe309da479443"] -> X
// solvedProblems: 6 -> X
// solvedQuestions: Array(6)[{… }, {… }, {… }, … ] ->X
// submissions: Array(6)["68fdc91a0d9ab8b9d1b2cc05", "68fdc9540d9ab8b9d1b2cc7e", "68fdc9750d9ab8b9d1b2cce2", … ] -> X
// updatedAt: "2025-11-22T12:13:11.944Z" -> X
// userType: "admin" -> X
// verifyCode: "668089" -> X
// verifyCodeExpiry: "2025-10-26T07:09:31.995Z" -> X


// username: "Avijit1807"


export const updateUserValidation = z.object({
    username: z.string().min(6, { message: "Username must be atleast 6 charecters" }),
    bio: z.string().min(10, { message: "Bio must be atleast 10 charecter long" }).optional(),
    country: z.string().min(3, { message: "Country name must be atleast 3 charecter long" }),
    unversity: z.string().min(3, { message: "University name must be atleast 3 charecter long" }),
    github: z.string(),
    linkdin: z.string(),
})