import Heading from "./Heading"
import MayLikeItem from "./MayLikeItem"
import { useEffect, useState } from "react"
import ScrollToTop from "./ScrollToTop"

const Home = () => {

    const name = "Laptop"
    let infos = [`  This is test web page, made by 
                    Vitaliy Musyanovych for studying. 
                    All rights are reserved and this
                    invention is patented.`,

                    `  The giant panda's distinct 
                    black-and-white markings have two 
                    functions: camouflage and communication.`,

                    `  Most of the panda - its face, 
                    neck, belly, rump - is white to 
                    help it hide in snowy habitats. 
                    The arms and legs are black, 
                    helping it to hide in shade. `]

    const [isScrollNeeded, setIsScrollNeeded] = useState(() => true)

    const getRandomInfo = () => {
        return infos[Math.round(Math.random() * 100) % 3]
    }

    const [mayLikeItems, setItems] = useState(() => { return [
        {
            id: 0,
            name: name,
            info: getRandomInfo()
        },
        {
            id: 1,
            name: name,
            info: getRandomInfo()
        },
        {
            id: 2,
            name: name,
            info: getRandomInfo()
        },
        {
            id: 3,
            name: name,
            info: getRandomInfo()
        } 
    ]})
    const [id, setId] = useState(() => 4)

    const showMoreItems = () => {
        setIsScrollNeeded(false)
        setItems([...mayLikeItems,
            {
                id: id,
                name: name,
                info: getRandomInfo()
            },
            {
                id: id + 1,
                name: name,
                info: getRandomInfo()
            },
            {
                id: id + 2,
                name: name,
                info: getRandomInfo()
            },
            {
                id: id + 3,
                name: name,
                info: getRandomInfo()
            }
        ])
        setId(id + 4)
    }

    return (
        <div className='home'>
            <Heading />
            {isScrollNeeded ? <ScrollToTop /> : null}
            <section className='may-like-items'>
                <h1>This might be interesting for you</h1>
                <ul>
                    { mayLikeItems.map(item => 
                        <MayLikeItem key={item.id} name={`${item.name} ${item.id + 1}`} info={item.info}/>) }
                </ul>
                <div className='view-more'>
                    <button className='may-like-items__view-more-button' onClick={showMoreItems}>View more</button>
                </div>    
            </section>
        </div>
    )
}

export default Home
