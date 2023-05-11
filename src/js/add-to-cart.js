// Saves the product to the cart and updates the cart in sessionStorage
function saveProduct(cart, productScreen, product) {
    Array.isArray(cart) ? cart.push(product) : (cart = [product]);

    const data = JSON.stringify(cart);
    sessionStorage.setItem("cart", data);
    productScreen.toggleClass("hidden");

    checkCart();
}

// Gets the product informations when "Add to Cart" button is clicked an then saves it in the cart.
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

    saveProduct(cart, productScreen, product);
}

// Gets the products list from JSON file.
function addToCart(id) {
    fetch("./src/products-list.json")
        .then((response) => response.json())
        .then((data) => {
            getProductInfo(data, id);
        });
}
