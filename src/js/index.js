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
    asideElement.classList.toggle("slide");
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
    listHeader.innerText = header;
    listHeader.setAttribute("data-list-id", id.toString());
    listCircle.classList.add("fa-solid");
    listCircle.classList.add("fa-circle");
    itemContainer.append(listCircle, listHeader);
    listsList.appendChild(itemContainer);
    const itemRect = itemContainer.getBoundingClientRect();
    const dropdown = dropDownActionList(id, itemRect);
    itemContainer.append(dropdown.dropDownButton, dropdown.dropdown);
    return {
        id: counter,
        title: header,
        description: description,
        date: date,
    };
}
function dropDownActionList(id, itemRect) {
    const iconClasses = [
        { name: "Edit List", classes: ["fa-solid", "fa-pen-to-square"] },
        { name: "Favorite List", classes: ["fa-regular", "fa-heart"] },
        { name: "Duplicate List", classes: ["fa-solid", "fa-clone"] },
        { name: "Archive List", classes: ["fa-solid", "fa-box-archive"] },
        { name: "Delete List", classes: ["fa-solid", "fa-trash"] },
    ];
    const dropdown = document.createElement("div");
    const dropdownButton = document.createElement("div");
    const ellipsisElement = document.createElement("i");
    const actionMenuElement = document.createElement("ul");
    const menuRect = ellipsisElement.getBoundingClientRect();
    actionMenuElement.classList.add("action-menu");
    ellipsisElement.classList.add("fa-solid", "fa-ellipsis");
    dropdownButton.classList.add("dropdown-button");
    dropdownButton.appendChild(ellipsisElement);
    dropdown.classList.add("dropdown", "hide");
    dropdownButton.addEventListener("click", () => {
        dropdown.classList.toggle("hide");
    });
    iconClasses.forEach((icon) => {
        const liElement = document.createElement("li");
        const iconElement = document.createElement("i");
        const headerElement = document.createElement("small");
        liElement.classList.add("action-menu-item");
        iconElement.classList.add(...icon.classes);
        headerElement.innerText = icon.name;
        liElement.append(iconElement, headerElement);
        actionMenuElement.append(liElement);
    });
    dropdown.style.top = `${itemRect.top}px`;
    dropdown.style.left = `${itemRect.right + 30}px`;
    console.log(itemRect);
    dropdown.append(actionMenuElement);
    dropdown.setAttribute("data-id", id.toString());
    return { dropDownButton: dropdownButton, dropdown: dropdown };
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
