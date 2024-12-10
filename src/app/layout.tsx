import React from 'react';
import './globals.css';
import Header from '@/components/Header';
import ReduxWrapper from '@/components/ReduxWrapper';
import Background from '@/components/background/Background';
import { OverlayProvider } from '@/components/overlay/OverlayProvider';
import SidebarNavigation from '@/components/sidebar/Navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Weather Notification',
  description: 'Notice in your computer',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ja' suppressHydrationWarning>
      <body className='flex h-screen flex-col overscroll-none'>
        <ReduxWrapper>
          <OverlayProvider>
            <Background />
            <Header />
            <SidebarNavigation />
            {children}
          </OverlayProvider>
        </ReduxWrapper>
      </body>
    </html>
  );
}
