import React from 'react';
import Link from 'next/link';

export function SidebarItem({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className='flex w-full items-center justify-start gap-1 rounded border border-transparent px-2 py-1 transition-colors hover:border-gray-200 hover:bg-gray-100'
    >
      {children}
    </Link>
  );
}
