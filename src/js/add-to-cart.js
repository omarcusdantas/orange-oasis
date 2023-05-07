function addToCart() {
    
    let cart = JSON.parse(sessionStorage.getItem("cart"));

    const productInfo = $(".product-table");
    const productImg = productInfo.find("img").attr("src");
    const productName = productInfo.find("#product-name").text();
    const productPrice = productInfo.find("#product-price").text();
    const productSizeSelect = productInfo.find("#product-size");
    const productSize = productSizeSelect.val();
    const productQuantity = productInfo.find("#product-quantity").val();

    if (productSize === "") {
        productSizeSelect.addClass("choose-size");
        return;
    }
    productSizeSelect.removeClass("choose-size");

    const product = {
        img: productImg,
        name: productName,
        price: productPrice,
        size: productSize,
        quantity: productQuantity
    };

    if (Array.isArray(cart)) {
        cart.push(product);
    }
    else {
        cart = [product];
    }

    const data = JSON.stringify(cart);
    sessionStorage.setItem("cart", data);
    productScreen.toggleClass("hidden");

    checkCart();
}

$("#add").click(addToCart);