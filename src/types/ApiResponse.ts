import { IProblem } from "@/models/Problem";
import { IUser } from "@/models/User";
import mongoose, { mongo } from "mongoose";

export interface Judge0SubmissionResult {
    token: string;
    status: {
        id: number;
        description: string;
    };
    stdout?: string | null;
    stderr?: string | null;
    compile_output?: string | null;
    message?: string | null;
    time?: string | null;
    memory?: number | null;
}

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
    allProblems?: IProblem[],
    results?: Judge0SubmissionResult[]
}