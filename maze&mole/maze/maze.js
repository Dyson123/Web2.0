var frozenFlag = 0;              //判断是否出于输、赢或作弊后的状态
var pathFlag = [0, 0, 0, 0, 0];

window.onload = function () {

	var start = document.getElementById("start");
	var end = document.getElementById("end");
	var wall = document.getElementsByClassName("wall");
	path = document.getElementsByClassName("path");

	for (var i = 0; i < 5; i++) {
		wall[i].addEventListener('mouseover', fail);
		wall[i].addEventListener('mouseleave', leave);
		path[i].addEventListener('mouseout', passPath);
	}

	start.addEventListener('mouseover', _start);
	end.addEventListener('mouseover', _end);
}

function succeed() {
	document.getElementById("result").innerHTML = "You Win";
	document.getElementById("result").className = "after";
	frozenFlag = 1;
}

function fail(event) {
	if (frozenFlag == 0) {
		frozenFlag = 1;
		document.getElementById("result").innerHTML = "You Lose";
		document.getElementById("result").className = "after";
		event.target.className = "fail";
	}
}

function leave(event) {
	event.target.className = 'wall';
}

function passPath(event) {
	if (event.target.id == "firstPath") {
		pathFlag[0] = 1;
	} else if (event.target.id == "secondPath") {
		pathFlag[1] = 1;
	} else if (event.target.id == "thirdPath") {
		pathFlag[2] = 1;
	} else if (event.target.id == "fourthPath") {
		pathFlag[3] = 1;
	} else {
		pathFlag[4] = 1;
	}
}

function cheat() {
	document.getElementById("result").innerHTML = "Don't cheat,you should start from the 'S' and move to the 'E' inside the maze!";
	document.getElementById("result").className = "after";
	frozenFlag = 1;
}

function _start() {
	document.getElementById("result").innerHTML = "";
	document.getElementById("result").className = "before";
	frozenFlag = 0;
	for (var i = 0; i < 5; i++) {
		pathFlag[i] = 0;
	}
}

function _end() {
	if (frozenFlag == 0) {
		for (var i = 0; i < 5; i++) {
			if (pathFlag[i] == 0) {
				cheat();
				return;
			}
		}
		succeed();
	}
}
