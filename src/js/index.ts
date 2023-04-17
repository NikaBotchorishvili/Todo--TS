type List = {
	id: number;
	title: string;
	description: string;
	date: Date;
};

// 	Overlay for blurring
const overlayElement = document.querySelector(".overlay") as HTMLElement;

const listsList = document.querySelector(".lists-list") as HTMLElement;

const createItemPopupButtonElement = document.querySelector(
	".open-create-popup"
) as HTMLElement;
const createPopupElement = document.querySelector(
	".create-popup"
) as HTMLElement;
const createListButton = document.querySelector(".create-list");
const cancelListCreateElement = document.querySelector(
	".cancel"
) as HTMLElement;

const headerInputElement = document.querySelector(
	"input[name=header_input]"
) as HTMLInputElement;
const descriptionInputElement = document.querySelector(
	"textarea[name=description_input]"
) as HTMLInputElement;

const asideElement = document.querySelector("aside");
const menuElement = document.querySelector(".fa-bars") as HTMLElement;

const listsArrowElement = document.querySelector(
	".fa-angle-left"
) as HTMLElement;
const listsListElement = document.querySelector(".lists-list") as HTMLElement;

listsArrowElement.addEventListener("click", () => {
	listsArrowElement.classList.toggle("rotate");
	listsListElement.classList.toggle("fade");
});

menuElement.addEventListener("click", () => {
	asideElement.classList.toggle("slide");
});

let listArray: List[] = [];
let counter: number = 1;

init();

createItemPopupButtonElement.addEventListener("click", () => {
	createPopupElement.classList.toggle("show");
	overlayElement.classList.toggle("show");
});

cancelListCreateElement.addEventListener("click", () => {
	exitPopup();
});

createListButton?.addEventListener("click", (e) => {
	e.preventDefault();
	let date = new Date();
	let headerInputValue = headerInputElement.value.trim();
	let descriptionInputValue = descriptionInputElement.value.trim();
	if (
		headerInputValue != "" &&
		headerInputValue.trim().length != 0 &&
		descriptionInputValue != "" &&
		descriptionInputValue.trim().length != 0
	) {
		let todoInfo = createListElement(
			counter,
			headerInputValue,
			descriptionInputValue,
			date
		);

		listArray.push(todoInfo);
		window.localStorage.setItem("list", JSON.stringify(listArray));
		headerInputElement.value = "";
		descriptionInputElement.value = "";
		exitPopup();
		counter++;
	}
});

function createListElement(
	id: number,
	header: string,
	description: string,
	date: Date
): List {
	const itemContainer = document.createElement("li");
	const listCircle = document.createElement("i");
	const listHeader = document.createElement("h4");

	listHeader.innerText = header;
	listHeader.setAttribute("data-list-id", id.toString());
	listCircle.classList.add("fa-solid");
	listCircle.classList.add("fa-circle");

	itemContainer.append(listCircle, listHeader);

	listsList.appendChild(itemContainer);
	const itemRect = itemContainer.getBoundingClientRect();
	const dropdown = dropDownActionList(id, itemRect);

	itemContainer.append(dropdown.dropDownButton, dropdown.dropdown);
	return {
		id: counter,
		title: header,
		description: description,
		date: date,
	};
}

function dropDownActionList(id: number, itemRect: DOMRect) {
	const iconClasses = [
		{ name: "Edit List", classes: ["fa-solid", "fa-pen-to-square"] },
		{ name: "Favorite List", classes: ["fa-regular", "fa-heart"] },
		{ name: "Duplicate List", classes: ["fa-solid", "fa-clone"] },
		{ name: "Archive List", classes: ["fa-solid", "fa-box-archive"] },
		{ name: "Delete List", classes: ["fa-solid", "fa-trash"] },
	];
	const dropdown = document.createElement("div");
	const dropdownButton = document.createElement("div");
	const ellipsisElement = document.createElement("i");
	const actionMenuElement = document.createElement("ul");

	actionMenuElement.classList.add("action-menu");
	ellipsisElement.classList.add("fa-solid", "fa-ellipsis");
	dropdownButton.classList.add("dropdown-button");
	dropdownButton.appendChild(ellipsisElement);

	dropdown.classList.add("dropdown", "hide");
	dropdownButton.addEventListener("click", () => {
		dropdown.classList.toggle("hide");
	});
	iconClasses.forEach((icon) => {
		const liElement = document.createElement("li");
		const iconElement = document.createElement("i");
		const headerElement = document.createElement("small");

		liElement.classList.add("action-menu-item")
		iconElement.classList.add(...icon.classes);
		headerElement.innerText = icon.name;
		liElement.append(iconElement, headerElement)

		actionMenuElement.append(liElement);
	});
	dropdown.style.top = `${itemRect.top}px`;
	dropdown.style.left = `${itemRect.right + 30}px`
	dropdown.append(actionMenuElement);
	dropdown.setAttribute("data-id", id.toString());
	return { dropDownButton: dropdownButton, dropdown: dropdown };
}

function calculateTimeSince(timestamp: number) {
	const timeElapsed = Date.now() - timestamp;

	const days = Math.floor(timeElapsed / (1000 * 60 * 60 * 24));
	const hours = Math.floor((timeElapsed / (1000 * 60 * 60)) % 24);
	const minutes = Math.floor((timeElapsed / 1000 / 60) % 60);
	const seconds = Math.floor((timeElapsed / 1000) % 60);

	if (days > 1) {
		return `${days} days ago`;
	} else if (hours > 1) {
		return `${minutes} minutes ago`;
	} else if (seconds > 1) {
		return `${seconds} seconds ago`;
	} else {
		return "now";
	}
}

function init() {
	if (!window.localStorage.getItem("list")) {
		window.localStorage.setItem("list", "");
	} else {
		const temporaryListArray: List[] = JSON.parse(
			window.localStorage.getItem("list") || ""
		);

		if (temporaryListArray.length > 0) {
			counter = temporaryListArray.slice(-1)[0].id + 1;
			listArray = temporaryListArray;
			temporaryListArray.forEach((element: List) => {
				createListElement(
					element.id,
					element.title,
					element.description,
					element.date
				);
			});
		}
	}
}

// function update() {
// 	const temporaryListArray: ListItem[] = JSON.parse(
// 		window.localStorage.getItem("list") || ""
// 	);
// 	list.innerHTML = "";
// 	if (temporaryListArray.length > 0) {
// 		counter = temporaryListArray.slice(-1)[0].id + 1;
// 		temporaryListArray.forEach((element: ListItem) => {
// 			createItemElement(
// 				element.id,
// 				element.title,
// 				element.description,
// 				element.completed,
// 				element.date
// 			);
// 		});
// 	}
// }
function exitPopup(): void {
	createPopupElement.classList.remove("show");
	overlayElement.classList.remove("show");
}
