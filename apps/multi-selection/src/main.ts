import ForceGraph3D from '3d-force-graph';

const div = document.createElement('div');
div.id = '3d-graph';
document.body.appendChild(div);

// Random tree
const N = 40;
const gData = {
  nodes: [...Array(N).keys()].map((i) => ({ id: i })),
  links: [...Array(N).keys()]
    .filter((id) => id)
    .map((id) => ({
      source: id,
      target: Math.round(Math.random() * (id - 1)),
    })),
};

let selectedNodes = new Set();

const Graph = ForceGraph3D()(div)
  .graphData(gData)
  .nodeRelSize(9)
  .nodeColor((node) => (selectedNodes.has(node) ? 'yellow' : 'grey'))
  .onNodeClick((node, event) => {
    if (event.ctrlKey || event.shiftKey || event.altKey) {
      // multi-selection
      selectedNodes.has(node)
        ? selectedNodes.delete(node)
        : selectedNodes.add(node);
    } else {
      // single-selection
      const untoggle = selectedNodes.has(node) && selectedNodes.size === 1;
      selectedNodes.clear();
      !untoggle && selectedNodes.add(node);
    }

    Graph.nodeColor(Graph.nodeColor()); // update color of selected nodes
  })
  .onNodeDrag((node, translate) => {
    if (selectedNodes.has(node)) {
      // moving a selected node
      [...selectedNodes]
        .filter((selNode) => selNode !== node) // don't touch node being dragged
        .forEach((node) =>
          ['x', 'y', 'z'].forEach(
            (coord) => (node[`f${coord}`] = node[coord] + translate[coord])
          )
        ); // translate other nodes by same amount
    }
  })
  .onNodeDragEnd((node) => {
    if (selectedNodes.has(node)) {
      // finished moving a selected node
      [...selectedNodes]
        .filter((selNode) => selNode !== node) // don't touch node being dragged
        .forEach((node) =>
          ['x', 'y', 'z'].forEach((coord) => (node[`f${coord}`] = undefined))
        ); // unfix controlled nodes
    }
  });
