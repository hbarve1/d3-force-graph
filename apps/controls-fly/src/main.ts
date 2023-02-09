import ForceGraph3D from '3d-force-graph';

const div = document.createElement('div');
div.id = '3d-graph';
document.body.appendChild(div);

const Graph = ForceGraph3D({ controlType: 'fly' })(div)
  .jsonUrl('/miserables.json')
  .nodeLabel('id')
  .nodeAutoColorBy('group');
