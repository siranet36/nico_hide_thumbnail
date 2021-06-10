function init() {
	chrome.storage.sync.get(["levels"], function (result) {
		var hideLevels = [];
		var levels = result.levels ? result.levels : "";
		hideLevels = levels.split(",");

		var result = document.evaluate(
			"//*",
			document,
			null,
			XPathResult.ORDERED_NODE_ITERATOR_TYPE,
			null
		);

		// imgを削除する A tag
		var atags = [];

		var element = result.iterateNext();
		while (element) {
			if (element.nodeName == "DIV") {
				var id = element.getAttribute("id");
				if (hideLevels.includes(id)) {
					console.log(element.getAttribute("id"));
					if (element.childNodes.length == 0) {
						continue;
					}
					var tag1 = element.childNodes[0]; // a
					if (tag1.nodeName == "A") {
						// ニコニ広告以外のサムネ
						atags.push(tag1);
					} else {
						if (element.childNodes.length == 2) {
							var child = element.childNodes[0];
							if (child.childNodes.length == 3) {
								var child2 = child.childNodes[1];
								if (child2.nodeName == "A") {
									// ニコニ広告のサムネ
									atags.push(child2);
								}
							}
						}
					}
				}
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

window.addEventListener("load", init);
