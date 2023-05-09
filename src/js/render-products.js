function renderProduct(product, products) {
    const productId = Number(product.attr("id"));
    const container = $(".product-table");
    const currentProduct = products[productId-1];
    container.empty();
    
    const productHTML = `
        <img src="${currentProduct.image}" alt="${currentProduct.name}">
        <div class="product-info">
            <h2 id="product-name">${currentProduct.name}</h2>
            <h3 id="product-price">${currentProduct.price}</h3>
            <select id="product-size">
                <option value="">Select size</option>
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
            </select>
            <input type="number" value="1" id="product-quantity">
            <button id="add">Add To Cart</button>
            <h3>Product Details</h3>
            <p>
                ${currentProduct.description}
            </p>
        </div>
        <ion-icon name="close-circle"></ion-icon>
    `
    container.append(productHTML);

    const productScreen = $(".product-screen");
    const closeButton = $(".product-table ion-icon");
    const productSizeSelect = $(".product-table").find("#product-size");

    productScreen.toggleClass("hidden");

    productScreen.click((event) => {
        if (event.target === productScreen[0] || event.target === closeButton[0]) {
            productScreen.toggleClass("hidden");
            productSizeSelect.removeClass("choose-size");
        }
    });

    $("#add").click(addToCart);
}


function setProducts() {

    fetch("./src/products-list.json")
    .then(response => response.json())
    .then(data => {
        $(".product").click(function () {
            renderProduct($(this),data);
        })
    });
}

$(document).ready(function(){
    const currentUrl = window.location.href;
    if (currentUrl.includes("index.html")) {
        setProducts();
    } 
});