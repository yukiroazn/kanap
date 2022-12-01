
const cart = []
retrieveItemsFromCache()

cart.forEach((item) => displayItem(item))

const orderButton = document.querySelector("#order")
orderButton.addEventListener("click", () => submitForm())


// Data localstorage
function retrieveItemsFromCache() {
    const numberOfItemsAdded = localStorage.length
    for (let i = 0; i < numberOfItemsAdded; i++) {
        const item = localStorage.getItem(localStorage.key(i)) || ""
        const itemObject = JSON.parse(item)
        cart.push(itemObject)
    }
}
console.log({retrieveItemsFromCache});

// Make Article From Cart
function makeArticle(item) {
    const article = document.createElement("article")
    article.classList.add("cart__item")
    article.dataset.id = item.id
    article.dataset.color = item.color
    return article
}
console.log({makeArticle});

// Display Image 
function makeImageDiv(item)
{
    const div = document.createElement("div")
    div.classList.add("cart__item__img")
    
    const image = document.createElement("img")
    image.src = item.imageUrl
    image.alt = item.altTxt
    div.appendChild(image)
    return div
}
console.log({makeImageDiv});

// Display Cart Item
function displayItem(item) 
{
    const article = makeArticle(item)
    const imageDiv = makeImageDiv(item)
    article.appendChild(imageDiv)

    const cardItemContent = makeCartContent(item)
    article.appendChild(cardItemContent)
    displayArticle(article)
    displayTotalQuantity()
    displayTotalPrice()
}
console.log({displayItem});

// Display Quantity
function displayTotalQuantity() {
    const totalQuantity = document.querySelector("#totalQuantity")
    const total = cart.reduce((total, item) => total + item.quantity, 0)
    totalQuantity.textContent = total
}
console.log({displayTotalQuantity});

// Display Price
function displayTotalPrice() {
    const totalPrice = document.querySelector("#totalPrice")
    const total = cart.reduce((total, item) => total + item.price * item.quantity, 0)
    totalPrice.textContent = total
}
console.log({displayTotalPrice});

// Display Description
function makeDescription(item) {
    const description = document.createElement("div")
    description.classList.add("cart__item__content__description")

    const h2 = document.createElement("h2")
    h2.textContent = item.name

    const p = document.createElement("p")
    p.textContent = item.color;

    const p2 = document.createElement("p")
    p2.textContent = item.price + "€"

    description.appendChild(h2)
    description.appendChild(p)
    description.appendChild(p2)
    return description
}
console.log({makeDescription});

// insertion de la div "article" dans "cart__items"   
function displayArticle(article) {
    document.querySelector("#cart__items").appendChild(article)
}

// Création de la div "cart__item__content"
function makeCartContent(item) {
    const cardItemContent = document.createElement("div")
    cardItemContent.classList.add("cart__item__content")

    const description = makeDescription(item)
    const settings = makeSettings(item)

    cardItemContent.appendChild(description)
    cardItemContent.appendChild(settings)
    return cardItemContent
}

// Insertion ""cart__item__content__settings"
function makeSettings(item) {
    const settings = document.createElement("div")
    settings.classList.add("cart__item__content__settings")
    
    addQuantityToSettings(settings, item)
    addDeleteToSettings(settings, item)
    return settings
}

// Insertion de ""cart__item__content__settings__delete"
function addDeleteToSettings(settings, item) {
}

// Ajout d'un produit
function addQuantityToSettings(settings, item) {
    const quantity = document.createElement("div")
    quantity.classList.add("cart__item__content__settings__quantity")
    const p = document.createElement("p")
    p.textContent = "Qté : "
    quantity.appendChild(p)
    const input = document.createElement("input")
    input.type = "number"
    input.classList.add("itemQuantity")
    input.name = "itemQuantity"
    input.min = "1"
    input.max = "100"
    input.value = item.quantity
 

    quantity.appendChild(input)
    settings.appendChild(quantity)
}