import {Document, model, models, Schema, Types} from "mongoose";
import { ISimilarQuestion } from "./SimilarQuestion";
import { ISolution } from "./Solution";

export interface ITestCase {
    input: string,
    output: string
}

export interface IProblem extends Document {
    title: string,
    level: string,
    description: string,
    examples: string,
    constraints: string,
    testCases: ITestCase[],
    like?: number,
    dislike?: number,
    topics: string,
    companies?: string,
    similarQuestions: (Types.ObjectId[] | ISimilarQuestion[]),
    solutions: (Types.ObjectId[] | ISolution[]),
    createdAt?: Date,
    updatedAt?: Date,
}

const problemSchema = new Schema<IProblem>({
    title: {
        type: String,
        unique: true,
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
    testCases: [{
        input: {
            type: String,
            required: [true, "Input required"]
        },
        output: {
            type: String,
            required: [true, "Output required"]
        }
    }],
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
        type: Schema.Types.ObjectId,
        ref: "SimilarQuestion"
    }],
    solutions: [{
        type: Schema.Types.ObjectId,
        ref: "Solution"
    }]
}, {timestamps: true});

const Problem = models?.Problem || model<IProblem>("Problem", problemSchema);

export default Problem;