import { TaskParameterType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";
import { CodeIcon, GlobeIcon, LucideProps, MousePointerClick, SendIcon, TextIcon } from "lucide-react";

export const DeliverViaWebhookTask = {
  type: TaskType.DELIVER_VIA_WEBHOOK,
  label: "Deliver via webhook",
  icon: (props) => <SendIcon className="stroke-blue-400" {...props} />,
  isEntryPoint: false,
  credits: 1,
  inputs: [
    {
      name: "Target URL",
      type: TaskParameterType.STRING,
      required: true,
    },
    {
      name: "Body",
      type: TaskParameterType.STRING,
      required: true,
    },
  ] as const,
  outputs: [] as const,
} satisfies WorkflowTask;
