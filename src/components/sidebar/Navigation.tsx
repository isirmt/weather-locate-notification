'use client';
import React, { useState } from 'react';
import { SidebarItem } from './SiderbarItem';

const tabLinks = [
  {
    href: '/',
    node: (
      <React.Fragment>
        <span className='i-tabler-home' />
        ホーム
      </React.Fragment>
    ),
  },
  {
    href: '/list',
    node: (
      <React.Fragment>
        <span className='i-tabler-cloud' />
        一覧表示
      </React.Fragment>
    ),
  },
  {
    href: '/settings',
    node: (
      <React.Fragment>
        <span className='i-tabler-settings' />
        設定
      </React.Fragment>
    ),
  },
];

export default function SidebarNavigation() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <React.Fragment>
      <button
        title='Open Sidebar'
        onClick={() => setIsOpen(!isOpen)}
        className='fixed left-2 top-1 z-50 flex size-8 items-center justify-center rounded border hover:bg-gray-50 lg:pointer-events-none lg:hidden'
      >
        <span className='i-tabler-list-tree size-5' />
      </button>
      <aside
        className={`fixed left-0 top-0 z-40 h-screen w-64 -translate-x-full transition-transform lg:translate-x-0 lg:transition-none ${isOpen && 'translate-x-0'}`}
      >
        <div className='h-full overflow-y-auto bg-gray-50 px-3 pb-4 pt-14'>
          <ul>
            <li>
              {tabLinks.map((tabLink, i) => (
                <SidebarItem onClick={() => setIsOpen(false)} key={i} href={tabLink.href}>
                  {tabLink.node}
                </SidebarItem>
              ))}
            </li>
          </ul>
        </div>
      </aside>
    </React.Fragment>
  );
}
