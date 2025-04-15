import { CloudSnowIcon, CloudUploadIcon, Loader } from "lucide-react";
import React, { useRef, useState } from "react";
import { Id } from "../../../../convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useDebounce } from "@/hooks/use-debounce";
import { useStatus } from "@liveblocks/react";

interface DocumentInputProps {
  title: string;
  id: Id<"documents">;
}

export const DocumentInput = ({ title, id }: DocumentInputProps) => {
  const [value, setValue] = useState(title);
  const [isError, setIsError] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const status = useStatus();

  const showLoader =
    isPending || status === "connecting" || status === "reconnecting";

  const showError = status === "disconnected";

  const inputRef = useRef<HTMLInputElement>(null);
  const mutate = useMutation(api.documents.updateById);

  const debounceUpdate = useDebounce((newValue: string) => {
    if (newValue === title) return;
    setIsPending(true);
    mutate({ id, title: newValue }).finally(() => setIsPending(false));
  }, 300);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    mutate({ id, title: value }).finally(() => setIsPending(false));
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    debounceUpdate(newValue);
  };

  return (
    <div className="flex items-center gap-2">
      {isEditing ? (
        <form onSubmit={handleSubmit} className="relative w-fit max-w-[50ch]">
          <span className="invisible whitespace-pre px-1.5 text-lg">
            {value || ""}
          </span>
          <input
            className="absolute inset-0 text-lg text-black px-1.5 bg-transparent truncate"
            type="text"
            ref={inputRef}
            value={value}
            onBlur={() => {
              setIsEditing(false);
            }}
            onChange={onChange}
          />
        </form>
      ) : (
        <>
          <span
            onClick={() => {
              setIsEditing(true);
              setTimeout(() => {
                inputRef.current?.focus();
              }, 0);
            }}
            className="text-lg px-1.5 cursor-pointer truncate"
          >
            {title ?? "Untitled document"}
          </span>
        </>
      )}
      {isError && <CloudSnowIcon className="size-4" />}
      {!showError && !showLoader && <CloudUploadIcon />}
      {showLoader && <Loader className="animate-spin size-4" />}
    </div>
  );
};
