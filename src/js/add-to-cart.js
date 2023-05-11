// Saves the product to the cart and updates the cart in sessionStorage
function saveProduct(cart, productScreen, product) {
    Array.isArray(cart) ? cart.push(product) : (cart = [product]);

    const data = JSON.stringify(cart);
    sessionStorage.setItem("cart", data);
    productScreen.toggleClass("hidden");

    checkCart();
}

// Gets the product informations when "Add to Cart" button is clicked an then saves it in the cart.
function addToCart() {
    let cart = JSON.parse(sessionStorage.getItem("cart"));

    const productScreen = $(".product-screen");
    const productInfo = $(".product-table");
    const productSizeSelect = productInfo.find("#product-size");
    const productSize = productSizeSelect.val();

    const product = {
        img: productInfo.find("img").attr("src"),
        name: productInfo.find("#product-name").text(),
        price: productInfo.find("#product-price").text(),
        size: productSize,
        quantity: productInfo.find("#product-quantity").val(),
    };

    if (productSize === "") {
        productSizeSelect.addClass("choose-size");
        return;
    }
    productSizeSelect.removeClass("choose-size");

    saveProduct(cart, productScreen, product);
}
