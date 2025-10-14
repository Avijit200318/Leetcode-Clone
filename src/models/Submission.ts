import {Schema, Types, Document, model, models} from "mongoose";

export interface ISubmission extends Document {
    userId: Types.ObjectId,
    status: string,
    language: string,
    time: number,
    memory: number,
    sourceCode: string,
    problemId: Types.ObjectId
}

const submissionSchema = new Schema<ISubmission>({
    userId: {
        type: Schema.Types.ObjectId,
        required: [true, "User id is required"],
        ref: "User"
    },
    status: {
        type: String,
        required: [true, "Smitted code status required"]
    },
    language: {
        type: String,
        required: [true, "Coding language is required"]
    },
    time: {
        type: Number,
        required: [true, "Code run time required"]
    },
    memory: {
        type: Number,
        required: [true, "Code run time required"]
    },
    sourceCode: {
        type: String,
        required: [true, "Code required"]
    },
    problemId: {
        type: Schema.Types.ObjectId,
        required: [true, "User id is required"],
        ref: "Problem"
    }
}, {timestamps: true});

const Submission = models?.Submission || model<ISubmission>("Submission", submissionSchema);

export default Submission;