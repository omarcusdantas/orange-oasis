function addToCart() {
    const cart = JSON.parse(sessionStorage.getItem("cart"));

    const productInfo = $(".product-table");
    const productImg = productInfo.find("img").attr("src");
    const productName = productInfo.find("#product-name").text();
    const productPrice = productInfo.find("#product-price").text();
    const productSize = productInfo.find("#product-size").val();
    const productQuantity = productInfo.find("#product-quantity").val();

    const product = {
        img: productImg,
        name: productName,
        price: productPrice,
        size: productSize,
        quantity: productQuantity
    };

    cart.push(product);

    const data = JSON.stringify(cart);
    sessionStorage.setItem("cart", data);
    productScreen.toggleClass("hidden");

    checkCart();
}

$("#add").click(addToCart);