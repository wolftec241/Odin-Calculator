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

function divide(num1, num2){
    return num1/num2;
}


function buttonPress(value){
    switch(value){
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
                arrFunc.push(value);
                func.innerText += value;
                console.log("a")
            }
            break;
        default:
            if(arrFunc.length == 0){
                func.innerText = value;
                arrFunc.push(parseInt(value));
            }
            else{
                func.innerText += parseInt(value);
                arrFunc.push(arrFunc.pop()*10 + parseInt(value));
            }
            console.table(arrFunc);
    }
}

function isOperator(value) {
    return ["+", "-", "×", "÷"].includes(value);
}


function calculateResult() {
    if (arrFunc.length >= 3 
        && typeof arrFunc[arrFunc.length - 1] === "number") {
            for(let i = 0; i < arrFunc.length; i++){
                if(arrFunc[i] == "×"){
                    arrFunc[i+1] *= arrFunc[i-1];
                    arrFunc.splice(i-1, i+1);
                    i--;
                }
                if(arrFunc[i] == "÷"){
                    arrFunc[i+1] /= arrFunc[i-1];
                    arrFunc.splice(i-1, i+1);
                    i--;
                }
            }
            for(let i = 0; i < arrFunc.length; i++){
                if(arrFunc[i] == "+"){
                    arrFunc[i+1] *= arrFunc[i-1];
                    arrFunc.splice(i-1, i+1);
                    i--;
                }
                if(arrFunc[i] == "-"){
                    arrFunc[i+1] /= arrFunc[i-1];
                    arrFunc.splice(i-1, i+1);
                    i--;
                }
            }



    }   
}

function main(){   
    
}

main();