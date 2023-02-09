import ForceGraph3D from '3d-force-graph';

import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

const div = document.createElement('div');
div.id = '3d-graph';
document.body.appendChild(div);

const Graph = ForceGraph3D()(div)
  .jsonUrl('./miserables.json')
  .nodeLabel('id')
  .nodeAutoColorBy('group');

const bloomPass = new UnrealBloomPass();
bloomPass.strength = 3;
bloomPass.radius = 1;
bloomPass.threshold = 0.1;
Graph.postProcessingComposer().addPass(bloomPass);
