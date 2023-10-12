function saveProductInCart(cart, productScreen, product) {
    Array.isArray(cart) ? cart.push(product) : (cart = [product]);

    const data = JSON.stringify(cart);
    sessionStorage.setItem("cart", data);
    productScreen.toggleClass("hidden");

    checkCart();
}

function getProductInfo(products, id) {
    let cart = JSON.parse(sessionStorage.getItem("cart"));

    const productScreen = $(".product-screen");
    const productInfo = $(".product-table");
    const productSizeSelect = productInfo.find("#product-size");
    const productSize = productSizeSelect.val();

    if (productSize === "") {
        productSizeSelect.addClass("choose-size");
        return;
    }
    productSizeSelect.removeClass("choose-size");

    const product = products[id - 1];
    product.size = productSize;
    product.quantity = productInfo.find("#product-quantity").val();

    saveProductInCart(cart, productScreen, product);
}

function fetchProduct(id) {
    $.ajax({
        url: "./src/products-list.json",
        dataType: "json",
        success: function(data) {
            getProductInfo(data, id);
        }
    });
}
