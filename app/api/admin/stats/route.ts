import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Blog from "@/models/Blog";
import Questionnaire from "@/models/Questionnaire";

export async function GET() {
  try {
    await dbConnect();

    // Fetch counts concurrently for better performance
    const [blogCount, quizCount] = await Promise.all([
      Blog.countDocuments(),
      Questionnaire.countDocuments()
    ]);

    return NextResponse.json({ 
      blogCount, 
      quizCount 
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats", blogCount: 0, quizCount: 0 },
      { status: 500 }
    );
  }
}
