const btn_delete = document.getElementById("btn_delete")
const btn_addition = document.getElementById("btn_addition")
const btn_subtraction = document.getElementById("btn_subtraction")
const btn_multiply = document.getElementById("btn_multiply")
const btn_division = document.getElementById("btn_division")
const btn_comma = document.getElementById("btn_comma")
const btn_reset = document.getElementById("btn_reset")
const btn_res = document.getElementById("btn_res")

const screen = document.querySelector(".screen>h2")

const btn_themes = document.querySelector(".themes_switch")
const btn_themes_switch = document.querySelector(".themes_switch>span")

// logic
let number = ""
let list = []
let stack = []
let output = []
let theme = 0

const showScreen = (max = 16) => {
    if (number.length > max) {
        let aux = number.length;
        screen.textContent = "..." + number.slice(aux - max , aux - 1)
    } else {
        screen.textContent = number
    }
}

const addNumberToList = () => {
    list.push({
        value: parseFloat(number, 4),
        type: "number"
    })
}

const addSignToList = (sign) => {
    let aux = (sign == "+" || sign == "-") ? 1 : 2
    list.push({
        value: sign,
        type: "operator",
        weight: aux
    })
}

const operations = (sign) => {
    return () => {
        addNumberToList()
        addSignToList(sign)
        number = ""
    }
}

const addition = operations("+")

const subtraction = operations("-")

const multiply = operations("*")

const division = operations("/")

const precedence = (a,b) => {
    return a.weight >= b.weight;
}

const operate = (a,b,sign) => {
    if (sign == "+") {
        return parseFloat(a + b)
    } else if (sign == "-") {
        return parseFloat(a - b)
    } else if (sign == "*") {
        return parseFloat(a * b)
    } else if (sign == "/") {
        if (b > 0) {
            return parseFloat(a / b)
        }
        return 0
    } else {
        return 0
    }
}

const reset = () => {
    number = "0"
    list = []
    stack = []
    output = []
    showScreen()
}

const solve = () => {
    // 5 6 3 * +
    let index = 0
    for (let i = 0; i < output.length; i++) {
        if (output[i].type == "operator"){
            index = i
            break;
        }
    }
    while (output.length > 2) {
        let result = {
            value : operate(output[index-2].value, output[index-1].value, output[index].value),
            type: "number"
        }
        output.splice(index-2, 3, result)
        index -= 1
    }
    // console.log("Resultado final:");
    // output.forEach(elem => console.log(elem))
    number = "" + (output.pop()).value
    showScreen()
}

const algorithm = () => {
    addNumberToList()
    while (list.length) {
        let elem = list.shift()
        if (elem.type == "number") {
            output.push(elem)
        } else if (elem.type == "operator") {
            let len = stack.length
            while ( len > 1 && precedence(stack[len], elem)) {
                output.push(stack.pop())
            }
            stack.push(elem)
        }
    }
    while (stack.length) {
        output.push(stack.pop())
    }
    stack = []
    output.forEach(elem => console.log(elem))
    solve()
}

const loadStyle = (num) => {
    let root = document.documentElement
    if ( num == 0) {
        root.style.setProperty('--background', '#3b4664');
        root.style.setProperty('--screen', '#181f32');
        root.style.setProperty('--font-color-one', '#ffffff');
        root.style.setProperty('--font-color-two', '#3d485c');
        root.style.setProperty('--font-color-three', '#fefefe');
        root.style.setProperty('--button', '#fefefe');
        root.style.setProperty('--background-theme', '#252d44');
        root.style.setProperty('--button-group-1', '#eae3db');
        root.style.setProperty('--button-group-2', '#647299');
        root.style.setProperty('--button-group-3', '#d13f30');
        root.style.setProperty('--shadow-1', '#b2a296');
        root.style.setProperty('--shadow-2', '#414e70');
        root.style.setProperty('--shadow-3', '#922519');
        btn_themes_switch.style.setProperty('left','3px')
        localStorage.setItem('color','0');
        btn_res.style.setProperty('color','#ffe8e8');
    } else if ( num == 1) {
        root.style.setProperty('--background', '#e6e6e6');
        root.style.setProperty('--screen', '#eeeeee');
        root.style.setProperty('--font-color-one', '#3d3d34');
        root.style.setProperty('--font-color-two', '#323228');
        root.style.setProperty('--font-color-three', '#fffefd');
        root.style.setProperty('--button', '#be5702');
        root.style.setProperty('--background-theme', '#d3cdcd');
        root.style.setProperty('--button-group-1', '#e5e4e0');
        root.style.setProperty('--button-group-2', '#388186');
        root.style.setProperty('--button-group-3', '#c85401');
        root.style.setProperty('--shadow-1', '#a69d90');
        root.style.setProperty('--shadow-2', '#1a5d66');
        root.style.setProperty('--shadow-3', '#873900');
        btn_themes_switch.style.setProperty('left','19px')
        localStorage.setItem('color','1');
        btn_res.style.setProperty('color','#fffbf3');
    }
    else if ( num == 2) {
        root.style.setProperty('--background', '#17062a');
        root.style.setProperty('--screen', '#1e0836');
        root.style.setProperty('--font-color-one', '#ffe442');
        root.style.setProperty('--font-color-two', '#fde337');
        root.style.setProperty('--font-color-three', '#fffcff');
        root.style.setProperty('--button', '#00dad1');
        root.style.setProperty('--background-theme', '#1e0836');
        root.style.setProperty('--button-group-1', '#331b4d');
        root.style.setProperty('--button-group-2', '#550878');
        root.style.setProperty('--button-group-3', '#00decf');
        root.style.setProperty('--shadow-1', '#851d9d');
        root.style.setProperty('--shadow-2', '#bf15f4');
        root.style.setProperty('--shadow-3', '#6dfaf0');
        btn_themes_switch.style.setProperty('left','36px')
        localStorage.setItem('color','2');
        btn_res.style.setProperty('color','#003433');
    }
}

document.addEventListener("DOMContentLoaded", () => {
    theme = localStorage.getItem('color');
    if (theme == null) {
        localStorage.setItem('color','0');
        theme = localStorage.getItem('color');
    }
    loadStyle(theme)
})
document.addEventListener("click", (e) => {
    if (e.target.classList.contains('main')) {
        if (e.target == btn_addition) {
            addition()
        } else if (e.target == btn_subtraction) {
            subtraction()
        } else if (e.target == btn_multiply) {
            multiply()
        } else if (e.target == btn_division) {
            division()
        } else {
            number += e.target.textContent
            showScreen()
        }
    } else if (e.target == btn_res) {
        algorithm()
    } else if (e.target == btn_delete) {
        number = number.slice(0, number.length-1)
        showScreen()
    } else if (e.target == btn_reset) {
        reset()
    } else if (e.target == btn_themes || e.target == btn_themes_switch) {
        theme = (theme + 1) % 3
        loadStyle(theme)
    }
})
// style