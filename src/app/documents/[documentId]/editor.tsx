"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import BulletList from "@tiptap/extension-bullet-list";
import TextStyle from "@tiptap/extension-text-style";
import ImageResize from "tiptap-extension-resize-image";
import Link from "@tiptap/extension-link";
import { Color } from "@tiptap/extension-color";
import Image from "@tiptap/extension-image";
import FontFamily from "@tiptap/extension-font-family";
import TextAlign from "@tiptap/extension-text-align";
import Table from "@tiptap/extension-table";
import Highlight from "@tiptap/extension-highlight";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import Underline from "@tiptap/extension-underline";
import TableRow from "@tiptap/extension-table-row";
import { useEditorStore } from "@/store/use-editor-store";
import { FontSizeExtension } from "@/extensions/font-size";
import { LineHeightExtension } from "@/extensions/line-height";

import {
  useLiveblocksExtension,
  FloatingToolbar,
} from "@liveblocks/react-tiptap";
import { Ruler } from "./ruler";
import { Threads } from "./threads";
import { useStorage } from "@liveblocks/react";

export const Editor = () => {
  const liveblocks = useLiveblocksExtension();
  const rightMargin = useStorage((root) => root.rightMargin)
  const leftMargin = useStorage((root) => root.leftMargin)
  const { setEditor } = useEditorStore();
  const editor = useEditor({
    immediatelyRender: false,
    onCreate({ editor }) {
      setEditor(editor);
    },
    onDestroy() {
      setEditor(null);
    },
    onUpdate() {
      setEditor(editor);
    },
    onSelectionUpdate() {
      setEditor(editor);
    },
    onTransaction() {
      setEditor(editor);
    },
    onFocus() {
      setEditor(editor);
    },
    onBlur() {
      setEditor(editor);
    },
    onContentError() {
      setEditor(editor);
    },
    editorProps: {
      attributes: {
        style: `padding-left: ${leftMargin ?? 56}px; padding-right: ${rightMargin ?? 56}px`,
        class:
          "focus:outline-none print:border-0 bg-white border border-[#C7C7C7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text",
      },
    },
    extensions: [
      liveblocks,
      StarterKit.configure({
        history: false,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right", "justify"],
      }),
      TaskItem.configure({ nested: true }),
      TaskList,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      Color,
      BulletList,
      OrderedList,
      ListItem,
      TableCell,
      Image,
      ImageResize,
      Underline,
      FontFamily,
      FontSizeExtension,
      LineHeightExtension.configure({
        types: ["heading", "paragraph"],
      }),
      TextStyle,
      Highlight.configure({ multicolor: true }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
      }),
    ],
    // content: "",
  });

  return (
    <div className="size-full overflow-x-auto bg-[#F9FBFD] px-4 print:p-0 print:bg-white print:overflow-visible">
      <Ruler />
      <div className="min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0">
        <EditorContent editor={editor} />
        <Threads editor={editor} />
      </div>
    </div>
  );
};
