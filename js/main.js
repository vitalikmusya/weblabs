
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

let allItems = [
    {id: 0, name: "Macbook 1", price: 21212, weight: 2, type: "Laptop", count: 1},
    {id: 1, name: "Macbook 2", price: 31313, weight: 3, type: "Laptop", count: 2},
    {id: 2, name: "Macbook 3", price: 41414, weight: 4, type: "Laptop", count: 1},
    {id: 3, name: "Samsung ", price: 51515, weight: 5, type: "PC", count: 3}
]

let currentlyDisplayedItems = allItems

let currentlyEditedItemId = null
let currentId = 3
let idToItem = {}
let currentMode = "ADD" // ADD or EDIT

const itemTemplate = ({ id, name, price, weight, type, count }) => `<li id="${id}">
        <img class="item-image" src="assets/item.jpg" alt="Item"/>
        <div class="item-description">
            <h3 class="item-name">${name}</h3>
            <label class="item-price">Price: ${price} hrn.</label>
            <label class="item-price">Total price: ${count * price} hrn.</label>
            <label class="item-weight">Weight: ${Math.round(weight * 1000) / 1000} kg</label>
            <label class="item-weight">Total weight: ${Math.round(count * weight * 1000) / 1000} kg</label>
            <label class="item-type">Type: ${type}</label>
            <label class="item-count">Ammount: ${count}</label>
        </div>    
        <div class="item-buttons">
            <button id="item-edit-button-${id}" class="item-edit-button" onclick="switchToEditMode(this)">Edit</button>
            <button id="item-remove-button-${id}" class="item-remove-button" onclick="removeItem(this)">Remove</button>
        </div>
    </li>`

const renderItems = (items) => {
    itemsList.innerHTML = ""

    for (const item of items) {
        addItemtoPage(item);
    }

    if (currentMode === "EDIT") {
        liToEdit = document.getElementById(currentlyEditedItemId)
        liToEdit.style.borderStyle = "solid"
        liToEdit.style.borderColor = "rgb(146, 95, 0)"
        editButton = document.getElementById("item-edit-button-" + currentlyEditedItemId)
        editButton.innerHTML = "Cancel"
    }    
}

const addItemtoPage = ({ id, name, price, weight, type, count }) => {
    itemsList.insertAdjacentHTML(
        "beforeend",
        itemTemplate({id, name, price, weight, type, count})
    )
}

const compareStrings = (a, b) => {
    if (a === b) return 0
    return a < b ? -1 : 1
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

window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = "none"
    }
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
        if (itemPrice === "" || isNaN(itemPrice) || itemPrice.indexOf(".") != -1) 
            errors.push("Price must be integer value")
        if (itemWeight === "" || isNaN(itemWeight))
            errors.push("Weight must be float number")
        if (itemType === "" || !["REGULAR", "FRAGILE", "LIQUID"].includes(itemType))
            errors.push("Type must by REGULAR, FRAGILE or LIQUID")
        if (itemCount === "" || isNaN(itemCount) || itemCount.indexOf(".") != -1 || itemCount.indexOf("-") != -1)
            errors.push("Count must be positive integer value")
    } else {
        if (isNaN(itemPrice) || itemPrice.indexOf(".") != -1) 
            errors.push("Price must be integer value")
        if (isNaN(itemWeight))
            errors.push("Weight must be float number")
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
        itemManagerActionHeading.innerHTML = "Edit Item Ordered"
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
            itemManagerActionHeading.innerHTML = "Add new Item Ordered"
            addEditItemButton.innerHTML = "Add"
        }
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
        allItems.push({ id: ++currentId,
            name: itemName,
            price: parseInt(itemPrice),
            weight: parseFloat(itemWeight),
            type: itemType,
            count: parseInt(itemCount)})

        idToItem[currentId] = allItems[currentId]

    } else {
        itemToEditButton = document.getElementById("item-edit-button-" + currentlyEditedItemId)
        itemToEdit = idToItem[currentlyEditedItemId]
        console.log(itemToEdit)
        itemToEdit.name = (itemName === "") ? itemToEdit.name : itemName
        itemToEdit.price = (itemPrice === "") ? itemToEdit.price : parseInt(itemPrice)
        itemToEdit.weight = (itemWeight === "") ? itemToEdit.weight : parseFloat(itemWeight)
        itemToEdit.type = (itemType === "") ? itemToEdit.type : itemType
        itemToEdit.count = (itemCount === "") ? itemToEdit.count : parseInt(itemCount)
        currentMode = "ADD"
        currentlyEditedItemId = null
        itemManagerActionHeading.innerHTML = "Add new Item Ordered"
        addEditItemButton.innerHTML = "Add"
    }

    clearAddEditInputs()

    sortItems()
    searchItems()
    calculateTotal()
}

const removeItem = (removeButton) => {
    let itemToRemoveId = parseInt(removeButton.id.split("-")[3])
    idToItem[itemToRemoveId] = null
    if (itemToRemoveId == currentlyEditedItemId) {
        currentlyEditedItemId = null
        currentMode = "ADD"
        itemManagerActionHeading.innerHTML = "Add new Item Ordered"
        addEditItemButton.innerHTML = "Add"
    }

    allItems = allItems.filter(item => item.id != itemToRemoveId)
    searchItems()
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

const searchItems = () => {
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
}

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

    itemsTotalLabel.innerHTML = Math.round(currentlyDisplayedItems.reduce(reducer, 0) * 1000) / 1000 + units[selectedCalculateParameter]
}

// main code
calculateTotal()
sortItems()

for (const item of allItems) {
    idToItem[item.id] = item
}
