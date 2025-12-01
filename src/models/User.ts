import mongoose, {Document, model, models, Schema, Types} from "mongoose";
import { IProblem } from "./Problem";

export interface IUser extends Document{
    username: string,
    email: string,
    password: string,
    avatar: string,
    userType?: string
    bio?: string,
    country?: string,
    university?: string,
    github?: string,
    verifyCode: string,
    verifyCodeExpiry: Date,
    isVerified: boolean,
    forgetPasswordExpiry: Date | null,
    solvedProblems: number,
    skills: string[],
    linkdin: string,
    solutions: Types.ObjectId[],
    submissions: Types.ObjectId[],
    solvedQuestions: Types.ObjectId[] | IProblem[],
    createdAt?: Date,
    updatedAt?: Date,
}

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        unique: true,
        match: [/.+@.+\..+/, 'please use a valid email address']
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    userType: {
        type: String,
        default: "user"
    },
    bio: {
        type: String
    },
    github: {
        type: String
    },
    linkdin: {
        type: String
    },
    university: {
        type: String
    },
    country: {
        type: String
    },
    avatar: {
        type: String,
        default: "https://firebasestorage.googleapis.com/v0/b/x-next-e5030.appspot.com/o/default%20profile.png?alt=media&token=30c25630-f81e-41a3-97c3-e531c4e66825"
    },
    verifyCode: {
        type: String,
        required: [true, "verify code is required"],
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true, "verify code expiry is required"],
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    forgetPasswordExpiry: {
        type: Date,
        default: null
    },
    solvedProblems: {
        type: Number,
        default: 0
    },
    solutions: [{
        type: Schema.Types.ObjectId,
        ref: "Solution"
    }],
    submissions: [{
        type: Schema.Types.ObjectId,
        ref: "Submission"
    }],
    solvedQuestions: [{
        type: Schema.Types.ObjectId,
        ref: "Problem"
    }],
    skills: [{
        type: String
    }]
}, {timestamps: true});

const User = models?.User || model<IUser>("User", userSchema);

export default User;