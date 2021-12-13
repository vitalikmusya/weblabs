import React from 'react'
import items_image from "./assets/items.jpg" 

const Heading = () => {
    return (
        <section className='heading'>
            <img className='heading__image' src={items_image} alt='items'/>
            <div className='heading__info'>
                <h2>Laptop store</h2>
                <p>
                    Interesting Facts About Borsch To Know
                    - Potatoes and tomatoes began being added to borsch in the 19th century.
                    - Every housewife has her own borsch recipe.
                    - Beets are cooked separately.
                    - A special flavor of borsch comes from garlic and bacon.
                </p>
            </div>    
        </section>
    )
}

export default Heading
