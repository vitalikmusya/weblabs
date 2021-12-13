import React from 'react'
import { useState } from 'react'
import item_image from "./assets/box-of-items.jpg"

const Item = ({ allItemsMap, id }) => {

    const [item] = useState(() => allItemsMap[id])

    return (
        <div className='item'>
            <img className="item__item-image" src={item_image} alt="Item"/>
            <div className="item-info">
                <h1 className="item-name">{item.name}</h1>
                <label className="item-price">Price: {item.price} hrn.</label>
                <label className="item-price">Total price: {item.item_count * item.price} hrn.</label>
                <label className="item-weight">Weight: {Math.round(item.weight_kg * 100) / 100} kg</label>
                <label className="item-weight">Total weight: {Math.round(item.item_count * item.weight_kg * 100) / 100} kg</label>
                <label className="item-type">Type: {item.item_type}</label>
                <label className="item-count">Ammount: {item.item_count}</label>
                <p>
                    This is test web page, made by 
                    Vitaliy Musyanovych for studying. 
                    All right are reserved and this
                    invention is patented.
                </p>
            </div>
        </div>
    )
}

export default Item
