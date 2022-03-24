function add(num1, num2){
    return (num1 + num2).toString();
}

function subtract(num1, num2){
    return (num1 - num2).toString();
}

function multiply(num1, num2){
    return (num1 * num2).toString();
}

function divide(num1, num2){
    //rounding off to 4 decimal places
    let ans = (num1/num2).toString();
    if (ans.length > 5)
        return (num1 / num2).toFixed(4);
    else return ans;
}

function operate(str){
    if (str.indexOf('+') !== -1){
        let [a,b] = splitString('+', str);
        return add(a,b);
    }
    else if (str.indexOf('—') !== -1){
        let [a,b] = splitString('—', str);
        return subtract(a,b);
    }
    else if (str.indexOf('*') !== -1){
        let [a,b] = splitString('*', str);
        return multiply(a,b);
    }
    else if (str.indexOf('/') !== -1){
        let [a,b] = splitString('/', str);
        return divide(a,b);
    }
}

function splitString(operator, str){
    let [a, b] = str.split(operator);
    a = parseFloat(a);
    b = parseFloat(b);
    
    return [a, b];
}

function containsOperatorLast(str) {
    const operators = /[\/+—*]/;
    return operators.test(str.slice(-1));
}

function separateString(str){
    return str.split('+').join(',').split('—').join(',').split('*').join(',').split('/').join(',').split(',');
}

function containsOperatorMid(str) {
    let count = separateString(str).length;
    const operators = /[\/+—*]/;
    return (count > 1);
}

let topResult = '';
let bottomResult = '';
let lastClicked = null; 
let operateFlag = false;
let equalsFlag = false;
let topDisplay = document.getElementById('result');
let bottomDisplay = document.getElementById('input');

let buttons = document.querySelectorAll(".calc-btn");

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        let btnClass = [...btn.classList];

        if (btnClass.includes("action-btn")){
            if (btn.id === 'clear') {
                topResult = ''; 
                bottomResult = '';
                topDisplay.textContent = topResult;
                bottomDisplay.textContent = bottomResult;
            }
            else if (btn.id === 'sign-reversal') {
                if (topResult.substring(0,1) === '-'){
                    topResult = topResult.slice(1);
                }
                else topResult = '-' + topResult;
            }
            else if (btn.id === 'del') {
                topResult = topResult.slice(0,-1);
                bottomResult = bottomResult.slice(0,-1);
            }
        }
        else if (btnClass.includes("operand")){
            if (containsOperatorLast(topResult)){
                bottomResult = '';
            }
            bottomResult += btn.value;
            topResult += btn.value;
        }
        else if (btnClass.includes("operator")){
            
            if (containsOperatorLast(topResult)){
                topResult = topResult.slice(0,-1) + btn.value;
            }
            else if (containsOperatorMid(topResult)){
                equalsFlag = true;
                operateFlag = true;
            }
            else {
                topResult += btn.value;
            }
        }
        else if (btnClass.includes("equals")){
            if (topResult !== '')
                equalsFlag = true;
        }

        if (lastClicked === 'equals-btn'){
            //pass
        }
        else if (equalsFlag === true){
            if (operateFlag === true){
                topResult = operate(topResult);
                topResult += btn.value;
                topDisplay.textContent = topResult;
                bottomDisplay.textContent = topResult.slice(0,-1);
            } 
            else {
                topResult = operate(topResult);
                topDisplay.innerHTML += '=';
                bottomDisplay.textContent = topResult;
            }
            bottomResult = '';
            equalsFlag = false;
            operateFlag = false;
        }
        else {
            topResult = topResult.toString();
            topDisplay.textContent = topResult;
            bottomDisplay.textContent = bottomResult;
        }

        lastClicked = btn.id;
    });
});