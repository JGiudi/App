import {configureStore } from '@reduxjs/toolkit'
import { shopApi } from '../services/shopService';
import { setupListeners } from '@reduxjs/toolkit/query'
import { authApi } from '../services/authService';
import counterReducer from '../features/Counter/countSlice'
import shopReducer from '../features/Shop/shopSlice'
import cartReducer from '../features/Cart/cartSlice'
import authReducer from '../features/User/userSlice'

const store = configureStore({
    reducer:{
        counter: counterReducer,
        shop: shopReducer,
        cart: cartReducer,
        auth: authReducer,
        [shopApi.reducerPath]: shopApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(shopApi.middleware, authApi.middleware)
})

setupListeners(store.dispatch)

export default store