export const addToCart = (id) => {
    return {
        type: 'ADD_TO_CART',
        id: id
    }
}

export const removeFromCart = (id) => {
    return {
        type: 'REMOVE_FROM_CART',
        id: id
    }
}

export const incrementQuantityInCart = (id) => {
    return {
        type: 'INCREMENT_QUANTITY_IN_CART',
        id: id
    }
}

export const decrementQuantityInCart = (id) => {
    return {
        type: 'DECREMENT_QUANTITY_IN_CART',
        id: id
    }
}
