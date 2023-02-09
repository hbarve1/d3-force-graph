import ForceGraph3D from '3d-force-graph';

const div = document.createElement('div');
div.id = '3d-graph';
document.body.appendChild(div);

const btn = document.createElement('button');
btn.id = 'emit-particles-btn';
btn.innerText = 'Emit 10 Random Particles';
document.body.appendChild(btn);

// Random tree
const N = 50;
const gData = {
  nodes: [...Array(N).keys()].map((i) => ({ id: i })),
  links: [...Array(N).keys()]
    .filter((id) => id)
    .map((id) => ({
      source: id,
      target: Math.round(Math.random() * (id - 1)),
    })),
};

const Graph = ForceGraph3D()(div)
  .linkDirectionalParticleColor(() => 'red')
  .linkDirectionalParticleWidth(4)
  .linkHoverPrecision(10)
  .graphData(gData);

Graph.onLinkClick(Graph.emitParticle); // emit particles on link click

btn.addEventListener('click', () => {
  [...Array(10).keys()].forEach(() => {
    const link = gData.links[Math.floor(Math.random() * gData.links.length)];
    Graph.emitParticle(link);
  });
});
