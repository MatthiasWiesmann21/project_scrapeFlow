"use client";

import TooltipWrapper from "@/components/TooltipWrapper";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation";
import { ChevronLeftIcon, PenIcon, SquarePen, SquarePenIcon } from "lucide-react";
import SaveBtn from "./SaveBtn";
import ExecutebBtn from "./ExecutebBtn";
import NavigationTabs from "./NavigationTabs";
import PublishBtn from "./PublishBtn";
import UnpublishBtn from "./UnpublishBtn";
import TitleEditDialog from "./TitleEditDialog";

interface Props {
  title: string;
  subtitle?: string;
  workflowId: string;
  hideButtons?: boolean;
  isPublished?: boolean;
}

function Topbar({
  title,
  subtitle,
  workflowId,
  hideButtons = false,
  isPublished = false,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <header className="flex p-2 border-b-2 border-separate justify-between w-full h-[60px] sticky top-0 bg-background z-10">
      <div className="flex gap-1 flex-1">
        <TooltipWrapper content="Back">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ChevronLeftIcon size={20} />
          </Button>
        </TooltipWrapper>
        <div>
          <p className="font-bold text-ellipsis truncate">{title}</p>
          {subtitle && (
            <div className="flex items-center gap-1">
              <p className="text-muted-foreground text-ellipsis truncate text-xs">
                {subtitle}
              </p>
              {!pathname.includes('/workflow/runs/') && (
                <TitleEditDialog workflowId={workflowId} currentTitle={subtitle}>
                  <Button variant="ghost" size="icon" className="h-5 w-5 p-0">
                    <SquarePenIcon className="text-muted-foreground hover:text-primary" />
                  </Button>
                </TitleEditDialog>
              )}
            </div>
          )}
        </div>
      </div>
      <NavigationTabs workflowId={workflowId} />
      <div className="flex gap-1 flex-1 justify-end">
        {!hideButtons && (
          <>
            <ExecutebBtn workflowId={workflowId} />
            {isPublished && <UnpublishBtn workflowId={workflowId} />}
            {!isPublished && (
              <>
                <SaveBtn workflowId={workflowId} />
                <PublishBtn workflowId={workflowId} />
              </>
            )}
          </>
        )}
      </div>
    </header>
  );
}

export default Topbar;
