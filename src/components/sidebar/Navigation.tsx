'use client';
import Link from "next/link";
import React, { useState } from "react";

export default function SidebarNavigation() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return <React.Fragment>
    <button
      title="Open Sidebar"
      onClick={() => setIsOpen(!isOpen)}
      className="fixed size-8 top-1 left-2 z-50 border rounded flex items-center justify-center hover:bg-gray-50"
    >
      <span className="i-tabler-list-tree size-5" />
    </button>
    <aside className={`fixed top-0 left-0 z-40 w-64 h-screen lg:transition-none transition-transform -translate-x-full lg:translate-x-0 ${isOpen && "translate-x-0"}`}>
      <div className="h-full px-3 pt-14 pb-4 overflow-y-auto bg-gray-50">
        <ul>
          <li>
            <Link
              href="/"
              className="block w-full border border-transparent hover:border-gray-200 hover:bg-gray-100 transition-colors px-2 py-1 rounded">
              HOME
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  </React.Fragment>
}