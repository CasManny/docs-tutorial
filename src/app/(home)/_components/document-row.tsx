import React from "react";
import { Doc } from "../../../../convex/_generated/dataModel";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  Building2Icon,
  CircleUser,
  DockIcon,
  MoreVerticalIcon,
} from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
interface DocumentRowProps {
  document: Doc<"documents">;
}

export const DocumentRow = ({ document }: DocumentRowProps) => {
  return (
    <TableRow className="cursor-pointer">
      <TableCell className="w-[50px] ">
        <DockIcon className="size-6 fill-blue-500" />
      </TableCell>
      <TableCell className="font-medium md:w-[45%]">{document.title}</TableCell>
      <TableCell className="text-muted-foreground hidden md:flex items-center gap-2">
        {document.organizationId ? (
          <Building2Icon className="size-4" />
        ) : (
          <CircleUser className="size-4" />
        )}
        {document.organizationId ? "Organization" : "Personal"}
      </TableCell>
      <TableCell className="text-muted-foreground hidden md:table-cell">
        {format(new Date(document._creationTime), "MMM dd, yyyy")}
      </TableCell>
      <TableCell className="flex justify-end">
        <Button variant={"ghost"} size={"icon"} className="rounded-full">
          <MoreVerticalIcon className="size-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
};
