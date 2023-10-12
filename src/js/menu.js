let nav, menu, menuButton, notMenu;

const timeMenuAnimation = 250;

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

function toggleMenuHeight() {
    menu.toggleClass("menu-height");
}

function toggleNav() {
    nav.toggleClass("show");
}

function disableMenu() {
    toggleMenuHeight();
    setTimeout(toggleNav, timeMenuAnimation);
    notMenu.off("click");
}

function setDisableMenuEvent() {
    notMenu.on("click", disableMenu);
}

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
        setTimeout(setDisableMenuEvent, timeMenuAnimation);
    });

    checkCart();
}
