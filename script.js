// Painting Paper
const paintingPaper = document.getElementById('painting-paper');
const colorPicker = document.getElementById('color-picker');
let pixels = 16;
let currentMode = 'color';
let currentColor = colorPicker.value;

// Size Selection
const sizeShowTxt = document.getElementById('size-show');
const sizeSlider = document.getElementById('size-slider');

function showCanvaSize() {
    sizeShowTxt.textContent = `${pixels} x ${pixels}`;
}

showCanvaSize();

sizeSlider.addEventListener('input', () => {
    pixels = sizeSlider.value;
    showCanvaSize();
    paintingPaper.innerHTML = '';
    renderPixels();
})

// This part checks if one of the two mouse buttons is held down 
let mouseDown = 0;

// For PC
window.onmousedown = () => {
    //console.log('CLICKED!');
    ++mouseDown;   
}
window.onmouseup = () => {
    //console.log('UNCLICKED!');
    --mouseDown;
}

// For mobile
window.ontouchstart = () => {
    //console.log('TOUCHED');
    ++mouseDown; 
}
window.ontouchend = () => {
    //console.log('UNTOUCHED');
    --mouseDown;
}

// Render pixels
function renderPixels() {
    // Adding the columns and rows based onto the given pixels
    paintingPaper.setAttribute('style', `grid-template-columns: repeat(${pixels}, 1fr); grid-template-rows: repeat(${pixels}, 1fr);`);
    
    // This loop creates each pixel inside the painting zone
    for(let i = 1; i <= pixels * pixels; ++i) {
        const pixel = document.createElement('div');
        pixel.className = 'pixel';
        pixel.style.backgroundColor = 'white';

        pixel.addEventListener('mouseover', changeColor)

        pixel.addEventListener('touchmove', changeColor)

        pixel.addEventListener('mousedown', changeColor)


        pixel.addEventListener('dragstart', event => {
            event.preventDefault();
        });
        
        pixel.addEventListener('drop', event => {
            event.preventDefault();
        });

        paintingPaper.append(pixel);
    }
}

// Change color
function changeColor(e) {
    if(e.type === 'mouseover' && !mouseDown) return
    let pixel = e.target;
    
    if(currentMode === 'color')
        pixel.style.backgroundColor = currentColor;
    else if(currentMode === 'rainbow') {
        let R = Math.random() * 256;
        let G = Math.random() * 256;
        let B = Math.random() * 256;
        
        pixel.style.backgroundColor = `rgb(${R}, ${G}, ${B})`;
    }
    else if(currentMode === 'erase') {
        pixel.style.backgroundColor = '#ffffff';
    }
}

// Tools

// Color Mode
const colorModeBtn = document.getElementById('color-mode-button');

colorPicker.addEventListener('input', () => {
    if(colorModeBtn.className.includes('active')) {
        currentColor = colorPicker.value;
    }
})

colorModeBtn.addEventListener('click', () => {
    if(currentMode != 'color')
        activateButton('color');
})

// Rainbow Mode
const rainbowModeBtn = document.getElementById('rainbow-mode-button');

rainbowModeBtn.addEventListener('click', () => {
    if(currentMode != 'rainbow')
        activateButton('rainbow');
})

// Erase Mode
const eraseBtn = document.getElementById('erase-button');

eraseBtn.addEventListener('click', () => {
    if(currentMode != 'erase')
        activateButton('erase');
})

// Activates the clicked button
function activateButton(mode) {
    const buttons = document.querySelectorAll('.toolButton');

    buttons.forEach(button => {
        if(button.className.includes('active'))
            button.classList.remove('active');
    })

    if(mode === 'color') {
        colorModeBtn.className += ' active';
        currentMode = 'color';
        currentColor = colorPicker.value;
    }
    else if(mode === 'rainbow') {
        rainbowModeBtn.className += ' active';
        currentMode = 'rainbow';
    }
    else if(mode === 'erase') {
        eraseBtn.className += ' active';
        currentMode = 'erase';
    }
}

const deleteBtn = document.getElementById('delete-button');

deleteBtn.addEventListener('click', () => {
    paintingPaper.innerHTML = '';
    renderPixels();
})

window.onload = () => {
    renderPixels();
}