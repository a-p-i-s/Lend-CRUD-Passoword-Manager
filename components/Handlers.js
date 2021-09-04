"use strict";

const TableContainer = document.querySelector(".table-container");
const FilesListContainer = document.querySelector(".files-list__container");
const FilesOutContainer = document.querySelector(".files-out__container");

function handler_onload() {
	// Add files on page
	GetStorAll().map((file_name) => {
		const //
			file = { name: file_name },
			File = makeFileContainer(file);
		FilesListContainer.append(File);
	});
}

async function handler_saveFile() {
	const files = this.files;

	for (let i = 0; i < files.length; i++) {
		const //
			file = files[i],
			name = file.name,
			text = await readFile(file),
			File = makeFileContainer(file);

		AddStor(name, text);
		FilesListContainer.append(File);
	}
}

function handler_addTable() {
	const //
		div = this.querySelector(".file_name"),
		name = div.innerText;

	try {
		const //
			text = GetStor(name),
			database = text && JSON.parse(text),
			table = database && makeTable({ database });

		table && TableContainer.append(table);
	} catch (error) {
		console.info(error);
	}
}

function handler_searchInTable() {
	const q = {
		query: this.value,
		Container: TableContainer,
	}
	searchInTable(q);
}

function handler_createFile() {
	const //
		url = makeFileUrl(),
		name = prompt("Name") || Math.random().toString(16),
		file = { name: name, link: url },
		File = makeFileContainer(file);

	FilesOutContainer.append(File);
}

function handler_addRow() {
	const database = [{ "": "" }];
	const t = makeTable({ database });
	t && TableContainer.append(t);
}

function handler_delTable() {
	TableContainer.innerHTML = "";
}

function handler_delFiles() {
	FilesListContainer.innerHTML = "";
	sessionStorage.clear();
	localStorage.clear();
}

function handler_hideVal() {
	TableContainer.classList.toggle("tc-s-cell_hide_values");
}

function handler_editing() {
	const //
		bool = this.checked,
		inps = TableContainer.querySelectorAll("input");

	bool && inps.forEach((i) => i.removeAttribute("readOnly")); // true
	bool && TableContainer.classList.remove("tc-s-cell_no_editing");
	bool || inps.forEach((i) => (i.readOnly = true)); // false
	bool || TableContainer.classList.add("tc-s-cell_no_editing");
}

function handler_addTableEl() {
	let NewElement;
	const //
		template = {},
		Pa = GetPa(this, 2),
		Cells = Pa.querySelectorAll(".cell");

	if (Cells.length) {
		Cells.forEach((Cell) => {
			const //
				_ = (str) => Cell.querySelector(str).value || "",
				cell_name = _("input.cell__name"),
				cell_value = _("input.cell__value");

			template[cell_name] = cell_value;
		});
		NewElement = makeRow(template);
	}
	if (!Cells.length) {
		NewElement = makeCell("", "");
	}

	console.info(NewElement);
	Pa.insertAdjacentElement("afterend", NewElement);
}

function handler_dellTableEl() {
	GetPa(this, 2).remove();
}

(() => {
	// Add handlers to buttons
	const //
		get = (str) => document.querySelector(str),
		ev = (obj, fu, ev = "click") => obj.addEventListener(ev, fu, false),
		file = get(".files__in-btn"),
		search = get(".control__btn-search"),
		addRow = get(".control__btn-add"),
		create = get(".control__btn-create"),
		delTable = get(".control__btn-delete-table"),
		delFiles = get(".control__btn-delete-files"),
		hideVal = get(".control__btn-hide"),
		edit = get(".control__btn-edit");

	ev(window, handler_onload, "load");
	ev(file, handler_saveFile, "change");
	ev(search, handler_searchInTable, "keyup");
	ev(addRow, handler_addRow);
	ev(create, handler_createFile);
	ev(delTable, handler_delTable);
	ev(delFiles, handler_delFiles);
	ev(hideVal, handler_hideVal, "change");
	ev(edit, handler_editing, "change");
})();

// window.open(url);
// document.body.innerText += url
// location.href = url;
// window.URL.revokeObjectURL(url);
// 	var newWin = window.open("about:blank", "hello", "width=200,height=200");
// newWin.document.write("Привет, мир!");
