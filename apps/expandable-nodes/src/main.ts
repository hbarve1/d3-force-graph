import ForceGraph3D from '3d-force-graph';

const rootId = 0;
const div = document.createElement('div');
div.id = '3d-graph';
document.body.appendChild(div);

// Random tree
const N = 300;
const gData = {
  nodes: [...Array(N).keys()].map((i) => ({
    id: i,
    collapsed: i !== rootId,
    childLinks: [],
  })),
  links: [...Array(N).keys()]
    .filter((id) => id)
    .map((id) => ({
      source: Math.round(Math.random() * (id - 1)),
      target: id,
    })),
};

// link parent/children
const nodesById = Object.fromEntries(
  gData.nodes.map((node) => [node.id, node])
);
gData.links.forEach((link) => {
  nodesById[link.source].childLinks.push(link);
});

const getPrunedTree = () => {
  const visibleNodes = [];
  const visibleLinks: never[] = [];

  (function traverseTree(node = nodesById[rootId]) {
    visibleNodes.push(node);
    if (node.collapsed) return;
    visibleLinks.push(...node.childLinks);
    node.childLinks
      .map((link) =>
        typeof link.target === 'object' ? link.target : nodesById[link.target]
      ) // get child node
      .forEach(traverseTree);
  })(); // IIFE

  return { nodes: visibleNodes, links: visibleLinks };
};

const Graph = ForceGraph3D()(div)
  .graphData(getPrunedTree())
  .linkDirectionalParticles(2)
  .nodeColor((node) =>
    !node.childLinks.length ? 'green' : node.collapsed ? 'red' : 'yellow'
  )
  .onNodeHover(
    (node) =>
      (div.style.cursor = node && node.childLinks.length ? 'pointer' : null)
  )
  .onNodeClick((node) => {
    if (node.childLinks.length) {
      node.collapsed = !node.collapsed; // toggle collapse state
      Graph.graphData(getPrunedTree());
    }
  });
