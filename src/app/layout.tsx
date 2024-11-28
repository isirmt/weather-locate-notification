import type { Metadata } from "next";
import "./globals.css";
import SidebarNavigation from "@/components/sidebar/Navigation";
import Header from "@/components/Header";
import Background from "@/components/background/Background";
import PointsReduxWrapper from "@/components/PointsReduxWrapper";
import PointsSync from "@/components/PointsSync";
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
      <body className="flex flex-col h-screen">
        <PointsReduxWrapper>
          <PointsSync />
          <OverlayProvider>
            <Background />
            <Header />
            <SidebarNavigation />
            {children}
          </OverlayProvider>
        </PointsReduxWrapper>
      </body>
    </html>
  );
}
