const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

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

const texture = new THREE.TextureLoader().load( '../textures/sun_texture.jpg' );
const lightSphere = createSphere("Sun", [3, 32, 32], { map: texture } );

scene.add(lightSphere);

camera.position.z = 30

// set controls
const controls = new THREE.OrbitControls(camera, renderer.domElement)

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
