import Link from "next/link";
import { HomeNavbar } from "./_components/home-navbar";
import { TemplateGallery } from "./_components/template-gallery";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 right-0 left-0 z-10 h-16 bg-white">
        <HomeNavbar />
      </div>
      <div className="mt-16">
       <TemplateGallery />
      </div>
    </div>
  );
}
