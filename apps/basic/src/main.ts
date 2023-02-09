import ForceGraph3D from '3d-force-graph';

const div = document.createElement('div');
div.id = '3d-graph';
document.body.appendChild(div);

const N = 1000;
// console.log(Array(N));
// console.log(Array(N).keys());
const list = Array.from({ length: N }, (_, i) => ({ id: i }));

const gData = {
  // nodes: [...Array(N).keys()].map((i) => ({ id: i })),
  nodes: list,
  // links: [],
  links: list
    .slice(1)
    // .filter((id: number) => id % 2 === 0)
    .map(({ id }) => ({
      source: id,
      target: Math.round(Math.random() * (id - 1)),
    })),
};

const Graph = ForceGraph3D()(div).graphData(gData);
