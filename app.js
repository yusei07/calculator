const numberBtn = document.querySelectorAll('[data-number]');
const operatorBtn = document.querySelectorAll('[data-operator]');
const currentOperandTextEl= document.querySelector('.current-operand');
const previousOperandTextEl = document.querySelector('.previous-operand');
const clearBtn = document.querySelector('.clear-btn');
const delBtn = document.querySelector('.del-btn');
const equalBtn = document.querySelector('#equal-btn');

// init
class Calculator {
  constructor(previousOperandTextEl, currentOperandTextEl) {
    this.previousOperandTextEl = previousOperandTextEl
    this.currentOperandTextEl = currentOperandTextEl
    this.clear()
  }

  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
  }

  delete(number) {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return; // stops user from adding more than 1 float
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
      this.operate() // computes automatically when another operation is performed
    }

    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = '' // set back to empty str
  }

  operate() {
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    let result
    
    if (isNaN(prev) || isNaN(current)) return

    switch (this.operation) {
      case '+':
        result = prev + current
        break
      case '-':
        result = prev - current
        break
      case '*':
      case '×':
        result = prev * current
        break
      case '÷':
      case '/':
        if (current === 0) {
          return null
          break
        }
        else {
          result = prev / current
          break
        }
      default:
        return
    }
    this.currentOperand = result
    this.operation = undefined
    this.previousOperand = ''
  }

  // add comma automatically
  getDisplayNumber(number) {
    const stringNumber = number.toString()
    // split turns the str num to arr
    const integerDigits = parseFloat(stringNumber.split('.')[0]) // int value before period
    const decimalDigits = stringNumber.split('.')[1] // int value after the period
    let integerDisplay
    // check if user inputs nothing || decimal place
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0 })
    }

    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay() {
    this.currentOperandTextEl.innerText = 
      this.getDisplayNumber(this.currentOperand)
    // displays the previous + the operation to the end of it
    if (this.operation != null || this.operation != undefined) {
      this.previousOperandTextEl.innerText = 
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
      this.previousOperandTextEl.innerText = ''
    }
  }

}

// instantiate (defining)
const calculator = new Calculator(previousOperandTextEl, currentOperandTextEl);


// keyboard input
function handleKeyboardInput(e) {
  console.log(e)
  if (e.key >= 0 && e.key <= 9 || e.key === '.') {
    calculator.appendNumber(e.key);
    calculator.updateDisplay();
  }
  else if (e.key === 'Enter' || e.key === '=') {
    calculator.operate();
    calculator.updateDisplay();
  }
  else if (e.key === 'Backspace') {
    calculator.delete();
    calculator.updateDisplay();
  }
  else if (e.key === 'c' || e.key === 'C') {
    calculator.clear();
    calculator.updateDisplay();
  }
  else if (e.key === '+'||
  e.key === '-' ||
  e.key === '/' ||
  e.key === '*' ||
  e.key === 'x') {
    calculator.chooseOperation(e.key)
    calculator.updateDisplay()
  }
}

numberBtn.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay();
  })
})

operatorBtn.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalBtn.addEventListener('click', () => {
  calculator.operate();
  calculator.updateDisplay();
})

clearBtn.addEventListener('click', () => {
  calculator.clear();
  calculator.updateDisplay();
});

delBtn.addEventListener('click', () => {
  calculator.delete();
  calculator.updateDisplay();
})

window.addEventListener('keydown', handleKeyboardInput)
