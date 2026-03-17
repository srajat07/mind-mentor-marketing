"use server";

import dbConnect from "@/lib/mongodb";
import Questionnaire from "@/models/Questionnaire";
import { revalidatePath } from "next/cache";

/**
 * Fetch the questionnaire based on the requested status.
 */
export async function getQuizData(statusInput: string | string[]) {
  await dbConnect();
  // Ensure we are using a string even if an array is passed
  const status = Array.isArray(statusInput) ? statusInput[0] : statusInput;

  try {
    // Query by status only since we only have one questionnaire record per status
    const questionnaire = await Questionnaire.findOne({ status }).lean();

    if (!questionnaire) {
      console.log(`No questionnaire found for status: ${status}`);
    }

    return questionnaire ? JSON.parse(JSON.stringify(questionnaire)) : null;
  } catch (error) {
    console.error("Database Error:", error);
    return null;
  }
}

/**
 * Save the current state of the questionnaire as a DRAFT.
 */
export async function saveQuizDraft(nodes: any[], edges: any[]) {
  await dbConnect();
  try {
    const filter = { status: "DRAFT" };
    const update = {
      nodes,
      edges,
      updatedAt: new Date(),
    };

    const questionnaire = await Questionnaire.findOneAndUpdate(
      filter,
      update,
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    revalidatePath("/admin/editor");
    return { success: true, data: JSON.parse(JSON.stringify(questionnaire)) };
  } catch (error) {
    console.error("Error saving draft:", error);
    return { success: false, error: "Failed to save draft" };
  }
}

/**
 * Finalize the questionnaire and push it to the LIVE status.
 */
export async function publishQuizLive(nodes: any[], edges: any[]) {
  await dbConnect();
  try {
    // Server-side validation
    const hasStart = nodes.some(n => n.data?.isStart);
    const hasTerminal = nodes.some(n => n.type === "terminal");

    if (!hasStart || !hasTerminal) {
      return { success: false, error: "Questionnaire must have a START and a FINAL RESULT node." };
    }

    const startNode = nodes.find(n => n.data?.isStart);
    const terminalIds = new Set(nodes.filter(n => n.type === "terminal").map(n => n.id));
    const visited = new Set<string>();
    const queue = [startNode.id];
    let pathExists = false;

    while (queue.length > 0) {
      const current = queue.shift()!;
      if (visited.has(current)) continue;
      visited.add(current);
      if (terminalIds.has(current)) {
        pathExists = true;
        break;
      }
      edges.filter(e => e.source === current).forEach(e => queue.push(e.target));
    }

    if (!pathExists) {
      return { success: false, error: "No path exists from START to a FINAL RESULT node." };
    }

    // 1. Update/Save the Draft record first
    await saveQuizDraft(nodes, edges);

    // 2. Upsert the Published record
    const filter = { status: "PUBLISHED" };
    const update = {
      nodes,
      edges,
      updatedAt: new Date(),
    };

    const published = await Questionnaire.findOneAndUpdate(
      filter,
      update,
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    revalidatePath("/admin/editor");
    revalidatePath("/quiz");

    return { success: true, data: JSON.parse(JSON.stringify(published)) };
  } catch (error) {
    console.error("Error publishing quiz:", error);
    return { success: false, error: "Failed to publish quiz" };
  }
}

// Deprecated aliases for safety
export async function getQuestionnaire() { return getQuizData("DRAFT"); }
export async function saveDraft(nodes: any[], edges: any[]) { return saveQuizDraft(nodes, edges); }
export async function publishQuestionnaire() { return { success: false, error: "Use publishQuizLive instead" }; }
