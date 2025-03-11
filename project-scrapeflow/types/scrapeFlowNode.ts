import { Node } from "@xyflow/react";
import { TaskParam, TaskType } from "./task";

export interface scrapeFlowNodeData {
    type: TaskType;
    inputs: Record<string, string>;
    [key: string]: any;
}

export interface ScrapeFlowNode extends Node {
    data: scrapeFlowNodeData;
}

export interface ParamProps {
    param: TaskParam;
    value: string;
    updateNodeParamValue: (newValue: string) => void;
}