"use client";

import React from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { RunWorkflow } from "@/actions/workflows/runWorkflow";
import { Button } from "@/components/ui/button";
import { PlayIcon } from "lucide-react";

export default function RunBtn({ workflowId }: { workflowId: string }) {
    const mutation = useMutation({
        mutationFn: RunWorkflow,
        onSuccess: () => {
            toast.success("Workflow started", { id: workflowId });
        },
        onError: (error) => {
            toast.error("Something went wrong", { id: workflowId });
        },
    });
  return (
    <Button
      variant="outline"
      className="flex items-center gap-2"
      size="sm"
      disabled={mutation.isPending}
      onClick={() => {
        toast.loading("Scheduling run...", { id: workflowId });
        mutation.mutate({ workflowId });
      }}
    >
      <PlayIcon size={16} />
      Run
    </Button>
  );
}
