"use client";
import Link from "next/link";
import React from "react";
import { DocumentInput } from "./document-input";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  BoldIcon,
  FileArchive,
  FileIcon,
  FileJsonIcon,
  FilePenIcon,
  FilePlusIcon,
  FileText,
  GlobeIcon,
  ItalicIcon,
  PrinterIcon,
  RedoIcon,
  RemoveFormattingIcon,
  StrikethroughIcon,
  TextIcon,
  TrashIcon,
  Underline,
  Undo2Icon,
} from "lucide-react";
import { useEditorStore } from "@/store/use-editor-store";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { Avatars } from "./avatars";
import { Inbox } from "./inbox";
import { Doc } from "../../../../convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import { RenameDialog } from "@/components/rename-dialog";
import { RemoveDialog } from "@/components/remove-dialog";
interface NavbarProps {
  data: Doc<"documents">;
}

export const Navbar = ({ data }: NavbarProps) => {
  const { editor } = useEditorStore();
  const router = useRouter();
  const insertTable = ({ rows, cols }: { rows: number; cols: number }) => {
    editor
      ?.chain()
      .focus()
      .insertTable({ rows, cols, withHeaderRow: false })
      .run();
  };
  const onDownload = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
  };
  const onSaveJSON = () => {
    if (!editor) return;
    const content = editor.getJSON();
    const blob = new Blob([JSON.stringify(content)], {
      type: "application/json",
    });
    onDownload(blob, `${data.title}.json`);
  };
  const onSaveHTML = () => {
    if (!editor) return;
    const content = editor.getHTML();
    const blob = new Blob([content], {
      type: "text/html",
    });
    onDownload(blob, `${data.title}.html`);
  };
  const onSaveText = () => {
    if (!editor) return;
    const content = editor.getText();
    const blob = new Blob([content], {
      type: "text/plain",
    });
    onDownload(blob, `${data.title}.txt`);
  };

  const mutation = useMutation(api.documents.create);
  const onNewDocument = () => {
    mutation({ title: "Untitled Document", initialContent: "" }).then((id) => {
      router.push(`/documents/${id}`);
    });
  };

  return (
    <nav className="flex items-center">
      <Link href={"/"} className="">
        LiveDocs
      </Link>
      <div className="flex flex-col">
        <DocumentInput title={data.title} id={data._id} />
        <div className="flex">
          <Menubar className="border-none bg-transparent shadow-none h-auto p-0">
            <MenubarMenu>
              <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                File
              </MenubarTrigger>
              <MenubarContent className="print:hidden">
                <MenubarSub>
                  <MenubarSubTrigger>
                    <FileIcon className="size-4 mr-2" />
                    Save
                  </MenubarSubTrigger>
                  <MenubarSubContent>
                    <MenubarItem onClick={onSaveJSON}>
                      <FileJsonIcon className="size-4 mr-2" />
                      JSON
                    </MenubarItem>
                    <MenubarItem onClick={onSaveHTML}>
                      <GlobeIcon className="size-4 mr-2" />
                      HTML
                    </MenubarItem>
                    <MenubarItem onClick={() => window.print()}>
                      <FileArchive className="size-4 mr-2" />
                      PDF
                    </MenubarItem>
                    <MenubarItem onClick={onSaveText}>
                      <FileText className="size-4 mr-2" />
                      Text
                    </MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>
                <MenubarItem onClick={onNewDocument}>
                  <FilePlusIcon className="size-4 mr-2" />
                  New Document
                </MenubarItem>
                <MenubarSeparator />
                <RenameDialog documentId={data._id} initialTitle="">
                  <MenubarItem
                    onSelect={(e) => {
                      e.preventDefault();
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <FilePenIcon className="size-4 mr-2" />
                    Rename
                  </MenubarItem>
                </RenameDialog>
                <RemoveDialog documentId={data._id}>
                  <MenubarItem>
                    <TrashIcon className="size-4 mr-2" />
                    Remove
                  </MenubarItem>
                </RemoveDialog>
                <MenubarSeparator />
                <MenubarItem onClick={() => window.print()}>
                  <PrinterIcon className="size-4 mr-2" />
                  Print
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                Edit
              </MenubarTrigger>
              <MenubarContent>
                <MenubarItem
                  onClick={() => editor?.chain().focus().undo().run()}
                >
                  <Undo2Icon className="size-4 mr-2" />
                  Undo
                  <MenubarShortcut>⌘Z</MenubarShortcut>
                </MenubarItem>
                <MenubarItem
                  onClick={() => editor?.chain().focus().redo().run()}
                >
                  <RedoIcon className="size-4 mr-2" />
                  Redo
                  <MenubarShortcut>⇧⌘Z</MenubarShortcut>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                Insert
              </MenubarTrigger>
              <MenubarContent>
                <MenubarSub>
                  <MenubarSubTrigger>Table</MenubarSubTrigger>
                  <MenubarSubContent>
                    <MenubarItem
                      onClick={() => insertTable({ rows: 1, cols: 1 })}
                    >
                      {" "}
                      1 X 1
                    </MenubarItem>
                    <MenubarItem
                      onClick={() => insertTable({ rows: 2, cols: 2 })}
                    >
                      {" "}
                      2 X 2
                    </MenubarItem>
                    <MenubarItem
                      onClick={() => insertTable({ rows: 3, cols: 3 })}
                    >
                      {" "}
                      3 X 3
                    </MenubarItem>
                    <MenubarItem
                      onClick={() => insertTable({ rows: 4, cols: 4 })}
                    >
                      {" "}
                      4 X 4
                    </MenubarItem>
                    <MenubarItem
                      onClick={() => insertTable({ rows: 5, cols: 5 })}
                    >
                      {" "}
                      5 X 5
                    </MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                Format
              </MenubarTrigger>
              <MenubarContent>
                <MenubarSub>
                  <MenubarSubTrigger>
                    <TextIcon className="size-4 mr-2" />
                    Text
                  </MenubarSubTrigger>
                  <MenubarSubContent>
                    <MenubarItem
                      onClick={() => editor?.chain().focus().toggleBold().run()}
                    >
                      <BoldIcon className="size-4 mr-2" />
                      Bold
                    </MenubarItem>
                    <MenubarItem
                      onClick={() =>
                        editor?.chain().focus().toggleItalic().run()
                      }
                    >
                      <ItalicIcon className="size-4 mr-2" />
                      Italic
                    </MenubarItem>
                    <MenubarItem
                      onClick={() =>
                        editor?.chain().focus().toggleUnderline().run()
                      }
                    >
                      <Underline className="size-4 mr-2" />
                      Underline
                    </MenubarItem>
                    <MenubarItem
                      onClick={() =>
                        editor?.chain().focus().toggleStrike().run()
                      }
                    >
                      <StrikethroughIcon className="size-4 mr-2" />
                      <span className="">strikethrough&nbsp;&nbsp;</span>
                    </MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>
                <MenubarItem
                  onClick={() => editor?.chain().focus().unsetAllMarks().run()}
                >
                  <RemoveFormattingIcon className="size-4 mr-2" />
                  Clear Formatting
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      </div>
      <div className="flex gap-3 ml-auto items-center pl-6">
        <Avatars />
        <Inbox />
        <OrganizationSwitcher
          afterCreateOrganizationUrl={"/"}
          afterLeaveOrganizationUrl="/"
          afterSelectOrganizationUrl={"/"}
          afterSelectPersonalUrl={"/"}
        />
        <UserButton />
      </div>
    </nav>
  );
};
