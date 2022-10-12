const clearbtn = document.getElementById('clear-btn')
const equalsbtn = document.getElementById('equals-btn')
const dividebtn = document.getElementById('divide-btn')
const multiplybtn = document.getElementById('multiply-btn')
const minusbtn = document.getElementById('minus-btn')
const plusbtn = document.getElementById('plus-btn')
const decimalbtn = document.getElementById('decimal-btn')
const display = document.querySelector('.display')
const numberButtons = document.querySelectorAll('[data-number]')

let updatedNumber = 0;
let updatedNumber2 = 0;
let updatedOperation = null;

numberButtons.forEach((button) =>
	button.addEventListener('click', () => appendNumber(button.innerText))
	)

function appendNumber(number) {
	if (display.innerText === '0' || display.innerText.includes(" ")) {
		display.innerText = number
	} else {
		display.append(number);
	}
	updatedNumber = +(display.innerText);
}

clearbtn.addEventListener('click', function() {
	display.innerText = '0';
	updatedNumber = 0;
	updatedNumber2 = 0;
	updatedOperation = null;
})

decimalbtn.addEventListener('click', function() {
	display.append('.');
})

equalsbtn.addEventListener('click', function() {
	display.innerText = operate(updatedOperation, updatedNumber2, updatedNumber);
	updatedNumber = +(display.innerText);
	updatedOperation = null;
})

plusbtn.addEventListener('click', function() {
	if (updatedOperation == null) {
		updatedOperation = add;
	} else {
		display.innerText = operate(updatedOperation, updatedNumber2, updatedNumber);
		updatedNumber = +(display.innerText);
		updatedOperation = add;
	}
	updatedNumber2 = updatedNumber;
	display.append(' + ');
})

dividebtn.addEventListener('click', function() {
	if (updatedOperation == null) {
		updatedOperation = divide;
	} else {
		display.innerText = operate(updatedOperation, updatedNumber2, updatedNumber);
		updatedNumber = +(display.innerText);
		updatedOperation = divide;
	}
	updatedNumber2 = updatedNumber;
	display.append(' ÷ ');
})

multiplybtn.addEventListener('click', function() {
	if (updatedOperation == null) {
		updatedOperation = multiply;
	} else {
		display.innerText = operate(updatedOperation, updatedNumber2, updatedNumber);
		updatedNumber = +(display.innerText);
		updatedOperation = multiply;
	}
	updatedNumber2 = updatedNumber;
	display.append(' x ');
})

minusbtn.addEventListener('click', function() {
	if (updatedOperation == null) {
		updatedOperation = substract;
	} else {
		display.innerText = operate(updatedOperation, updatedNumber2, updatedNumber);
		updatedNumber = +(display.innerText);
		updatedOperation = substract;
	}
	updatedNumber2 = updatedNumber;
	display.append(' - ');
})

function add(num1, num2) {
	return num1 + num2;
}

function substract(num1, num2) {
	return num1 - num2;
}

function multiply(num1, num2) {
	return num1 * num2;
}

function divide(num1, num2) {
	return num1 / num2;
}

function operate(operation, num1, num2) {
	return operation(num1, num2);
}