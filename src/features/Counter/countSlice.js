import { createSlice } from "@reduxjs/toolkit"

export const countSlice = createSlice({
    name: "counter",
    initialState: {
        value: {}, 
    },
    reducers: {
        increment: (state, { payload }) => {
            const productId = payload; 
            if (state.value[productId]) {
                state.value[productId]++; 
            } else {
                state.value[productId] = 1; 
            }
        },
        decrement: (state, { payload }) => {
            const productId = payload;
            if (state.value[productId] && state.value[productId] > 0) {
                state.value[productId]--; 
            }
        }
    },
})

export const { increment, decrement} = countSlice.actions
export default countSlice.reducer