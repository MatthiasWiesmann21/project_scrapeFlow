import { AppNodeMissingInputs, ScrapeFlowNode } from "@/types/scrapeFlowNode";
import {
  WorkflowExecutionPlan,
  WorkflowExecutionPlanPhase,
} from "@/types/workflow";
import { Edge, getIncomers } from "@xyflow/react";
import { TaskRegistry } from "./task/registry";

export enum FlowToExecutionPlanValidationError {
    "NO_ENTRY_POINT",
    "INVALID_INPUTS"
}

type FlowToExecutionPlanType = {
  executionPlan?: WorkflowExecutionPlan;
  error?: {
    type: FlowToExecutionPlanValidationError;
    invalidElements?: AppNodeMissingInputs[];
  }
};

export function FlowToExecutionPlan(
  nodes: ScrapeFlowNode[],
  edges: Edge[],
): FlowToExecutionPlanType {
  const entryPoint = nodes.find(
    (node) => TaskRegistry[node.data.type].isEntryPoint
  );

  if (!entryPoint) {
    return {
        error: {
            type: FlowToExecutionPlanValidationError.NO_ENTRY_POINT,
        }
    }
  }

  const inputWithErrors: AppNodeMissingInputs[] = [];
  const planned = new Set<string>();

  const invalidInputs = getInvalidInputs(entryPoint, edges, planned);
  if (invalidInputs.length > 0) {
    inputWithErrors.push({
      nodeId: entryPoint.id,
      inputs: invalidInputs,
    });
  }

  const executionPlan: WorkflowExecutionPlan = [
    {
      phase: 1,
      nodes: [entryPoint],
    },
  ];

  planned.add(entryPoint.id);

  for (
    let phase = 2;
    phase <= nodes.length && planned.size < nodes.length;
    phase++
  ) {
    const nextPhase: WorkflowExecutionPlanPhase = {
      phase,
      nodes: [],
    };
    for (const currentNode of nodes) {
      if (planned.has(currentNode.id)) continue;
      const invalidInputs = getInvalidInputs(currentNode, edges, planned);

      if (invalidInputs.length > 0) {
        const incomers = getIncomers(currentNode, nodes, edges);
        if (incomers.every((incomer) => planned.has(incomer.id))) {
          // If all incoming incomers/edges are planned and there are still invalid inputs
          // this means that this particular node has an invalid input
          // which means that the workflow is invalid
          console.error("Invalid inputs", currentNode.id, invalidInputs);
          inputWithErrors.push({
            nodeId: currentNode.id,
            inputs: invalidInputs,
          });
        } else {
          // Let's skip this node for now
          continue;
        }
      }

      nextPhase.nodes.push(currentNode);
    }
    for (const node of nextPhase.nodes) {
      planned.add(node.id);
    }
    executionPlan.push(nextPhase);
  }

  if(inputWithErrors.length > 0) {
    return {
      error: {
        type: FlowToExecutionPlanValidationError.INVALID_INPUTS,
        invalidElements: inputWithErrors
      }
    }
  }

  return { executionPlan };
}

function getInvalidInputs(
  node: ScrapeFlowNode,
  edges: Edge[],
  planned: Set<string>
) {
  const invalidInputs = [];
  const inputs = TaskRegistry[node.data.type].inputs;
  for (const input of inputs) {
    const inputValue = node.data.inputs?.[input.name];
    const inputsValueProvided = inputValue?.length > 0;
    if (inputsValueProvided) continue;

    const incomingEdges = edges.filter((edge) => edge.target === node.id);
    const inputLinkedToOutput = incomingEdges.find(
      (edge) => edge.targetHandle === input.name
    );

    const requiredInputProvidedByVisitedOutputs =
      input.required &&
      inputLinkedToOutput &&
      planned.has(inputLinkedToOutput.source);

      if (requiredInputProvidedByVisitedOutputs) {
        continue;
      } else if (!input.required) {
        if (!inputLinkedToOutput) continue;
        if (inputLinkedToOutput && planned.has(inputLinkedToOutput.source)) {
            // The output is providing a value to the input: the input is fine.
            continue;
        }
      }
      invalidInputs.push(input.name);
  }
  return invalidInputs;
}
