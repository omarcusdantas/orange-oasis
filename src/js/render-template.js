$(document).ready(() => {
    $.get("./src/template/header.html", (data) => {
        $("header").prepend(data);
        setMenu();
    });

    $.get("./src/template/footer.html", (data) => {
        $("footer").prepend(data);
    });
});
