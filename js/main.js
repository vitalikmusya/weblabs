
const itemsList = document.getElementById("items-list")
const sortParameterMenu = document.getElementById("items__sort-parameter")
const sortOrderMenu = document.getElementById("items__sort-order")
const itemsTotalLabel = document.getElementById("items__total-value")
const calculateParameterMenu = document.getElementById("items__calculate-total")
const searchParameterMenu = document.getElementById("items__search-parameter")
const searchParameterUnitLabels = document.getElementsByClassName("items__search-units")
const searchInputFrom = document.getElementById("items__search-from")
const searchInputTo = document.getElementById("items__search-to")
const searchButton = document.getElementById("items__search-button")

var allItems = [
    {id: 1, name: "Macbook 1", price: 21212, weight: 2, type: "Laptop", count: 1},
    {id: 2, name: "Macbook 2", price: 31313, weight: 3, type: "Laptop", count: 2},
    {id: 3, name: "Macbook 3", price: 41414, weight: 4, type: "Laptop", count: 1},
    {id: 2, name: "Samsung ", price: 51515, weight: 5, type: "PC", count: 3}
]

var currentlyDisplayedItems = allItems

const itemTemplate = ({ id, name, price, weight, type, count }) => `<li id="${id}">
        <img class="item-image" src="assets/item.jpg" alt="Item"/>
        <div class="item-description">
            <h3 class="item-name">${name}</h3>
            <label class="item-price">Price: ${price} hrn.</label>
            <label class="item-price">Total price: ${count * price} hrn.</label>
            <label class="item-weight">Weight: ${Math.round(weight * 100) / 100} kg</label>
            <label class="item-weight">Total weight: ${Math.round(count * weight * 100) / 100} kg</label>
            <label class="item-type">Type: ${type}</label>
            <label class="item-count">Ammount: ${count}</label>
        </div>    
    </li>`;

const renderItems = (items) => {
    itemsList.innerHTML = ""

    for (const item of items) {
        addItemtoPage(item);
    }
}

const addItemtoPage = ({ id, name, price, weight, type, count }) => {
    itemsList.insertAdjacentHTML(
        "beforeend",
        itemTemplate({id, name, price, weight, type, count})
    );
}

const compareStrings = (a, b) => {
    if (a === b) return 0
    return a < b ? -1 : 1
}

const getSearchBounds = () => {
    return { from: searchInputFrom.value, to: searchInputTo.value}
}

const changeSearchParameterUnits = () => {
    [_, selectedSearchParameter] = searchParameterMenu.value.split("-")

    let units = {
        "price": " hrn.",
        "weight": " kg."
    }

    for (const label of searchParameterUnitLabels) {
        label.innerHTML = units[selectedSearchParameter]
    }
}

const sortItems = () => {
    let [selectedCoef, selectedParameter] = sortParameterMenu.value.split("-")
    let selectedOrder = sortOrderMenu.value

    let sortCoef = selectedCoef === "total" ?
        item => item.count :
        item => 1

    let sortParameters = {
        "name": item => item.name,
        "price": item => item.price,
        "weight": item => item.weight
    }

    let sortOrder = selectedOrder === "asc" ? 1 : -1

    allItems.sort((a, b) => {
        if (typeof sortParameters[selectedParameter](a) === "string")
            return sortOrder * compareStrings(sortParameters[selectedParameter](a),
                sortParameters[selectedParameter](b))
        else
            return sortOrder * (sortParameters[selectedParameter](a) * sortCoef(a)
                - sortParameters[selectedParameter](b) * sortCoef(b))
    })

    currentlyDisplayedItems.sort((a, b) => {
        if (typeof sortParameters[selectedParameter](a) === "string")
            return sortOrder * compareStrings(sortParameters[selectedParameter](a),
                sortParameters[selectedParameter](b))
        else
            return sortOrder * (sortParameters[selectedParameter](a) * sortCoef(a)
                - sortParameters[selectedParameter](b) * sortCoef(b))
    })

    renderItems(currentlyDisplayedItems)
}

searchButton.addEventListener("click", (event) => {
    let [selectedCoef, selectedSearchParameter] = searchParameterMenu.value.split("-")

    let searchCoef = selectedCoef === "total" ?
        item => item.count :
        item => 1

    let searchParameters = {
        "price": item => item.price,
        "weight": item => item.weight
    }

    let { from, to } = getSearchBounds()

    from = (from === "") ? 0 : parseFloat(from)
    to = (to === "") ? Infinity : parseFloat(to)

    currentlyDisplayedItems = allItems.filter(item => 
            searchParameters[selectedSearchParameter](item) * searchCoef(item) >= from
            && searchParameters[selectedSearchParameter](item) * searchCoef(item) <= to)

    renderItems(currentlyDisplayedItems)
    calculateTotal()
})

const calculateTotal = () => {
    selectedCalculateParameter = calculateParameterMenu.value

    let calculateParameters = {
        "price": item => item.price,
        "weight": item => item.weight
    }

    let units = {
        "price": " hrn.",
        "weight": " kg."
    }
    let reducer = (previousValue, currentItem) => previousValue
        + calculateParameters[selectedCalculateParameter](currentItem) * currentItem.count

    itemsTotalLabel.innerHTML = currentlyDisplayedItems.reduce(reducer, 0) + units[selectedCalculateParameter]
}

// main code
calculateTotal()
sortItems()
