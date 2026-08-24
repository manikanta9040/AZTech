import { useContext } from 'react'
import { themeContextValue } from '../context/themeContextValue'
export const useTheme = () => useContext(themeContextValue)
