import ForceGraph3D from '3d-force-graph';

const div = document.createElement('div');
div.id = '3d-graph';
document.body.appendChild(div);

// Random tree
const N = 80;
const gData = {
  nodes: [...Array(N).keys()].map((i) => ({ id: i })),
  links: [...Array(N).keys()]
    .filter((id) => id)
    .map((id) => ({
      source: id,
      target: Math.round(Math.random() * (id - 1)),
    })),
};

const Graph = ForceGraph3D()(div)
  .graphData(gData)
  .linkDirectionalArrowLength(3.5)
  .linkDirectionalArrowRelPos(1)
  .linkCurvature(0.25);
