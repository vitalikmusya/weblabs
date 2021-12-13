import "./App.css"
import { HashRouter, Route } from "react-router-dom"
import Header from "./components/Header"
import Home from "./components/Home"
import Catalog from "./components/Catalog"
import ItemPage from "./components/ItemPage"
import Footer from "./components/Footer"
import { useEffect, useState } from "react"
import axios from "axios"
import Cart from "./components/Cart"

const App = () => {

    /*const [allItems, setAllItems] = useState(() => { return [
        {id: 0, name: "Macbook 1", price: 21212, weight: 2, type: "REGULAR", count: 1},
        {id: 1, name: "Macbook 2", price: 31313, weight: 3, type: "REGULAR", count: 2},
        {id: 2, name: "Macbook 3", price: 41414, weight: 4, type: "REGULAR", count: 1},
        {id: 3, name: "Samsung ", price: 51515, weight: 5, type: "REGULAR", count: 3}
    ]})*/
    const [allItems, setAllItems] = useState(() => [])
    const [allItemsMap, setAllItemsMap] = useState(() => {return {}})

    const [currentlyDisplayedItems, setCurrentlyDisplayedItems] = useState(() => allItems)

    const getItems = (search, sortParameter, sortOrder) => {
        axios.get("http://127.0.0.1:8080/checklist/item_ordered?" + search + sortParameter + sortOrder)
            .then(res => {
                const allItems = res.data
                setAllItems(allItems)
                for (const item of allItems) {
                    setAllItemsMap(prev => {
                        let tmp = prev
                        tmp[item.id] = item
                        return tmp
                    })
                }
                setCurrentlyDisplayedItems(allItems)
            })
    }

    useEffect(() => {
        getItems("search=", "&parameter=single-name", "&order=asc")
    }, [])

    return (
        <HashRouter>
            <div className='container'>
                <Header />
                <div>
                    <Route exact path='/' component={Home}></Route>
                    <Route path='/catalog' render={props => <Catalog {...props}
                        allItems={allItems} currentlyDisplayedItems={currentlyDisplayedItems}
                        setAllItems={setAllItems} setCurrentlyDisplayedItems={setCurrentlyDisplayedItems}
                        />}></Route>
                    <Route path='/item/:id' render={props => <ItemPage {...props} allItemsMap={allItemsMap}/>}></Route>
                    <Route path='/cart' render={props => <Cart {...props} allItemsMap={allItemsMap}/>}></Route>
                </div>
            </div>
            <Footer />
        </HashRouter>
    )
}

export default App
