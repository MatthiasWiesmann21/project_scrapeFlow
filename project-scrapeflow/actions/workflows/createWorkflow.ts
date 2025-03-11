"use server";

import prisma from "@/lib/prisma";
import { createWorkflowSchema, createWorkflowSchemaType } from "@/schema/workflow";
import { WorkflowStatus } from "@/types/workflow";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function CreateWorkflow(form: createWorkflowSchemaType) {
    const {success} = createWorkflowSchema.safeParse(form);
    if (!success) {
        throw new Error("Invalid form data");
    }

    const {userId} = await auth();

    if (!userId) {
        throw new Error("Unauthorized");
    }

    const result = await prisma.workflow.create({
        data: {
            userId,
            status: WorkflowStatus.DRAFT,
            definition: "TODO",
            name: form.name,
            description: form.description || "",
        },
    });

    if (!result) {
        throw new Error("Failed to create workflow");
    }

    redirect(`/workflows/editor/${result.id}`);
}