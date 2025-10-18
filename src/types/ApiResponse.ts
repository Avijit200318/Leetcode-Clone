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

export interface codeSubmissionResultType {
    userId: string | mongoose.Types.ObjectId,
    status: string,
    language: string,
    time: number,
    memory: number,
    sourceCode: string,
    problemId: string | mongoose.Types.ObjectId,
    createdAt?: Date,
    udpatedAt?: Date
}

export interface ApiResponse {
    success: boolean,
    message: string,
    user?: IUser,
    userId?: string | mongoose.Types.ObjectId,
    solutions?: Array<mongoose.Types.ObjectId> | codeSubmissionResultType[],
    submission?: Array<mongoose.Types.ObjectId>,
    solvedQuestions?: Array<mongoose.Types.ObjectId>,
    submissionOutput?: codeSubmissionResultType,
    problemId?: string | mongoose.Types.ObjectId,
    problem?: IProblem,
    allProblems?: IProblem[],
    results?: Judge0SubmissionResult[],
}