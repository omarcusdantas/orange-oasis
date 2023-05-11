// Selecting DOM elements.
const nav = $("nav");
const menu = $("nav ul");
const menuButton = $(".hamburger-menu");
const notMenu = $("body");

// Time for menu animation.
const timeMenuAnimation = 250;

// Change menu height.
function toggleMenuHeight() {
    menu.toggleClass("menu-height");
}

// Toggle navigation visibility.
function toggleNav() {
    nav.toggleClass("show");
}

// Disable menu after finish animation.
function disableMenu() {
    toggleMenuHeight();
    setTimeout(toggleNav, timeMenuAnimation);
    notMenu.off("click");
}

// Set event handler to close menu when clicked outside it
function setMenuUnselected() {
    notMenu.on("click", disableMenu);
}

// Click event listener for hamburger menu.
menuButton.click(() => {
    if (nav.hasClass("show")) {
        disableMenu();
        return;
    }
    toggleNav();
    setTimeout(toggleMenuHeight, 1);
    setTimeout(setMenuUnselected, timeMenuAnimation);
});

// Check the cart and update cart icon.
function checkCart() {
    const cart = JSON.parse(sessionStorage.getItem("cart"));
    const cartInfo = $(".cart-info");

    if (Array.isArray(cart) && cart.length != 0) {
        cartInfo.removeClass("cart-empty");
        cartInfo.find("p").text(`${cart.length}`);
        return;
    }

    cartInfo.addClass("cart-empty");
}

// Call checkCart function on document ready
$(document).ready(checkCart);
