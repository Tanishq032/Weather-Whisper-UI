
"use client"

import * as React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"
type ContrastMode = "normal" | "high"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  defaultContrast?: ContrastMode
}

type ThemeProviderState = {
  theme: Theme
  contrastMode: ContrastMode
  setTheme: (theme: Theme) => void
  setContrastMode: (mode: ContrastMode) => void
}

const initialState: ThemeProviderState = {
  theme: "system",
  contrastMode: "normal",
  setTheme: () => null,
  setContrastMode: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  defaultContrast = "normal",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem("theme") as Theme) || defaultTheme
  )

  const [contrastMode, setContrastMode] = useState<ContrastMode>(
    () => (localStorage.getItem("contrast-mode") as ContrastMode) || defaultContrast
  )

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"

      root.classList.add(systemTheme)
    } else {
      root.classList.add(theme)
    }
    
    // Add or remove high contrast class
    if (contrastMode === "high") {
      root.classList.add("high-contrast")
    } else {
      root.classList.remove("high-contrast")
    }
  }, [theme, contrastMode])

  const value = {
    theme,
    contrastMode,
    setTheme: (theme: Theme) => {
      localStorage.setItem("theme", theme)
      setTheme(theme)
    },
    setContrastMode: (mode: ContrastMode) => {
      localStorage.setItem("contrast-mode", mode)
      setContrastMode(mode)
    }
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
