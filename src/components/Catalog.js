import { useState, useEffect } from "react"
import axios from "axios"
import Filters from "./Filters"
import CatalogItem from "./CatalogItem"
import ScrollToTop from "./ScrollToTop"
import Loading from "./Loading"

const Catalog = ({ allItems, currentlyDisplayedItems, setAllItems, setCurrentlyDisplayedItems }) => {

    const [currentSortOrder, setCurrentSortOrder] = useState(() => 'asc')
    const [currentSortParameter, setCurrentSortParameter] = useState(() => 'single-name')
    const [currentSearch, setCurrentSearch] = useState(() => '')

    const [isLoading, setIsLoading] = useState(() => true)

    const getItems = (search, sortParameter, sortOrder) => {
        axios.get("http://127.0.0.1:8080/checklist/item_ordered?" + search + sortParameter + sortOrder)
            .then(res => {
                const allItems = res.data
                setAllItems(allItems)
                setCurrentlyDisplayedItems(allItems)
            })
        setIsLoading(false)
    }

    useEffect(() => {
        getItems("search=", "&parameter=single-name", "&order=asc")
    }, [])

    const reverseItems = () => {
        setCurrentSortOrder(currentSortOrder === "asc" ? "desc" : "asc")
        getItems("search=" + currentSearch,
            "&parameter=" + currentSortParameter,
            "&order=" + (currentSortOrder === "asc" ? "desc" : "asc"))
    }

    const sortItems = (parameter) => {
        setCurrentSortParameter(parameter)
        getItems("search=" + currentSearch,
            "&parameter=" + parameter,
            "&order=" + currentSortOrder)
    }

    const searchItems = (searchInput) => {
        setCurrentSearch(searchInput)
        getItems("search=" + searchInput,
            "&parameter=" + currentSortParameter,
            "&order=" + currentSortOrder)
    }

    return (
        <div>
            <div className='catalog'>
                <ScrollToTop />
                <Filters reverseItems={reverseItems} sortItems={sortItems} searchItems={searchItems}/>
                {
                    isLoading ? <Loading />
                    : <ul>
                        { currentlyDisplayedItems.slice(0, 100).map(item =>
                            <CatalogItem key={item.id} id={item.id} name={item.name} price={item.price} 
                            weight_kg={item.weight_kg}
                            item_type={item.item_type} item_count={item.item_count} />)
                        }
                    </ul>
                }
            </div>
        </div>    
    )
}

export default Catalog
