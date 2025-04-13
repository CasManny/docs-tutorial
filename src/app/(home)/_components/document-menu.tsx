import React from "react";
import { Id } from "../../../../convex/_generated/dataModel";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  ExternalLinkIcon,
  MoreVerticalIcon,
  PenIcon,
  TrashIcon,
} from "lucide-react";
import { RemoveDialog } from "@/components/remove-dialog";
import { RenameDialog } from "@/components/rename-dialog";

interface DocumentMenuProps {
  documentId: Id<"documents">;
  title: string;
  onNewTab: (id: Id<"documents">) => void;
}

export const DocumentMenu = ({
  documentId,
  title,
  onNewTab,
}: DocumentMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} size={"icon"}>
          <MoreVerticalIcon className="size-4 rounded-full" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <RemoveDialog documentId={documentId}>
          <DropdownMenuItem
            onClick={(e) => e.stopPropagation()}
            onSelect={(e) => e.preventDefault()}
          >
            <TrashIcon className="size-4" />
            Remove
          </DropdownMenuItem>
        </RemoveDialog>
        <RenameDialog documentId={documentId} initialTitle={document.title}>
          <DropdownMenuItem
            onClick={(e) => e.stopPropagation()}
            onSelect={(e) => e.preventDefault()}
          >
            <PenIcon className="size-4" />
            Edit
          </DropdownMenuItem>
        </RenameDialog>
        <DropdownMenuItem onClick={() => onNewTab(documentId)}>
          <ExternalLinkIcon className="size-4" />
          Open in a new tab
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
