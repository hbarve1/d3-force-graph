import ForceGraph3D from '3d-force-graph';
import * as dat from 'dat.gui';

const div = document.createElement('div');
div.id = '3d-graph';
document.body.appendChild(div);

// Create Random tree
const N = 20;
const gData = {
  nodes: [...Array(N).keys()].map((i) => ({ id: i })),
  links: [...Array(N).keys()]
    .filter((id) => id)
    .map((id) => ({
      source: id,
      target: Math.round(Math.random() * (id - 1)),
      color: id % 2,
    })),
};

const graph = ForceGraph3D()(div)
  .nodeLabel((node) => node.id)
  .linkColor((link) => (link.color ? 'red' : 'green'))
  .linkOpacity(1)
  .graphData(gData);

const linkForce = graph
  .d3Force('link')
  .distance((link) =>
    link.color ? settings.redDistance : settings.greenDistance
  );

//Define GUI
const Settings = function () {
  this.redDistance = 20;
  this.greenDistance = 20;
};

const settings = new Settings();
const gui = new dat.GUI();

const controllerOne = gui.add(settings, 'redDistance', 0, 100);
const controllerTwo = gui.add(settings, 'greenDistance', 0, 100);

controllerOne.onChange(updateLinkDistance);
controllerTwo.onChange(updateLinkDistance);

function updateLinkDistance() {
  linkForce.distance((link) =>
    link.color ? settings.redDistance : settings.greenDistance
  );
  graph.numDimensions(3); // Re-heat simulation
}
