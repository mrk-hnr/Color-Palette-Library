// -------------------------- GLOBAL VARIABLES/SELECTIONS -------------------------- 
const colorDivs = document.querySelectorAll(".color")
const generateButton = document.querySelectorAll(".generate")
const sliders = document.querySelectorAll(`input[type="range"]`)
const currentHex = document.querySelectorAll(".color h2")

let initialColor;

// -------------------------- FUNCTIONS -------------------------- 

// ----------------------------------------------------------
// Generates Colors
// function generateHex() {
//     const letters = "#0123456789ABCDEF" // Characters HEX consists of
//     let hash = "#" // HEX colors always starts with #
    
//     for (let i = 0; i < 6; i++) { // HEX colors are 6 characters long, excluding #
//         hash += letters[Math.floor(Math.random() * 16)] //Randomly chooses 1 character from letters until it meets 6 characters long, w/c is added in hash
//     }
//     return hash
// }

function generateHex() {
    const hexColor = chroma.random()
    return hexColor
}



let randomHex = generateHex()
// ----------------------------------------------------------

function randomColor() {
    colorDivs.forEach((div, index) => {
        const hexText = div.children[0]
        const randomColor = generateHex()

        // Add color to background
        div.style.backgroundColor = randomColor
        hexText.innerText = randomColor
    })
}

randomColor()

