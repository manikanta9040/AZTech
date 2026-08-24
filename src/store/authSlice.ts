import { createSlice } from '@reduxjs/toolkit'
const authSlice = createSlice({ name: 'auth', initialState: { accessToken: null as string | null }, reducers: {} })
export default authSlice.reducer
