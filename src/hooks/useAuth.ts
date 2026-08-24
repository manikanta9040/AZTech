import { useContext } from 'react'
import { authContextValue } from '../context/authContextValue'
export function useAuth() {
  const context = useContext(authContextValue)
  if (!context) throw new Error('useAuth must be used within an AuthProvider.')
  return context
}
