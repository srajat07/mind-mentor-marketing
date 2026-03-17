"use server";

import dbConnect from "@/lib/mongodb";
import Questionnaire from "@/models/Questionnaire";
import { revalidatePath } from "next/cache";

export async function getQuestionnaire() {
  await dbConnect();
  const questionnaire = await Questionnaire.findOne().sort({ createdAt: -1 });
  return questionnaire ? JSON.parse(JSON.stringify(questionnaire)) : null;
}

export async function saveDraft(nodes: any[], edges: any[]) {
  await dbConnect();
  
  // We keep a single questionnaire for now as per requirements
  let questionnaire = await Questionnaire.findOne();
  
  if (!questionnaire) {
    questionnaire = await Questionnaire.create({
      title: "MindMentor Learning Path",
      status: "draft",
      nodes,
      edges,
    });
  } else {
    questionnaire.nodes = nodes;
    questionnaire.edges = edges;
    questionnaire.status = "draft";
    await questionnaire.save();
  }
  
  revalidatePath("/admin/quiz");
  return JSON.parse(JSON.stringify(questionnaire));
}

export async function publishQuestionnaire() {
  await dbConnect();
  const questionnaire = await Questionnaire.findOne();
  if (questionnaire) {
    questionnaire.status = "published";
    await questionnaire.save();
    revalidatePath("/admin/quiz");
    revalidatePath("/quiz"); // For the public quiz page later
    return JSON.parse(JSON.stringify(questionnaire));
  }
  return null;
}
