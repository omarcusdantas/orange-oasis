// Menu variables
let nav, menu, menuButton, notMenu;

// Time for menu animation.
const timeMenuAnimation = 250;

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
function setDisableMenu() {
    notMenu.on("click", disableMenu);
}

// Click event listener for hamburger menu.
function setMenu() {
    nav = $("nav");
    menu = $("nav ul");
    menuButton = $(".hamburger-menu");
    notMenu = $("body");

    menuButton.click(() => {
        if (nav.hasClass("show")) {
            disableMenu();
            return;
        }
        toggleNav();
        setTimeout(toggleMenuHeight, 1);
        setTimeout(setDisableMenu, timeMenuAnimation);
    });

    checkCart();
}
