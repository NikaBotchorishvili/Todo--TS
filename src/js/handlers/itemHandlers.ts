import { preUpdate, $, getList } from "../helpers/helpers.js";
import { itemInit } from "../main/item.js";
import { List } from "../types/Types";

const listNameElement = $(".list-name") as HTMLElement;

export function checkBoxHandler(id: number) {
	let listId = Number(listNameElement.dataset.id);
	let lists: List[] = getList();

	let items = lists
		.find((l) => (l.id = listId))
		.items.map((item) => {
			if (item.id === id) {
				return { ...item, completed: !item.completed };
			}
			return item;
		});

	lists = lists.map((list: List) => {
		if (list.id === listId) {
			return { ...list, items };
		}
		return list;
	});
	preUpdate(lists);
	itemInit();
}

export function deleteHandler(id: number) {
	let listId = Number(listNameElement.dataset.id);
	let lists: List[] = getList();

	let items = lists
		.find((l) => (l.id = listId))
		.items.filter((item) => {
			if (item.id != id) {
				return item;
			}
		});

	lists = lists.map((list) => {
		if (list.id == listId) {
			return { ...list, items: items };
		}
		return list;
	});

	preUpdate(lists);
	itemInit();
}

export function editHandler(id: number, infoContainer: HTMLDivElement) {
	let listId = Number(listNameElement.dataset.id);

	let lists = getList();

	let items = lists.find((list) => list.id == listId).items;
	let item = items.find((it) => it.id == id);
	
	const editContainer = document.createElement("div");
	const titleInput = document.createElement("input");
	const descriptionInput = document.createElement("textarea");
	const buttonsContainer = document.createElement("div");
	const cancelButton = document.createElement("button");
	const submitButton = document.createElement("button");
	editContainer.style.display = "flex";
	editContainer.style.flexDirection = "column";
	cancelButton.classList.add("cancel-button", "button");
	submitButton.classList.add("submit-button", "button");
	cancelButton.innerText = "Cancel";
	submitButton.innerText = "Submit";
	buttonsContainer.append(cancelButton, submitButton);

	titleInput.placeholder = "Enter Task Title";
	descriptionInput.placeholder = "Enter Task Description"
	titleInput.value = item.title;
	descriptionInput.value = item.description;
	editContainer.append(titleInput, descriptionInput, buttonsContainer);
	infoContainer.replaceWith(editContainer);

	cancelButton.addEventListener("click", (e) => {
		e.preventDefault();
		editContainer.replaceWith(infoContainer)
	})

	submitButton.addEventListener("click", (e) => {
		e.preventDefault();
		let titleValue = titleInput.value.trim();
		let descriptionValue = descriptionInput.value.trim();
		if(titleValue != ""){
			item.title = titleValue;
			item.description = descriptionValue;
			items = items.map((it) => {
				if(it.id == item.id){
					return item;
				}
				return it;
			})

			lists.map((list) => {
				if(list.id == listId){
					return {...list, items}
				}
				return list;
			})

			preUpdate(lists);
			itemInit();
		}
	})
}
