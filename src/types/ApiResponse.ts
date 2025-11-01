import { IProblem } from "@/models/Problem";
import { ISolution } from "@/models/Solution";
import { ISubmission } from "@/models/Submission";
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
    _id?: string | mongoose.Types.ObjectId,
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
    solutions?: Array<mongoose.Types.ObjectId> | ISolution[],
    submissions?: Array<mongoose.Types.ObjectId> | codeSubmissionResultType[],
    solvedQuestions?: Array<mongoose.Types.ObjectId>,
    submissionOutput?: codeSubmissionResultType,
    problemId?: string | mongoose.Types.ObjectId,
    problem?: IProblem,
    solution?: ISolution,
    allProblems?: IProblem[],
    results?: Judge0SubmissionResult[],
    output?: string,
    submissionDetails?: ISubmission
}