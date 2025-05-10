import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../views/modules/auth/utils/slice'

export const store = configureStore({
  reducer: {
    auth:authReducer
  },
})