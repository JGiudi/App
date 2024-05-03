import { createSlice } from "@reduxjs/toolkit"

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        value: {
            user: "userIdLogged",
            updatedAt: new Date().toLocaleString(),
            total: null,
            items: [],
        },
    },
    reducers: {
        addCartItem: (state, { payload }) => {
            //Logic to add product
            const productRepeated = state.value.items.find(
                (item) => item.id === payload.id
            )
            if (productRepeated) {
                const itemsUpdated = state.value.items.map((item) => {
                    if (item.id === payload.id) {
                        item.quantity += payload.quantity
                        return item
                    }
                    return item
                })
                const total = itemsUpdated.reduce(
                    (acc, currentItem) =>
                        (acc += currentItem.price * currentItem.quantity),
                    0
                )
                state.value = {
                    ...state.value,
                    items: itemsUpdated,
                    total,
                    updatedAt: new Date().toLocaleString(),
                }
            } else {
                state.value.items.push(payload)
                const total = state.value.items.reduce(
                    (acc, currentItem) =>
                        (acc += currentItem.price * currentItem.quantity),
                    0
                )
                state.value = {
                    ...state.value,
                    total,
                    updatedAt: new Date().toLocaleString(),
                }
            }
        },
        removeCartItem: (state, { payload }) => {
            // Encuentra el índice del producto en el carrito
            const indexToRemove = state.value.items.findIndex(item => item.id === payload.id);
        
            // Si se encontró el producto en el carrito
            if (indexToRemove !== -1) {
                // Remueve el producto del arreglo de items
                state.value.items.splice(indexToRemove, 1);
        
                // Calcula el total actualizado
                const total = state.value.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        
                // Actualiza el estado del carrito con el total y la fecha de actualización
                state.value = {
                    ...state.value,
                    total,
                    updatedAt: new Date().toLocaleString(),
                };
            }
        },        
    },
})

export const { addCartItem, removeCartItem } = cartSlice.actions
export default cartSlice.reducer