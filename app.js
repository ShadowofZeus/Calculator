const calcObj = {
  screenNumber: '0',
  inputOne: null,
  secondNumberFlag: false,
  currentOperator: null,
};

function enterNum(digit) {
  const { screenNumber, waitingForSecondOperand } = calcObj;

  if (waitingForSecondOperand === true) {
    calcObj.screenNumber = digit;
    calcObj.waitingForSecondOperand = false;
  } else {
    calcObj.screenNumber = screenNumber === '0' ? digit : screenNumber + digit;
  }
}

function decimalPoint(dot) {
  if (calcObj.waitingForSecondOperand === true) return;
  
  // If the `screenNumber` does not contain a decimal point
  if (!calcObj.screenNumber.includes(dot)) {
    // Append the decimal point
    calcObj.screenNumber += dot;
  }
}

function handlingOperator(nextOperator) {
  const { inputOne, screenNumber, currentOperator } = calcObj
  const inputValue = parseFloat(screenNumber);

  if (currentOperator && calcObj.waitingForSecondOperand)  {
    calcObj.currentOperator = nextOperator;
    return;
  }

  if (inputOne == null) {
    calcObj.inputOne = inputValue;
  } else if (currentOperator) {
    const currentValue = inputOne || 0;
    const result = performCalculation[currentOperator](currentValue, inputValue);

    calcObj.screenNumber = String(result);
    calcObj.inputOne = result;
  }

  calcObj.waitingForSecondOperand = true;
  calcObj.currentOperator = nextOperator;
}

const performCalculation = {
  '/': (inputOne, secondOperand) => inputOne / secondOperand,

  '*': (inputOne, secondOperand) => inputOne * secondOperand,

  '+': (inputOne, secondOperand) => inputOne + secondOperand,

  '-': (inputOne, secondOperand) => inputOne - secondOperand,

  '=': (inputOne, secondOperand) => secondOperand
};

function resetCalculator() {
  calcObj.screenNumber = '0';
  calcObj.inputOne = null;
  calcObj.waitingForSecondOperand = false;
  calcObj.currentOperator = null;
}

function updateScreen() {
  const display = document.querySelector('.display');
  display.value = calcObj.screenNumber;
}

updateScreen();

const keys = document.querySelector('.keypad');
keys.addEventListener('click', (event) => {
  const { target } = event;
  if (!target.matches('button')) {
    return;
  }

  if (target.classList.contains('operators')) {
    handlingOperator(target.value);
    updateScreen();
    return;
  }

  if (target.classList.contains('decimal')) {
    decimalPoint(target.value);
    updateScreen();
    return;
  }

  if (target.classList.contains('clrscreen')) {
    resetCalculator();
    updateScreen();
    return;
  }

  enterNum(target.value);
  updateScreen();
});