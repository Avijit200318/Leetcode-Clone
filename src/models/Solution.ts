import { Document, model, models, Schema, Types } from "mongoose";

export interface ISolution extends Document {
  userId: Types.ObjectId,
  problemId: Types.ObjectId,
  tags: string[],
  title: string,
  explanation: string,
  sourceCode: string,
  createdAt?: Date,
  updatedAt?: Date
}

const solutionSchema = new Schema<ISolution>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User id required"]
  },
  problemId: {
    type: Schema.Types.ObjectId,
    ref: "Problem",
    required: [true, "Problem id required"]
  },
  tags: [{
    type: String,
    required: [true, "Tags are required"]
  }],
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true
  },
  explanation: {
    type: String,
    required: [true, "Explanation is required"]
  },
  sourceCode: {
    type: String,
    required: [true, "Code is required"]
  }
}, { timestamps: true });

const Solution = models?.Solution || model<ISolution>("Solution", solutionSchema);

export default Solution;