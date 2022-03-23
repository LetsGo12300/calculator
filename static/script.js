function add(num1, num2){
    return num1 + num2;
}

function subtract(num1, num2){
    return num1 - num2;
}

function multiply(num1, num2){
    return num1 * num2;
}

function divide(num1, num2){
    return num1 / num2;
}

function operate(operator, inputString){
    let [a, b] = separateString(inputString);
    a = parseFloat(a);
    b = parseFloat(b);

    if (operator === '+'){
        return add(a, b);
    }
    else if (operator === '—'){
        return subtract(a, b);
    }
    else if (operator === '*'){
        return multiply(a, b);
    }
    else if (operator === '/'){
        return divide(a, b);
    }
    else return 'SYNTAX ERROR';
}

function separateString(inputString){
    return inputString.split('+').join(',').split('—').join(',').split('*').join(',').split('/').join(',').split(',');
}

let result = '';
let operateFlag = false;
let outputDisplay = document.getElementById('result');

let buttons = document.querySelectorAll(".calc-btn");

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        let btnClass = [...btn.classList];

        if (btnClass.includes("action-btn")){
            if (btn.id === 'clear') {
                result = '';
            }
            else if (btn.id === 'sign-reversal') {
                result = '-' + result;
            }
            else if (btn.id === 'del') {
                result = result.slice(0,-1);
            }
        }
        else if (btnClass.includes("operand")){
            result += btn.value;
        }
        else if (btnClass.includes("operator")){
            clickedOperator = btn.value;
            result += btn.value;
        }
        else if (btnClass.includes("equals")){
            operateFlag = true;
        }
        
        if (operateFlag === true){  
            result = operate(clickedOperator, result);
            operateFlag = false;
        }
        
        outputDisplay.textContent = result.toString();
    });
});