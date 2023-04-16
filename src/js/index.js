const createItemButton = document.querySelector(".create-item");
const headerInputElement = document.querySelector("input[name=header_input]");
const descriptionInputElement = document.querySelector("input[name=description_input]");
const list = document.querySelector(".list");
const editForm = document.querySelector(".edit-popup");
const headerEditInput = document.querySelector("input[name=item_input_edit]");
const descriptionEditInput = document.querySelector("textarea[name=description_edit_input]");
const editButtonElement = document.querySelector(".edit-button-submit");
const closeEdit = document.querySelector(".close-edit");
const closeInfo = document.querySelector(".close-info");
const infoPopup = document.querySelector(".info-popup");
const infoTitle = document.querySelector(".title");
const infoDescription = document.querySelector(".description");
const infoProgress = document.querySelector(".progress");
const infoDate = document.querySelector(".date");
let listArray = [];
let counter = 1;
init();
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
        return `${hours} hours ago`;
    }
    else if (minutes > 1) {
        return `${minutes} minutes ago`;
    }
    else if (seconds > 1) {
        return `${seconds} seconds ago`;
    }
    else {
        return "now";
    }
}
createItemButton === null || createItemButton === void 0 ? void 0 : createItemButton.addEventListener("click", (e) => {
    e.preventDefault();
    let date = new Date();
    let headerInputValue = headerInputElement.value.trim();
    let descriptionInputValue = descriptionInputElement.value.trim();
    if (headerInputValue != "" &&
        headerInputValue.trim().length != 0 &&
        descriptionInputValue != "" &&
        descriptionInputValue.trim().length != 0) {
        let todoInfo = createItemElement(counter, headerInputValue, descriptionInputValue, false, date);
        listArray.push(todoInfo);
        window.localStorage.setItem("list", JSON.stringify(listArray));
        headerInputElement.value = "";
        descriptionInputElement.value = "";
        counter++;
    }
});
closeEdit.addEventListener("click", () => {
    editForm.style.display = "none";
});
closeInfo.addEventListener("click", () => {
    infoPopup.style.display = "none";
});
editButtonElement.addEventListener("click", (e) => {
    e.preventDefault();
    let dataSetId = headerEditInput.dataset.id;
    if (headerEditInput.value != "" && descriptionEditInput.value != "") {
        listArray = listArray.map((item) => {
            if (item.id == Number(dataSetId)) {
                return Object.assign(Object.assign({}, item), { body: headerEditInput.value, description: descriptionEditInput.value });
            }
            return item;
        });
        window.localStorage.setItem("list", JSON.stringify(listArray));
        update();
        editForm.style.display = "none";
    }
});
function createItemElement(id, header, description, completed, date) {
    const listItem = document.createElement("li");
    const listHeader = document.createElement("h2");
    const editButton = document.createElement("i");
    const deleteButton = document.createElement("i");
    const checkBox = document.createElement("input");
    listHeader.classList.add("list-header");
    checkBox.classList.add("completed-checkbox");
    checkBox.type = "checkbox";
    checkBox.checked = completed;
    checkBox.setAttribute("data-id", id.toString());
    deleteButton.classList.add("fa-solid");
    deleteButton.classList.add("fa-trash-can");
    deleteButton.classList.add("delete-button");
    deleteButton.setAttribute("data-id", id.toString());
    editButton.classList.add("fa-pen-to-square");
    editButton.classList.add("fa-solid");
    editButton.classList.add("edit-button");
    editButton.setAttribute("data-id", id.toString());
    listItem.classList.add("list-item");
    listItem.appendChild(checkBox);
    listItem.appendChild(listHeader);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    listHeader.innerHTML = header.trim();
    list.appendChild(listItem);
    listHeader.addEventListener("click", () => listHeaderClickHandler(id));
    checkBox.addEventListener("change", () => checkBoxHandler(id));
    editButton.addEventListener("click", () => editButtonHandler(id));
    deleteButton.addEventListener("click", () => deleteButtonHandler(deleteButton));
    return {
        id: counter,
        title: header,
        completed: checkBox.checked,
        description: description,
        date: date,
    };
}
function listHeaderClickHandler(id) {
    let listItem = listArray.find((item) => item.id == id);
    if (listItem) {
        infoTitle.innerText = listItem.title;
        infoDescription.innerText = listItem.description;
        infoProgress.innerText = listItem.completed
            ? "Completed"
            : "Not Completed";
        infoDate.innerText = calculateTimeSince(new Date(listItem.date).getTime());
        infoPopup.style.display = "block";
    }
}
function checkBoxHandler(id) {
    listArray = listArray.map((item) => {
        if (item.id == id) {
            return Object.assign(Object.assign({}, item), { completed: !item.completed });
        }
        return item;
    });
    localStorage.setItem("list", JSON.stringify(listArray));
}
function editButtonHandler(id) {
    const item = listArray.find((item) => item.id == id);
    if (item) {
        headerEditInput.value = item.title;
        descriptionEditInput.value = item.description;
        headerEditInput.dataset.id = id.toString();
        editForm.style.display = "block";
    }
}
function deleteButtonHandler(editButton) {
    let dataSetId = editButton.dataset.id;
    listArray = listArray.filter((item) => {
        return item.id != Number(dataSetId);
    });
    window.localStorage.setItem("list", JSON.stringify(listArray));
    update();
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
                createItemElement(element.id, element.title, element.description, element.completed, element.date);
            });
        }
    }
}
function update() {
    const temporaryListArray = JSON.parse(window.localStorage.getItem("list") || "");
    list.innerHTML = "";
    if (temporaryListArray.length > 0) {
        counter = temporaryListArray.slice(-1)[0].id + 1;
        temporaryListArray.forEach((element) => {
            createItemElement(element.id, element.title, element.description, element.completed, element.date);
        });
    }
}
