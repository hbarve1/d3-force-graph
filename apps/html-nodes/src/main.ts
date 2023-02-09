import ForceGraph3D from '3d-force-graph';

const div = document.createElement('div');
div.id = '3d-graph';
document.body.appendChild(div);

import {
  CSS2DRenderer,
  CSS2DObject,
} from 'three/examples/jsm/renderers/CSS2DRenderer.js';

const Graph = ForceGraph3D({
  extraRenderers: [new CSS2DRenderer()],
})(div)
  .jsonUrl('/miserables.json')
  .nodeAutoColorBy('group')
  .nodeThreeObject((node) => {
    const nodeEl = document.createElement('div');
    nodeEl.textContent = node.id;
    nodeEl.style.color = node.color;
    nodeEl.className = 'node-label';
    return new CSS2DObject(nodeEl);
  })
  .nodeThreeObjectExtend(true);
