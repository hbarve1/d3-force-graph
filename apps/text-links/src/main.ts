import ForceGraph3D from '3d-force-graph';

import SpriteText from 'three-spritetext';

const div = document.createElement('div');
div.id = '3d-graph';
document.body.appendChild(div);

const Graph = ForceGraph3D()(div)
  .jsonUrl('/miserables.json')
  .nodeLabel('id')
  .nodeAutoColorBy('group')
  .linkThreeObjectExtend(true)
  .linkThreeObject((link) => {
    // extend link with text sprite
    const sprite = new SpriteText(`${link.source} > ${link.target}`);
    sprite.color = 'lightgrey';
    sprite.textHeight = 1.5;
    return sprite;
  })
  .linkPositionUpdate((sprite, { start, end }) => {
    const middlePos = Object.assign(
      ...['x', 'y', 'z'].map((c) => ({
        [c]: start[c] + (end[c] - start[c]) / 2, // calc middle point
      }))
    );

    // Position sprite
    Object.assign(sprite.position, middlePos);
  });

// Spread nodes a little wider
Graph.d3Force('charge').strength(-120);
