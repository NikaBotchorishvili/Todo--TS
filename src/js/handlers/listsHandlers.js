import { $ } from "../helpers/helpers.js";
const asideElement = $("aside");
const expandList = $(".expand-list");
const expandFavorites = $(".expand-favorites");
const listsList = $(".lists-list");
const favoritesList = $(".favorites-list");
const dropDownElement = $(".dropdown");
export function expandListHandler() {
    expandList.classList.toggle("rotate");
    listsList.classList.toggle("hide");
}
;
export function expandFavoritesHandler() {
    expandFavorites.classList.toggle("rotate");
    favoritesList.classList.toggle("hide");
}
;
export function menuElementHandler() {
    asideElement.classList.toggle("slide");
    dropDownElement.classList.add("hide");
}
;
