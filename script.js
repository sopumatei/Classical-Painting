// Painting Paper
const paintingPaper = document.getElementById('painting-paper');
let pixels = 16;

const pixelWidth = paintingPaper.offsetWidth / pixels;
const pixelHeight = paintingPaper.offsetHeight / pixels;

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
    pixel.style.width = `${pixelWidth}px`;
    pixel.style.height = `${pixelHeight}px`;

    pixel.addEventListener('mouseenter', () => {
        if (mouseDown) {
            pixel.style.backgroundColor = 'black';
        }
    })


    pixel.addEventListener('dragstart', event => {
        event.preventDefault();
      });
      
    pixel.addEventListener('drop', event => {
        event.preventDefault();
    });

    paintingPaper.append(pixel);
}