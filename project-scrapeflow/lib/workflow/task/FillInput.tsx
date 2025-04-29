import { TaskParameterType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";
import { Edit3Icon } from "lucide-react";

export const FillInputTask = {
  type: TaskType.FILL_INPUT,
  label: "Fill input",
  icon: (props) => <Edit3Icon className="stroke-orange-400" {...props} />,
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
    {
      name: "Value",
      type: TaskParameterType.STRING,
      required: true,
    },
  ] as const,
  outputs: [
    { name: "Web page", type: TaskParameterType.BROWSER_INSTANCE },
  ] as const,
} satisfies WorkflowTask;
