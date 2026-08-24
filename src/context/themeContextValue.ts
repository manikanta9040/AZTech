import { createContext } from 'react'
export type Theme = 'light' | 'dark'
export const themeContextValue = createContext<{ theme: Theme; toggleTheme: () => void }>({ theme: 'light', toggleTheme: () => undefined })
