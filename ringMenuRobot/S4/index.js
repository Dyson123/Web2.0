/*上午班 13组 16340301 赵俊祥*/
(function () {
	var num = {              //记录每个按钮的随机数
		"A": "",
		"B": "",
		"C": "",
		"D": "",
		"E": ""
	}

	var game = {
		"status": false,
		"AIrunning": false
	}

	var num2char = ['A', 'B', 'C', 'D', 'E'];

	function randomOrder() {
		var order = [0, 1, 2, 3, 4];
		var temp;
		var randomPos;
		for (var i = 4; i >= 0; i--) {
			randomPos = Math.round(Math.random() * i);
			temp = order[randomPos];
			order[randomPos] = order[i];
			order[i] = temp;
		}
		return order;
	}

	$(function () {
		$(".mid.button").click(function () {
			game.status = true;
			buttonClick(this);
		});

		$("#info-bar").click(function (event) {
			if (isReady()) {
				getResult();
			}
		});

		$("#button").mouseleave(function (event) {
			reset();
		});

		$(".apb").click(function () {
			if (game.AIrunning === false) {
				reset();
				game.AIrunning = true;
				game.status = true;
				AIclick(buttonClick);
			}
		});
	})

	function buttonClick(button, n, order, callback) {
		if (!($(button).hasClass('grayButton'))) {
			if ($('#' + button.id + " span").length === 0) createSpan(button);
			disableSiblings(button);
			getRanNum(button, n, order, callback);
		}
	}

	function createSpan(midButton) {
		var ranNum = document.createElement('span');
		ranNum.className = "ranNum";
		$(midButton).append(ranNum);
	}

	function AIclick(callback) {
		var order = randomOrder();
		showOrder(order);
		buttonClick($('#' + num2char[order[0]])[0], 0, order, callback);
	}

	function showOrder(order) {
		var display = "";
		for (var i in order) {
			display = display + num2char[order[i]] + ' ';
		}
		$("#order").text(display);
	}


	function isReady() {
		for (var key in num) {
			if (num[key] == "") {
				return false;
			}
		};
		return true;
	}

	function getResult() {
		var sum = 0;
		for (var key in num) {
			sum += num[key];
		};
		$("#result").text(sum);
		$("#button li").removeClass('grayButton');
	}


	function disableSiblings(midButton) {
		$(midButton).siblings().addClass('grayButton');
	}

	function enableSiblings(midButton) {
		var siblings = $(midButton).siblings();
		for (var i = 0; i < siblings.length; i++) {
			if (num[siblings[i].id] === "") {
				$("#" + siblings[i].id).removeClass('grayButton');
			}
		}
	}

	function getRanNum(midButton, n, order, callback) {
		var xmlhttp;
		if (window.XMLHttpRequest) {
			xmlhttp = new XMLHttpRequest();
		} else {
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmlhttp.onreadystatechange = function () {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200 && game.status === true) {
				var temp = xmlhttp.responseText;
				num[midButton.id] = parseInt(temp);
				console.log(num);
				$("#" + midButton.id + " span").text(temp);
				$("#" + midButton.id).addClass('grayButton');
				enableSiblings(midButton);
				if (!!callback) {
					if (n !== 4) {
						callback($('#' + num2char[order[n + 1]])[0], n + 1, order, callback);
					} else {
						getResult();
						game.AIrunning = false;
					}
				}
			} else {
				$("#" + midButton.id + " span").text("...");
			}
		}
		xmlhttp.open("GET", "/", true);
		xmlhttp.send();
	}

	function reset() {

		game.AIrunning = false;
		game.status = false;
		$(".grayButton").removeClass('grayButton');
		for (var key in num) {
			num[key] = "";
		}
		$(".ranNum").remove();
		$("#result").text("");
		$("#order").text("");
	}
})()