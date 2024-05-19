import { menuArray } from './data.js'

const payModal = document.getElementById('pay-modal')
const blurOverlay = document.getElementById('blur-overlay')
const closePayModal = document.getElementById('close-pay-modal')

let menuHTML = ''
let orders = []
let addToCartBtn = document.getElementsByClassName('add-to-cart-btn')

menuArray.forEach(item => {
    menuHTML += `
    <div class="menu-items-container">
    <div class="menuItems">
        <img class="pizzaIcon" src="images/${item.image}">
        <div class="item-description">
            <h2>${item.name}</h2>
            <p>${item.ingredients.join(', ')}</p>
            <p class="price">$${item.price}</p>
        </div>
    </div>
    <div>
        <button data-itemid="${item.id}" class="add-to-cart-btn" type="button">+</button>
    </div>
</div>`
})

document.getElementById('appContainer').innerHTML = menuHTML

const addBtns = document.querySelectorAll(".add-to-cart-btn")
const cart = []

addBtns.forEach(button => {
    button.addEventListener('click', function (e) {
        const itemId = e.target.dataset.itemid
        addToCart(itemId)
    })
})

function addToCart(itemId) {
    const item = menuArray.find(product => product.id == itemId);
    if (item) {
        const existingItem = cart.find(product => product.id == itemId);
        if (existingItem) {
            existingItem.quantity += 1;
            existingItem.totalPrice += item.price;
        } else {
            cart.push({ ...item, quantity: 1, totalPrice: item.price });
        }
        console.log(item.name);
    } else {
        console.error('Item not found in menuArray');
    }
    renderCart()
}

const cartDom = document.getElementById('order-box')
const fullCart = document.getElementById('order-container')
let total = document.getElementById('total-price')

function renderCart() {
    cartDom.classList.remove('hidden')
    fullCart.classList.remove('hidden')
    let productCartHTML = ""
    let grandTotal = 0

    cart.forEach(item => {
        productCartHTML += `
        <div class="hellobox">
        <div>${item.name}<button data-itemid="${item.id}" id="rem-btn" class="remove-btn">remove</button></div>
        <div>$${item.totalPrice}</div>
    </div>`
        grandTotal += item.totalPrice
    })
    fullCart.innerHTML = productCartHTML
    total.innerHTML = `$ ${grandTotal}`

    const remBtns = document.querySelectorAll(".remove-btn")

    remBtns.forEach(button => {
        button.addEventListener('click', function (e) {
            const itemId = e.target.dataset.itemid
            removeFromcart(itemId)
        })
    })
}

const compOrderButton = document.getElementById('complete-order-button')
compOrderButton.addEventListener('click', function () {
    payModal.classList.remove('hidden')
    blurOverlay.classList.remove('hidden')
})

function removeFromcart(itemId) {
    const itemIndex = cart.findIndex(product => {
        console.log(product.id)
        console.log(itemId)
        return product.id == itemId

    })

    if (itemIndex !== -1) {
        cart.splice(itemIndex, 1)
    }
    renderCart()
}

const payBtn = document.getElementById('payBtn')
let buyerNameInput = document.getElementById('name')

payBtn.addEventListener('click', function () {
    const oBox = document.getElementById('order-box')
    const buyerName = buyerNameInput.value.trim()
    if (buyerName) {
        payModal.classList.add('hidden')
        blurOverlay.classList.add('hidden')
        oBox.innerHTML = `<div class="thank-for-order">Thanks ${buyerName}, your order is on the way!</div> `
    } else {
        payBtn.innerText = "Please fill out each field"
    }
})

closePayModal.addEventListener('click', function () {
    payModal.classList.toggle('hidden')
    blurOverlay.classList.toggle('hidden')
    payBtn.innerText = "Pay"
})
document.querySelector("#pay-paymodal")

blurOverlay.addEventListener('click', function () {
    payModal.classList.toggle('hidden')
    blurOverlay.classList.toggle('hidden')
    payBtn.innerText = "Pay"
})

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        payModal.classList.add('hidden')
        blurOverlay.classList.add('hidden')
        payBtn.innerText = "Pay"
    }
});