let numberOfPages;

function setCurrentButton(num) {
    $(".current-button").removeClass("current-button");
    $(`#${num}-button`).addClass("current-button");
}

function togglePage(page) {
    page.toggleClass("hidden")
        .toggleClass("current")
        .css("opacity", 0)
        .animate({ opacity: 1 }, 1000);
}

function fowardPage(current, numCurrent) {
    if (numCurrent !== numberOfPages) {
        const newPage = $(`#${numCurrent + 1}-page`);
        togglePage(current);
        togglePage(newPage);
        setCurrentButton(numCurrent + 1);
    }
}

function previousPage(current, numCurrent) {
    if (numCurrent !== 1) {
        const newPage = $(`#${numCurrent - 1}-page`);
        togglePage(current);
        togglePage(newPage);
        setCurrentButton(numCurrent - 1);
    }
}

function changePage(element) {
    const current = $(".current");
    const numCurrent = parseInt(current.attr("id"));
    const idButton = element.attr("id");

    if (idButton === "back-button") {
        previousPage(current, numCurrent);
        return;
    }
    if (idButton === "foward-button") {
        fowardPage(current, numCurrent);
        return;
    }

    const numButton = parseInt(idButton);
    if (numCurrent === numButton) {
        return;
    }
    const newPage = $(`#${numButton}-page`);
    togglePage(current);
    togglePage(newPage);
    setCurrentButton(numButton);
}

function renderButton(index) {
    if (index === 1) {
        return `<div class="page-button current-button" id="1-button"><p>1</p></div>`;
    }
    return `<div class="page-button" id="${index}-button"><p>${index}</p></div>`;
}

function renderPageButtons() {
    const buttonsContainer = $(".toggle-page");
    const backButtonHtml = `<div class="page-button" id="back-button"><p><</p></div>`;
    const fowardButtonHtml = `<div class="page-button" id="foward-button"><p>></p></div>`;
    const buttonsHtml = [];
    buttonsHtml.push(backButtonHtml);

    for (let i = 1; i <= numberOfPages; i++) {
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

function renderProduct(product) {
    const { id, image, name, price, rating } = product;
    let stars = ratingHtml(rating);

    const productHtml = `
        <button class="product" id="${id}">
            <img src="${image}" alt="${name}">
            <h4>${name}</h4>
            <div class="rating">
                ${stars}
            </div>
            <p>${price}</p>
        </button>
    `;

    return productHtml;
}

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

function renderPages(products) {
    const productsPerPage = 12;
    numberOfPages = Math.ceil(products.length / productsPerPage);

    for (let i = 1; i <= numberOfPages; i++) {
        renderPage(i, products);
    }

    renderPageButtons();
    setProducts();
}

$(document).ready(() => {
    $.ajax({
        url: "./src/products-list.json",
        dataType: "json",
        success: function(data) {
            renderPages(data);
        }
    });
});
