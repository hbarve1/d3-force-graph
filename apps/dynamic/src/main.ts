import ForceGraph3D from '3d-force-graph';

const div = document.createElement('div');
div.id = '3d-graph';
document.body.appendChild(div);

const initData = {
  nodes: [{ id: 0 }],
  links: [],
};

const Graph = ForceGraph3D()(div)
  .enableNodeDrag(false)
  .onNodeClick(removeNode)
  .graphData(initData);

setInterval(() => {
  const { nodes, links } = Graph.graphData();
  const id = nodes.length;
  Graph.graphData({
    nodes: [...nodes, { id }],
    links: [
      ...links,
      { source: id, target: Math.round(Math.random() * (id - 1)) },
    ],
  });
}, 1000);

//

function removeNode(node) {
  let { nodes, links } = Graph.graphData();
  links = links.filter((l) => l.source !== node && l.target !== node); // Remove links attached to node
  nodes.splice(node.id, 1); // Remove node
  nodes.forEach((n, idx) => {
    n.id = idx;
  }); // Reset node ids to array index
  Graph.graphData({ nodes, links });
}
