// Painting Paper
const paintingPaper = document.getElementById('painting-paper');
let pixels = 16;

paintingPaper.setAttribute('style', `grid-template-columns: repeat(${pixels}, 1fr); grid-template-rows: repeat(${pixels}, 1fr);`)

const pixelWidth = paintingPaper.offsetWidth / pixels;
const pixelHeight = paintingPaper.offsetHeight / pixels;

console.log("Height: " + pixelHeight);
console.log("Width: " + pixelWidth);

// This part checks if one of the two mouse buttons is held down 
let mouseDown = 0;
 window.onmousedown = () => {
    ++mouseDown;   
}
window.onmouseup = () => {
    --mouseDown;
}

// This loop creates each pixel inside the painting zone
for(let i = 1; i <= pixels * pixels; ++i) {
    const pixel = document.createElement('div');
    pixel.style.backgroundColor = "white";

    pixel.addEventListener('mouseenter', () => {
        if (mouseDown) {
            pixel.style.backgroundColor = 'black';
        }
    })

    pixel.addEventListener('click', () => {
        pixel.style.backgroundColor = 'black';
    })


    pixel.addEventListener('dragstart', event => {
        event.preventDefault();
      });
      
    pixel.addEventListener('drop', event => {
        event.preventDefault();
    });

    paintingPaper.append(pixel);
}