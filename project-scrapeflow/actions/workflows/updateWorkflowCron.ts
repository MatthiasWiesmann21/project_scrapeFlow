"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import parser from "cron-parser";

export async function updateWorkflowCron({
  id,
  cron
}: {
  id: string;
  cron: string;
}) {
  const { userId } = await auth()

  if (!userId) {
    throw new Error("Unauthorized");
  }

  try {
    const interval = parser.parseExpression(cron, { utc: true });
    await prisma.workflow.update({
      where: {
        id,
        userId,
      },
      data: {
        cron,
        nextRunAt: interval.next().toDate(),
      },
    });
  } catch (error:any) {
    console.error(error);
    throw new Error("Invalid cron expression");
  }

  revalidatePath("/workflows");
}
  