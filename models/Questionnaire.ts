import mongoose, { Schema, Document } from "mongoose";

export interface IQuestionnaire extends Document {
  title: string;
  status: "draft" | "published";
  nodes: any[];
  edges: any[];
  createdAt: Date;
  updatedAt: Date;
}

const QuestionnaireSchema: Schema = new Schema(
  {
    title: { type: String, required: true, default: "Personalized AI Learning Path" },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    nodes: { type: Array, default: [] },
    edges: { type: Array, default: [] },
  },
  { timestamps: true }
);

export default mongoose.models.Questionnaire ||
  mongoose.model<IQuestionnaire>("Questionnaire", QuestionnaireSchema);
