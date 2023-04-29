import { preUpdate, $, getList } from "../helpers/helpers.js";
import { itemInit } from "../main/item.js";
const listNameElement = $(".list-name");
export function checkBoxHandler(id) {
    let listId = Number(listNameElement.dataset.id);
    let lists = getList();
    let items = lists
        .find((l) => (l.id = listId))
        .items.map((item) => {
        if (item.id === id) {
            return Object.assign(Object.assign({}, item), { completed: !item.completed });
        }
        return item;
    });
    lists = lists.map((list) => {
        if (list.id === listId) {
            return Object.assign(Object.assign({}, list), { items });
        }
        return list;
    });
    preUpdate(lists);
    itemInit();
}
