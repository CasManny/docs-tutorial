"use client";

import { useMutation } from "convex/react";
import React, { useState } from "react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface RenameDialogProps {
  documentId: Id<"documents">;
  children: React.ReactNode;
  initialTitle: string;
}

export const RenameDialog = ({
  documentId,
  children,
  initialTitle,
}: RenameDialogProps) => {
  const [isRenaming, setIsRenaming] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [open, setOpen] = useState(false);
  const rename = useMutation(api.documents.updateById);

  const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsRenaming(true);
    rename({ id: documentId, title: title.trim() || "untitled" }).finally(
      () => {
        setIsRenaming(false);
        setOpen(false);
      }
    );
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent onClick={(e) => e.stopPropagation()}>
        <form className="" onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Rename document</DialogTitle>
            <DialogDescription>
              Enter a new name for this document
            </DialogDescription>
          </DialogHeader>
          <div className="my-4">
            <Input
              value={title}
              placeholder="document name"
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
              }}
              type="button"
              variant={"ghost"}
              disabled={isRenaming}
            >
              cancel
            </Button>
            <Button
              type="submit"
              disabled={isRenaming}
              onClick={(e) => e.stopPropagation()}
            >
              save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
