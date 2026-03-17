import mongoose, { Schema, Document } from "mongoose";

export interface IQuestionnaire extends Document {
  title: string;
  status: "DRAFT" | "PUBLISHED";
  nodes: any[];
  edges: any[];
  createdAt: Date;
  updatedAt: Date;
}

const QuestionnaireSchema: Schema = new Schema(
  {
    title: { type: String, required: true, default: "Personalized AI Learning Path" },
    status: { type: String, enum: ["DRAFT", "PUBLISHED"], default: "DRAFT" },
    nodes: { type: [Schema.Types.Mixed], default: [] },
    edges: { type: [Schema.Types.Mixed], default: [] },
  },
  { timestamps: true }
);

export default mongoose.models.Questionnaire ||
  mongoose.model<IQuestionnaire>("Questionnaire", QuestionnaireSchema);
