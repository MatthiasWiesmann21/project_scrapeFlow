"use client";

import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { Separator } from "./ui/separator";

interface Props {
  icon?: LucideIcon;
  title?: string;
  subTitle?: string;

  iconClassName?: string;
  titleClassName?: string;
  subTitleClassName?: string;
}

function CustomDialogHeader(props: Props) {
  return (
    <DialogHeader className="py-6">
      <DialogTitle className="flex flex-col items-center gap-2 mb-2">
        {props.icon && <props.icon size={30} className={cn("stroke-primary", props.iconClassName)} />}
        {props.title && <p className={cn("text-xl text-primary", props.titleClassName)}>{props.title}</p>}
        {props.subTitle && <p className={cn("text-muted-foreground text-sm", props.subTitleClassName)}>{props.subTitle}</p>}
      </DialogTitle>
      <Separator />
    </DialogHeader>
  );
}

export default CustomDialogHeader;