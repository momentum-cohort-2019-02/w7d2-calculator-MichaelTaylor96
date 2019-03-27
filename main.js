// Setting up basic constants and variables

const row1 = document.querySelector('.row1')
const row2 = document.querySelector('.row2')
const row3 = document.querySelector('.row3')
const row4 = document.querySelector('.row4')
const row5 = document.querySelector('.row5')

const numRows = [row5, row4, row3, row2]
const numButtons = []
const opButtons = {}

let numHasDot = false
let numStart = true

const numKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9',]
const specialKeys = {
    '/': divButtonPress,
    '*': multButtonPress,
    '+': addButtonPress,
    '-': subButtonPress,
    '.': dotButtonPress,
    'c': clearButtonPress,
    'Enter': equalButtonPress,
}

// Function I used to make the buttons

function makeButton (text, a_function, classes) {
    button = document.createElement('button')
    button.innerText = text
    button.addEventListener('click', a_function)
    for (let string of classes) {
        button.classList.add(string)
    }
    return button
}

// Sets up row 1 to have the display and clear button

const display = document.createElement('span')
display.classList.add('display')

function clearButtonPress () {
    display.innerText = ''
    numHasDot = false
    numStart = true
}

const clearButton = makeButton('C', clearButtonPress, ['button', 'otherbutton'])
row1.appendChild(clearButton)
row1.appendChild(display)

// Generates each of the number buttons in their correct locations

function numButtonPress () {
    display.innerText += this.innerText
    numStart = false
}

for (i = 0; i < 10; i++) {
    let button = makeButton(i, numButtonPress, ['numbutton', 'button'])
    numButtons.push(button)
    console.log(numButtons)
}

for (let row of numRows.entries()) {
    if (row[0] === 0) {
        row[1].appendChild(numButtons[0])
    console.log(row[0])
    } else  {
        for (i = 0; i < 3; i++) {
            row[1].appendChild(numButtons[((row[0]-1)*3)+(i+1)])
        }
    }
    console.log(row[0])
}

// Setting up all the operator buttons

function divButtonPress () {
    display.innerText += '/'
    numHasDot = false
    numStart = true
}

divButton = makeButton('/', divButtonPress, ['button', 'otherbutton'])
row2.appendChild(divButton)

function multButtonPress () {
    display.innerText += '*'
    numHasDot = false
    numStart = true
}

multButton = makeButton('*', multButtonPress, ['button', 'otherbutton'])
row3.appendChild(multButton)

function subButtonPress () {
    display.innerText += '-'
    numHasDot = false
    numStart = true 
}

subButton = makeButton('-', subButtonPress, ['button', 'otherbutton'])
row4.appendChild(subButton)

function dotButtonPress () {
    if (!numHasDot) {
        if (numStart) {
            display.innerText += 0
        }
        display.innerText += '.'
        numHasDot = true
        numStart = false
    }
}

dotButton = makeButton('.', dotButtonPress, ['button', 'otherbutton'])
row5.appendChild(dotButton)

function equalButtonPress () {
    display.innerText = eval(display.innerText).toPrecision(6)
    if (display.innerText.includes('.')) {
        numHasDot = true
    } else {
        numHasDot = false
    }
    numStart = false
}

equalButton = makeButton('=', equalButtonPress, ['button', 'otherbutton'])
row5.appendChild(equalButton)

function addButtonPress () {
    display.innerText += '+'
    numHasDot = false
    numStart = true
}

addButton = makeButton('+', addButtonPress, ['button', 'otherbutton'])
row5.appendChild(addButton)

// Tried to generate special buttons with a loop instead, sorta worked

for (let key in specialKeys) {
    opButtons[key] = makeButton(key, specialKeys[key], ['button', 'otherbutton'])
}

// However, I can't get the rows to append the values from opButtons.
// Kept telling me that the argument was not a node. All the types from the
// logs below had me confused on how that could be.

console.log(typeof opButtons['+'])
console.log(typeof addButton)
console.log(opButtons['+'].innerText)

// Setting up ability to enter input from the keyboard

window.addEventListener('keydown', keyInput)

function keyInput(e) {
    if (numKeys.includes(e.key)) {
        display.innerText += e.key
        numStart = false
    } else if (e.key in specialKeys) {
        specialKeys[e.key]()
    }
}