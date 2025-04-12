"use client";
import Link from "next/link";
import { HomeNavbar } from "./_components/home-navbar";
import { TemplateGallery } from "./_components/template-gallery";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function Home() {
  const documents = useQuery(api.documents.get);
  if (documents === undefined) {
    return <p className="">Loading...</p>;
  }
  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 right-0 left-0 z-10 h-16 bg-white">
        <HomeNavbar />
      </div>
      <div className="mt-16">
        <TemplateGallery />
        {documents?.map((document) => (
          <span key={document._id}>{document.title}</span>
        ))}
      </div>
    </div>
  );
}
