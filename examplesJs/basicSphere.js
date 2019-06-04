const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer;

renderer.shadowMap.enabled = true

// window object 
const { width, height } = {
    width: window.innerWidth,
    height: window.innerHeight
}

renderer.setSize(width, height)
// handle resizing 
window.addEventListener('resize', () => {
    const w = window.innerWidth
    const h = window.innerHeight

    renderer.setSize(w, h)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
})

const controls = new THREE.OrbitControls(camera, renderer.domElement)

document.body.appendChild(renderer.domElement)

const createSphere = (name, geometry, material, castShadow = false, receiveShadow = false, basic = true) => {
    let m = new THREE.MeshPhongMaterial(material);
    const g = new THREE.SphereBufferGeometry(...geometry)
    if (basic) m = new THREE.MeshBasicMaterial(material);
    const sphere = new THREE.Mesh(g, m)

    sphere.name = name

    sphere.castShadow = castShadow;
    sphere.receiveShadow = receiveShadow

    return sphere
}

const pointSphere = createSphere("earth", [4, 32, 32], { color: 'blue' }, true, true, false)
const lightSphere = createSphere("mini-sun", [3, 32, 32], { color: 'yellow' })
const moonOfLightSphere = createSphere('moon', [1, 32, 32], { color: 'orange' }, true, true, false)
const moonOfEarth = createSphere("mini", [2, 32, 32], { color: 'red' }, true, true, false)


// plane
const g = new THREE.BoxBufferGeometry(10, 0.15, 10);
const m = new THREE.MeshPhongMaterial({
    shininess: 140,
});

const ground = new THREE.Mesh(g, m);
ground.scale.multiplyScalar(5);
ground.castShadow = false;
ground.receiveShadow = true;
ground.position.y = -5

const light = new THREE.PointLight('white', 1);
light.castShadow = true;

scene.add(light, lightSphere, pointSphere, ground, moonOfLightSphere, moonOfEarth);

camera.position.z = 40
camera.position.y = 4

pointSphere.add(lightSphere, moonOfEarth)
lightSphere.add(moonOfLightSphere, light)

/** game logic */

const update = () => {

    const date = Date.now() * 0.0001;
    moonOfLightSphere.position.set(
        Math.cos(date * 20) * 6,
        0,
        Math.sin(date * 20) * 6
    );

    moonOfEarth.position.set(
        Math.cos(date * 25) * 10,
        0,
        Math.sin(date * 25) * 10
    );

    lightSphere.position.set(
        Math.cos(date * 10) * 20,
        3,
        Math.sin(date * 10) * 20
    );
}
/** draw scene  */
const render = () => {
    renderer.render(scene, camera)
}
// run game loop (update, render, repeat)
const GameLoop = () => {
    requestAnimationFrame(GameLoop)

    update()

    render()
}

// run
GameLoop()