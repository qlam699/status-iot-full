import { configureStore } from '@reduxjs/toolkit'
import { devicesApi } from 'services/device'

export const store = configureStore({
  reducer: {
    [devicesApi.reducerPath]: devicesApi.reducer
  },
  // adding the api middleware enables caching, invalidation, polling and other features of `rtk-query`
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(devicesApi.middleware)
})
