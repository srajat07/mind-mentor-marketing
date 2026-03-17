import mongoose, { Schema, Document } from "mongoose";

export interface IBlog extends Document {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featuredImage?: string;
  category: mongoose.Types.ObjectId;
  tags: mongoose.Types.ObjectId[];
  status: "draft" | "published";
  author: {
    name: string;
    avatar: string;
  };
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    excerpt: { type: String },
    featuredImage: { type: String },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
    status: { 
      type: String, 
      enum: ["draft", "published"], 
      default: "draft" 
    },
    author: {
      name: { type: String, required: true },
      avatar: { type: String, required: true },
    },
    publishedAt: { type: Date },
  },
  { timestamps: true }
);

// Update publishedAt when status changes to 'published'
BlogSchema.pre("save", async function() {
  if (this.isModified("status") && this.status === "published" && !this.publishedAt) {
    this.publishedAt = new Date();
  }
});

export default mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);
