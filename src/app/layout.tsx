import type { Metadata } from "next";
import "./globals.css";
import { lato } from "../themes/fonts";
import { cn } from "@/src/lib/utils";
import { ThemeProvider } from "next-themes";
import { WhiteLabelProvider } from "../themes/WhiteLabelContext";

export const metadata: Metadata = {
  title: "Mello FLow",
  description: "Sistema de gerenciamento de fluxo de trabalho",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={cn("h-full", "antialiased", "font-sans", lato.variable)}
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
