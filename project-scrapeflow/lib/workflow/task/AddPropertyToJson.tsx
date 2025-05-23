import { TaskParameterType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";
import {
  CodeIcon,
  DatabaseIcon,
  FileJson2Icon,
  GlobeIcon,
  LucideProps,
  MousePointerClick,
  TextIcon,
} from "lucide-react";

export const AddPropertyToJsonTask = {
  type: TaskType.ADD_PROPERTY_TO_JSON,
  label: "Add property to JSON",
  icon: (props) => <DatabaseIcon className="stroke-orange-400" {...props} />,
  isEntryPoint: false,
  credits: 1,
  inputs: [
    {
      name: "JSON",
      type: TaskParameterType.STRING,
      required: true,
    },
    {
      name: "Property name",
      type: TaskParameterType.STRING,
      required: true,
    },
    {
      name: "Property value",
      type: TaskParameterType.STRING,
      required: true,
    },
  ] as const,
  outputs: [{ name: "Updated JSON", type: TaskParameterType.STRING }] as const,
} satisfies WorkflowTask;
