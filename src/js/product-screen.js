function setProductScreen(id) {
    const productScreen = $(".product-screen");
    const closeButton = $(".product-table ion-icon");
    const productSizeSelect = $(".product-table").find("#product-size");

    $("#add").click(() => fetchProduct(id));
    productScreen.toggleClass("hidden");

    productScreen.on("click", (event) => {
        if (
            event.target === productScreen[0] ||
            event.target === closeButton[0]
        ) {
            productScreen.toggleClass("hidden");
            productSizeSelect.removeClass("choose-size");
            productScreen.off("click");
        }
    });
}

function getSizeHtml(type) {
    let sizeHtml = "";
    if (type === "sneakers") {
        sizeHtml = `
            <option value="">Select size</option>
            <option value="36">36</option>
            <option value="37">37</option>
            <option value="38">38</option>
            <option value="39">39</option>
            <option value="40">40</option>
            <option value="41">41</option>
            <option value="42">42</option>
            <option value="43">43</option>
            <option value="44">44</option>
        `;
        return sizeHtml;
    }

    sizeHtml = `
        <option value="">Select size</option>
        <option value="Small">Small</option>
        <option value="Medium">Medium</option>
        <option value="Large">Large</option>
        <option value="XL">XL</option>
        <option value="XXL">XXL</option>
    `;
    return sizeHtml;
}

function renderProductScreen(product, products) {
    const productId = Number(product.attr("id"));
    const currentProduct = products[productId - 1];
    const { id, image, name, price, description, type } = currentProduct;
    const container = $(".product-table");

    const sizeHtml = getSizeHtml(type);

    const productHTML = `
        <img src="${image}" alt="${name}">
        <div class="product-info">
            <h2 id="product-name">${name}</h2>
            <h3 id="product-price">${price}</h3>
            <select id="product-size">
                ${sizeHtml}
            </select>
            <input type="number" value="1" id="product-quantity" min="1">
            <button id="add">Add To Cart</button>
            <h3>Product Details</h3>
            <p>
                ${description}
            </p>
        </div>
        <ion-icon name="close-circle"></ion-icon>
    `;
    container.html(productHTML);
    setProductScreen(id);
}

function setProducts() {
    $.ajax({
        url: "./src/products-list.json",
        dataType: "json",
        success: function(data) {
            $(".product").click(function() {
                renderProductScreen($(this), data);
            });
        }
    });
}

// Called when the page finishes loading and sets up the products list if the user is on the home page.
$(document).ready(function () {
    if ($(".banners").length !== 0) {
        setProducts();
    }
});
