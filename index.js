const output = document.querySelector(`.output`);
var stack = [0];
var delOnNext = false;
window.addEventListener("keydown", (e) => {
  if (e.key == "Backspace") {
    clearOutput();
    return;
  }
  var x = document.querySelector(`.number[data-key="${e.key}"]`) || "";
  if (output.textContent == 0 || delOnNext === true) {
    output.textContent = "";
    delOnNext = false;
  }
  output.textContent += x.textContent || "";
  var y = document.querySelector(`.functions div[data-key="${e.key}"]`) || "";
  if (y.onclick) {
    y.onclick.apply(y);
  }
});

numbers = document.querySelectorAll(`.number`);
numbers.forEach((number) => {
  number.addEventListener("click", (e) => {
    if (output.textContent == 0 || delOnNext === true) {
      output.textContent = "";
      delOnNext = false;
    }
    output.textContent += number.textContent || "";
  });
});

function TwoOp(type) {
  if (stack.length == 1) {
    stack[0] = output.textContent;
    stack.push(type);
  } else if (stack.length == 2) {
    innoculate();
    stack.push(type);
    output.textContent = stack[0];
  }
  delOnNext = true;
  console.log(stack);
}
function singleOp(type) {
  if (stack.length == 1) {
    stack[0] = output.textContent;
    stack.push(type);
    innoculate();
    output.textContent = stack[0];
  } else if (stack.length == 2) {
    innoculate();
    stack.push(type);
    innoculate();
    output.textContent = stack[0];
  }
  delOnNext = true;
  console.log(stack);
}
function add() {
  TwoOp("+");
}
function subtract() {
  TwoOp("-");
}
function divide() {
  TwoOp("/");
}
function multiply() {
  TwoOp("*");
}
function invert() {
  singleOp("inv");
}
function squarert() {
  singleOp("sqrt");
}
function innoculate() {
  stack[0] = operate(
    stack[1] || "+",
    parseInt(stack[0]),
    parseInt(output.textContent) || 0
  );
  if (stack.length != 1) {
    stack.pop();
  }
}
function operate(op, x, y) {
  switch (op) {
    case "+":
      return x + y;
    case "-":
      return x - y;
    case "*":
      return x * y;
    case "/":
      return x / y;
    case "+":
      return x + y;
    case "sqrt":
      return Math.round(Math.sqrt(x));
    case "inv":
      return x * -1;
  }
}
function display() {
  innoculate();
  output.textContent = stack[0];
  delOnNext = true;
  console.log(stack);
}
function clearOutput() {
  output.textContent = "0";
  stack[0] = 0;
}
