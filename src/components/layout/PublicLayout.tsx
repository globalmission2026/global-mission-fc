"use client";

import { usePathname } from "next/navigation";
import UtilityNav from "./UtilityNav";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <UtilityNav />
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
