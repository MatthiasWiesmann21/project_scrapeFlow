import { TaskParameterType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";
import { BrainIcon, CodeIcon, GlobeIcon, LucideProps, MousePointerClick, TextIcon } from "lucide-react";

export const ExtractDataWithAITask = {
  type: TaskType.EXTRACT_DATA_WITH_AI,
  label: "Extract data with AI",
  icon: (props) => <BrainIcon className="stroke-rose-400" {...props} />,
  isEntryPoint: false,
  credits: 4,
  inputs: [
    {
      name: "Content",
      type: TaskParameterType.STRING,
      required: true,
    },
    {
      name: "Credentials",
      type: TaskParameterType.CREDENTIAL,
      required: true,
    },
    {
      name: "Prompt",
      type: TaskParameterType.STRING,
      required: true,
      variant: "textarea",
    },
  ] as const,
  outputs: [
    { name: "Extracted data", type: TaskParameterType.STRING },
  ] as const,
} satisfies WorkflowTask;
