import { TaskParameterType } from "@/types/task";

export const ColorForHandle: Record<TaskParameterType, string> = {
    STRING: "!bg-amber-400",
    BROWSER_INSTANCE: "!bg-sky-400",
    SELECT: "!bg-rose-400",
    CREDENTIAL: "!bg-teal-400",
};