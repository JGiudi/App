import {configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/Counter/countSlice'
import shopReducer from '../features/Shop/shopSlice'
import cartReducer from '../features/Cart/cartSlice'
import { shopApi } from '../services/shopService';
import { setupListeners } from '@reduxjs/toolkit/query'

const store = configureStore({
    reducer:{
        counter: counterReducer,
        shop: shopReducer,
        cart: cartReducer,
        [shopApi.reducerPath]: shopApi.reducer
    },
    middleware:(getDefaultmiddleware) => getDefaultmiddleware().concat(shopApi.middleware)
})

setupListeners(store.dispatch)

export default store