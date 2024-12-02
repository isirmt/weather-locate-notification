import Link from "next/link";
import React from "react";

export function SidebarItem({ href, children }: { href: string, children: React.ReactNode }) {
  return <Link
    href={href}
    className="flex items-center justify-start gap-1 w-full border border-transparent hover:border-gray-200 hover:bg-gray-100 transition-colors px-2 py-1 rounded">
    {children}
  </Link>;
}