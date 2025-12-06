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
                if (currentInput === '') {
                    return;
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

        else if (['+', '−', '×', '÷', '%'].includes(value) || value === '−') {
            if ((value === '−') && currentInput === '') {
                currentInput = '−';
                display.value += '−';
                return;
            }

            if (currentInput !== '') {
                const num = parseFloat(currentInput);
                if (firstOperand === null) {
                    firstOperand = num;
                } else if (operator) {
                    firstOperand = computeResult(firstOperand, operator, num);
                }
            }

            else if (isResultDisplayed) {
                firstOperand = parseFloat(display.value);
            }

            display.value += value;
            currentInput = '';
            operator = value;

            isResultDisplayed = false;
        }
        // Обработка '='
        else if (value === '=') {
            const secondOperand = currentInput !== '' ? parseFloat(currentInput) : 0;
            let result;

            if (operator && firstOperand !== null) {
                if (operator === '%') {
                    result = (firstOperand * secondOperand) / 100;
                } else {
                    result = computeResult(firstOperand, operator, secondOperand);
                }
                display.value = result;
                firstOperand = result;
                currentInput = result.toString();
            } else {

                result = currentInput;
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
        case '−':
            return (a - b);
        case '×':
            return a * b;
        case '÷':
            return b === 0 ? 'БЕЗКОНЕЧНОСТЕЙ⠀' : a / b;
        case '%':
            return (a * b) / 100;
        default:
            return b;
    }
}
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

