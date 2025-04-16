"use client";

import { GetWorkflowExecutions } from "@/actions/workflows/getWorkflowExecutions";
import { useQuery } from "@tanstack/react-query";
import React from "react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"

type InitialData = Awaited<ReturnType<typeof GetWorkflowExecutions>>;

function ExecutionsTable({
  workflowId,
  initialData,
}: {
  workflowId: string;
  initialData: InitialData;
}) {
    const query = useQuery({
        queryKey: ["executions", workflowId],
        initialData,
        queryFn: () => GetWorkflowExecutions(workflowId),
    })
  return <div className="border rounded-lg shadow-sm overflow-auto">
    <Table className="h-full">
        <TableHeader className="bg-muted">
            <TableRow>
                <TableHead>Id</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Consumed</TableHead>
                <TableHead>Started at (desc)</TableHead>
            </TableRow>
        </TableHeader>
    </Table>
  </div>;
}

export default ExecutionsTable;
