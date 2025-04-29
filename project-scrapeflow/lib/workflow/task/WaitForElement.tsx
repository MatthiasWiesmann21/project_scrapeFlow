import { TaskParameterType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";
import { EyeIcon } from "lucide-react";

export const WaitForElementTask = {
  type: TaskType.WAIT_FOR_ELEMENT,
  label: "Wait for element",
  icon: (props) => <EyeIcon className="stroke-amber-400" {...props} />,
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
      name: "Visibility",
      type: TaskParameterType.SELECT,
      required: true,
      hideHandle: true,
      options: [
        {label: "Visible", value: "visible"},
        {label: "Hidden", value: "hidden"},
      ],
    },
  ] as const,
  outputs: [
    { name: "Web page", type: TaskParameterType.BROWSER_INSTANCE },
  ] as const,
} satisfies WorkflowTask;
