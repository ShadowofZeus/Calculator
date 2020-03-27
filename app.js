const calcObj = {
  screenNumber: '0',
  inputOne: null,
  secondNumberFlag: false,
  currentOperator: null,
  waitingForSecondOperand: false
};

function enterNum(digit) {
  const { screenNumber, waitingForSecondOperand } = calcObj;

    if (waitingForSecondOperand === true) 
    {
      calcObj.screenNumber = digit;
      calcObj.waitingForSecondOperand = false;
    } 
    else 
    {
      if(calcObj.screenNumber === '0')
      {
        calcObj.screenNumber=digit;
    
      }
      ///limit the number of digits on the screen display to 11 characters
      else if(calcObj.screenNumber.length<=10)
      {
        calcObj.screenNumber = screenNumber + digit;
      }
    }

}

function decimalPoint(dot) {  
  const { currentOperator,waitingForSecondOperand } = calcObj;
  const display = document.querySelector('.display');

  if (calcObj.waitingForSecondOperand === true) 
  {
     return;
  }
  // If the `screenNumber` does not contain a decimal point
  if (!calcObj.screenNumber.includes(dot)) 
  {
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
    //leave the function with no calculations done
  }

  if (inputOne == null) 
  {
    calcObj.inputOne = inputValue;
  } 
  else if (currentOperator) 
  {
    const currentValue = inputOne || 0;
    const result = performCalculation(currentValue,currentOperator,inputValue)
//calculate the result and get it at 4 decimal places and as a string using toFixed method.
    calcObj.screenNumber = result.toFixed(4);
    calcObj.inputOne = result;
  }

  calcObj.waitingForSecondOperand = true;
  calcObj.currentOperator = nextOperator;
}

function performCalculation(firstV,operator,secondV)
{
  let result = null;
  const display = document.querySelector('input'); 
  
  switch(operator){
    case '/':
      result = firstV/secondV;
      return result;
      break;
    
    case '*':
      result = firstV*secondV;
      return result;
      break;
    
    case '+':
      result = firstV+secondV;
      return result;
      break;
    
    case '-':
      result = firstV-secondV;
      return result;
      break;
    
    case '=':
      return secondV;
      break;

  }
}

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

  if (target.classList.contains('decimal')) 
  {
      if (calcObj.waitingForSecondOperand === true) 
    { 
      calcObj.screenNumber = '0'+target.value;
      console.log(calcObj.screenNumber);
      updateScreen();
    }
    else
    {
      decimalPoint(target.value);
      updateScreen();
      return;
    }
    
  }

  if (target.classList.contains('clrscreen')) {
    resetCalculator();
    updateScreen();
    return;
  }

  enterNum(target.value);
  updateScreen();
});