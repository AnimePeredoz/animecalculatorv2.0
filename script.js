
const btnclear = document.getElementById('btnclear');
const soundclear = document.getElementById('soundclear');
const btnac = document.getElementById('btnac');
const btnr = document.getElementById('btnr');
const soundbtnr = document.getElementById('soundbtnr');
const btndot = document.getElementById('btndot');
const sounddot = document.getElementById('sounddot');
const btn1 = document.querySelectorAll('.btn1');
const soundbtn = document.getElementById('soundbtn');
const btn2 = document.querySelectorAll('.btn2');

btnclear.addEventListener('click', function () {
    soundclear.play();
});
btnac.addEventListener('click', () => {
    soundclear.play();
});
btnr.addEventListener('click', function () {
    soundbtnr.play();
});
btndot.addEventListener('click', function () {
    sounddot.play();
});
btn1.forEach(btn => {
    btn.addEventListener('click', function () {
        soundbtn.play();
    });
});
btn2.forEach(btn => {
    btn.addEventListener('click', function () {
        sounddot.play();
    });
});

const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

let currentInput = '';
let firstOperand = null;
let operator = null;
let isResultDisplayed = false;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');

        if (!isNaN(value) || value === '.') {
            if (value === '.') {
                if (currentInput.includes('.')) {
                    return;
                }
                if (currentInput === '' || currentInput === '-') {
                    currentInput += '0';
                    display.value += '0';
                }
            }
            if (isResultDisplayed) {
                display.value = '';
                currentInput = '';
                isResultDisplayed = false;
            }
            currentInput += value;
            display.value += value;
        }

        else if (['+', '-', '×', '÷', '%'].includes(value)) {
            if (value === '-') {
                if (currentInput === '' || currentInput === '-') {
                    currentInput = '-';
                    display.value += '-';
                    return;
                }
            }

            if (currentInput !== '' && currentInput !== '-') {
                const num = parseFloat(currentInput);
                if (firstOperand === null) {
                    firstOperand = num;
                } else if (operator) {
                    firstOperand = computeResult(firstOperand, operator, num);
                }
            } else if (isResultDisplayed) {
                firstOperand = parseFloat(display.value);
            }

            display.value += value;
            currentInput = '';
            operator = value;
            isResultDisplayed = false;
        }
        else if (value === '=') {
            let secondOperand = 0;
            if (currentInput !== '' && currentInput !== '-') {
                secondOperand = parseFloat(currentInput);
            } else if (currentInput === '-') {
                secondOperand = -parseFloat(currentInput.slice(1));
            }
            if (operator && firstOperand !== null) {
                const result = computeResult(firstOperand, operator, secondOperand);
                display.value = result;
                firstOperand = result;
                currentInput = result.toString();
            } else {
                display.value = currentInput !== '' ? currentInput : '0';
            }
            isResultDisplayed = true;
            operator = null;
        }
        else if (value === 'C') {
            display.value = '';
            currentInput = '';
            firstOperand = null;
            operator = null;
            isResultDisplayed = false;
        }
        else if (value === 'backspace') {
            display.value = display.value.slice(0, -1);
            currentInput = display.value;
        }
    });
});

function computeResult(a, op, b) {
    switch (op) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '×':
            return a * b;
        case '÷':
            return b === 0 ? 'ПОШЕЛ НАХУЙ' : a / b;
        case '%':
            return (a * b) / 100;
        default:
            return b;
    }
}