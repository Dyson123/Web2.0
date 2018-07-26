var score = 0;
var time = 31;
var gameStatus = 0;
var random = 0;

window.onload = function () {
	var _start = document.getElementById("start");
	_mole = document.getElementsByName("mole");

	_start.addEventListener('click', start);
	for (var i = 0; i < 60; i++) {
		_mole[i].addEventListener("click", hit);
	}
}

function start() {
	if (gameStatus == 0) {
		gameStatus = 1;
		score = 0;
		time = 30;
		document.getElementById("time").value = time;
		timer = window.setInterval(clock, 1000);
		document.getElementById("score").value = score;
		document.getElementById("status").value = "Playing";
		generateMole();
	} else {
		gameOver();
	}
}

function clock() {
	time--;
	document.getElementById("time").value = time;
	if (time == 0) {
		window.setTimeout(gameOver, 500);
	}
}

function gameOver() {
	document.getElementById("status").value = "Game Over";
	alert('Game Over\nYour Score: ' + score);
	gameStatus = 0;
	window.clearInterval(timer);
	_mole[random].className = "hole";
	_mole[random].checked = false;
}

function hit(event) {
	if (gameStatus == 0) {
		event.target.checked = false;
		return;
	}
	if (event.target.className == "newMole") {
		event.target.className = "hole";
		generateMole();
		score++;
	} else {
		score--;
		event.target.checked = false;
		_mole[random].checked = true;
	}
	document.getElementById("score").value = score;
}

function generateMole() {
	random = Math.floor(Math.random() * 60);
	_mole[random].checked = true;
	_mole[random].className = "newMole";
}

document.onselectstart = function () {
	return false;
}

