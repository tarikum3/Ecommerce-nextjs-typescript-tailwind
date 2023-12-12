import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { serviceApi } from '@framework/services/serviceApi'
import { customerApi } from '@framework/services/customer'
import { cartApi } from '@framework/services/cart'
export const store = configureStore({
  reducer: {
    [serviceApi.reducerPath]: serviceApi.reducer,

  },
  // reducer: {
  //   // Add the generated reducer as a specific top-level slice
  //   //[productApi.reducerPath]: productApi.reducer,
  //   [customerApi.reducerPath]: customerApi.reducer,
  //   [cartApi.reducerPath]: cartApi.reducer,
  // },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat([customerApi.middleware,cartApi.middleware]),
  
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(serviceApi.middleware);
    },
    devTools:process.env.NODE_ENV !=='production',
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch