// Painting Paper
const paintingPaper = document.getElementById('painting-paper');
let pixels = 64;

// Adding the columns and rows based onto the given pixels
paintingPaper.setAttribute('style', `grid-template-columns: repeat(${pixels}, 1fr); grid-template-rows: repeat(${pixels}, 1fr);`)

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

function renderPixels(color) {
    // This loop creates each pixel inside the painting zone
    for(let i = 1; i <= pixels * pixels; ++i) {
        const pixel = document.createElement('div');
        pixel.className = 'pixel';
        pixel.style.backgroundColor = 'white';

        pixel.addEventListener('mouseenter', () => {
            if (mouseDown) {
                pixel.style.backgroundColor = color;
            }
        })

        pixel.addEventListener('touchmove', () => {
            if (mouseDown) {
                pixel.style.backgroundColor = color;
            }
        })

        pixel.addEventListener('click', () => {
            pixel.style.backgroundColor = color;
        })


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
function changeColor(color) {
    let pixels = document.querySelectorAll('.pixel');

    pixels.forEach(pixel => {
        pixel.addEventListener('mouseenter', () => {
            if (mouseDown) {
                pixel.style.backgroundColor = color;
            }
        })

        pixel.addEventListener('touchmove', () => {
            if (mouseDown) {
                pixel.style.backgroundColor = color;
            }
        })

        pixel.addEventListener('click', () => {
            pixel.style.backgroundColor = color;
        })
    });
}

// Color Mode
const colorPicker = document.getElementById('color-picker');
const colorModeBtn = document.getElementById('color-mode-button');

renderPixels(colorPicker.value);

colorPicker.addEventListener('input', () => {
    if(colorModeBtn.className === 'active') {
        console.log(colorPicker.value);
        changeColor(colorPicker.value);
    }
})