/**
 *
 * @TODO: lockfile parser is not working
  <script src="//bundle.run/@yarnpkg/lockfile@1.1.0"></script>
  <script src="//unpkg.com/dat.gui"></script>
  <script src="//unpkg.com/d3-octree"></script>
  <script src="//unpkg.com/d3-force-3d"></script>
  <script src="//unpkg.com/three"></script>
  <script src="//unpkg.com/three-spritetext"></script>

  <script src="//unpkg.com/3d-force-graph"></script>
 */

import ForceGraph3D from '3d-force-graph';
import * as dat from 'dat.gui';
import * as d3 from 'd3';
// import * as THREE from 'three';
import SpriteText from 'three-spritetext';
// import _yarnpkg_lockfile from '@yarnpkg/lockfile';
// import d3octree from 'd3-octree';
// import d3force3d from 'd3-force-3d';

const div = document.createElement('div');
div.id = '3d-graph';
document.body.appendChild(div);

// controls
const controls = { 'DAG Orientation': 'lr' };
const gui = new dat.GUI();
gui
  .add(controls, 'DAG Orientation', ['lr', 'td', 'zout', 'radialout', null])
  .onChange((orientation) => graph && graph.dagMode(orientation));

// graph config
const graph = ForceGraph3D()
  .backgroundColor('#101020')
  .linkColor(() => 'rgba(255, 255, 255, 0.2)')
  .dagMode('lr')
  .onDagError(() => false)
  .dagLevelDistance(180)
  .nodeId('package')
  .linkCurvature(0.07)
  .nodeThreeObject((node) => {
    const sprite = new SpriteText(node.package);
    sprite.material.depthWrite = false;
    sprite.color = 'lightsteelblue';
    sprite.textHeight = 8;
    return sprite;
  })
  .d3Force('collide', d3.forceCollide(13))
  .d3AlphaDecay(0.02)
  .d3VelocityDecay(0.3);

fetch('/yarn.lock')
  .then((r) => r.text())
  .then((text) => {
    const yarnlock = _yarnpkg_lockfile.parse(text);
    if (yarnlock.type !== 'success') throw new Error('invalid yarn.lock');
    return yarnlock.object;
  })
  .then((yarnlock) => {
    const nodes = [];
    const links = [];

    Object.entries(yarnlock).forEach(([pkg, details]) => {
      nodes.push({
        pkg,
        version: details.version,
      });

      if (details.dependencies) {
        Object.entries(details.dependencies).forEach(([dep, version]) => {
          links.push({ source: pkg, target: `${dep}@${version}` });
        });
      }
    });

    graph(div).graphData({ nodes, links });
  });
