"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function PrelineSetup() {
  const path = usePathname();

  useEffect(() => {
    import("preline/preline");
  }, []);

  useEffect(() => {
    setTimeout(() => {
      HSStaticMethods.autoInit();
    }, 100);
  }, [path]);

  return null;
}