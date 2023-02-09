import ForceGraph3D from '3d-force-graph';
import SpriteText from 'three-spritetext';

const div = document.createElement('div');
div.id = '3d-graph';
document.body.appendChild(div);

const Graph = ForceGraph3D()(div)
  .jsonUrl('/miserables.json')
  .nodeAutoColorBy('group')
  .nodeThreeObject((node) => {
    const sprite = new SpriteText(node.id);
    sprite.material.depthWrite = false; // make sprite background transparent
    sprite.color = node.color;
    sprite.textHeight = 8;
    return sprite;
  });

// Spread nodes a little wider
Graph.d3Force('charge').strength(-120);
