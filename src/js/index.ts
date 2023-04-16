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
	asideElement.classList.toggle("hide");
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
	const listHeader = document.createElement("h4");;

	listHeader.innerText = header;
	listHeader.setAttribute("data-list-id", id.toString());

	listCircle.classList.add("fa-solid");
	listCircle.classList.add("fa-circle");

	itemContainer.appendChild(listCircle);
	itemContainer.appendChild(listHeader);

	listsList.appendChild(itemContainer);
	return {
		id: counter,
		title: header,
		description: description,
		date: date,
	};
}

// function calculateTimeSince(timestamp: number) {
// 	const timeElapsed = Date.now() - timestamp;

// 	const days = Math.floor(timeElapsed / (1000 * 60 * 60 * 24));
// 	const hours = Math.floor((timeElapsed / (1000 * 60 * 60)) % 24);
// 	const minutes = Math.floor((timeElapsed / 1000 / 60) % 60);
// 	const seconds = Math.floor((timeElapsed / 1000) % 60);

// 	if (days > 1) {
// 		return `${days} days ago`;
// 	} else if (hours > 1) {
// 		return `${hours} hours ago`;
// 	} else if (minutes > 1) {
// 		return `${minutes} minutes ago`;
// 	} else if (seconds > 1) {
// 		return `${seconds} seconds ago`;
// 	} else {
// 		return "now";
// 	}
// }

// closeEdit.addEventListener("click", () => {
// 	editForm.style.display = "none";
// });

// closeInfo.addEventListener("click", () => {
// 	infoPopup.style.display = "none";
// });

// editButtonElement.addEventListener("click", (e) => {
// 	e.preventDefault();
// 	let dataSetId = headerEditInput.dataset.id;
// 	if (headerEditInput.value != "" && descriptionEditInput.value != "") {
// 		listArray = listArray.map((item) => {
// 			if (item.id == Number(dataSetId)) {
// 				return {
// 					...item,
// 					body: headerEditInput.value,
// 					description: descriptionEditInput.value,
// 				};
// 			}
// 			return item;
// 		});
// 		window.localStorage.setItem("list", JSON.stringify(listArray));
// 		update();
// 		editForm.style.display = "none";
// 	}
// });

// // 	EVENT HANDLER FUNCTIONS

// function listHeaderClickHandler(id: number) {
// 	let listItem = listArray.find((item) => item.id == id);
// 	if (listItem) {
// 		infoTitle.innerText = listItem.title;
// 		infoDescription.innerText = listItem.description;

// 		infoProgress.innerText = listItem.completed
// 			? "Completed"
// 			: "Not Completed";

// 		infoDate.innerText = calculateTimeSince(
// 			new Date(listItem.date).getTime()
// 		);

// 		infoPopup.style.display = "block";
// 	}
// }

// function checkBoxHandler(id: number) {
// 	listArray = listArray.map((item) => {
// 		if (item.id == id) {
// 			return { ...item, completed: !item.completed };
// 		}
// 		return item;
// 	});

// 	localStorage.setItem("list", JSON.stringify(listArray));
// }

// function editButtonHandler(id: number) {
// 	const item = listArray.find((item) => item.id == id);

// 	if (item) {
// 		headerEditInput.value = item.title;
// 		descriptionEditInput.value = item.description;
// 		headerEditInput.dataset.id = id.toString();
// 		editForm.style.display = "block";
// 	}
// }

// function deleteButtonHandler(editButton: HTMLElement) {
// 	let dataSetId = editButton.dataset.id;
// 	listArray = listArray.filter((item: ListItem) => {
// 		return item.id != Number(dataSetId);
// 	});

// 	window.localStorage.setItem("list", JSON.stringify(listArray));
// 	update();
// }

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
