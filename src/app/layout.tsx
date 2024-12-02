import type { Metadata } from "next";
import "./globals.css";
import SidebarNavigation from "@/components/sidebar/Navigation";
import Header from "@/components/Header";
import Background from "@/components/background/Background";
import ReduxWrapper from "@/components/ReduxWrapper";
import { OverlayProvider } from "@/components/overlay/OverlayProvider";

export const metadata: Metadata = {
  title: "Weather Notification",
  description: "Notice in your computer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className="flex flex-col h-screen overscroll-none">
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
