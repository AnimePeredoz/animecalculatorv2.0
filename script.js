window.addEventListener('load', function () {
    const videoContainer = document.getElementById('loader-video-container');
    const video = document.getElementById('loader-video');

  
    function hideLoader() {
        videoContainer.style.opacity = '0';
        setTimeout(() => {
            videoContainer.style.display = 'none';
        }, 500); 
    }

   
    if (video.ended) {
        hideLoader();
    } else {
    
        video.addEventListener('ended', hideLoader);
    }
});

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
// let message = 'ПОШЕЛ НАХУЙ  '

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
                if (!isNaN(currentInput)) {
                    currentInput += '';
                    display.value += '';
                }

                else {
                    display.value = '';
                    currentInput = '';
                    isResultDisplayed = true;
                    return;
                }
            }

            if (isResultDisplayed) {
                display.value += '';
                currentInput += '';
                isResultDisplayed = false;
            }
            currentInput += value;
            display.value += value;
        }

        else if (['+', '-', '×', '÷', '%'].includes(value)) {
            if (value === '-') {
                if (currentInput === '' || currentInput === '-') {
                    currentInput = '-';
                    display.value = '-';
                    return;
                }
                if (!isNaN(currentInput)) {
                    currentInput += '';
                    display.value += '';
                }
                else {
                    display.value = '';
                    currentInput = '';
                    isResultDisplayed = true;
                    return;
                }

            }
            if (value === '+') {
                if (currentInput === '' || currentInput === '+') {
                    currentInput = '';
                    display.value = '';
                    return;
                }
                if (!isNaN(currentInput)) {
                    currentInput += '';
                    display.value += '';
                }

                else {
                    display.value = '';
                    currentInput = '';
                    isResultDisplayed = true;
                    return;
                }

            }
            if (value === '×') {
                if (currentInput === '' || currentInput === '×') {
                    currentInput = '';
                    display.value = '';
                    return;
                }
                if (!isNaN(currentInput)) {
                    currentInput += '';
                    display.value += '';

                }

                else {
                    display.value = '';
                    currentInput = '';
                    isResultDisplayed = true;
                    return;
                }


            }
            if (value === '÷') {
                if (currentInput === '' || currentInput === '÷') {
                    currentInput = '';
                    display.value = '';
                    return;
                }
                if (!isNaN(currentInput)) {
                    currentInput += '';
                    display.value += '';
                }
                else {
                    display.value = '';
                    currentInput = '';
                    isResultDisplayed = true;
                    return;
                }

            }
            if (value === '%') {
                if (currentInput === '' || currentInput === '%') {
                    currentInput = '';
                    display.value = '';
                    return;
                }
                if (!isNaN(currentInput)) {
                    currentInput += '';
                    display.value += '';
                }
                else {

                    display.value = '';
                    currentInput = '';
                    isResultDisplayed = true;
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

            else {
                display.value = '';
                currentInput = '';
                firstOperand = null;
                operator = null;
                num = null
                isResultDisplayed = true;
                return;
            }

            display.value += value;
            currentInput = '';
            operator = value;
            isResultDisplayed = false;
        }

        else if (value === '=') {
            let num = 0;
            if (currentInput !== '' && currentInput !== '-') {
                num = parseFloat(currentInput);
            } else if (currentInput === '-') {
                num = -parseFloat(currentInput.slice(1));
            }
            if (operator && firstOperand !== null && !isNaN(firstOperand)) {
                const result = computeResult(firstOperand, operator, num);
                display.value = result;
                firstOperand = result;
                currentInput = result.toString();
            }

            else if (isNaN(currentInput)) {
                display.value = '0';
                currentInput = '';
                isResultDisplayed = true;
                return;
            }
            else {
                display.value = currentInput !== '' ? currentInput : '';
            }

            isResultDisplayed = true;
            operator = null;
            firstOperand = null
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
            currentInput = currentInput.slice(0, -1);
        }
    });
});


function computeResult(firstOperand, operator, num) {
    switch (operator) {
        case '+':
            return firstOperand + num;
        case '-':
            return firstOperand - num;
        case '×':
            return firstOperand * num;
        case '÷':
            if (num === 0 || firstOperand === 0) {
                display.value = 'ПОШЕЛ НАХУЙ  '
                return display.value
            }
            else {
                return firstOperand / num
            }
        case '%':
            return firstOperand * num / 100;
        default:
            return num;
    }
}











