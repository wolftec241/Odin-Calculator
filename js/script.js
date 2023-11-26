//All imports of output elements
const func = document.getElementById("func");
const result = document.getElementById("result");

let arrFunc = [];

function add(num1, num2){
    return num1+num2;
}

function subtract(num1, num2){
    return num1-num2;
}

function multiply(num1, num2){
    return num1*num2;
}

function divide(num1, num2) {
    if (num2 === 0) {
        alert("Error: Division by zero!");
        return NaN;
    }
    return num1 / num2;
}

function restartCalc(){
    arrFunc = [];
    func.innerText = '0';
    result.innerText = '';
}

function changeCalc(funcNum, resultNum){
    arrFunc = [];
    func.innerText = `${funcNum}`;
    result.innerText = `${resultNum}`;
}


function buttonPress(value){
    switch(value){
        case "AC":
            restartCalc();

        case "=": 
            calculateResult();
            break;
        
        //All other operators
        case "+":
        case "-":
        case "×":
        case "÷":
            if (!isOperator(arrFunc[arrFunc.length - 1])) {
                //Check if last element is number
                if(arrFunc[arrFunc.length - 1] === "="){
                    arrFunc.pop();
                    func.innerText = arrFunc[0];
                }
                arrFunc.push(value);
                func.innerText += value;
                console.log("a")
            }
            break;
        default:
            if(arrFunc[arrFunc.length - 1] === "=")
                    restartCalc();
            
            if(arrFunc.length == 0){
                func.innerText = value;
                arrFunc.push(parseInt(value));
            }
            else if(typeof arrFunc[arrFunc.length - 1] !== "number"){
                func.innerText += parseInt(value);
                arrFunc.push(parseInt(value));
            }
            else{
                func.innerText += parseInt(value);
                arrFunc.push(arrFunc.pop()*10 + parseInt(value));
            }
            console.table(arrFunc);
            console.log(typeof arrFunc[arrFunc.length - 1] === "number");
    }
}

function isOperator(value) {
    return ["+", "-", "×", "÷"].includes(value);
}


function calculateResult() {
    if (arrFunc.length >= 3 
        && typeof arrFunc[arrFunc.length - 1] === "number") {
            //First, solve all multiply and dividing
            for(let i = 0; i < arrFunc.length; i++){
                if(arrFunc[i] == "×"){
                    arrFunc[i+1] *= arrFunc[i-1];
                    arrFunc.splice(i-1, 2);
                    i--;
                }
                if(arrFunc[i] == "÷"){
                    arrFunc[i+1] = divide(arrFunc[i-1], arrFunc[i+1]);
                    arrFunc.splice(i-1, 2);
                    i--;
                }
            }
            
            //Secondly, solve all adding and subtracting
            for(let i = 0; i < arrFunc.length; i++){
                if(arrFunc[i] == "+"){
                    arrFunc[i+1] += arrFunc[i-1];
                    arrFunc.splice(i-1, 2);
                    i--;
                }
                if(arrFunc[i] == "-"){
                    arrFunc[i+1] -= arrFunc[i-1];
                    arrFunc.splice(i-1, 2);
                    i--;
                }
            }

            //Change the output of calculator and in arrFunc
            console.table(arrFunc);
            result.textContent = arrFunc[0];
            arrFunc.push("=");
    }   
}

function main(){   
    
}

main();