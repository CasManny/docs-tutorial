import Link from "next/link";
import React from "react";
import { HomeSearchInput } from "./home-search-input";

export const HomeNavbar = () => {
  return (
    <nav className="flex items-center justify-between size-full p-4">
      <Link href={"/"}>LIveDocs</Link>
      <HomeSearchInput />
      <div />
    </nav>
  );
};
