import { TaskParameterType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";
import { ArrowUpIcon } from "lucide-react";

export const ScrollToElementTask = {
  type: TaskType.SCROLL_TO_ELEMENT,
  label: "Scroll to element",
  icon: (props) => <ArrowUpIcon className="stroke-orange-400" {...props} />,
  isEntryPoint: false,
  credits: 1,
  inputs: [
    {
      name: "Web page",
      type: TaskParameterType.BROWSER_INSTANCE,
      required: true,
    },
    {
      name: "Selector",
      type: TaskParameterType.STRING,
      required: true,
    },
  ] as const,
  outputs: [
    { name: "Web page", type: TaskParameterType.BROWSER_INSTANCE },
  ] as const,
} satisfies WorkflowTask;
