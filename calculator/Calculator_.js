var expression = "";
var flag = false;
var button = document.getElementsByClassName("character");

window.onload = function () {
  for (var i = 0; i < 17; i++) {
    button[i].onclick = function () {
      if (this.innerHTML >= "0" && this.innerHTML <= "9") {
        if (flag) {
          expression = this.innerHTML;
          flag = false;
        }
        else {
          if (expression[expression.length - 1] == '0' && expression.length === 1) {
            expression = this.innerHTML;
          }
          else if (expression[expression.length - 1] == '0' && expression.length > 1) {
            if (expression[expression.length - 2] == "+" || expression[expression.length - 2] == "-" || expression[expression.length - 2] == "*"
              || expression[expression.length - 2] == "/" || expression[expression.length - 2] == "(" || expression[expression.length - 2] == ")") {
              expression = expression.slice(0, expression.length - 1) + this.innerHTML;
            }
            else {
              expression += this.innerHTML;
            }
          }
          else {
            expression += this.innerHTML;
          }
        }
      }
      else if (this.innerHTML === "+" || this.innerHTML === "-" || this.innerHTML === "*" || this.innerHTML === "/") {
        if (expression[expression.length - 1] === "+" || expression[expression.length - 1] === "-"
          || expression[expression.length - 1] === "*" || expression[expression.length - 1] === "/") {
          expression = expression.slice(0, expression.length - 1) + this.innerHTML;
        }
        else {
          expression += this.innerHTML;
        }
        flag = false;
      }
      else {
        if (this.innerHTML == "." && expression[expression.length - 1] == ".") {
          return;
        }
        if (flag) {
          expression = this.innerHTML;
          flag = false;
        }
        else {
          expression += this.innerHTML;
        }
      }
      document.getElementById("expression").value = expression;
      if (expression.length > 18) {                                                      //change fontSize if the expression is too long
        document.getElementById("expression").style.fontSize = (600 / expression.length) + "px";
      }
      else {
        document.getElementById("expression").style.fontSize = "24pt";
      }
    }
  }

  document.getElementById("delete").onclick = function () {
    expression = expression.substring(0, expression.length - 1);
    if (expression.length > 18) {                                                   //change fontSize if the expression is too long
      document.getElementById("expression").style.fontSize = (600 / expression.length) + "px";
    }
    else {
      document.getElementById("expression").style.fontSize = "24pt";
    }
    document.getElementById("expression").value = expression;
  }

  document.getElementById("clear").onclick = function () {
    expression = "";
    document.getElementById("expression").value = expression;
  }

  document.getElementById("equal").onclick = function () {
    if (expression == "") {
      return;
    }
    try {
      expression = eval(expression).toFixed(10) * 10000000000 / 10000000000 + "";                 //reserve ten digits after decimal point
      if (expression === "Infinity" || expression === "-Infinity" || expression === "NaN") {
        alert("零不能作为除数");
        expression = "";
        document.getElementById("expression").value = expression;
      }
      document.getElementById("expression").value = expression;
      flag = true;
    }
    catch (exception) {
      alert("Invalid expression!");
      expression = "";
      document.getElementById("expression").value = expression;
    }
  }
}