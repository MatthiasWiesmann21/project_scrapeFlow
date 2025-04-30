import { TaskParameterType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";
import { CodeIcon, GlobeIcon, Link2Icon, LucideProps, MousePointerClick, TextIcon } from "lucide-react";

export const NavigateUrlTask = {
  type: TaskType.NAVIGATE_URL,
  label: "Navigate URL",
  icon: (props) => <Link2Icon className="stroke-orange-400" {...props} />,
  isEntryPoint: false,
  credits: 2,
  inputs: [
    {
      name: "Web page",
      type: TaskParameterType.BROWSER_INSTANCE,
      required: true,
    },
    {
      name: "URL",
      type: TaskParameterType.STRING,
      required: true,
    },
  ] as const,
  outputs: [
    { name: "Web page", type: TaskParameterType.BROWSER_INSTANCE },
  ] as const,
} satisfies WorkflowTask;
