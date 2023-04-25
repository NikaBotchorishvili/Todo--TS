"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const overlayElement = document.querySelector(".overlay");
const listsList = document.querySelector(".lists-list");
const favoritesList = document.querySelector(".favorites-list");
const createItemPopupButtonElement = document.querySelector(".open-create-popup");
const createPopupElement = document.querySelector(".create-popup");
const createListButton = document.querySelector(".create-list");
const cancelListCreateElement = document.querySelector(".create-cancel");
const headerInputElement = document.querySelector("input[name=header_input]");
const descriptionInputElement = document.querySelector("textarea[name=description_input]");
const asideElement = document.querySelector("aside");
const menuElement = document.querySelector(".fa-bars");
const expandList = document.querySelector(".expand-list");
const expandFavorites = document.querySelector(".expand-favorites");
const dropDownElement = document.querySelector(".dropdown");
const editButtonElement = document.querySelector(".edit");
const editPopupElement = document.querySelector(".edit-popup");
const editHeaderInputElement = document.querySelector("input[name=edit_header_input]");
const editDescriptionInput = document.querySelector("textarea[name=edit_description_input]");
const editCancelButton = document.querySelector(".edit-cancel");
const editSubmitButton = document.querySelector(".edit-list");
const favoriteButtonElement = document.querySelector(".favorite");
const duplicateButtonElement = document.querySelector(".duplicate");
const deleteButtonElement = document.querySelector(".delete");
const deleteSubmitButtonElement = document.querySelector(".delete-list");
const deletePopupElement = document.querySelector(".delete-popup");
const deleteCancelElement = document.querySelector(".delete-cancel");
let lastToggledDropDown = 0;
let listArray = [];
let counter = 1;
init();
createItemPopupButtonElement.addEventListener("click", () => {
    createPopupElement.classList.add("show");
    enterPopup();
});
cancelListCreateElement.addEventListener("click", () => {
    createPopupElement.classList.remove("show");
    exitPopup();
});
createListButton === null || createListButton === void 0 ? void 0 : createListButton.addEventListener("click", (e) => {
    e.preventDefault();
    let date = new Date();
    let headerInputValue = headerInputElement.value.trim();
    let descriptionInputValue = descriptionInputElement.value.trim();
    if (headerInputValue != "" && descriptionInputValue != "") {
        let todoInfo = createListElement(counter, headerInputValue, descriptionInputValue, date, false);
        listArray.push(todoInfo);
        preUpdate();
        headerInputElement.value = "";
        descriptionInputElement.value = "";
        createPopupElement.classList.remove("show");
        exitPopup();
        counter++;
    }
});
editButtonElement.addEventListener("click", () => {
    let id = dropDownElement.dataset.id;
    editPopupElement.classList.add("show");
    let item = listArray.filter((listItem) => listItem.id == Number(id))[0];
    editHeaderInputElement.value = item.title;
    editDescriptionInput.value = item.description;
    enterPopup();
});
editCancelButton.addEventListener("click", (e) => {
    e.preventDefault();
    exitPopup();
    hideDropDown();
    editPopupElement.classList.remove("show");
});
editSubmitButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (editHeaderInputElement.value.trim() != "" &&
        editDescriptionInput.value.trim() != "") {
        let id = dropDownElement.dataset.id;
        listArray = listArray.map((item) => {
            if (item.id == Number(id)) {
                return Object.assign(Object.assign({}, item), { title: editHeaderInputElement.value, description: editDescriptionInput.value });
            }
            return item;
        });
        editDescriptionInput.value = "";
        editDescriptionInput.value = "";
        preUpdate();
        exitPopup();
        editPopupElement.classList.remove("show");
        init();
    }
});
favoriteButtonElement.addEventListener("click", () => {
    let id = dropDownElement.dataset.id;
    let dropdownFavorite = document.querySelector(".dropdown-favorite");
    listArray = listArray.map((listItem) => {
        if (listItem.id == Number(id)) {
            return Object.assign(Object.assign({}, listItem), { favorite: !listItem.favorite });
        }
        return listItem;
    });
    let isFavorite = listArray.filter((item) => item.id == Number(id))[0]
        .favorite;
    if (isFavorite) {
        dropdownFavorite.classList.add("fill");
    }
    else {
        dropdownFavorite.classList.remove("fill");
    }
    preUpdate();
    init();
});
duplicateButtonElement.addEventListener("click", () => {
    let date = new Date();
    let id = dropDownElement.dataset.id;
    let item = listArray.filter((list) => list.id == Number(id))[0];
    counter++;
    let duplicateInfo = createListElement(counter, item.title, item.description, date, item.favorite);
    listArray.push(duplicateInfo);
    preUpdate();
});
deleteButtonElement.addEventListener("click", () => {
    deletePopupElement.classList.add("show");
    enterPopup();
});
deleteSubmitButtonElement.addEventListener("click", (e) => {
    e.preventDefault();
    let id = dropDownElement.dataset.id;
    listArray = listArray.filter((listItem) => listItem.id != Number(id));
    exitPopup();
    deletePopupElement.classList.remove("show");
    preUpdate();
    init();
    hideDropDown();
});
deleteCancelElement.addEventListener("click", (e) => {
    e.preventDefault();
    deletePopupElement.classList.remove("show");
    exitPopup();
});
expandList.addEventListener("click", () => {
    expandList.classList.toggle("rotate");
    listsList.classList.toggle("fade");
});
expandFavorites.addEventListener("click", () => {
    expandFavorites.classList.toggle("rotate");
    favoritesList.classList.toggle("fade");
});
menuElement.addEventListener("click", () => {
    asideElement.classList.toggle("slide");
});
function createListElement(id, header, description, date, favorite) {
    const itemContainer = document.createElement("li");
    const listHeader = document.createElement("h4");
    const openDropDownButtonElement = document.createElement("i");
    openDropDownButtonElement.classList.add("fa-solid", "fa-ellipsis");
    openDropDownButtonElement.setAttribute("data-id", id.toString());
    itemContainer.classList.add("lists-list-element");
    listHeader.innerText = header;
    listHeader.setAttribute("data-list-id", id.toString());
    itemContainer.append(listHeader, openDropDownButtonElement);
    listsList.appendChild(itemContainer);
    let itemContainerRect = itemContainer.getBoundingClientRect();
    openDropDownButtonElement.addEventListener("click", (e) => {
        OpenDropDownHandler(e, itemContainerRect, id, favorite);
    });
    return {
        id: counter,
        title: header,
        description: description,
        date: date,
        favorite: false,
        items: [],
    };
}
function createFavoriteElement(id, header, favorite) {
    const itemContainerElement = document.createElement("li");
    const favoriteIconElement = document.createElement("i");
    const favoriteHeaderElement = document.createElement("h4");
    itemContainerElement.setAttribute("data-id", id.toString());
    itemContainerElement.classList.add("list-favorite-element");
    favoriteIconElement.classList.add("fa-solid", "fa-heart", "fill");
    favoriteHeaderElement.innerText = header;
    favoriteIconElement.addEventListener("click", () => {
        listArray = listArray.map((item) => {
            if (item.id == id) {
                return Object.assign(Object.assign({}, item), { favorite: !item.favorite });
            }
            return item;
        });
        preUpdate();
        init();
    });
    itemContainerElement.append(favoriteHeaderElement, favoriteIconElement);
    favoritesList.append(itemContainerElement);
}
function OpenDropDownHandler(e, rect, id, favorite) {
    if (e.target instanceof HTMLElement) {
        const target = e.target;
        const datasetId = target.dataset.id;
        if (!target.dataset.toggled && target.dataset.toggled != "") {
            target.setAttribute("data-toggled", "");
            dropDownElement.style.top = `${rect.top}px`;
            dropDownElement.style.left = `${rect.right + 25}px`;
            document
                .querySelectorAll(".fa-ellipsis")
                .forEach((el) => {
                if (lastToggledDropDown.toString() == el.dataset.id) {
                    el.removeAttribute("data-toggled");
                }
            });
            favoriteFill(favorite);
            dropDownElement.setAttribute("data-id", datasetId);
            lastToggledDropDown = id;
            dropDownElement.classList.remove("hide");
        }
        else {
            dropDownElement.removeAttribute("data-id");
            hideDropDown();
            target.removeAttribute("data-toggled");
            lastToggledDropDown = 0;
        }
    }
}
function favoriteFill(favorite) {
    if (favorite) {
        document.querySelector(".dropdown-favorite").classList.add("fill");
    }
    else {
        document.querySelector(".dropdown-favorite").classList.remove("fill");
    }
}
function calculateTimeSince(timestamp) {
    const timeElapsed = Date.now() - timestamp;
    const days = Math.floor(timeElapsed / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeElapsed / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeElapsed / 1000 / 60) % 60);
    const seconds = Math.floor((timeElapsed / 1000) % 60);
    if (days > 1) {
        return `${days} days ago`;
    }
    else if (hours > 1) {
        return `${minutes} minutes ago`;
    }
    else if (seconds > 1) {
        return `${seconds} seconds ago`;
    }
    else {
        return "now";
    }
}
function init() {
    if (!window.localStorage.getItem("list")) {
        window.localStorage.setItem("list", "");
    }
    else {
        const temporaryListArray = JSON.parse(window.localStorage.getItem("list") || "");
        if (temporaryListArray.length > 0) {
            listsInit(temporaryListArray);
            favoritesInit(temporaryListArray);
        }
    }
}
function listsInit(tempListArr) {
    listsList.innerHTML = "";
    counter = tempListArr.slice(-1)[0].id + 1;
    listArray = tempListArr;
    tempListArr.forEach((element) => {
        createListElement(element.id, element.title, element.description, element.date, element.favorite);
    });
}
function favoritesInit(tempListArr) {
    favoritesList.innerHTML = "";
    tempListArr.forEach((element) => {
        if (element.favorite) {
            createFavoriteElement(element.id, element.title, element.favorite);
        }
    });
}
function hideDropDown() {
    dropDownElement.classList.add("hide");
}
function preUpdate() {
    window.localStorage.setItem("list", JSON.stringify(listArray));
}
function exitPopup() {
    overlayElement.classList.remove("show");
}
function enterPopup() {
    overlayElement.classList.toggle("show");
}
