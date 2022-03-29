const root = document.querySelector(':root');
const canvas = document.getElementById('canvas');
const sizeSlider = document.getElementById('sizeSlider');

root.style.setProperty('--gridSize', sizeSlider.value);
drawGrid(sizeSlider.value);

sizeSlider.addEventListener('input', () => showNewSize(sizeSlider.value));
sizeSlider.addEventListener('change', () => setNewSize(sizeSlider.value));

const penColorPicker = document.getElementById('penColor');
let penColor = penColorPicker.value;
penColorPicker.addEventListener(
  'change',
  () => (penColor = penColorPicker.value)
);

let isMouseDown = false;
document.addEventListener('mousedown', (e) => {
  if (e.target.closest('.grid')) {
    isMouseDown = true;
    if (e.target.style.backgroundColor !== penColor)
      e.target.style.backgroundColor = penColor;
  }

  document.addEventListener(
    'mouseleave',
    () => {
      isMouseDown = false;
    },
    { once: true }
  );
});

document.addEventListener('mousemove', (e) => {
  if (e.target.closest('.grid'))
    if (isMouseDown) e.target.style.backgroundColor = penColor;
});

document.addEventListener('mouseup', () => {
  isMouseDown = false;
});

// Functions handling drawing and resizing the grid.

// Preview new grid size on slider's label
function showNewSize(size) {
  let sliderLabel = document.getElementById('sliderLabel');
  sliderLabel.textContent = `Grid size: ${size} x ${size}`;
}
// Apply new size and redraw the grid
function setNewSize(size) {
  root.style.setProperty('--gridSize', size);
  drawGrid(size);
}

function drawGrid(size) {
  while (canvas.firstChild) {
    canvas.removeChild(canvas.firstChild);
  }

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      let gridPixel = document.createElement('div');
      gridPixel.classList.add('grid');
      canvas.appendChild(gridPixel);
    }
  }
}
