import Link from "next/link";
import React from "react";
import { HomeSearchInput } from "./home-search-input";
import { UserButton, OrganizationSwitcher } from "@clerk/nextjs";

export const HomeNavbar = () => {
  return (
    <nav className="flex items-center justify-between size-full p-4">
      <Link href={"/"}>LIveDocs</Link>
      <HomeSearchInput />
      <div className="flex gap-3 items-center pl-6">
        <UserButton />
        <OrganizationSwitcher
          afterCreateOrganizationUrl={"/"}
          afterLeaveOrganizationUrl="/"
          afterSelectOrganizationUrl={"/"}
          afterSelectPersonalUrl={"/"}
        />
      </div>
    </nav>
  );
};
