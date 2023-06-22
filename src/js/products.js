// Define a variable to store the total number of product pages.
let numberPages;

// Toggle the active button
function toggleButton(num) {
    $(".current-button").removeClass("current-button");
    $(`#${num}-button`).addClass("current-button");
}

// Toggle the visibility of the current and new page.
function togglePage(page) {
    page.toggleClass("hidden")
        .toggleClass("current")
        .css("opacity", 0)
        .animate({ opacity: 1 }, 1000);
}

// Move to the next page.
function forwardButton(current, numCurrent) {
    if (numCurrent !== numberPages) {
        const newPage = $(`#${numCurrent + 1}-page`);
        togglePage(current);
        togglePage(newPage);
        toggleButton(numCurrent + 1);
    }
}

// Move to the previous page.
function backButton(current, numCurrent) {
    if (numCurrent !== 1) {
        const newPage = $(`#${numCurrent - 1}-page`);
        togglePage(current);
        togglePage(newPage);
        toggleButton(numCurrent - 1);
    }
}

// Change the current page.
function changePage(element) {
    const current = $(".current");
    const numCurrent = parseInt(current.attr("id"));
    const idButton = element.attr("id");

    if (idButton === "back-button") {
        backButton(current, numCurrent);
        return;
    }
    if (idButton === "foward-button") {
        forwardButton(current, numCurrent);
        return;
    }

    const numButton = parseInt(idButton);
    if (numCurrent === numButton) {
        return;
    }
    const newPage = $(`#${numButton}-page`);
    togglePage(current);
    togglePage(newPage);
    toggleButton(numButton);
}

// Render a button with given index.
function renderButton(index) {
    if (index === 1) {
        return `<div class="page-button current-button" id="1-button"><p>1</p></div>`;
    }
    return `<div class="page-button" id="${index}-button"><p>${index}</p></div>`;
}

// Render all the page buttons.
function renderButtons() {
    const buttonsContainer = $(".toggle-page");
    const backButtonHtml = `<div class="page-button" id="back-button"><p><</p></div>`;
    const fowardButtonHtml = `<div class="page-button" id="foward-button"><p>></p></div>`;
    const buttonsHtml = [];
    buttonsHtml.push(backButtonHtml);

    for (let i = 1; i <= numberPages; i++) {
        const buttonHtml = renderButton(i);
        buttonsHtml.push(buttonHtml);
    }

    buttonsHtml.push(fowardButtonHtml);

    const buttonsContainerHtml = buttonsHtml.join("");
    buttonsContainer.html(buttonsContainerHtml);

    $(".page-button").click(function () {
        changePage($(this));
    });
}

// Generate HTML code for product rating stars.
function ratingHtml(rating) {
    let ratingHtml = "";
    for (let i = 0; i < Math.floor(rating); i++) {
        ratingHtml += `<ion-icon name="star"></ion-icon>`;
    }
    if (Math.floor(rating) != rating) {
        ratingHtml += `<ion-icon name="star-half-outline"></ion-icon>`;
    }
    if (rating < 4.5) {
        for (let i = Math.ceil(rating); i < 5; i++) {
            ratingHtml += `<ion-icon name="star-outline"></ion-icon>`;
        }
    }
    return ratingHtml;
}

// Render the HTML for a single product.
function renderProduct(product) {
    const { id, image, name, price, rating } = product;
    let stars = ratingHtml(rating);

    const productHtml = `
        <div class="product" id="${id}">
            <img src="${image}" alt="${name}">
            <h4>${name}</h4>
            <div class="rating">
                ${stars}
            </div>
            <p>${price}</p>
        </div>
    `;

    return productHtml;
}

// Render a single page of products.
function renderPage(pageNumber, products) {
    const container = $("main");
    const visibility = pageNumber === 1 ? "current" : "hidden";
    const page = $("<div/>", {
        class: `container allproducts ${visibility}`,
        id: `${pageNumber}-page`,
    });
    const productsHtml = [];

    for (let i = 0; i < 12; i++) {
        const product = products[i + 12 * (pageNumber - 1)];
        let productHtml = renderProduct(product);
        productsHtml.push(productHtml);
    }

    const pageHtml = productsHtml.join("");
    page.html(pageHtml);
    page.appendTo(container);
}

// Render all pages of products.
function renderPages(products) {
    const productsPerPage = 12;
    numberPages = Math.ceil(products.length / productsPerPage);

    for (let i = 1; i <= numberPages; i++) {
        renderPage(i, products);
    }

    renderButtons();
    setProducts();
}

// Call products saved in json file and render products pages with them.
$(document).ready(() => {
    $.ajax({
        url: "./src/products-list.json",
        dataType: "json",
        success: function(data) {
            renderPages(data);
        }
    });
});
