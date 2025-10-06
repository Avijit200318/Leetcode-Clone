import {Document, model, models, Schema, Types} from "mongoose";
import { ISimilarQuestion } from "./SimilarQuestion";
import { ISolution } from "./Solution";

export interface IProblem extends Document {
    title: string,
    level: string,
    description: string,
    examples: string,
    constraints: string,
    starterTemplate: string,
    testCases: string[],
    outputs: string,
    like: number,
    dislike: number,
    topics: string,
    companies: string,
    similarQuestions: (Types.ObjectId[] | ISimilarQuestion[]),
    solutions: (Types.ObjectId[] | ISolution[]),
    createdAt?: Date,
    updatedAt?: Date,
}

const problemSchema = new Schema<IProblem>({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true
    },
    level: {
        type: String,
        required: [true, "Level is required"]
    },
    description: {
        type: String,
        required: [true, "Description of the problem required"]
    },
    examples: {
        type: String,
        required: [true, "Example string is required"]
    },
    constraints: {
        type: String,
        required: [true, "Constraints string is required"]
    },
    starterTemplate: {
        type: String
    },
    testCases: [{
        type: String,
        required: [true, "Testcases required"]
    }],
    outputs: {
        type: String,
        required: [true, "Output is required (is separated by ',')"]
    },
    like: {
        type: Number,
        default: 0
    },
    dislike: {
        type: Number,
        default: 0
    },
    topics: {
        type: String,
        required: [true, "topics is required (is separated by ',')"]
    },
    companies: {
        type: String
    },
    similarQuestions: [{
        type: Types.ObjectId,
        ref: "SimilarQuestion"
    }],
    solutions: [{
        type: Types.ObjectId,
        ref: "Solution"
    }]
}, {timestamps: true});

const Problem = models?.Problem || model<IProblem>("Problem", problemSchema);

export default Problem;