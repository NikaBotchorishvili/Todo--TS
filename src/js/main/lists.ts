import { List, ListItem } from "../types/Types";
import { itemInit } from "./item.js";
import {
	preUpdate,
	calculateTimeSince,
	$,
	getList,
	setListId,
	hideDropDown,
	exitPopup,
	enterPopup,
} from "../helpers/helpers.js";
import {
	expandListHandler,
	expandFavoritesHandler,
	menuElementHandler,
} from "../handlers/listsHandlers.js";

const listsList = $(".lists-list") as HTMLElement;
const favoritesList = $(".favorites-list") as HTMLElement;

const createItemPopupButtonElement = $(".open-create-popup") as HTMLElement;
const createPopupElement = $(".create-popup") as HTMLElement;
const createListButton = $(".create-list");
const cancelListCreateElement = $(".create-cancel") as HTMLElement;

const headerInputElement = $("input[name=header_input]") as HTMLInputElement;
const descriptionInputElement = $(
	"textarea[name=description_input]"
) as HTMLInputElement;

// For now
const dropDownElement = $(".dropdown") as HTMLElement;

const editButtonElement = $(".edit") as HTMLElement;
const editPopupElement = $(".edit-popup") as HTMLElement;
const editHeaderInputElement = $(
	"input[name=edit_header_input]"
) as HTMLInputElement;
const editDescriptionInput = $(
	"textarea[name=edit_description_input]"
) as HTMLInputElement;

const editCancelButton = $(".edit-cancel") as HTMLButtonElement;
const editSubmitButton = $(".edit-list") as HTMLButtonElement;

const favoriteButtonElement = $(".favorite") as HTMLElement;
const duplicateButtonElement = $(".duplicate") as HTMLElement;

const deleteButtonElement = $(".delete") as HTMLElement;
const deleteSubmitButtonElement = $(".delete-list") as HTMLElement;
const deletePopupElement = $(".delete-popup") as HTMLElement;
const deleteCancelElement = $(".delete-cancel") as HTMLElement;

const listHeaderElement = $(".list-name") as HTMLElement;
const listAddedElement = $(".list-added-since") as HTMLElement;

const expandList = $(".expand-list") as HTMLElement;
const expandFavorites = $(".expand-favorites") as HTMLElement;
const menuElement = $(".fa-bars") as HTMLElement;

let lastToggledDropDown = 0;

let listArray: List[] = [];
let counter: number = 1;

init();

expandList.addEventListener("click", () => expandListHandler);

expandFavorites.addEventListener("click", () => expandFavoritesHandler);

menuElement.addEventListener("click", () => menuElementHandler);

createItemPopupButtonElement.addEventListener("click", () => {
	createPopupElement.classList.add("show");
	enterPopup();
});

cancelListCreateElement.addEventListener("click", () => {
	createPopupElement.classList.remove("show");
	exitPopup();
});

createListButton?.addEventListener("click", (e) => {
	e.preventDefault();
	let date = new Date();
	let headerInputValue = headerInputElement.value.trim();
	let descriptionInputValue = descriptionInputElement.value.trim();
	if (headerInputValue != "") {
		let todoInfo = createListElement(
			counter,
			headerInputValue,
			descriptionInputValue,
			date,
			false,
			[]
		);

		listArray.push(todoInfo);
		preUpdate(listArray);
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
	hideDropDown();
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
	if (
		editHeaderInputElement.value.trim() != "" &&
		editDescriptionInput.value.trim() != ""
	) {
		let id = dropDownElement.dataset.id;
		listArray = listArray.map((item) => {
			if (item.id == Number(id)) {
				return {
					...item,
					title: editHeaderInputElement.value,
					description: editDescriptionInput.value,
				};
			}
			return item;
		});

		editDescriptionInput.value = "";
		editDescriptionInput.value = "";
		preUpdate(listArray);

		exitPopup();
		editPopupElement.classList.remove("show");
		init();
	}
});
favoriteButtonElement.addEventListener("click", () => {
	let id = dropDownElement.dataset.id;
	let dropdownFavorite = document.querySelector(".dropdown-favorite");
	listArray = listArray.map((listItem): List => {
		if (listItem.id == Number(id)) {
			return { ...listItem, favorite: !listItem.favorite };
		}
		return listItem;
	});

	let isFavorite = listArray.filter((item) => item.id == Number(id))[0]
		.favorite;

	if (isFavorite) {
		dropdownFavorite.classList.add("fill");
	} else {
		dropdownFavorite.classList.remove("fill");
	}
	preUpdate(listArray);
	init();
});

duplicateButtonElement.addEventListener("click", () => {
	let date = new Date();
	let id = dropDownElement.dataset.id;
	let item: List = listArray.filter((list) => list.id == Number(id))[0];
	counter++;

	let duplicateInfo = createListElement(
		counter,
		item.title,
		item.description,
		date,
		item.favorite,
		item.items
	);
	listArray.push(duplicateInfo);
	hideDropDown();
	preUpdate(listArray);
});

deleteButtonElement.addEventListener("click", () => {
	deletePopupElement.classList.add("show");
	hideDropDown();
	enterPopup();
});

deleteSubmitButtonElement.addEventListener("click", (e) => {
	e.preventDefault();

	let id = dropDownElement.dataset.id;
	listArray = listArray.filter((listItem) => listItem.id != Number(id));
	exitPopup();
	deletePopupElement.classList.remove("show");
	listHeaderElement.removeAttribute("data-id");
	preUpdate(listArray);
	listsInit(listArray);
	hideDropDown();
});

deleteCancelElement.addEventListener("click", (e) => {
	e.preventDefault();
	deletePopupElement.classList.remove("show");
	exitPopup();
});

function createListElement(
	id: number,
	header: string,
	description: string,
	date: Date,
	favorite: boolean,
	items: ListItem[]
): List {
	const itemContainer = document.createElement("li");
	const listContainerHeader = document.createElement("div");
	const listHeader = document.createElement("h4");
	const addedDate = document.createElement("small");
	const openDropDownButtonElement = document.createElement("i");
	listHeader.classList.add("lists-list-name");
	openDropDownButtonElement.classList.add("fa-solid", "fa-ellipsis");
	openDropDownButtonElement.setAttribute("data-id", id.toString());

	itemContainer.classList.add("lists-list-element");
	listHeader.innerText = header;
	addedDate.innerText = calculateTimeSince(new Date(date).getTime());
	listHeader.setAttribute("data-list-id", id.toString());

	listHeader.addEventListener("click", () => {
		setListId(id);
		listHeaderElement.innerText = header;
		listAddedElement.innerText = calculateTimeSince(
			new Date(date).getTime()
		);
		itemInit();
	});
	listContainerHeader.append(listHeader, addedDate);
	itemContainer.append(listContainerHeader, openDropDownButtonElement);

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
		items: items,
	};
}

function createFavoriteElement(
	id: number,
	header: string,
	favorite: boolean,
	date: Date
) {
	const itemContainerElement = document.createElement("li");
	const favoriteIconElement = document.createElement("i");
	const listHeaderContainer = document.createElement("div");
	const favoriteHeaderElement = document.createElement("h4");
	const addedDate = document.createElement("small");
	itemContainerElement.setAttribute("data-id", id.toString());

	itemContainerElement.classList.add("list-favorite-element");
	favoriteIconElement.classList.add("fa-solid", "fa-heart", "fill");
	favoriteHeaderElement.innerText = header;
	favoriteHeaderElement.style.cursor = "pointer";
	favoriteHeaderElement.addEventListener("click", () => {
		setListId(id);
		itemInit();
	});
	addedDate.innerText = calculateTimeSince(new Date(date).getTime());
	favoriteIconElement.addEventListener("click", () => {
		listArray = listArray.map((item) => {
			if (item.id == id) {
				return { ...item, favorite: !item.favorite };
			}
			return item;
		});
		preUpdate(listArray);

		init();
	});
	listHeaderContainer.append(favoriteHeaderElement, addedDate);

	itemContainerElement.append(listHeaderContainer, favoriteIconElement);
	favoritesList.append(itemContainerElement);
}

function OpenDropDownHandler(
	e: Event,
	rect: DOMRect,
	id: number,
	favorite: boolean
): void {
	if (e.target instanceof HTMLElement) {
		const target = e.target;
		const datasetId = target.dataset.id;

		if (!target.dataset.toggled && target.dataset.toggled != "") {
			target.setAttribute("data-toggled", "");
			dropDownElement.style.top = `${rect.top}px`;
			dropDownElement.style.left = `${rect.right + 45}px`;
			document
				.querySelectorAll(".fa-ellipsis")
				.forEach((el: HTMLElement) => {
					if (lastToggledDropDown.toString() == el.dataset.id) {
						el.removeAttribute("data-toggled");
					}
				});

			favoriteFill(favorite);
			dropDownElement.setAttribute("data-id", datasetId);
			lastToggledDropDown = id;

			dropDownElement.classList.remove("hide");
		} else {
			dropDownElement.removeAttribute("data-id");
			hideDropDown();
			target.removeAttribute("data-toggled");
			lastToggledDropDown = 0;
		}
	}
}

function favoriteFill(favorite: boolean): void {
	if (favorite) {
		document.querySelector(".dropdown-favorite").classList.add("fill");
	} else {
		document.querySelector(".dropdown-favorite").classList.remove("fill");
	}
}

function init() {
	if (!getList()) {
		window.localStorage.setItem("list", "");
	} else {
		const temporaryListArray: List[] = getList();
		if (temporaryListArray.length > 0) {
			listsInit(temporaryListArray);
			favoritesInit(temporaryListArray);
		}
	}
}

function listsInit(tempListArr: List[]): void {
	listsList.innerHTML = "";
	if (tempListArr.length > 0) {
		counter = tempListArr.slice(-1)[0].id + 1;
		listArray = tempListArr;
		tempListArr.forEach((element: List) => {
			createListElement(
				element.id,
				element.title,
				element.description,
				element.date,
				element.favorite,
				element.items
			);
		});
	}
}

function favoritesInit(tempListArr: List[]): void {
	favoritesList.innerHTML = "";
	tempListArr.forEach((element) => {
		if (element.favorite) {
			createFavoriteElement(
				element.id,
				element.title,
				element.favorite,
				element.date
			);
		}
	});
}