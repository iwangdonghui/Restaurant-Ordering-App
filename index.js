import { menuArray } from './data.js';

const orderSummaryEl = document.getElementById("order-summary")
const modalEl = document.getElementById("modal")
const orderCompleteEl = document.getElementById("order-complete")

let orderItems = []

document.addEventListener("submit", function(e) {
    e.preventDefault()
        console.log("Submitted")
    // if (e.target.id === "pay-button") {
        handlePayButton()    
    // }    
})

document.addEventListener("click", function(e) {
    if (e.target.id === "complete-order") {
        handleCompleteOrder()
    } else if (e.target.dataset.menuItem) {
        handleAddMenuItem(parseInt(e.target.dataset.menuItem))
    } else if (e.target.dataset.removeItem) {
        handleRemoveMenuItem(parseInt(e.target.dataset.removeItem))
    }
})

function handleRemoveMenuItem(itemId) {
    orderItems = orderItems.filter(function(item) {
        return item.id !== itemId
    })
    render()
}

function handleAddMenuItem(itemId) {
    
    const menuItemObj = menuArray.filter(function(item) {
        if (item.id === itemId)
            return true
        else {
            return false
        }
    })[0]
    orderItems.push(menuItemObj)
    render()
}

function handleCompleteOrder() {
    modalEl.style.display = 'flex'
    // document.getElementById("order-container").style.background = 'background: linear-gradient(      rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45))'       
}

function handlePayButton() {
      modalEl.style.display = 'none'
      const name = document.getElementById("payment-name").value
      const orderCompleteHtml = `<p>Thank you, ${name}! Your order is on its way!</p>`
      orderCompleteEl.innerHTML = orderCompleteHtml
      orderCompleteEl.style.display = 'block'
      orderSummaryEl.style.display = 'none'
}

function getOrderTotalHtml() {
    const initialValue = 0;
    const total = orderItems.reduce(function(accumulator, item) {
        return accumulator + item.price
    },initialValue)
    
    const orderTotalHtml = `
    <p>Total Price:</p>
    <p class="total-price">${total}</p>
    `
    
    return orderTotalHtml
}

function getOrderItemsHtml() {
    let orderItemsHtml = ``
    orderItems.forEach(function(orderItem) {
        orderItemsHtml += `
            <div class="order-item">
                <p class="order-item-name">${orderItem.name}</p>
                <button type="button" class="remove-btn" data-remove-item="${orderItem.id}">Remove</button>
                <p class="order-price">${orderItem.price}</p>
            </div>
        `
    })
    return orderItemsHtml
}

function getMenuItemsHtml() {
    let menuItemsHtml = ``
    menuArray.forEach(function(menuItem) {
       menuItemsHtml += `
       <div class="menu-item">
            <div class="menu-item-image">${menuItem.emoji}</div>
            <div class="menu-item-details">
                <h2 class="menu-item-name">${menuItem.name}</h2>
                <p class="menu-item-ingredients">${menuItem.ingredients.join(", ")}</p>
                <p class="menu-item-price">$${menuItem.price}</p>
            </div>
            <button class="menu-item-btn" type="button" data-menu-item="${menuItem.id}">+</button>
       </div>
       `
    })
    
    return menuItemsHtml
}


function render() {
    document.getElementById("menu-items").innerHTML = getMenuItemsHtml()
    if (orderItems.length > 0) {
        orderSummaryEl.style.display = 'flex'
        document.getElementById("order-items").innerHTML = getOrderItemsHtml()
        document.getElementById("order-total").innerHTML = getOrderTotalHtml()
    } else {
        orderSummaryEl.style.display = 'none'
    }
}

render()


