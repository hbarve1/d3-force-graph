import ForceGraph3D from '3d-force-graph';

const div = document.createElement('div');
document.body.appendChild(div);

// Random tree
const NODES = 300;
const GROUPS = 12;
const gData = {
  nodes: [...Array(NODES).keys()].map((i) => ({
    id: i,
    group: Math.ceil(Math.random() * GROUPS),
  })),
  links: [...Array(NODES).keys()]
    .filter((id) => id)
    .map((id) => ({
      source: id,
      target: Math.round(Math.random() * (id - 1)),
    })),
};

const Graph = ForceGraph3D()(div)
  .nodeAutoColorBy('group')
  .linkAutoColorBy((d) => gData.nodes[d.source].group)
  .linkOpacity(0.5)
  .graphData(gData);
