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
    if (cart.length != 0) {
        console.log(cart);
        $(".cart-info").removeClass("cart-empty");
        $(".cart-info p").text(`${cart.length}`);
    }
}

$(document).ready(checkCart);