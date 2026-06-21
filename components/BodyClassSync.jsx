"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function BodyClassSync() {
  const pathname = usePathname();

  useEffect(() => {
    document.body.classList.toggle("admin-body", pathname === "/admin");
    document.body.classList.toggle("shop-page", pathname === "/shop");
    return () => {
      document.body.classList.remove("admin-body", "shop-page");
    };
  }, [pathname]);

  return null;
}
