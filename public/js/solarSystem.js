const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const starTexture = new THREE.TextureLoader().load( "../textures/background_texture.jpg" );
const stars = [];

const getRandom = () => {
  let num = Math.floor(Math.random()*10) + 1;
  num *= Math.floor(Math.random()*2) == 1 ? 1 : -1;

  return num;
}

for (let i = 0; i < 200; i++) {
  let geometry = new THREE.PlaneGeometry( 0.5, 0.5 );
  let material = new THREE.MeshBasicMaterial( { map: starTexture } );
  let star = new THREE.Mesh( geometry, material );
  star.position.set( getRandom(), getRandom(), getRandom() );
  star.material.side = THREE.DoubleSide;
  stars.push( star );
}

for (let j = 0; j < stars.length; j++) {
  scene.add( stars[j] );
}

const renderer = new THREE.WebGLRenderer();

renderer.shadowMap.enabled = true;

/** window object */
const { width, height } = {
  width: window.innerWidth,
  height: window.innerHeight
};

/** render the canvas */
renderer.setSize(width, height);

// handle resizing
window.addEventListener("resize", () => {
  const w = window.innerWidth;
  const h = window.innerHeight;

  renderer.setSize(w, h);

  /** camera */
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
});

document.body.appendChild(renderer.domElement);

/**
 * @function createSphere
 * @description draw the sphere based on parameters
 * @param {String} name
 * @param {Array} geometry
 * @param {Object} material
 * @param {Boolean} castShadow
 * @param {Boolean} receiveShadow
 * @param {Boolean} basic
 */
const createSphere = (
  name,
  geometry,
  material,
  castShadow = false,
  receiveShadow = false,
  basic = true
) => {
  let m = new THREE.MeshPhongMaterial(material);
  const g = new THREE.SphereBufferGeometry(...geometry);
  /** if the element is basic */
  if (basic) m = new THREE.MeshBasicMaterial(material);
  /** sphere */
  const sphere = new THREE.Mesh(g, m);
  /** set name */
  sphere.name = name;
  /** set shadow */
  sphere.castShadow = castShadow;
  sphere.receiveShadow = receiveShadow;

  return sphere;
};

const texture = new THREE.TextureLoader().load("../textures/sun_texture.jpg");
const lightSphere = createSphere("Sun", [6, 32, 32], { map: texture });

scene.add(lightSphere);

camera.position.z = 60;

// set controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);

/**
 * repeat
 */
const update = () => {};

/**
 * draw scene
 */
const render = () => {
  renderer.render(scene, camera);
};

/**
 * loop
 */
const GameLoop = () => {
  requestAnimationFrame(GameLoop);
  update();
  render();
};

/**
 * run
 */
GameLoop();
