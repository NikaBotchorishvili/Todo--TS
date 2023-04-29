import { List } from "../types/Types";

export const $ = (selector: string) => document.querySelector(selector);

const listHeaderElement = $(".list-name") as HTMLElement;
const overlayElement = $(".overlay") as HTMLElement;
const dropDownElement = $(".dropdown") as HTMLElement;

export function calculateTimeSince(date: number) {
	const seconds = Math.floor((Date.now() - date) / 1000);
  
	const intervals = [
	  { label: "year", seconds: 31536000 },
	  { label: "month", seconds: 2592000 },
	  { label: "day", seconds: 86400 },
	  { label: "hour", seconds: 3600 },
	  { label: "minute", seconds: 60 },
	  { label: "second", seconds: 1 },
	];
  
	for (let i = 0; i < intervals.length; i++) {
	  const interval = intervals[i];
	  const intervalSeconds = interval.seconds;
  
	  if (seconds >= intervalSeconds) {
		const count = Math.floor(seconds / intervalSeconds);
		const plural = count !== 1 ? "s" : "";
		return `${count} ${interval.label}${plural} ago`;
	  }
	}
  
	return "just now";
  }


export function preUpdate(listArray: List[]): void {
	window.localStorage.setItem("list", JSON.stringify(listArray));
}

export const getList = (): List[] => JSON.parse(localStorage.getItem("list"));


export function setListId(id: number) {
	listHeaderElement.setAttribute("data-id", id.toString());
}

export function hideDropDown(): void {
	dropDownElement.classList.add("hide");
}

export function exitPopup(): void {
	overlayElement.classList.remove("show");
}
export function enterPopup(): void {
	overlayElement.classList.toggle("show");
}
