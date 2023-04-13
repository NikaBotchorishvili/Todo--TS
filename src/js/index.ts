type ListItem = {
	id: number;
	completed: boolean;
	body: string;
};

const createItemButton = document.querySelector(".create-item") as HTMLElement;
const inputElement = document.getElementById("input") as HTMLInputElement;
const list = document.querySelector(".list") as HTMLUListElement;

const xCloseEdit = document.querySelector(".fa-x") as HTMLElement;
const editForm = document.querySelector(".edit") as HTMLElement;
const editInput = document.querySelector(
	"input[name=item_input_edit]"
) as HTMLInputElement;
const editButtonElement = document.querySelector(
	".edit-button-submit"
) as HTMLButtonElement;
let listArray: ListItem[] = [];
let counter: number = 1;

init();

createItemButton?.addEventListener("click", () => {
	let inputValue = inputElement.value;
	if (inputValue != "" && inputValue.trim().length != 0) {
		let todoInfo = createItemElement(counter, inputValue, false);

		listArray.push(todoInfo);
		window.localStorage.setItem("list", JSON.stringify(listArray));
		inputElement.value = "";

		counter++;
	}
});

xCloseEdit.addEventListener("click", () => {
	editForm.style.display = "none";
});

editButtonElement.addEventListener("click", (e) => {
	e.preventDefault();
	let dataSetId = editInput.dataset.id;
	if (editInput.value != "") {
		listArray = listArray.map((item) => {
			if (item.id == Number(dataSetId)) {
				return { ...item, body: editInput.value };
			}
			return item;
		});
		window.localStorage.setItem("list", JSON.stringify(listArray));
		update();
		editForm.style.display = "none";
	}
});

function createItemElement(
	id: number,
	inputValue: string,
	completed: boolean
): ListItem {
	const listItem = document.createElement("li");
	const item = document.createElement("h2");
	const editButton = document.createElement("i");
	const deleteButton = document.createElement("i");
	const checkBox = document.createElement("input");

	item.classList.add("list-header");

	checkBox.classList.add("completed-checkbox");
	checkBox.type = "checkbox";
	checkBox.checked = completed;
	checkBox.setAttribute("data-id", id.toString());

	deleteButton.classList.add("fa-solid");
	deleteButton.classList.add("fa-trash-can");
	deleteButton.classList.add("delete-button");
	deleteButton.setAttribute("data-id", id.toString());

	editButton.classList.add("fa-pen-to-square");
	editButton.classList.add("fa-solid");
	editButton.classList.add("edit-button");
	editButton.setAttribute("data-id", id.toString());

	listItem.classList.add("list-item");
	listItem.appendChild(checkBox);
	listItem.appendChild(item);
	listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);

	item.innerHTML = inputValue.trim();
	list.appendChild(listItem);

	checkBox.addEventListener("change", () => {
		listArray = listArray.map((item) => {
			if (item.id == id) {
				return { ...item, completed: !item.completed };
			}
			return item;
		});

		localStorage.setItem("list", JSON.stringify(listArray));
	});

	editButton.addEventListener("click", () => {
		const item = listArray.find((item) => item.id == id);

		if (item) {
			editInput.value = item.body;
			editInput.dataset.id = id.toString();
			editForm.style.display = "block";
		}
	});

	deleteButton.addEventListener("click", () => {
		let dataSetId = editButton.dataset.id;
		listArray = listArray.filter((item: ListItem) => {
			return item.id != Number(dataSetId);
		});

		window.localStorage.setItem("list", JSON.stringify(listArray));
		update();
	});

	return { id: counter, body: inputValue, completed: checkBox.checked };
}

function init() {
	if (!window.localStorage.getItem("list")) {
		window.localStorage.setItem("list", "");
	} else {
		const temporaryListArray: ListItem[] = JSON.parse(
			window.localStorage.getItem("list") || ""
		);

		if (temporaryListArray.length > 0) {
			counter = temporaryListArray.slice(-1)[0].id + 1;
			listArray = temporaryListArray;
			temporaryListArray.forEach((element: ListItem) => {
				createItemElement(element.id, element.body, element.completed);
			});
		}
	}
}

function update() {
	const temporaryListArray: ListItem[] = JSON.parse(
		window.localStorage.getItem("list") || ""
	);
	list.innerHTML = "";
	if (temporaryListArray.length > 0) {
		counter = temporaryListArray.slice(-1)[0].id + 1;
		temporaryListArray.forEach((element: ListItem) => {
			createItemElement(element.id, element.body, element.completed);
		});
	}
}
