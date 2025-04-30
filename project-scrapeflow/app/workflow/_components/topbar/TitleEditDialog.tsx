"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PenIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import CustomDialogHeader from "@/components/CustomDialogHeader";

interface TitleEditDialogProps {
  workflowId: string;
  currentTitle: string;
  children: React.ReactNode;
}

export default function TitleEditDialog({
  workflowId,
  currentTitle,
  children,
}: TitleEditDialogProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(currentTitle);

  const mutation = useMutation({
    mutationFn: async ({ id, title }: { id: string; title: string }) => {
      try {
        // Make a direct fetch request to the server action endpoint
        const response = await fetch(`/api/workflows/${id}/update-title`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title }),
        });
        
        if (!response.ok) {
          throw new Error('Failed to update title');
        }
        
        return await response.json();
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Title updated successfully", { id: "title-update" });
      // Force a refresh to update the UI
      window.location.reload();
    },
    onError: () => {
      toast.error("Failed to update title", { id: "title-update" });
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="px-0">
        <CustomDialogHeader title="Edit Workflow Title" icon={PenIcon} />
        <div className="p-6 space-y-4">
          <p className="text-muted-foreground text-sm">
            Enter a new title for your workflow.
          </p>
          <Input
            placeholder="Workflow Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
        </div>
        <DialogFooter className="px-6 gap-2">
          <DialogClose asChild>
            <Button variant={"secondary"} className="w-full">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              className="w-full"
              onClick={() => {
                if (title.trim() === "") {
                  toast.error("Title cannot be empty", { id: "title-update" });
                  return;
                }
                toast.loading("Updating title...", { id: "title-update" });
                mutation.mutate({ id: workflowId, title });
              }}
              disabled={mutation.isPending || title.trim() === ""}
            >
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
