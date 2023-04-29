import { $ } from "../helpers/helpers.js";

const asideElement = $("aside");

const expandList = $(".expand-list") as HTMLElement;
const expandFavorites = $(".expand-favorites") as HTMLElement;
const listsList = $(".lists-list") as HTMLElement;
const favoritesList = $(".favorites-list") as HTMLElement;
const dropDownElement = $(".dropdown") as HTMLElement;


export function expandListHandler() {
	expandList.classList.toggle("rotate");
	listsList.classList.toggle("hide");
};

export function expandFavoritesHandler() {
	expandFavorites.classList.toggle("rotate");
	favoritesList.classList.toggle("hide");
};

export function menuElementHandler() {
	asideElement.classList.toggle("slide");
	dropDownElement.classList.add("hide")
};
