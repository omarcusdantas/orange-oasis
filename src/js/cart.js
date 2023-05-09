let products = JSON.parse(sessionStorage.getItem("cart"));

function excludeItem(index) {
    products.splice(index, 1);
    const data = JSON.stringify(products);
    sessionStorage.setItem("cart", data);
    renderCart();
    checkCart();
}

function changeQuantity(index, quantity) {
    products[index].quantity = quantity;
    const data = JSON.stringify(products);
    sessionStorage.setItem("cart", data);
    renderCart();
    checkCart();
}

function renderCart() {
    const cartItems = $('.cart-items');

    if (!Array.isArray(products) || products.length === 0) {
        cartItems.empty();
        const productHtml = `
            <div class="cart-item">
                <h3 class="empty">Your cart is empty. Come back after you finish shopping.</h3>
            </div>
        `;
        cartItems.append(productHtml);
        $("#total").text(`$0.00`);
        $("#subtotal").text(`$0.00`);
        return;
    }

    let total = 0;
    cartItems.empty();

    products.forEach((product, index) => {
        const price = Number(product.price.substring(1));
        const quantity = Number(product.quantity)

        const productHtml = `
            <div class="cart-item" id="${index}">
                <ion-icon name="close-circle"></ion-icon>
                <div class="cart-product">
                    <img src="${product.img}">
                    <h4>${product.name}<br>${product.size}<br>${product.price}</h4>
                </div>
                <div class="item-total">
                    <div class="quantity">
                    <h4>Quantity</h4>
                    <input type="number" value="${product.quantity}">
                    </div>
                    <div class="sub-total">
                    <h4>Sub-total</h4>
                    <h4>$${(price*quantity).toFixed(2)}</h4>
                    </div>
                </div>
            </div>
        `;
        cartItems.append(productHtml);
        total += price*quantity;
    })

    $("#total").text(`$${total.toFixed(2)}`);
    $("#subtotal").text(`$${total.toFixed(2)}`);

    $(".cart-item ion-icon").click(function() {
        const index = $(this).parent().attr("id");
        excludeItem(index);
    });

    $(".item-total input").change(function() {
        const index = $(this).closest('.cart-item').attr("id");
        const quantity = $(this).val();
        changeQuantity(index, quantity);
    });
}

$(document).ready(renderCart);

$("#coupom-button").click(() => {
    $("#coupom-input").addClass("wrong-coupom")
})