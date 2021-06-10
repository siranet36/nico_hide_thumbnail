function $(id) {
	return document.getElementById(id);
}

function init() {
	chrome.storage.sync.get(["levels"], function (result) {
		$("levels").value = result.levels ? result.levels : "";
	});
	let button = document.getElementById("save_button");
	button.addEventListener("click", save);
}

function save(event) {
	chrome.storage.sync.set({ levels: $("levels").value });
}

window.addEventListener("load", init);
