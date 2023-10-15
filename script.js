// Painting Paper
const paintingPaper = document.getElementById('painting-paper');
let pixels = 16;

const pixelWidth = paintingPaper.offsetWidth / pixels;
const pixelHeight = paintingPaper.offsetHeight / pixels;

for(let i = 1; i <= pixels * pixels; ++i) {
    const pixel = document.createElement('div');
    pixel.style.backgroundColor = "white";
    pixel.style.width = `${pixelWidth}px`;
    pixel.style.height = `${pixelHeight}px`;

    pixel.addEventListener('mousedown', () => {
        pixel.style.backgroundColor = "black";
    })

    paintingPaper.append(pixel);
}