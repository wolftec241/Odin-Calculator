//All imports of output elements
const func = document.getElementById("func");
const result = document.getElementById("result");

let arrFunc = []; //Array the will contain the function that user make 


function restartCalc(){
    arrFunc = [];
    func.innerText = '0';
    result.innerText = '0';
}



function buttonPress(value){
    switch(value){
        case "AC": //restart the calculator
            restartCalc();
            break;

        case "C": //Backspace last element
            backspace();
            break;

        case "=": 
            calcResult();
            break;

        case "(":
        case ")":
            handleParentheses(value);
            break;
        
        //All other operators
        case "+":
        case "-":
        case "×":
        case "÷":
            if (!isOperator(arrFunc[arrFunc.length - 1])
                && arrFunc.length > 0) {
                //Check if last element is number
                if(arrFunc[arrFunc.length - 1] === "="){
                    arrFunc.pop();
                }
                arrFunc.push(value);
                func.innerText += value;
            }
            break;
        
        case ".": //check if last element of array is number and if it have dot
            if(arrFunc.length > 0){
                if(isNumeric(arrFunc[arrFunc.length - 1])
                && !(arrFunc[arrFunc.length - 1].includes("."))){
                    func.innerText += ".";
                    arrFunc[arrFunc.length - 1] += ".";
                }
            }
            break;
        
        default: //If it number
            if(arrFunc[arrFunc.length - 1] === "=")
                    restartCalc();
            
            if(arrFunc.length == 0){
                func.innerText = value;
                arrFunc.push((value));
            }
            else if(!isNumeric(arrFunc[arrFunc.length - 1])){
                //If it not number
                func.innerText += value;
                arrFunc.push((value));
            }
            else{
                func.innerText += value;
                arrFunc[arrFunc.length - 1] += value;
            }
            console.table(arrFunc);
            console.log(isNumeric(arrFunc[arrFunc.length - 1]));

            break;
    }
}

function isOperator(value) {
    return ["+", "-", "×", "÷"].includes(value);
}

function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
  }

function backspace() {
    let currentText = func.innerText;
    func.innerText = currentText.slice(0, -1);

    let lastIndex = arrFunc.length - 1;
    if(arrFunc[lastIndex] === "=")
        restartCalc();
    if(arrFunc[lastIndex] >= 10)
        arrFunc[lastIndex] = (arrFunc[lastIndex]/10).toFixed(0);
    else
        arrFunc.pop();
}

function handleParentheses(value) {
    if (value === "(") {
        // Handle open parenthesis
        if(arrFunc.length == 0){
            arrFunc.push("[");
            func.innerText = value;
        }
        else if (isOperator(arrFunc[arrFunc.length - 1])) {
            // If the expression is empty or the last element is an operator, add the open parenthesis
            arrFunc.push("[");
            func.innerText += value;
        }
    }
    else if (value === ")") {
        // Handle close parenthesis
        if (arrFunc.length > 0 && 
            isNumeric(arrFunc[arrFunc.length - 1])) {
            // If the last element is a number, add the close parenthesis
            arrFunc.push("]");
            func.innerText += value;
        }
    }
}

function calcResult() {
    if (arrFunc.length >= 3 
        && (isNumeric(arrFunc[arrFunc.length - 1]))
        || arrFunc[arrFunc.length - 1] === "]") {

            resolveParentheses();            

            arrFunc = calculateExpression(arrFunc);
            arrFunc[0] = arrFunc[0].toFixed(2);
            //Returning calculation in [] for adding in the end =

            //Change the output of calculator and in arrFunc
            console.table(arrFunc);
            func.textContent = arrFunc[0];
            result.textContent = arrFunc[0];
            arrFunc.push("=");
    }
    else{
        result.textContent = "Error";
    }
}

//solve the parentheses 
function resolveParentheses() {
    let openIndex = arrFunc.lastIndexOf("[");
    let closeIndex = arrFunc.indexOf("]", openIndex);

    while (openIndex !== -1 && closeIndex !== -1) {
        // Extract the expression inside parentheses
        let subExpression = arrFunc.slice(openIndex + 1, closeIndex);

        // Recursively resolve nested parentheses in the subExpression
        resolveNestedParentheses(subExpression);

        // Calculate the result of the subExpression
        let subResult = calculateExpression(subExpression)[0];

        // Replace the subExpression with its result
        arrFunc.splice(openIndex, closeIndex - openIndex + 1, subResult);

        // Find the next innermost set of parentheses
        openIndex = arrFunc.lastIndexOf("[");
        closeIndex = arrFunc.indexOf("]", openIndex);
    }
}

//Solve nested parentheses
function resolveNestedParentheses(expression) {
    let nestedOpenIndex = expression.lastIndexOf("[");
    let nestedCloseIndex = expression.indexOf("]", nestedOpenIndex);

    while (nestedOpenIndex !== -1 && nestedCloseIndex !== -1) {
        let nestedExpression = expression.slice(nestedOpenIndex + 1, nestedCloseIndex);

        // Recursively resolve nested parentheses in the nested expression
        resolveNestedParentheses(nestedExpression);

        // Calculate the result of the nested expression
        let nestedResult = calculateExpression(nestedExpression)[0];

        // Replace the nested expression with its result in the main array (arrFunc)
        expression.splice(nestedOpenIndex, nestedCloseIndex - nestedOpenIndex + 1, nestedResult);

        // Find the next innermost set of nested parentheses
        nestedOpenIndex = expression.lastIndexOf("[");
        nestedCloseIndex = expression.indexOf("]", nestedOpenIndex);
    }
}

function calculateExpression(expression) {
    //First, solve all multiply and dividing
    for(let i = 0; i < expression.length; i++){
        //Change type of element to number 
        if(isNumeric(expression[i])) expression[i]= parseFloat(expression[i]);

        if(expression[i] === "×"){
            expression[i-1] *= expression[i+1];
            expression.splice(i, 2);
            i--;
        }
        if(expression[i] === "÷"){
            expression[i-1] = divide(expression[i+1], expression[i-1]);
            expression.splice(i, 2);
            i--;
        }
    }
    
    //Secondly, solve all adding and subtracting
    for(let i = 0; i < expression.length; i++){
        if(expression[i] === "+"){
            expression[i-1] += expression[i+1];
            expression.splice(i, 2);
            i--;
        }
        if(expression[i] === "-"){
            expression[i-1] -= expression[i+1];
            expression.splice(i, 2);
            i--;
        }
    }

    return expression; //return the result in []
}

function divide(num1, num2) {
    if (num2 === 0) {
        alert("Error: Division by zero!");
        return NaN;
    }
    return num1 / num2;
}