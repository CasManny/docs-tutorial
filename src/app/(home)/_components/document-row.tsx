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
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { DocumentMenu } from "./document-menu";
import { useRouter } from "next/navigation";
interface DocumentRowProps {
  document: Doc<"documents">;
}

export const DocumentRow = ({ document }: DocumentRowProps) => {
  const router = useRouter();
  const onNewTabClick = (id: string) => {
    window.open(`/documents/${id}`, "_blank");
  };
  return (
    <TableRow
      className="cursor-pointer"
      onClick={() => router.push(`/documents/${document._id}`)}
    >
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
        <DocumentMenu
          documentId={document._id}
          title={document.title}
          onNewTab={onNewTabClick}
        />
      </TableCell>
    </TableRow>
  );
};
