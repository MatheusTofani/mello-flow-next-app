import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/src/lib/utils";
import { ThemeProvider } from "next-themes";
import { WhiteLabelProvider } from "../themes/WhiteLabelContext";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: "Mello FLow",
  description: "Sistema de gerenciamento de fluxo de trabalho",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={cn("h-full", "antialiased", "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <WhiteLabelProvider>

            {children}

          </WhiteLabelProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
