/*上午班 13组 16340301 赵俊祥*/
(function () {
	var num = {               //记录每个按钮的随机数 
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
				AIclick($("#A"), buttonClick);
			}
		});
	})

	function buttonClick(button, callback) {
		if (!($(button).hasClass('grayButton'))) {
			if ($('#' + button.id + " span").length === 0) {
				createSpan(button);
			}
			disableSiblings(button);
			getRandomNum(button, callback);
		}
	}

	function createSpan(midButton) {
		var ranNum = document.createElement('span');
		ranNum.className = "ranNum";
		$(midButton).append(ranNum);
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

	//回调实现顺序点击
	function AIclick(jqButton, callback) {
		buttonClick(jqButton[0], buttonClick);
	}

	function isReady() {
		for (var key in num) {
			if (num[key] == ""){
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

	function getRandomNum(midButton, callback) {
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
					if ($(midButton).next().length !== 0) {
						callback($(midButton).next()[0], callback);
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
	}
})()