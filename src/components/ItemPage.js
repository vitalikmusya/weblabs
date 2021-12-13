import { useParams } from "react-router"
import Item from "./Item"
import { NavLink } from "react-router-dom"
import ScrollToTop from "./ScrollToTop"

const ItemPage = ({ allItemsMap }) => {

    const params = useParams()

    return (
        <div className='item-page'>
            <ScrollToTop />
            <Item allItemsMap={allItemsMap} id={params.id} />
            <NavLink to='/catalog'>Return to all assortment</NavLink>
        </div>
    )
}

export default ItemPage
