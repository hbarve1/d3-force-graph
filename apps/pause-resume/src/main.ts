import ForceGraph3D from '3d-force-graph';

const div = document.createElement('div');
div.id = '3d-graph';
document.body.appendChild(div);

const button = document.createElement('button');
button.id = 'rotationToggle';
button.innerHTML = 'Pause Rotation';
document.body.appendChild(button);

const button2 = document.createElement('button');
button2.id = 'animationToggle';
button2.innerHTML = 'Pause Animation';
document.body.appendChild(button2);

// Random tree
const N = 300;
const gData = {
  nodes: [...Array(N).keys()].map((i) => ({ id: i })),
  links: [...Array(N).keys()]
    .filter((id) => id)
    .map((id) => ({
      source: id,
      target: Math.round(Math.random() * (id - 1)),
    })),
};
const distance = 1400;

let isRotationActive = true;
const Graph = ForceGraph3D()(div)
  .enableNodeDrag(false)
  .enableNavigationControls(false)
  .showNavInfo(false)
  .cameraPosition({ z: distance })
  .graphData(gData);
// camera orbit
let angle = 0;
setInterval(() => {
  if (isRotationActive) {
    Graph.cameraPosition({
      x: distance * Math.sin(angle),
      z: distance * Math.cos(angle),
    });
    angle += Math.PI / 300;
  }
}, 10);

button.addEventListener('click', (event) => {
  isRotationActive = !isRotationActive;
  event.target.innerHTML = `${isRotationActive ? 'Pause' : 'Resume'} Rotation`;
});

let isAnimationActive = true;
button2.addEventListener('click', (event) => {
  isAnimationActive ? Graph.pauseAnimation() : Graph.resumeAnimation();

  isAnimationActive = !isAnimationActive;
  event.target.innerHTML = `${
    isAnimationActive ? 'Pause' : 'Resume'
  } Animation`;
});
