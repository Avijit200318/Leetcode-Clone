import { IUser } from "@/models/User";
import mongoose from "mongoose";

export interface ApiResponse {
    success: boolean,
    message: string,
    user?: IUser,
    solutions?: Array<mongoose.Types.ObjectId>,
    submission?: Array<mongoose.Types.ObjectId>,
    solvedQuestions?: Array<mongoose.Types.ObjectId>
}