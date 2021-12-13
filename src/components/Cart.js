import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import CartItem from './CartItem'
import { NavLink } from 'react-router-dom'
import ScrollToTop from './ScrollToTop'

const Cart = ({ allItemsMap }) => {
    const cart = useSelector(state => state.cart)
    const reducer = (previous, current) => previous
        + allItemsMap[current.id].price * allItemsMap[current.id].item_count * current.quantity
    const [total, setTotal] = useState(() => 0)
    const [toUpdate, setToUpdate] = useState(() => false)
    const [isScrollNeeded, setIsScrollNeeded] = useState(() => false)

    useEffect(() => {
        setTotal(cart.reduce(reducer, 0))
        setToUpdate(false)
    }, [toUpdate])

    const cancelScrollToTop = () => {
        if (isScrollNeeded) setIsScrollNeeded(false)
        return <></>
    }

    return (
        <div className='cart'>
            {isScrollNeeded ? <ScrollToTop /> : cancelScrollToTop()}
            <h1>Your cart</h1>
            { cart.length > 0
                ? <></>
                : <h2 className="empty">Your cart is empty</h2>
            }
            {cart.map(item => <CartItem key={item.id} id={item.id} name={allItemsMap[item.id].name}
                price={allItemsMap[item.id].price} item_count={allItemsMap[item.id].item_count}
                setToUpdate={setToUpdate}/>)}
            <h4>Total: {total} hrn.</h4>
            <NavLink to='/catalog'>Back to catalog</NavLink>
        </div>
    )
}

export default Cart
