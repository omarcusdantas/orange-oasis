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