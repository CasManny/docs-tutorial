"use client";
import Link from "next/link";
import { HomeNavbar } from "./_components/home-navbar";
import { TemplateGallery } from "./_components/template-gallery";
import { usePaginatedQuery, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { HomeDocumentTable } from "./_components/home-document-table";

export default function Home() {
  const { results, status, loadMore } = usePaginatedQuery(
    api.documents.get,
    {},
    { initialNumItems: 5 }
  );
  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 right-0 left-0 z-10 h-16 bg-white">
        <HomeNavbar />
      </div>
      <div className="mt-16">
        <TemplateGallery />
        <HomeDocumentTable
          documents={results}
          loadMore={loadMore}
          status={status}
        />
      </div>
    </div>
  );
}
