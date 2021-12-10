//#region DOM OBJECTS
const itemsList = document.getElementById("items-list")

const sortParameterMenu = document.getElementById("items__sort-parameter")
const sortOrderMenu = document.getElementById("items__sort-order")

const itemsTotalLabel = document.getElementById("items__total-value")
const calculateParameterMenu = document.getElementById("items__calculate-total")

const searchParameterMenu = document.getElementById("items__search-parameter")
const searchParameterUnitLabels = document.getElementsByClassName("items__search-units")
const searchInputFrom = document.getElementById("items__search-from")
const searchInputTo = document.getElementById("items__search-to")

const itemManagerActionHeading = document.getElementById("items__manager-action")
const inputName = document.getElementById("item-name")
const inputPrice = document.getElementById("item-price")
const inputWeight = document.getElementById("item-weight")
const inputType = document.getElementById("item-type")
const inputCount = document.getElementById("item-count")
const addEditItemButton = document.getElementById("item__add-edit-button")

const modal = document.getElementById("modal")
const modalErrors = document.getElementById("modal__errors")
//#endregion

//#region VARIABLES
let allItems = [
    /*{id: 0, name: "Acer Nitro 5", price: 23999, weight: 2.4, type: "REGULAR", count: 1},
    {id: 1, name: "Apple Iphone 11", price: 18999, weight: 0.2, type: "REGULAR", count: 2},
    {id: 2, name: "Asus AsusPro", price: 25999, weight: 2.3, type: "REGULAR", count: 1},
    {id: 3, name: "SVS SB-1000 Pro", price: 20440, weight: 10.1, type: "REGULAR", count: 3}*/
]
let currentlyDisplayedItems = allItems

let currentlyEditedItemId = null
let currentMode = "ADD" // ADD or EDIT
//#endregion

//#region API
const BASE_URL = "http://127.0.0.1:8080"
const RESOURCE_URL = `${BASE_URL}/checklist`

const baseRequest = async ({ urlPath = "", method ="GET", body = null}) => {
    try {
        const parameters = {
            method,
            headers: {
                "Content-Type": "application/json"
            }
        }

        if (body) {
            parameters.body = JSON.stringify(body)
        }
        return await fetch(`${RESOURCE_URL}${urlPath}`, parameters)
    } catch(error) {
        console.log("vds")
    }
}

const fetchAllItems = async () => {
    
    currentlyDisplayedItems = allItems = await getAllItems()

    await sortItems()
    await searchItems()
}

const getAllItems = async () => {
    const rawResponse = await baseRequest({ method: "GET" })
    return rawResponse.json()
}

const postItem = async (body) => {
    console.log(body)
    await baseRequest({ method: "POST", body: body})
    await fetchAllItems()
}    

const updateItem = async (id, body) => {
    await baseRequest({ urlPath: `/${id}`, method: "PUT", body: body})
    fetchAllItems()
}    

const deleteItem = async (id) => {
    await baseRequest({ urlPath: `/${id}`, method: "DELETE" })
    await fetchAllItems()
}    
//#endregion

//#region DOM
const itemTemplate = ({ id, name, price, weight_kg, item_type, item_count }) => `<li id="${id}">
        <img class="item-image" src="assets/item.jpg" alt="Item"/>
        <div class="item-description">
            <h3 class="item-name">${name}</h3>
            <label class="item-price">Price: ${price} hrn.</label>
            <label class="item-price">Total price: ${item_count * price} hrn.</label>
            <label class="item-weight">Weight: ${Math.round(weight_kg * 1000) / 1000} kg</label>
            <label class="item-weight">Total weight: ${Math.round(item_count * weight_kg * 1000) / 1000} kg</label>
            <label class="item-type">Type: ${item_type}</label>
            <label class="item-count">Ammount: ${item_count}</label>
        </div>    
        <div class="item-buttons">
            <button id="item-edit-button-${id}" class="item-edit-button" onclick="switchToEditMode(this)">Edit</button>
            <button id="item-remove-button-${id}" class="item-remove-button" onclick="removeItem(this)">Remove</button>
        </div>
    </li>`

const renderItems = (items) => {
    itemsList.innerHTML = ""
    hasCurrentlyEdited = false

    for (const item of items) {
        addItemtoPage(item);
        if (item.id == currentlyEditedItemId) {
            hasCurrentlyEdited = true
        }
    }

    if (currentMode === "EDIT" && hasCurrentlyEdited) {
        liToEdit = document.getElementById(currentlyEditedItemId)
        liToEdit.style.borderStyle = "solid"
        liToEdit.style.borderColor = "rgb(146, 95, 0)"
        editButton = document.getElementById("item-edit-button-" + currentlyEditedItemId)
        editButton.innerHTML = "Cancel"
    }    
}

const addItemtoPage = ({ id, name, price, weight_kg, item_type, item_count }) => {
    itemsList.insertAdjacentHTML(
        "beforeend",
        itemTemplate({id, name, price, weight_kg, item_type, item_count})
    )
}

const getSearchBounds = () => {
    return { from: searchInputFrom.value, to: searchInputTo.value}
}

const showModalWindow = (errors) => {
    modal.style.display = "block"
    modalErrors.innerHTML = ""
    for (const error of errors) {
        modalErrors.insertAdjacentHTML("beforeend",
        `<li>${error}</li>`)
    }
}

const clearAddEditInputs = () => {
    inputName.value = ""
    inputPrice.value = ""
    inputWeight.value = ""
    inputType.value = ""
    inputCount.value = ""
}

const switchToEditMode = (editButton) => {
    liToEdit = document.getElementById(editButton.id.split("-")[3])

    if (currentMode === "ADD") {
        editButton.innerHTML = "Cancel"
        currentlyEditedItemId = parseInt(editButton.id.split("-")[3])
        currentMode = "EDIT"
        liToEdit.style.borderStyle = "solid"
        liToEdit.style.borderColor = "rgb(146, 95, 0)"
        itemManagerActionHeading.innerHTML = "Edit Checklist"
        addEditItemButton.innerHTML = "Edit"
    } else {
        if (currentlyEditedItemId != parseInt(editButton.id.split("-")[3])) {
            editButton.innerHTML = "Cancel"
            document.getElementById(`item-edit-button-${currentlyEditedItemId}`).innerHTML = "Edit"
            oldLiToEdit = document.getElementById(`${currentlyEditedItemId}`)
            oldLiToEdit.style.borderStyle = "dashed"
            oldLiToEdit.style.borderColor = "orange"
            currentlyEditedItemId = parseInt(editButton.id.split("-")[3])
            liToEdit.style.borderStyle = "solid"
            liToEdit.style.borderColor = "rgb(146, 95, 0)"
        } else {
            editButton.innerHTML = "Edit"
            currentlyEditedItemId = null
            currentMode = "ADD"
            liToEdit.style.borderStyle = "dashed"
            liToEdit.style.borderColor = "orange"
            itemManagerActionHeading.innerHTML = "Add new Item to your Checklist"
            addEditItemButton.innerHTML = "Add"
            clearAddEditInputs()
        }
    }

}
//#endregion

//#region MAIN LOGIC
const compareStrings = (a, b) => {
    if (a === b) return 0
    return a < b ? -1 : 1
}

const getItemWithId = (id) => {
    let low = 0
    let high = currentlyDisplayedItems.length - 1

    while (high >= low) {
        let mid = low + (high - low) / 2

        if (currentlyDisplayedItems[mid].id == id) {
            return currentlyDisplayedItems[mid]
        }
        else if (currentlyDisplayedItems[mid].id < id) {
            low = mid + 1
        }
        else {
            high = mid - 1
        }
    }
    return null
}

const validateIputs = () => {
    let errors = []

    itemName = inputName.value
    itemPrice = inputPrice.value
    itemWeight = inputWeight.value
    itemType = inputType.value
    itemCount = inputCount.value

    if (currentMode == "ADD") {
        if (itemName === "")
            errors.push("Name can't be empty")
        if (itemPrice === "" || isNaN(itemPrice) || itemPrice.indexOf(".") != -1 || itemPrice.indexOf("-") != -1)
            errors.push("Price must be positive integer value")
        if (itemWeight === "" || isNaN(itemWeight) || itemWeight.indexOf("-") != -1)
            errors.push("Weight must be positive float number")
        if (itemType === "" || !["REGULAR", "FRAGILE", "LIQUID"].includes(itemType))
            errors.push("Type must by REGULAR, FRAGILE or LIQUID")
        if (itemCount === "" || isNaN(itemCount) || itemCount.indexOf(".") != -1 || itemCount.indexOf("-") != -1)
            errors.push("Count must be positive integer value")
    } else {
        if (isNaN(itemPrice) || itemPrice.indexOf(".") != -1 || itemPrice.indexOf("-") != -1) 
            errors.push("Price must be positive integer value")
        if (isNaN(itemWeight) || itemWeight.indexOf("-") != -1)
            errors.push("Weight must be positive float number")
        if (!["", "REGULAR", "FRAGILE", "LIQUID"].includes(itemType))
            errors.push("Type must by REGULAR, FRAGILE or LIQUID")
        if (isNaN(itemCount) || itemCount.indexOf(".") != -1 || itemCount.indexOf("-") != -1)
            errors.push("Count must be positive integer value")
    }

    if (errors.length > 0) {
        showModalWindow(errors)
        return false
    }
    return true
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

const addEditItem = () => {

    if (!validateIputs())
        return

    itemName = inputName.value
    itemPrice = inputPrice.value
    itemWeight = inputWeight.value
    itemType = inputType.value
    itemCount = inputCount.value

    if (currentMode === "ADD") {
        postItem({name: itemName,
            price: parseInt(itemPrice),
            weight_kg: parseFloat(itemWeight),
            item_type: itemType,
            item_count: parseInt(itemCount)})
    } else {
        itemToEditButton = document.getElementById("item-edit-button-" + currentlyEditedItemId)

        let itemToEdit = getItemWithId(currentlyEditedItemId)
        itemToEdit.name = (itemName === "") ? itemToEdit.name : itemName
        itemToEdit.price = (itemPrice === "") ? itemToEdit.price : parseInt(itemPrice)
        itemToEdit.weight_kg = (itemWeight === "") ? itemToEdit.weight_kg : parseFloat(itemWeight)
        itemToEdit.item_type = (itemType === "") ? itemToEdit.item_type : itemType
        itemToEdit.item_count = (itemCount === "") ? itemToEdit.item_count : parseInt(itemCount)

        updateItem(currentlyEditedItemId, itemToEdit)

        currentMode = "ADD"
        currentlyEditedItemId = null
        itemManagerActionHeading.innerHTML = "Add new Item Ordered"
        addEditItemButton.innerHTML = "Add"
    }

    clearAddEditInputs()
}

const removeItem = (removeButton) => {
    let itemToRemoveId = parseInt(removeButton.id.split("-")[3])
    
    if (itemToRemoveId == currentlyEditedItemId) {
        currentlyEditedItemId = null
        currentMode = "ADD"
        itemManagerActionHeading.innerHTML = "Add new Item Ordered"
        addEditItemButton.innerHTML = "Add"
    }

    deleteItem(itemToRemoveId)
}

const sortItems = () => {
    let [selectedCoef, selectedParameter] = sortParameterMenu.value.split("-")
    let selectedOrder = sortOrderMenu.value

    let sortCoef = selectedCoef === "total" ?
        item => item.item_count :
        item => 1

    let sortParameters = {
        "name": item => item.name,
        "price": item => item.price,
        "weight": item => item.weight_kg
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

const searchItems = () => {
    let [selectedCoef, selectedSearchParameter] = searchParameterMenu.value.split("-")

    let searchCoef = selectedCoef === "total" ?
        item => item.item_count :
        item => 1

    let searchParameters = {
        "price": item => item.price,
        "weight": item => item.weight_kg
    }

    let { from, to } = getSearchBounds()

    from = (from === "") ? 0 : parseFloat(from)
    to = (to === "") ? Infinity : parseFloat(to)

    currentlyDisplayedItems = allItems.filter(item => 
            searchParameters[selectedSearchParameter](item) * searchCoef(item) >= from
            && searchParameters[selectedSearchParameter](item) * searchCoef(item) <= to)

    renderItems(currentlyDisplayedItems)
    calculateTotal()
}

const calculateTotal = () => {
    let selectedCalculateParameter = calculateParameterMenu.value

    let calculateParameters = {
        "price": item => item.price,
        "weight": item => item.weight
    }

    let units = {
        "price": " hrn.",
        "weight": " kg."
    }
    let reducer = (previousValue, currentItem) => previousValue
        + calculateParameters[selectedCalculateParameter](currentItem) * currentItem.item_count

    itemsTotalLabel.innerHTML = Math.round(currentlyDisplayedItems.reduce(reducer, 0) * 1000) / 1000 + units[selectedCalculateParameter]
}
//#endregion

//#region MAIN CODE

window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = "none"
    }
}

fetchAllItems()

/*fetch("http://127.0.0.1:5000/item_ordered")
.then(response => response.json())
.then(data => console.log(data))*/

// console.log(allItems)
//#endregion
