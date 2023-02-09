import * as d3 from 'd3';
import * as THREE from 'three';
import ForceGraph3D from '3d-force-graph';

const div = document.createElement('div');
div.id = '3d-graph';
document.body.appendChild(div);

// Random tree
const N = 25;
const gData = {
  nodes: [...Array(N).keys()].map((i) => ({ id: i })),
  links: [...Array(N).keys()]
    .filter((id) => id)
    .map((id) => ({
      source: id,
      target: Math.round(Math.random() * (id - 1)),
    })),
};

const nodeColorScale = d3.scaleOrdinal(d3.schemeRdYlGn[4]);

const Graph = ForceGraph3D()(div)
  .nodeColor((node) => nodeColorScale(node.id))
  .linkThreeObject((link) => {
    // 2 (nodes) x 3 (r+g+b) bytes between [0, 1]
    // For example:
    // new Float32Array([
    //   1, 0, 0,  // source node: red
    //   0, 1, 0   // target node: green
    // ]);
    const colors = new Float32Array(
      [].concat(
        ...[link.source, link.target]
          .map(nodeColorScale)
          .map(d3.color)
          .map(({ r, g, b }) => [r, g, b].map((v) => v / 255))
      )
    );

    const material = new THREE.LineBasicMaterial({ vertexColors: true });
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array(2 * 3), 3)
    );
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    return new THREE.Line(geometry, material);
  })
  .linkPositionUpdate((line, { start, end }) => {
    const startR = Graph.nodeRelSize();
    const endR = Graph.nodeRelSize();
    const lineLen = Math.sqrt(
      ['x', 'y', 'z']
        .map((dim) => Math.pow((end[dim] || 0) - (start[dim] || 0), 2))
        .reduce((acc, v) => acc + v, 0)
    );

    const linePos = line.geometry.getAttribute('position');

    // calculate coordinate on the node's surface instead of center
    linePos.set(
      [startR / lineLen, 1 - endR / lineLen]
        .map((t) =>
          ['x', 'y', 'z'].map((dim) => start[dim] + (end[dim] - start[dim]) * t)
        )
        .flat()
    );
    linePos.needsUpdate = true;
    return true;
  })
  .graphData(gData);
