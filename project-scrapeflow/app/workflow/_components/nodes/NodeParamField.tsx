"use client";

import { Input } from "@/components/ui/input";
import { TaskParam, TaskParameterType } from "@/types/task";
import React, { useCallback } from "react";
import StringParam from "./param/StringParam";
import { useReactFlow } from "@xyflow/react";
import { ScrapeFlowNode } from "@/types/scrapeFlowNode";

function NodeParamField({
  param,
  nodeId,
}: {
  param: TaskParam;
  nodeId: string;
}) {
  const { updateNodeData, getNode } = useReactFlow();
  const node = getNode(nodeId) as ScrapeFlowNode;
  const value = node?.data.inputs?.[param.name];
  const updateNodeParamValue = useCallback((newValue: string) => {
    updateNodeData(nodeId, {
      inputs: {
        ...node?.data.inputs,
        [param.name]: newValue,
      },
    });
  }, [updateNodeData, nodeId, param.name, node?.data.inputs]);
  switch (param.type) {
    case TaskParameterType.STRING:
      return <StringParam param={param} value={value} updateNodeParamValue={updateNodeParamValue} />;
    default:
      return (
        <div className="w-full">
          <p className="text-xs text-muted-foreground">Not implemented</p>
        </div>
      );
  }
}

export default NodeParamField;
