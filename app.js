const numberBtn = document.querySelectorAll('[data-number]')
const operatorBtn = document.querySelectorAll('[data-operator]')

const currentOperation = document.querySelector('current-operand')
const previousOperation = document.querySelector('previous-operand')

const clearBtn = document.querySelector('clear-btn')
const delBtn = document.querySelector('del-btn')

const equalBtn = document.querySelector('equal-btn')
const floatBtn = document.querySelector('float-btn')

// initialize
let setCurrentScreen = ''
let resetScreen = false


// keyboard input
window.addEventListener('keydown', handleKeyboardInput)

function handleKeyboardInput(e) {
  if (e.key >= 0 && e.key <= 9) appendNumber(e.key)
}

// click input
numberBtn.forEach(button => {
  button.addEventListener('click', () => appendNumber(button.textContent))
});

operatorBtn.forEach(button => {
  button.addEventListener('click', () => operate(button.textContent))
})


function appendNumber(number) {
  if (currentOperation.textContent === '0' || resetScreen) {
    resetScreen()
  }
  currentOperation.textContent += number
}

// function resetScreen() {
//
// }

function clear() {
  currentOperation.textContent = null
  previousOperation.textContent = ''
}

// basic calculations
const add = (x , y) => x + y;
const substract = (x, y) => x - y;
const mutiply = (x, y) => x * y;
const divide = (x, y) => x / y;

const operate = (operator, x, y) => {
  x = Number(x);
  y = Number(y);

  switch (operator) {
    case '+':
      return add(x, y);
    case '-':
      return substract(x, y);
    case '*':
      return mutiply(x, y);
    case '/':
      return divide(x, y);
    default:
      return null
  }
}


// set

// clearBtn.addEventListener('click', clear())
