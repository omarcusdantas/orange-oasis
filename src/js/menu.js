const nav = $("nav");
const menu = $("nav ul");
const menuButton = $(".hamburger-menu");
const notMenu = $("body").not("nav, .hamburger-menu");

function toggleMenuHeight() {
    menu.toggleClass("menu-height");    
}

function toggleNav() {
    nav.toggleClass("show");
}

function disableMenu() {
    toggleMenuHeight();
    setTimeout(toggleNav, 250);
    notMenu.off("click");
}

function placeMenuUnselected () {
    notMenu.on("click", disableMenu);
}

menuButton.click(() => {
    if (nav.hasClass("show")) {
        disableMenu();
        return;
    }
    toggleNav();
    setTimeout(toggleMenuHeight, 1);
    setTimeout(placeMenuUnselected, 250);
});

function checkCart() {
    const cart = JSON.parse(sessionStorage.getItem("cart"));
    cartInfo = $(".cart-info");

    if (cart.length != 0) {
        cartInfo.removeClass("cart-empty");
        cartInfo.find("p").text(`${cart.length}`);
        return;
    }

    if (!cartInfo.hasClass("cart-empty")) {
        cartInfo.addClass("cart-empty");
    }
}

$(document).ready(checkCart);