function init() {
	chrome.storage.sync.get(["names"], function (result) {
		var ngNames = [];
		var names = result.names ? result.names : "";
		ngNames = names.split(",");

		var result = document.evaluate(
			"//li[@class='___item___17iVx']",
			document,
			null,
			XPathResult.ORDERED_NODE_ITERATOR_TYPE,
			null
		);

		// imgを削除する A tag
		var atags = [];

		var element = result.iterateNext();
		while (element) {
			console.log(element);
			var atag = element.childNodes[0].childNodes[0];
			var nametag = element.childNodes[0].childNodes[1]
				.childNodes[1].childNodes[0].childNodes[1];
//			console.log(nametag.textContent);
			if (isNgName(ngNames, nametag.textContent)) {
				atags.push(atag);
			}
			element = result.iterateNext();
		}

		result = document.evaluate(
			"//li[@class='___item___3gSaG']",
			document,
			null,
			XPathResult.ORDERED_NODE_ITERATOR_TYPE,
			null
		);

		element = result.iterateNext();
		while (element) {
			var atag = element.childNodes[0].childNodes[0].childNodes[1];
			var nametag = element.childNodes[0].childNodes[1]
				.childNodes[1].childNodes[0].childNodes[1];
//			console.log(nametag.textContent);
			if (isNgName(ngNames, nametag.textContent)) {
				atags.push(atag);
			}
			element = result.iterateNext();
		}

		atags.forEach((elem, index) => {
			var atagChildren = atags[index].childNodes;
			var imgtag = atagChildren[0]; // img
			if (imgtag.nodeName == "IMG") {
				atags[index].removeChild(imgtag);
			}
		});
	});
}

function isNgName(ngNames, name) {
	for (const element of ngNames) {
		if (name.indexOf(element) != -1) {
			return true;
		}
	}
	return false;
}

window.addEventListener("load", init);
