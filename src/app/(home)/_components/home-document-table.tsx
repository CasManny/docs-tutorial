import React from "react";
import { Doc } from "../../../../convex/_generated/dataModel";
import { PaginationStatus } from "convex/react";
import { LoaderIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DocumentRow } from "./document-row";
import { Button } from "@/components/ui/button";

interface HomeDocumentTableProps {
  documents: Doc<"documents">[] | undefined;
  loadMore: (numItems: number) => void;
  status: PaginationStatus;
}

export const HomeDocumentTable = ({
  documents,
  loadMore,
  status,
}: HomeDocumentTableProps) => {
  return (
    <div className="max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-5">
      {documents === undefined ? (
        <div className="flex justify-center items-center h-24">
          <LoaderIcon className="animate-spin text-muted-foreground size-5" />
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-tranparent border-none">
              <TableHead>Name</TableHead>
              <TableHead>&nbsp;</TableHead>
              <TableHead className="hidden md:table-cell">Shared</TableHead>
              <TableHead className="hidden md:table-cell">created_at</TableHead>
            </TableRow>
          </TableHeader>
          {documents.length === 0 ? (
            <TableBody>
              <TableRow className="hover:bg-transparent border-none">
                <TableCell
                  colSpan={4}
                  className="h-24 text-center text-muted-foreground"
                >
                  No documents Found
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {documents.map((document) => (
                <DocumentRow key={document._id} document={document} />
              ))}
            </TableBody>
          )}
        </Table>
      )}
      <div className="flex items-center justify-center">
        <Button
          variant={"ghost"}
          size={"sm"}
          onClick={() => loadMore(5)}
          disabled={status !== "CanLoadMore"}
        >
          {status === "LoadingMore" ? "Load more" : "End of results"}
        </Button>
      </div>
    </div>
  );
};
