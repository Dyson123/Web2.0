puzzlePos = [
  [0, 0], [0, 0], [92, 0], [184, 0], [276, 0],
  [0, 92], [92, 92], [184, 92], [276, 92],
  [0, 184], [92, 184], [184, 184], [276, 184],
  [0, 276], [92, 276], [184, 276], [276, 276]
];

var pic = 0;
var hintFlag = 0;
var time = 0;
var moves = 0;
var isMatched = 0;
var playing = 0;
var rand = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

window.onload = function () {
  generateMap();
  $("#start").click(start);
  $("#reset").click(reset);
  $("#change").click(changePic);
  $("#hint").click(hint);
}

function generateMap() {
  var puzzle = document.getElementById("puzzle");
  while (puzzle.firstChild) {
    puzzle.removeChild(puzzle.firstChild);
  }

  for (var i = 1; i <= 16; i++) {
    var $b = $("<li></li>");
    $b.attr("id", "block" + i);
    $b.addClass("class" + i);
    $("#puzzle").append($b);
  }

  var $temp = $("<div></div>");
  $temp.attr("id", "hintPic");
  $temp.addClass("panda");
  $("#puzzle").append($temp);

  $("li").click(click);
}

function start() {
  $("#win").css("opacity","0");
  if (playing === 1) {
    window.clearInterval(timer);
    time = 0;
    $("#time").attr("value", time);
  }
  time = 1;
  timer = window.setInterval(clock, 1000);
  restruct();
  isMatched = 0;
  moves = 0;
  $("#moves").attr("value", moves);
  playing = 1;
}

function reset() {
  $("#win").css("opacity","0");
  if (playing === 0)
    return;
  for (var i = 1; i <= 16; i++) {
    $("#block" + i).attr("class", "class" + i);
  }
  moves = 0;
  $("#moves").attr("value", moves);
  time = 0;
  $("#time").attr("value", time);
  playing = 0;
  window.clearInterval(timer);
}

function changePic() {
  generateMap();
  reset();
  pic = (pic + 1) % 3;
  if (pic === 0) {
    $("#hintPic").attr("class", "panda");
    $("#puzzle li").css("background-image", "url(images/panda.jpg)");
  }
  else if (pic === 1) {
    $("#hintPic").attr("class", "luffie");
    $("#puzzle li").css("background-image", "url(images/luffie.jpg)");
  }
  else {
    $("#puzzle li").css("background-image", "url(images/qian.jpg)");
    $("#hintPic").attr("class", "qian");
  }
}

function hint() {

  if (hintFlag === 0) {
    $("#hintPic").css("opacity", "1");
    hintFlag = 1;
  } else {
    $("#hintPic").css("opacity", "0");
    hintFlag = 0;
  }
}

function clock() {
  $("#time").attr("value", time);
  time++;
}

function restruct() {
  random();
  for (var i = 1; i <= 15; i++) {
    $("#block" + i).attr("class", "class" + rand[i - 1]);
  }
}

function random() {
  //产生一组1-15随机数
  for (var i = 0; i < 16; i++) {
    rand[i] = 0;
  }
  var count = 0;
  for (var i = 0; i < 15; i++) {
    var flag = 1;
    var num = Math.floor(Math.random() * 15 + 1);
    for (var j = 0; j < count; j++) {
      if (num === rand[j]) {
        flag = 0;
        break;
      }
    }
    while (flag === 0) {
      flag = 1;
      num = Math.floor(Math.random() * 15 + 1);
      for (var j = 0; j < count; j++) {
        if (num === rand[j]) {
          flag = 0;
          break;
        }
      }
    }
    rand[i] = num;
    count++;
  }
  //计算这组随机数的逆序数
  var inverNum = 0;
  for (var i = 0; i < 15; i++) {
    for (var j = 0; j < i; j++) {
      if (rand[j] > rand[i])
        inverNum++;
    }
  }
  //若逆序数为偶数，则可以复原，否则重新产生随机数
  if (inverNum % 2 !== 0) {
    return random();
  }
}

function matched() {
  for (var i = 1; i <= 16; i++) {
    var str = $("#block" + i).attr("class").substring(5);
    var str2 = i + "";
    if (str != str2) {
      isMatched = 0;
      return;
    }
  }
  isMatched = 1;
}

function win() {
  $("#win").css("opacity","1");
  playing = 0;
}

function click(event) {
  if (playing === 0)
    return;

  var str = $("#block16").attr("class");
  str = str.substring(5);
  var pos = parseInt(str);
  var blankLeft = puzzlePos[pos][0];
  var blankTop = puzzlePos[pos][1];
  str = $("#" + event.target.id).attr("class");
  str = str.substring(5);
  pos = parseInt(str);
  var left = puzzlePos[pos][0];
  var top = puzzlePos[pos][1];

  if (blankLeft === left && (blankTop - top === 92 || blankTop - top === -92) || blankTop === top && (blankLeft - left === 92 || blankLeft - left === -92)) {
    var temp = $("#block16").attr("class");
    $("#block16").attr("class", event.target.className);
    event.target.className = temp;
    moves++;
    $("#moves").attr("value", moves);
  }

  matched()
  if (isMatched === 1) {
    win();
    window.clearInterval(timer);
  }

}