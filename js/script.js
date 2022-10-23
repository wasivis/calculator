let firstOperand = ''
let secondOperand = ''
let currentOperation = null
let shouldResetScreen = false
let dividedByZero = false

const numberButtons = document.querySelectorAll('[data-number]')
const operatorButtons = document.querySelectorAll('[data-operator]')
const equalsButton = document.getElementById('equalsbtn')
const clearButton = document.getElementById('clearbtn')
const deleteButton = document.getElementById('deletebtn')
const decimalButton = document.getElementById('decimalbtn')
const lastOperationScreen = document.querySelector('.lastOperationScreen')
const currentOperationScreen = document.querySelector('.currentOperationScreen')

window.addEventListener('keydown', (e) => {
  handleKeyboardInput(e);
  keyPress(e);
})
window.addEventListener('keyup', (e) => {
  keyDepress(e);
})
equalsButton.addEventListener('click', evaluate)
clearButton.addEventListener('click', clear)
deleteButton.addEventListener('click', deleteNumber)
decimalButton.addEventListener('click', appendDecimal)

numberButtons.forEach((button) =>
  button.addEventListener('click', () => appendNumber(button.textContent))
  )

operatorButtons.forEach((button) =>
  button.addEventListener('click', () => setOperation(button.textContent))
  )

function keyPress(e) {
  var button = document.getElementsByClassName("btn");
  for (i = 0; i < button.length; i++) {
    if(e.key === button[i].textContent) {
      button[i].classList.add('active');
    } else if(e.key === '*') {
      button[5].classList.add('active');
    } else if(e.key === '/') {
      button[4].classList.add('active');
    } else if(e.key === 'Escape') {
      button[0].classList.add('active');
    } else if(e.key === 'Backspace' || e.key === 'Delete') {
      button[1].classList.add('active');
    } else if(e.key === '=' || e.key === 'Enter') {
      button[3].classList.add('active');
    }
  }
}

function keyDepress(e) {
  var button = document.getElementsByClassName("btn");
  for (i = 0; i < button.length; i++) {
    if(e.key === button[i].textContent) {
      button[i].classList.remove('active');
    } else if(e.key === '*') {
      button[5].classList.remove('active');
    } else if(e.key === '/') {
      button[4].classList.remove('active');
    } else if(e.key === 'Escape') {
      button[0].classList.remove('active');
    } else if(e.key === 'Backspace' || e.key === 'Delete') {
      button[1].classList.remove('active');
    } else if(e.key === '=' || e.key === 'Enter') {
      button[3].classList.remove('active');
    }
  }
}

function appendNumber(number) {
  if(lastOperationScreen.textContent.includes('='))
    clear()
  if (currentOperationScreen.textContent === '0' || shouldResetScreen)
    resetScreen()
  if (dividedByZero) {
    clear()
    resetScreen()
    dividedByZero = false;
  }
  if (currentOperationScreen.textContent.toString().length > 13) {
    return
  }
  if ((firstOperand === '' ||  firstOperand === '0') && number === '0' && currentOperation === null) {
    firstOperand = '0'
  } else if (currentOperation !== null) {
    secondOperand += number
    currentOperationScreen.textContent = numberWithCommas(secondOperand);
  } else {
    firstOperand += number;
    currentOperationScreen.textContent = numberWithCommas(firstOperand);
  }
}

function resetScreen() {
  currentOperationScreen.textContent = '0'
  shouldResetScreen = false
}

function clear() {
  currentOperationScreen.textContent = '0'
  lastOperationScreen.textContent = ''
  firstOperand = ''
  secondOperand = ''
  currentOperation = null
}

function appendDecimal() {
  if (shouldResetScreen) {
    resetScreen()
  }
  if (currentOperationScreen.textContent === '') {
    currentOperationScreen.textContent = '0'
  }
  if (currentOperationScreen.textContent.includes('.')) {
    return
  }
  if(currentOperation !== null) {
    secondOperand += "."
    currentOperationScreen.textContent = numberWithCommas(secondOperand);
  } else {
    firstOperand += '.';
    currentOperationScreen.textContent = numberWithCommas(firstOperand);
  }
}

function deleteNumber() {
  var currentOperationStr = currentOperationScreen.textContent.toString();
  if(currentOperationScreen.textContent != '0') {
    currentOperationScreen.textContent = numberWithCommas(firstOperand
      .toString()
      .slice(0, -1))
    firstOperand = numberWithoutCommas(currentOperationScreen.textContent)
  }
  if(currentOperationScreen.textContent.length === 0) {
    currentOperationScreen.textContent = '0';
  }
}

function setOperation(operator) {
  if (currentOperation !== null) {
    evaluate()
  }
  currentOperation = operator
  lastOperationScreen.textContent = numberWithCommas(`${firstOperand} ${currentOperation}`)
  shouldResetScreen = true
}

function evaluate() {
  if (currentOperation === null || shouldResetScreen)
    return
  if (currentOperation === '÷' && currentOperationScreen.textContent === '0') {
    currentOperationScreen.textContent = "ERROR";
    lastOperationScreen.textContent = "You can't divide by zero!"
    dividedByZero = true
    return
  }
  secondOperand = numberWithoutCommas(currentOperationScreen.textContent)
  currentOperationScreen.textContent = numberWithCommas(roundResult(
    operate(currentOperation, firstOperand, secondOperand)
    ))
  lastOperationScreen.textContent = numberWithCommas(`${firstOperand} ${currentOperation} ${secondOperand} =`)
  currentOperation = null
  firstOperand = numberWithoutCommas(currentOperationScreen.textContent)
  secondOperand = ''
}

function roundResult(number) {
  return Math.round(number * 10000) / 10000
}

function handleKeyboardInput(e) {
  if(e.key === 'Spacebar' || e.key === ' ')
    return
  if (e.key >= 0 && e.key <= 9)
    appendNumber(e.key) 
  if (e.key === '.')
    appendDecimal()
  if (e.key === '=' || e.key === 'Enter')
    evaluate()
  if (e.key === 'Backspace' || e.key === 'Delete')
    deleteNumber()
  if (e.key === 'Escape')
    clear()
  if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
    setOperation(convertOperator(e.key))
}

function convertOperator(keyboardOperator) {
  if (keyboardOperator === '/') {
    return '÷'
  }
  if (keyboardOperator === '*') {
    return '×'
  }
  if (keyboardOperator === '-') {
    return '-'
  }
  if (keyboardOperator === '+') {
    return '+'
  }
}

function add(a, b) {
  return a + b
}

function substract(a, b) {
  return a - b
}

function multiply(a, b) {
  return a * b
}

function divide(a, b) {
  return a / b
}

function operate(operator, a, b) {
  a = Number(a)
  b = Number(b)
  switch (operator) {
    case '+':
    return add(a, b)
    case '-':
    return substract(a, b)
    case '×':
    return multiply(a, b)
    case '÷':
    if (b === 0) {
      return null
    } else {
      return divide(a, b)
    }
    default:
    return null
  }
}

function numberWithCommas(number) {
  return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

function numberWithoutCommas(number) {
  return number.replace(/\,/g, '')
}