import "./globals.css";

import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AdminPanelLayout>{children}</AdminPanelLayout>
        </body>
    </html>
  );
}



