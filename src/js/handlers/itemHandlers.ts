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

export function deleteHandler(id : number) {
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