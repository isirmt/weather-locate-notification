'use client';
import React, { useState } from "react";
import { SidebarItem } from "./SiderbarItem";

const tabLinks = [
  {
    href: "/",
    node: <React.Fragment>
      <span className="i-tabler-home" />ホーム
    </React.Fragment>
  },
  {
    href: "/list",
    node: <React.Fragment>
      <span className="i-tabler-cloud" />一覧表示
    </React.Fragment>
  },
  {
    href: "/settings",
    node: <React.Fragment>
      <span className="i-tabler-settings" />設定
    </React.Fragment>
  },
]

export default function SidebarNavigation() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return <React.Fragment>
    <button
      title="Open Sidebar"
      onClick={() => setIsOpen(!isOpen)}
      className="fixed size-8 top-1 left-2 z-50 border rounded flex items-center justify-center hover:bg-gray-50 lg:hidden lg:pointer-events-none"
    >
      <span className="i-tabler-list-tree size-5" />
    </button>
    <aside className={`fixed top-0 left-0 z-40 w-64 h-screen lg:transition-none transition-transform -translate-x-full lg:translate-x-0 ${isOpen && "translate-x-0"}`}>
      <div className="h-full px-3 pt-14 pb-4 overflow-y-auto bg-gray-50">
        <ul>
          <li>
            {tabLinks.map((tabLink, i) => (
              <SidebarItem key={i} href={tabLink.href}>
                {tabLink.node}
              </SidebarItem>
            ))}
          </li>
        </ul>
      </div>
    </aside>
  </React.Fragment>
}