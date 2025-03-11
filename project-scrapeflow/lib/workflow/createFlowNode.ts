import { ScrapeFlowNode } from "@/types/scrapeFlowNode";
import { TaskType } from "@/types/task";

export function CreateFlowNode(
    nodeType: TaskType,
    position?: {x: number; y: number}
): ScrapeFlowNode {
    return {
        id: crypto.randomUUID(),
        type: "ScrapeFlowNode",
        dragHandle: ".drag-handle",
        data: {
            type: nodeType,
            inputs: {},
        },
        position: position ?? {x: 0, y: 0},
    }
}