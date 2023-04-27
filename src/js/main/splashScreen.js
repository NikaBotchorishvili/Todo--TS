const splashScreenElements = document.querySelectorAll(".splash-screen-element");
const splashScreenElement = document.querySelector(".splash-screen");
window.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        splashScreenElements.forEach((element, id) => {
            setTimeout(() => {
                element.classList.add("splash-active");
            }, (id + 1) * 400);
        });
        setTimeout(() => {
            splashScreenElements.forEach((element, id) => {
                setTimeout(() => {
                    element.classList.remove("splash-active");
                    element.classList.add("splash-fade");
                }, (id + 1) * 200);
            });
        }, 4000);
        setTimeout(() => {
            splashScreenElement.style.top = "-100vh";
        }, 2000);
    }, 500);
});
