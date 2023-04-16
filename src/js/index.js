const overlayElement = document.querySelector(".overlay");
const listsList = document.querySelector(".lists-list");
const createItemPopupButtonElement = document.querySelector(".open-create-popup");
const createPopupElement = document.querySelector(".create-popup");
const createListButton = document.querySelector(".create-list");
const cancelListCreateElement = document.querySelector(".cancel");
const headerInputElement = document.querySelector("input[name=header_input]");
const descriptionInputElement = document.querySelector("textarea[name=description_input]");
const asideElement = document.querySelector("aside");
const menuElement = document.querySelector(".fa-bars");
const listsArrowElement = document.querySelector(".fa-angle-left");
const listsListElement = document.querySelector(".lists-list");
listsArrowElement.addEventListener("click", () => {
    listsArrowElement.classList.toggle("rotate");
    listsListElement.classList.toggle("fade");
});
menuElement.addEventListener("click", () => {
    asideElement.classList.toggle("hide");
});
let listArray = [];
let counter = 1;
init();
createItemPopupButtonElement.addEventListener("click", () => {
    createPopupElement.classList.toggle("show");
    overlayElement.classList.toggle("show");
});
cancelListCreateElement.addEventListener("click", () => {
    exitPopup();
});
createListButton === null || createListButton === void 0 ? void 0 : createListButton.addEventListener("click", (e) => {
    e.preventDefault();
    let date = new Date();
    let headerInputValue = headerInputElement.value.trim();
    let descriptionInputValue = descriptionInputElement.value.trim();
    if (headerInputValue != "" &&
        headerInputValue.trim().length != 0 &&
        descriptionInputValue != "" &&
        descriptionInputValue.trim().length != 0) {
        let todoInfo = createListElement(counter, headerInputValue, descriptionInputValue, date);
        listArray.push(todoInfo);
        window.localStorage.setItem("list", JSON.stringify(listArray));
        headerInputElement.value = "";
        descriptionInputElement.value = "";
        exitPopup();
        counter++;
    }
});
function createListElement(id, header, description, date) {
    const itemContainer = document.createElement("li");
    const listCircle = document.createElement("i");
    const listHeader = document.createElement("h4");
    ;
    listHeader.innerText = header;
    listHeader.setAttribute("data-list-id", id.toString());
    listCircle.classList.add("fa-solid");
    listCircle.classList.add("fa-circle");
    itemContainer.appendChild(listCircle);
    itemContainer.appendChild(listHeader);
    listsList.appendChild(itemContainer);
    return {
        id: counter,
        title: header,
        description: description,
        date: date,
    };
}
function init() {
    if (!window.localStorage.getItem("list")) {
        window.localStorage.setItem("list", "");
    }
    else {
        const temporaryListArray = JSON.parse(window.localStorage.getItem("list") || "");
        if (temporaryListArray.length > 0) {
            counter = temporaryListArray.slice(-1)[0].id + 1;
            listArray = temporaryListArray;
            temporaryListArray.forEach((element) => {
                createListElement(element.id, element.title, element.description, element.date);
            });
        }
    }
}
function exitPopup() {
    createPopupElement.classList.remove("show");
    overlayElement.classList.remove("show");
}
