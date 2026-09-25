"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import allThemes, { type Theme } from "./theme";
import { useWhiteLabel } from "@/src/themes/WhiteLabelContext";
import { Button } from "@/src/components/ui/button";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
    DropdownMenuLabel,
} from "@/src/components/ui/dropdown-menu";

export function ToggleThemeButton() {
    const { setTheme: setDarkMode } = useTheme();
    const { theme: brandTheme, setTheme: setBrandTheme } = useWhiteLabel();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                render={<Button variant="outline" size="icon" />}
            >
                <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />

                <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />

                <span className="sr-only">Toggle theme</span>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Appearance</DropdownMenuLabel>

                    <DropdownMenuItem onClick={() => setDarkMode("light")}>
                        Light
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => setDarkMode("dark")}>
                        Dark
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => setDarkMode("system")}>
                        System
                    </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                    <DropdownMenuLabel>Brand</DropdownMenuLabel>

                    {(Object.keys(allThemes) as Theme[]).map((key) => (
                        <DropdownMenuItem
                            key={key}
                            onClick={() => setBrandTheme(key)}
                            className={brandTheme === key ? "font-semibold" : ""}
                        >
                            {key}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}