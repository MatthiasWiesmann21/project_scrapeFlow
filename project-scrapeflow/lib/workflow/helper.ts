import { ScrapeFlowNode } from "@/types/scrapeFlowNode";
import { TaskRegistry } from "./task/registry";

export function CalculateWorkflowCost(nodes: ScrapeFlowNode[]) {
    return nodes.reduce((acc, node) => {
        return acc + TaskRegistry[node.data.type].credits;
    }, 0);
}