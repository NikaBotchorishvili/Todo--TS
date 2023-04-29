import { preUpdate, $, getList } from "../helpers/helpers.js";
import { checkBoxHandler } from "../handlers/itemHandlers.js";
const itemFormElement = $(".item-form");
const createTaskButtonElement = $(".create-task");
const createTaskCancelButtonElement = $(".task-cancel");
const taskAddSubmitButtonElement = $(".task-add");
const taskNameInputElement = $("input[name=task_name");
const taskDescInputElement = $("textarea[name=task_description]");
const listNameElement = $(".list-name");
const itemsListElement = $(".items-list");
let counter = 1;
itemInit();
createTaskButtonElement.addEventListener("click", () => {
    itemFormElement.classList.toggle("hide");
    createTaskButtonElement.classList.toggle("hide");
});
createTaskCancelButtonElement.addEventListener("click", (e) => {
    e.preventDefault();
    itemFormElement.classList.toggle("hide");
    createTaskButtonElement.classList.toggle("hide");
});
taskAddSubmitButtonElement.addEventListener("click", (e) => {
    e.preventDefault();
    let listId = Number(listNameElement.dataset.id);
    let date = new Date();
    let taskName = taskNameInputElement.value.trim();
    let taskDesc = taskDescInputElement.value.trim();
    if (taskName != "") {
        let item = {
            id: counter,
            title: taskName,
            description: taskDesc,
            date: date,
            completed: false,
        };
        taskNameInputElement.value = "";
        taskDescInputElement.value = "";
        let lists = getList();
        let newListsArr = lists.map((list) => {
            if (listId === list.id) {
                return Object.assign(Object.assign({}, list), { items: [...list.items, item] });
            }
            return list;
        });
        preUpdate(newListsArr);
        itemsListElement.innerHTML = "";
        itemFormElement.classList.add("hide");
        itemInit();
        counter++;
    }
});
function createItemElement(listProp) {
    let itemContainer = document.createElement("list");
    let InfoContainer = document.createElement("div");
    let actionContainer = document.createElement("div");
    let checkBoxElement = document.createElement("input");
    let itemTitle = document.createElement("h5");
    let itemDescription = document.createElement("small");
    let editButton = document.createElement("i");
    let deleteButton = document.createElement("i");
    actionContainer.classList.add("task-actions");
    editButton.classList.add("fa-solid", "fa-pen-to-square");
    deleteButton.classList.add("fa-solid", "fa-trash");
    itemDescription.innerText = listProp.description;
    itemTitle.innerText = listProp.title;
    if (listProp.completed)
        itemTitle.classList.add("completed");
    checkBoxElement.type = "checkbox";
    checkBoxElement.checked = listProp.completed;
    itemContainer.classList.add("item");
    InfoContainer.append(checkBoxElement, itemTitle, itemDescription);
    actionContainer.append(editButton, deleteButton);
    itemContainer.append(InfoContainer, actionContainer);
    itemsListElement.append(itemContainer);
    checkBoxElement.addEventListener("click", () => checkBoxHandler(listProp.id));
    deleteButton.addEventListener("click", () => {
        let listId = Number(listNameElement.dataset.id);
        let lists = getList();
        let items = lists
            .find((l) => (l.id = listId))
            .items.filter((item) => {
            if (item.id != listProp.id) {
                return item;
            }
        });
        lists = lists.map((list) => {
            if (list.id == listId) {
                return Object.assign(Object.assign({}, list), { items: items });
            }
            return list;
        });
        preUpdate(lists);
        itemInit();
    });
}
export function itemInit() {
    let listId = listNameElement.hasAttribute("data-id")
        ? Number(listNameElement.dataset.id)
        : null;
    if (listId != null) {
        createTaskButtonElement.classList.remove("hide");
        itemsListElement.innerHTML = "";
        let lists = getList();
        let items = lists.find((list) => list.id == listId).items;
        if (items.length > 0) {
            items.forEach((item) => createItemElement(item));
            counter = items.slice(-1)[0].id + 1;
        }
    }
    else {
        createTaskButtonElement.classList.add("hide");
        let userMessageElement = document.createElement("small");
        userMessageElement.textContent = "Choose a list or create a new one";
        itemsListElement.append(userMessageElement);
    }
}
