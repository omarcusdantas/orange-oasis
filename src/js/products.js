function toggleButton(num) {
    $(".current-button").removeClass("current-button");
    $(`#${num}-button`).addClass("current-button");
}

function togglePage(page) {
    page.toggleClass("hidden")
        .toggleClass("current")
        .css("opacity", 0)
        .animate({ opacity: 1 }, 1000);
}

function forwardButton(current, numCurrent) {
    if (numCurrent !== 2) {
        const newPage = $(`#${numCurrent+1}-page`);
        togglePage(current);
        togglePage(newPage);
        toggleButton(numCurrent+1);
    }
}

function backButton(current, numCurrent) {
    if (numCurrent !== 1) {
        const newPage = $(`#${numCurrent-1}-page`);
        togglePage(current);
        togglePage(newPage);
        toggleButton(numCurrent-1);
    }
}

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

$(".page-button").click(function() {
    changePage($(this));
});

fetch("./src/products-list.json")
    .then(response => response.json())
    .then(data => {
        renderPages(data);
    });

function renderPages(products) {
    const container = $("main");
    const numberPages = Math.ceil(products.length/12);
    const page = $('<div/>', {class: 'container allproducts current', id: '1-page'})
    for (let i = 0; i < 12; i++) {
        const rating = products[i].rating;
        let stars = "";
        for (let j = 0; j < Math.floor(rating); j++) {
            stars += `<ion-icon name="star"></ion-icon>`
        }
        if (Math.floor(rating) != rating) {
            stars += `<ion-icon name="star-half-outline"></ion-icon>`
        }
        if (rating<4.5) {
            console.log("oi")
            for (let l = Math.ceil(rating); l<5; l++) {
                stars += `<ion-icon name="star-outline"></ion-icon>`
            }
        }
        const productHtml = `
            <div class="product" id="${products[i].id}">
                <img src="${products[i].image}" alt="${products[i].name}">
                <h4>${products[i].name}</h4>
                <div class="rating">
                    ${stars}
                </div>
                <p>${products[i].price}</p>
            </div>
        `;
        page.append(productHtml);
    } 
    page.appendTo(container);

    for (let i = 2; i <= numberPages; i++) {
        const page = $('<div/>', {class: 'container allproducts hidden', id: `${i}-page`})
        for (let j = 0; j < 12; j++) {
            const rating = products[j+12*(i-1)].rating;
            let stars = "";
            for (let k = 0; k < Math.floor(rating); k++) {
                stars += `<ion-icon name="star"></ion-icon>`
            }
            if (Math.floor(rating) != rating) {
                stars += `<ion-icon name="star-half-outline"></ion-icon>`
            }
            if (rating<4.5) {
                console.log("oi")
                for (let l = Math.ceil(rating); l<5; l++) {
                    stars += `<ion-icon name="star-outline"></ion-icon>`
                }
            }
            const productHtml = `
                <div class="product" id="${products[j+12*(i-1)].id}">
                    <img src="${products[j+12*(i-1)].image}" alt="${products[j+12*(i-1)].name}">
                    <h4>${products[j+12*(i-1)].name}</h4>
                    <div class="rating">
                        ${stars}
                    </div>
                    <p>${products[j+12*(i-1)].price}</p>
                </div>
            `;
            page.append(productHtml);
        } 
        page.appendTo(container);
    };
    setProducts();
}