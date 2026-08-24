import { configureStore } from '@reduxjs/toolkit'
import admin from './adminSlice'
import auth from './authSlice'
import conferences from './conferenceSlice'
import notifications from './notificationSlice'
import user from './userSlice'
export const store = configureStore({ reducer: { admin, auth, conferences, notifications, user } })
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
