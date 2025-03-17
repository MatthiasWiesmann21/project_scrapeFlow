"use client";

import { GetWorkflowExecutionWithPhases } from "@/actions/workflows/getWorkflowExecutionWithPhases";
import React from "react";

type ExecutionData = Awaited<typeof GetWorkflowExecutionWithPhases>;
function ExecutionViewer({ execution }: { execution: ExecutionData }) {
  return <div>ExecutionViewer</div>;
}

export default ExecutionViewer;
