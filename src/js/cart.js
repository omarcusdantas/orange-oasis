// Parse the "cart" item from sessionStorage as a JSON string and store it in the "products" variable.
let products = JSON.parse(sessionStorage.getItem("cart"));

// Update the "cart" item in sessionStorage with the new "products" array as a JSON string.
function updateCart(products) {
    const data = JSON.stringify(products);
    sessionStorage.setItem("cart", data);
    renderCart();
    checkCart();
}

// Remove the item at the specified index from the "products" array.
function excludeItem(index) {
    products.splice(index, 1);
    updateCart(products);
}

// Change the quantity of the item at the specified index in the "products" array.
function changeQuantity(index, quantity) {
    products[index].quantity = quantity;
    updateCart(products);
}

// Attach event handlers to the close button and quantity input of each cart item.
function setEventHandlers() {
    $(".cart-item ion-icon").click(function () {
        const index = $(this).parent().attr("id");
        excludeItem(index);
    });

    $(".item-total input").change(function () {
        const index = $(this).closest(".cart-item").attr("id");
        const quantity = $(this).val();
        changeQuantity(index, quantity);
    });
}

// Display a message indicating that the cart is empty.
function cartEmpty(cartItems) {
    const productHtml = `
        <div class="cart-item">
            <h3 class="empty">Your cart is empty. Come back after you finish shopping.</h3>
        </div>
    `;
    cartItems.html(productHtml);

    $("#total").text(`$0.00`);
    $("#subtotal").text(`$0.00`);
}

// Render a single cart item as HTML.
function renderCartItem(product, index) {
    const { name, image, size, price, quantity } = product;
    const numberPrice = Number(price.substring(1));
    const numberQuantity = Number(quantity);

    const itemHtml = `
        <div class="cart-item" id="${index}">
            <ion-icon name="close-circle"></ion-icon>
            <div class="cart-product">
                <img src="${image}">
                <h4>${name}<br>${size}<br>${price}</h4>
            </div>
            <div class="item-total">
                <div class="quantity">
                <h4>Quantity</h4>
                <input type="number" value="${quantity}" min="1">
                </div>
                <div class="sub-total">
                <h4>Sub-total</h4>
                <h4>$${(numberPrice * numberQuantity).toFixed(2)}</h4>
                </div>
            </div>
        </div>
    `;

    return itemHtml;
}

// Render the cart based on the products in the sessionStorage.
function renderCart() {
    const cartItems = $(".cart-items");

    if (!Array.isArray(products) || products.length === 0) {
        cartEmpty(cartItems);
        return;
    }

    let total = 0;
    const itemsHtml = [];

    products.forEach((product, index) => {
        const itemHtml = renderCartItem(product, index);
        itemsHtml.push(itemHtml);
        total += Number(product.price.substring(1)) * Number(product.quantity);
    });

    const cartHtml = itemsHtml.join("");
    cartItems.html(cartHtml);

    $("#total").text(`$${total.toFixed(2)}`);
    $("#subtotal").text(`$${total.toFixed(2)}`);

    setEventHandlers();
}

// Called when the page finishes loading and sets up the list of products.
$(document).ready(() => {
    // Event handler for the coupon button click event.
    $("#coupom-button").click(() => {
        $("#coupom-input").addClass("wrong-coupom");
    });

    // Event handler for the proceed button click event.
    $("#proceed").click(() => {
        alert("Thank you for your preference!");
    });

    renderCart();
});
