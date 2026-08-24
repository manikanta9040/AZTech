import { useContext } from 'react'
import { authContextValue } from '../context/authContextValue'
export const useAuth = () => useContext(authContextValue)
