"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export const THEME_STORAGE_KEY = "nuc-theme";
export const DEFAULT_THEME = "default";

export function applyTheme(themeClass: string | null) {
    const html = document.documentElement;
    Array.from(html.classList)
        .filter((cls) => cls.startsWith("theme-"))
        .forEach((cls) => html.classList.remove(cls));
    if (themeClass) {
        html.classList.add(`theme-${themeClass}`);
        localStorage.setItem(THEME_STORAGE_KEY, themeClass);
    } else {
        localStorage.removeItem(THEME_STORAGE_KEY);
    }
}

export function ThemeProvider({
    children,
    ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
    //     useEffect(() => {
    //         const saved = localStorage.getItem(THEME_STORAGE_KEY) ?? DEFAULT_THEME;
    //         applyTheme(saved);
    //     }, []);

    return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
