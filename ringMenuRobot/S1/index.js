/*上午班 13组 16340301 赵俊祥*/
(function () {
	var num = {          //记录每个按钮的随机数
		"A": "",
		"B": "",
		"C": "",
		"D": "",
		"E": ""
	}

	var gameStatus = false;

	$(function () {
		$(".mid.button").click(function () {
			gameStatus = true;
			//点击事件，判断是否是激活状态
			if (!($(this).hasClass('grayButton'))) {
				if ($('#' + this.id + " span").length === 0) {
					createSpan(this);
				}
				disableSiblings(this);
				getRandomNum(this);
			}
		});

		$("#info-bar").click(function (event) {
			//若5个按钮都已获得随机数则计算结果
			if (isReady()) {
				getResult();
			}
		});

		$("#button").mouseleave(function (event) {
			reset();
		});
	})

	//获得随机数后显示红色圆圈
	function createSpan(midButton) {
		var ranNum = document.createElement('span');
		ranNum.className = "ranNum";
		$(midButton).append(ranNum);
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

	//灭活其余按钮
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

	function getRandomNum(midButton) {
		var xmlhttp;
		if (window.XMLHttpRequest) {
			xmlhttp = new XMLHttpRequest();
		} else {
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmlhttp.onreadystatechange = function () {
			console.log(num);
			//当 readyState 等于 4 且状态为 200 时，表示响应就绪
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200 && gameStatus === true) {
				var temp = xmlhttp.responseText;
				num[midButton.id] = parseInt(temp);
				console.log(num);
				$("#" + midButton.id + " span").text(temp);
				$("#" + midButton.id).addClass('grayButton');
				enableSiblings(midButton);       //拿到随机数后激活其余按钮
			} else {
				$("#" + midButton.id + " span").text("...");
			}
		}
		xmlhttp.open("GET", "/", true);
		xmlhttp.send();
	}

	function reset() {
		gameStatus = false;
		$(".grayButton").removeClass('grayButton');
		for (var key in num) {
			num[key] = "";
		}
		$(".ranNum").remove();
		$("#result").text("");
	}

})()