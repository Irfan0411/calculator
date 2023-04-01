const calculator = {
    displayNum: "0",
    operator: null,
    firstNum: null,
    operasi: false
}

const display = document.querySelector('.input')
display.value = calculator.displayNum

const updateDisplay = ()=>{
    display.value = calculator.displayNum
}

const clear = ()=>{
    calculator.displayNum = "0"
    calculator.operator = null
    calculator.firstNum = null
    calculator.operasi = false
    updateDisplay()
}

const input = (number)=>{
    if (calculator.displayNum == "0"){
        if (number === "."){
            calculator.displayNum += number
        } else {
            calculator.displayNum = number
        }
    } else {
        calculator.displayNum += number
    }
}

const backspace = ()=>{
    const del = calculator.displayNum.length - 1
    if (del === 0){
        calculator.displayNum = "0"
    } else {
        calculator.displayNum = calculator.displayNum.substring(0, del)
    }
    updateDisplay()
}

const operasi = (operator)=>{
    if (!calculator.operasi){
        calculator.operator = operator
        calculator.firstNum = calculator.displayNum
        calculator.displayNum = "0"
        calculator.operasi = true
    }
    updateDisplay()
}

const calculate = (operator)=>{
    if (operator === '+'){
        calculator.displayNum = parseFloat(calculator.firstNum) + parseFloat(calculator.displayNum)
    } else if (operator === '-'){
        calculator.displayNum = parseFloat(calculator.firstNum) - parseFloat(calculator.displayNum)
    } else if (operator === '/'){
        calculator.displayNum = parseFloat(calculator.firstNum) / parseFloat(calculator.displayNum)
    } else if (operator === '*'){
        calculator.displayNum = parseFloat(calculator.firstNum) * parseFloat(calculator.displayNum)
    }
    calculator.displayNum = calculator.displayNum.toString()
    calculator.firstNum = null
    updateDisplay()
    calculator.operasi = false
}

const number = document.querySelectorAll('.number')
number.forEach((num)=>{
    num.addEventListener('click', (e)=>{
        input(e.target.innerText)
        updateDisplay()
    })
})

const options = document.querySelectorAll('.options')
options[0].addEventListener('click', ()=>{
    clear()
    return
})
options[1].addEventListener('click', ()=>{
    calculator.displayNum *= -1
    updateDisplay()
    return
})
options[2].addEventListener('click', ()=>{
    calculator.displayNum /= 100
    updateDisplay()
    return
})
options[3].addEventListener('click', ()=>backspace())

const operation = document.querySelectorAll('.operation')
operation[0].addEventListener('click', ()=>{
    operasi('/')
})
operation[1].addEventListener('click', ()=>{
    operasi('*')
})
operation[2].addEventListener('click', ()=>{
    operasi('-')
})
operation[3].addEventListener('click', ()=>{
    operasi('+')
})
operation[4].addEventListener('click', ()=>{
    calculate(calculator.operator)
})

document.addEventListener('keydown', (e)=>{
    const numKey = ['0','1','2','3','4','5','6','7','8','9','.']
    const opKey = ['+','-','*','/']
    if (numKey.includes(e.key)){
        input(e.key)
        updateDisplay()
    } else if (opKey.includes(e.key)){
        operasi(e.key)
    } else if ((e.key === '=') || (e.key === 'Enter')){
        calculate(calculator.operator)
    } else if (e.key === 'Backspace'){
        backspace()
    } else if (e.key === '%'){
        calculator.displayNum /= 100
        updateDisplay()
    } else if (e.key === '!'){
        calculator.displayNum *= -1
        updateDisplay()
    }
})

