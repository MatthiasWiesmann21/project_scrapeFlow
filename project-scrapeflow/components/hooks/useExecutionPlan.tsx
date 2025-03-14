import { FlowToExecutionPlan } from "@/lib/workflow/executionPlan";
import { ScrapeFlowNode } from "@/types/scrapeFlowNode";
import { useReactFlow } from "@xyflow/react";
import { useCallback } from "react";

const useExecutionPlan = () => {
    const {toObject} = useReactFlow();

    const generateExecutionPlan = useCallback(() => {
        const { nodes, edges } = toObject();
        const { executionPlan } = FlowToExecutionPlan(nodes as ScrapeFlowNode[], edges)
        return executionPlan;
    }, [toObject]);
    return generateExecutionPlan;
};

export default useExecutionPlan;