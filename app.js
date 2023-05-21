const numberBtn = document.querySelectorAll('[data-number]');
const operatorBtn = document.querySelectorAll('[data-operator]');
const currentOperandTextEl= document.querySelector('.current-operand');
const previousOperandTextEl = document.querySelector('.previous-operand');
const clearBtn = document.querySelector('.clear-btn');
const delBtn = document.querySelector('.del-btn');
const equalBtn = document.querySelector('#equal-btn');
// const floatBtn = document.querySelector('#float-btn')


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
    if (number === '.' && this.currentOperand.includes('.')) return;
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

  updateDisplay() {
    this.currentOperandTextEl.innerText = this.currentOperand
    this.previousOperandTextEl.textContent = this.previousOperand
  }

}


// keyboard input
function handleKeyboardInput(e) {
  if (e.key >= 0 && e.key <= 9) {
    calculator.appendNumber(e.key);
    calculator.updateDisplay()
  }
}


// set
const calculator = new Calculator(previousOperandTextEl, currentOperandTextEl);

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

window.addEventListener('keydown', handleKeyboardInput);
