const cartReducer = (state = [], action) => {
    let item
    switch (action.type) {
        case 'ADD_TO_CART':
            return [{ id: action.id, quantity: 1}, ...state]
        case 'REMOVE_FROM_CART':
            return state.filter(({ id, quantity }) => id != action.id)
        case 'INCREMENT_QUANTITY_IN_CART':
            item = state.find(x => x.id == action.id)
            item.quantity += 1
            return state
        case 'DECREMENT_QUANTITY_IN_CART':
            item = state.find(x => x.id == action.id)
            item.quantity -= 1
            return state  
        default:
            return state    
    }
}

export default cartReducer