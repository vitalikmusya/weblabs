import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { addToCart, removeFromCart } from '../actions'
import item_image from "./assets/box-of-items.jpg"

const CatalogItem = ({id, name, price, weight_kg, item_type, item_count }) => {

    const cart = useSelector(state => state.cart)
    const [isInCart, setIsInCart] = useState(() => {
        return cart.find(itemInCart => itemInCart.id == id) != null ? true : false
    })
    const dispatcher = useDispatch()

    return (
        <div className='catalog-item'>
            <div className="buttons">
                {isInCart
                    ? <button className="remove" onClick={() => {
                        setIsInCart(false)
                        dispatcher(removeFromCart(id))
                    }}>Remove from cart</button>
                    : <button className="add" onClick={() => {
                        setIsInCart(true)
                        dispatcher(addToCart(id))
                    }}>Add to cart</button>
                }
            </div>
            <img className="item-image" src={item_image} alt="Item"/>
            <div className="item-description">
                <h3 className="item-name">{name}</h3>
                <label className="item-price">Price: {price} hrn.</label>
                <label className="item-price">Total price: {item_count * price} hrn.</label>
                <label className="item-weight">Weight: {Math.round(weight_kg * 100) / 100} kg</label>
                <label className="item-weight">Total weight: {Math.round(item_count * weight_kg * 100) / 100} kg</label>
                <label className="item-type">Type: {item_type}</label>
                <label className="item-count">Quantity: {item_count}</label>
            </div>
            <NavLink to={`/item/${id}`}>View more</NavLink>
        </div>
    )
}

export default CatalogItem
