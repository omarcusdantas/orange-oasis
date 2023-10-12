let products = JSON.parse(sessionStorage.getItem("cart"));

function updateCart(products) {
    const data = JSON.stringify(products);
    sessionStorage.setItem("cart", data);
    renderCart();
    checkCart();
}

function excludeItem(index) {
    products.splice(index, 1);
    updateCart(products);
}

function changeQuantity(index, quantity) {
    products[index].quantity = quantity;
    updateCart(products);
}

function setItemsEventHandlers() {
    $(".cart-item .exclude").click(function () {
        const index = $(this).parent().attr("id");
        excludeItem(index);
    });

    $(".item-total input").change(function () {
        const index = $(this).closest(".cart-item").attr("id");
        const quantity = $(this).val();
        changeQuantity(index, quantity);
    });
}

function cartIsEmpty(cartItems) {
    const productHtml = `
        <div class="cart-item">
            <h3 class="empty">Your cart is empty. Come back after you finish shopping.</h3>
        </div>
    `;
    cartItems.html(productHtml);

    $("#total").text(`$0.00`);
    $("#subtotal").text(`$0.00`);
}

function renderCartItem(product, index) {
    const { name, image, size, price, quantity } = product;
    const numberPrice = Number(price.substring(1));
    const numberQuantity = Number(quantity);

    const itemHtml = `
        <div class="cart-item" id="${index}">
            <button class="exclude"><ion-icon name="close-circle"></ion-icon></button>
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

function renderCart() {
    const cartItems = $(".cart-items");

    if (!Array.isArray(products) || products.length === 0) {
        cartIsEmpty(cartItems);
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

    setItemsEventHandlers();
}

$(document).ready(() => {
    $("#coupom-button").click(() => {
        $("#coupom-input").addClass("wrong-coupom");
    });

    $("#proceed").click(() => {
        alert("Thank you for your preference!");
    });

    renderCart();
});
