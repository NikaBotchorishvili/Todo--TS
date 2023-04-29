export const $ = (selector) => document.querySelector(selector);
const listHeaderElement = $(".list-name");
const overlayElement = $(".overlay");
const dropDownElement = $(".dropdown");
export function calculateTimeSince(date) {
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
export function preUpdate(listArray) {
    window.localStorage.setItem("list", JSON.stringify(listArray));
}
export const getList = () => JSON.parse(localStorage.getItem("list"));
export function setListId(id) {
    listHeaderElement.setAttribute("data-id", id.toString());
}
export function hideDropDown() {
    dropDownElement.classList.add("hide");
}
export function exitPopup() {
    overlayElement.classList.remove("show");
}
export function enterPopup() {
    overlayElement.classList.toggle("show");
    console.log("hgsui");
}
