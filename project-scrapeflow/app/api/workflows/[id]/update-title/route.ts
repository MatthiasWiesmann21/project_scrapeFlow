import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { title } = await request.json();

    if (!title || typeof title !== "string" || title.trim() === "") {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    const workflow = await prisma.workflow.findUnique({
      where: {
        id: params.id,
        userId,
      },
    });

    if (!workflow) {
      return NextResponse.json(
        { error: "Workflow not found" },
        { status: 404 }
      );
    }

    await prisma.workflow.update({
      where: {
        id: params.id,
        userId,
      },
      data: {
        name: title, // Using 'name' field based on the database schema
      },
    });

    // Revalidate the paths to ensure the UI updates
    revalidatePath(`/workflow/editor/${params.id}`);
    revalidatePath(`/workflows`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating workflow title:", error);
    return NextResponse.json(
      { error: "Failed to update workflow title" },
      { status: 500 }
    );
  }
}
