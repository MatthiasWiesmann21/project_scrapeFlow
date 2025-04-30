"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { WorkflowStatus } from "@/types/workflow";

export async function updateWorkflowTitle({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  try {
    const workflow = await prisma.workflow.findUnique({
      where: {
        id,
        userId,
      },
    });

    if (!workflow) {
      throw new Error("Workflow not found");
    }

    await prisma.workflow.update({
      where: {
        id,
        userId,
      },
      data: {
        name: title, // Using 'name' instead of 'title' based on the schema
      },
    });

    revalidatePath(`/workflow/editor/${id}`);
    revalidatePath(`/workflows`);
    
    return { success: true };
  } catch (error) {
    console.error("Error updating workflow title:", error);
    throw new Error("Failed to update workflow title");
  }
}
