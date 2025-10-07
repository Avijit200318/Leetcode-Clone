import { IProblem } from "@/models/Problem";
import { IUser } from "@/models/User";
import mongoose, { mongo } from "mongoose";

export interface ApiResponse {
    success: boolean,
    message: string,
    user?: IUser,
    userId?: string | mongoose.Types.ObjectId,
    solutions?: Array<mongoose.Types.ObjectId>,
    submission?: Array<mongoose.Types.ObjectId>,
    solvedQuestions?: Array<mongoose.Types.ObjectId>,
    problemId?: string | mongoose.Types.ObjectId,
    problem?: IProblem,
    allProblems?: IProblem[]
}