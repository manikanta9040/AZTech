import { useState, type PropsWithChildren } from 'react'
import { themeContextValue, type Theme } from './themeContextValue'
export function ThemeProvider({ children }: PropsWithChildren) { const [theme, setTheme] = useState<Theme>('light'); return <themeContextValue.Provider value={{ theme, toggleTheme: () => setTheme((value) => value === 'light' ? 'dark' : 'light') }}>{children}</themeContextValue.Provider> }
