"use client";

import * as React from "react";
import allThemes, { Theme } from "@/src/themes/theme";

const DEFAULT_THEME: Theme = "default";

interface WhiteLabelContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

const WhiteLabelContext = React.createContext<WhiteLabelContextType | undefined>(undefined);

function applyBrandTheme(t: Theme) {
    document.documentElement.setAttribute("selected-theme", allThemes[t]);
}

export function WhiteLabelProvider({ children }: { children: React.ReactNode }) {
    const [theme, setThemeState] = React.useState<Theme>(DEFAULT_THEME);

    React.useEffect(() => {
        applyBrandTheme(theme);
    }, [theme]);

    function setTheme(t: Theme) {
        setThemeState(t);
    }

    return (
        <WhiteLabelContext.Provider value={{ theme, setTheme }}>
            {children}
        </WhiteLabelContext.Provider>
    );
}

export function useWhiteLabel() {
    const ctx = React.useContext(WhiteLabelContext);
    if (!ctx) throw new Error("useWhiteLabel must be used within WhiteLabelProvider");
    return ctx;
}
