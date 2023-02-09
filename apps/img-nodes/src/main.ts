import ForceGraph3D from '3d-force-graph';
import * as THREE from 'three';

const div = document.createElement('div');
div.id = '3d-graph';
document.body.appendChild(div);

const imgs = [
  'cat.jpg',
  'dog.jpg',
  'eagle.jpg',
  'elephant.jpg',
  'grasshopper.jpg',
  'octopus.jpg',
  'owl.jpg',
  'panda.jpg',
  'squirrel.jpg',
  'tiger.jpg',
  'whale.jpg',
];

// Random connected graph
const gData = {
  nodes: imgs.map((img, id) => ({ id, img })),
  links: [...Array(imgs.length).keys()]
    .filter((id) => id)
    .map((id) => ({
      source: id,
      target: Math.round(Math.random() * (id - 1)),
    })),
};

const Graph = ForceGraph3D()(div)
  .nodeThreeObject(({ img }) => {
    const imgTexture = new THREE.TextureLoader().load(`/${img}`);
    const material = new THREE.SpriteMaterial({ map: imgTexture });
    const sprite = new THREE.Sprite(material);
    sprite.scale.set(12, 12);
    return sprite;
  })
  .graphData(gData);
