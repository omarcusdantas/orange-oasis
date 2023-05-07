const productScreen = $(".product-screen");
const closeButton = $(".product-table ion-icon");
const productSizeSelect = $(".product-table").find("#product-size");

$(".product").click(()=> {
    productScreen.toggleClass("hidden");
})

productScreen.click((event) => {
    if (event.target === productScreen[0] || event.target === closeButton[0]) {
        productScreen.toggleClass("hidden");
        productSizeSelect.removeClass("choose-size");
    }
});
  