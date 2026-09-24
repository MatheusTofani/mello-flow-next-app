import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mello FLow",
  description: "Sistema de gerenciamento de fluxo de trabalho",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
