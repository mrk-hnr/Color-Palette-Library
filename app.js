// -------------------------- GLOBAL VARIABLES/SELECTIONS -------------------------- 
const colorDivs = document.querySelectorAll(".color")
const generateButton = document.querySelectorAll(".generate")
const sliders = document.querySelectorAll(`input[type="range"]`)
const currentHex = document.querySelectorAll(".color h2")
const popup = document.querySelector(".copy-container")

let initialColor;


// -------------------------- EVENT LISTENERS --------------------------
sliders.forEach(slider => {
    slider.addEventListener("input", hslControls)
})

colorDivs.forEach((div, index) => {
    div.addEventListener("change", () => {
        updateTextUI(index)
    })
})

currentHex.forEach(hex => {
    hex.addEventListener("click", () => {
        copyToClip(hex)
    })
})

popup.addEventListener("transitionend", () => {
    const popUpMSG = popup.children[0]
    popup.classList.remove("active")
    popUpMSG.classList.remove("active")
})


// -------------------------- FUNCTIONS -------------------------- 

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
    // 
    initialColor = []
    colorDivs.forEach((div, index) => {
        const hexText = div.children[0]
        const randomColor = generateHex()

        initialColor.push(chroma(randomColor).hex()) // Pushes HEX ID into initialColor as value

        // Add color to background
        div.style.backgroundColor = randomColor
        hexText.innerText = randomColor

        // Checks contrast
        textContrast(randomColor, hexText) 

        // Initial Color Slider
        const color = chroma(randomColor)
        const sliders = div.querySelectorAll(".sliders input")
        const hue = sliders[0]
        const brightness = sliders[1]
        const saturation = sliders[2]

        colorSlider(color, hue, brightness, saturation)
    })
    // reset slider
    resetInputs()
}


// ----------------------------------------------------------
function textContrast(color, text) {
    const luminance = chroma(color).luminance()

    if (luminance > .5) {     
        text.style.color = "black"
    } else {
        text.style.color = "white"
    }
}

// ----------------------------------------------------------

// ----------------------------------------------------------

function colorSlider(color, hue, brightness, saturation) {
    // Scaling Saturation
    const noSat = color.set("hsl.s", 0)
    const maxSat = color.set("hsl.s", 1)
    const scaleSat = chroma.scale([noSat, color, maxSat])

    // Scaling Brightness

    const midBright = color.set("hsl.l", 0.5)
    const scaleBright = chroma.scale(["black", midBright, "white"])
    

    // Colors in Slider Output
    saturation.style.backgroundImage = `linear-gradient(to right, ${scaleSat(0)}, ${scaleSat(1)})`
    brightness.style.backgroundImage = `linear-gradient(to right, ${scaleBright(0)}, ${scaleBright(0.5)} , ${scaleBright(1)})`
    hue.style.backgroundImage = `linear-gradient(to right, rgb(204, 75 , 75), rgb(204, 204, 7), rgb(75, 204, 75), rgb(75, 204, 204), rgb(75, 75, 204), rgb(204, 75, 204), rgb(204, 75, 75))` // bruuh!
}

function hslControls(event) {
    const index = event.target.getAttribute("data-bright") || event.target.getAttribute("data-sat") || event.target.getAttribute("data-hue")

    let sliders = event.target.parentElement.querySelectorAll(`input[type="range"]`)
    const hue = sliders[0]
    const brightness = sliders[1]
    const saturation = sliders[2]

    const bgColor = initialColor[index]

    let color = chroma(bgColor)
        .set("hsl.s", saturation.value)
        .set("hsl.l", brightness.value)
        .set("hsl.h", hue.value)

        colorDivs[index].style.backgroundColor = color

        // Colorize sliders
        colorSlider(color, hue, brightness, saturation)

}

function updateTextUI(index) {
    const activeDiv = colorDivs[index]
    const color = chroma(activeDiv.style.backgroundColor)
    const textHex = activeDiv.querySelector("h2")
    const icons =activeDiv.querySelectorAll(".controls button")
    
    textHex.innerText = color.hex()

    // Checks Contrast
    textContrast(color, textHex)
    for(icon of icons) {
        textContrast(color, icon)
    }
}

function resetInputs() {
    const sliders = document.querySelectorAll(".sliders input")

    sliders.forEach(slider => {
        if (slider.name === "hue") {
            const hueColor = initialColor[slider.getAttribute("data-hue")]
            const hueValue = chroma(hueColor).hsl()[0]
            slider.value = Math.floor(hueValue)            
        }

        if (slider.name === "saturation") {
            const satColor = initialColor[slider.getAttribute("data-sat")]
            const satValue = chroma(satColor).hsl()[1]
            slider.value = Math.floor(satValue * 100) / 100
        }

        if (slider.name === "brightness") {
            const brightColor = initialColor[slider.getAttribute("data-bright")]
            const brightValue = chroma(brightColor).hsl()[2]
            slider.value = Math.floor(brightValue * 100) / 100            
        }
    })
}

function copyToClip(hex) {
    const element = document.createElement("textarea")
    element.value = hex.innerText
    document.body.appendChild(element)
    element.select()
    document.execCommand("copy")
    document.body.removeChild(element)

    // Activate pop up when color is copied
    const popUpMSG = popup.children[0]
    popup.classList.add("active")
    popUpMSG.classList.add("active")
}



randomColor()
// colorSlider()