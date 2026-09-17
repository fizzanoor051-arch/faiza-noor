
"use client";

import { useEffect, useState } from "react";

import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/footer/Footer";

export default function PortfolioChrome({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSecretAdmin, setIsSecretAdmin] = useState(false);

  useEffect(() => {
    const pathname = window.location.pathname;

    setIsSecretAdmin(
      pathname === "/secret-admin" ||
        pathname.startsWith("/secret-admin/")
    );
  }, []);

  if (isSecretAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />

      {children}

      <Footer />
    </>
  );
}
