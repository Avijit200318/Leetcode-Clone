import mongoose, {Document, model, models, Schema, Types} from "mongoose";

export interface IUser extends Document{
    username: string,
    email: string,
    password: string,
    avatar: string,
    userType?: string
    bio?: string,
    country?: string,
    unversity?: string,
    github?: string,
    verifyCode: string,
    verifyCodeExpiry: Date,
    isVerified: boolean,
    forgetPasswordExpiry: Date | null,
    solvedProblems: number,
    solutions: Types.ObjectId[],
    submission: Types.ObjectId[],
    solvedQuestions: Types.ObjectId[],
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
    unversity: {
        type: String
    },
    country: {
        type: String
    },
    avatar: {
        type: String,
        default: "https://raw.githubusercontent.com/Volosh1n/github-avatars/master/examples/image.png"
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
        type: Types.ObjectId,
        ref: "Solution"
    }],
    submission: [{
        type: Types.ObjectId,
        ref: "Submission"
    }],
    solvedQuestions: [{
        type: Types.ObjectId,
        ref: "SolvedQuestion"
    }]
}, {timestamps: true});

const User = models?.User || model<IUser>("User", userSchema);

export default User;