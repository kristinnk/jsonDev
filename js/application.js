/*
const electron = require('electron')
const remote = electron.remote;
const mainProcess = remote.require('./main');
*/
const {dialog} = require('electron').remote
const fs = require('fs')


addLine = function(data, parentElement) {
	for (var key in data) {
		/*
		if (typeof data[key] == 'object' || typeof data[key] == "array") {
			var newSpan = document.createElement("span");
			newSpan.textContent = key;

			var newUl = document.createElement("ul");
			newUl.appendChild(newSpan);

			parentElement.appendChild(newUl);

			addLine(data[key], newUl);
		} else {
			var newSpan = document.createElement("span");
			newSpan.textContent = key;

			var newLi = document.createElement("li");
			newLi.appendChild(newSpan);
			
			parentElement.appendChild(newLi);
		}
	}
	*/
		if (typeof data[key] == 'object' || typeof data[key] == "array") {
			var newSpan = document.createElement("span");
			newSpan.textContent = key;
			
			var newDiv = document.createElement("div");
			newDiv.className += "itemList";
			newDiv.appendChild(newSpan);

			parentElement.appendChild(newDiv);

			addLine(data[key], newDiv);
		} else {
			var newSpan = document.createElement("span");
			newSpan.textContent = key;
			

			var newDiv = document.createElement("div");
			newDiv.className += "property";
			newDiv.appendChild(newSpan);

			parentElement.appendChild(newDiv);
		}
	}
	
}

drawJsonView = function(data) {
	console.log(data);
	var JsonTree = document.getElementById("JSONAnchor");
	JsonTree.innerHTML = '';

	var newSpan = document.createElement("span");
	newSpan.textContent = "Root";
	
	var newUl = document.createElement("Ul");
	newUl.appendChild(newSpan);

	JsonTree.appendChild(newUl);

	addLine(data, newUl);
}

applyEvents = function() {
	var ulList = document.getElementsByTagName("ul");
	for (var i = 0; i < ulList.length; i++) {
		ulList[i].addEventListener("click", function(event) {
			console.log(event.srcElement.children.length);
			for (var i = 1; i < event.srcElement.children.length; i++) {
				var elem = event.srcElement.children[i];
				if (elem.style.display == 'none') {
					elem.style.display = 'block';
				} else {
					elem.style.display = 'none';
				}
			}
		});
	}
}

loadFile = function() {
	var filePath = dialog.showOpenDialog({properties: ['openFile']});
	fs.readFile(filePath[0], 'utf8', function(err, data) {
		var validJson = false;

		var jsonData = null;
		try {
			jsonData = JSON.parse(data);
			validJson = true;
		} catch(e) {
			dialog.showErrorBox("Error", "Invalid JSON.");
		}

		if (validJson) {
			drawJsonView(jsonData);
		}

		applyEvents();
	});

	//document.getElementById("textPoint").value = fileContent;
}

/**

window.load = function() {	
	document.getElementById("loadFile").onclick(function() {
    	console.log("whatup?");
  	});

};
*/
 
