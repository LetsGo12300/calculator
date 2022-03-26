let topResult = '';
let bottomResult = '';
let lastClickedID = null; 
let lastClickedClass = null; 
let operateFlag = false;
let equalsFlag = false;
let topDisplay = document.getElementById('result');
let bottomDisplay = document.getElementById('input');

let buttons = document.querySelectorAll(".calc-btn");

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        let btnClass = [...btn.classList];

        if (btnClass.includes("action-btn")){

            // If user clicks clear button
            if (btn.id === 'clear') 
                clearCalculator();
            // If user clicks sign reversal button
            else if (btn.id === 'sign-reversal') {
                if (topResult.substring(0,1) === '-')
                    topResult = topResult.slice(1);
                else 
                    topResult = '-' + topResult;
                
                bottomResult = topResult;
            }
            // If user clicks delete/backspace button
            else if (btn.id === 'del') {
                topResult = topResult.slice(0,-1);
                bottomResult = bottomResult.slice(0,-1);
            }
        }
        else if (btnClass.includes("operand")){
            // If user enters second input after an operator
            if (containsOperatorLast(topResult)){
                bottomResult = '';
            }

            // If user enters 0 first
            if (bottomResult === '0' && btn.id !== 'dot'){
                bottomResult = btn.value;
                topResult = topResult.slice(0,-1) + btn.value;
            }
            // If user enters multiple dots, don't do anything
            else if (btn.id === 'dot' && (bottomResult.slice(-1) === '.' || countDots(bottomResult) > 0)){
                // pass
            }
            // If user enters dot ". first, convert to "0."
            else if (bottomResult === '' && btn.id === 'dot'){
                bottomResult = `0${btn.value}`;
                topResult += `0${btn.value}`;
            }
            else{
                bottomResult += btn.value;
                topResult += btn.value;
            }
        }
        else if (btnClass.includes("operator")){
            // If the user clicks an operator button multiple times
            if (containsOperatorLast(topResult)){
                topResult = topResult.slice(0,-1) + btn.value; // change the operator
            }
            // If the user does continuous calculation without pressing equals button
            else if (containsOperatorMid(topResult)){
                equalsFlag = true;
                operateFlag = true;
            }
            // If user clicks operator button first, don't do anything
            else if (bottomResult === ''){
                // pass
            }
            else {
                topResult += btn.value;
            }
            
        }
        else if (btnClass.includes("equals")){
            if (topResult !== '' && !containsOperatorLast(topResult))
                equalsFlag = true;
        }

        if (lastClickedID === 'equals-btn' && btn.id === 'equals-btn'){
            //pass
        }
        else if (equalsFlag === true && containsOperatorMid(topResult)){
            if (operateFlag === true){
                topResult = operate(topResult);
                topResult += btn.value;
                topDisplay.textContent = topResult;
                bottomResult = topResult.slice(0,-1);
                bottomDisplay.textContent = topResult.slice(0,-1);
            } 
            else {
                topResult = operate(topResult);
                topDisplay.innerHTML += '=';
                bottomResult = topResult;
                bottomDisplay.textContent = topResult;
            }
        }
        else {
            topResult = topResult.toString();
            topDisplay.textContent = topResult;
            bottomDisplay.textContent = bottomResult;
        }

        lastClickedID = btn.id;
        lastClickedClass = btn.class;
        equalsFlag = false;
        operateFlag = false;
    });

    let origBackgroundColor = btn.style.backgroundColor;

    btn.addEventListener("mouseover", () => {
        btn.style.backgroundColor = '#fde3f2';
    });

    btn.addEventListener("mouseout", () => {
        btn.style.backgroundColor = origBackgroundColor;
    });

});

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
    if (num2 === 0) return "undefined";
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
    return (count > 1);
}

function clearCalculator(){
    topResult = ''; 
    bottomResult = '';
    topDisplay.textContent = topResult;
    bottomDisplay.textContent = bottomResult;
}

function countDots(str){
    return str.split('.').length-1;
}