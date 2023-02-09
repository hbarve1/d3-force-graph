import ForceGraph3D from '3d-force-graph';

const div = document.createElement('div');
div.id = '3d-graph';
document.body.appendChild(div);

type user = {
  user: string;
  description: string;
};

ForceGraph3D()(div)
  .jsonUrl('/blocks.json')
  .nodeAutoColorBy('user')
  .nodeLabel((node) => `${node.user}: ${node.description}`)
  .onNodeClick((node) =>
    window.open(`https://bl.ocks.org/${node.user}/${node.id}`, '_blank')
  );
