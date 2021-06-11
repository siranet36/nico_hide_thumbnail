function $(id) {
	return document.getElementById(id);
}

function init() {
	chrome.storage.sync.get(["names"], function (result) {
		$("names").value = result.names ? result.names : "";
	});
	let button = document.getElementById("save_button");
	button.addEventListener("click", save);
}

function save(event) {
	chrome.storage.sync.set({ names: $("names").value });
}

window.addEventListener("load", init);
