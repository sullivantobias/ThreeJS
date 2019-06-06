const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer;

renderer.shadowMap.enabled = true

/** window object */
const { width, height } = {
    width: window.innerWidth,
    height: window.innerHeight
}

/** render the canvas */
renderer.setSize(width, height)

// handle resizing 
window.addEventListener('resize', () => {
    const w = window.innerWidth
    const h = window.innerHeight

    renderer.setSize(w, h)
    
    /** camera */
    camera.aspect = w / h
    camera.updateProjectionMatrix()
})

document.body.appendChild(renderer.domElement)

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
const createSphere = (name, geometry, material, castShadow = false, receiveShadow = false, basic = true) => {
    let m = new THREE.MeshPhongMaterial(material);
    const g = new THREE.SphereBufferGeometry(...geometry)
    /** if the element is basic */
    if (basic) m = new THREE.MeshBasicMaterial(material);
    /** sphere */
    const sphere = new THREE.Mesh(g, m)
    /** set name */
    sphere.name = name
    /** set shadow */
    sphere.castShadow = castShadow;
    sphere.receiveShadow = receiveShadow

    return sphere
}

/** generate all the spheres */
const pointSphere = createSphere("earth", [4, 32, 32], { color: 'blue' }, true, true, false)
const lightSphere = createSphere("mini-sun", [3, 32, 32], { color: 'yellow' })
const moonOfLightSphere = createSphere('moon', [1, 32, 32], { color: 'orange' }, true, true, false)
const moonOfEarth = createSphere("mini", [2, 32, 32], { color: 'red' }, true, true, false)

/** generate plane */
const g = new THREE.BoxBufferGeometry(10, 0.15, 10);
const m = new THREE.MeshPhongMaterial({
    shininess: 140,
});

const ground = new THREE.Mesh(g, m);
/** options */
ground.scale.multiplyScalar(5);
ground.castShadow = false;
ground.receiveShadow = true;
ground.position.y = -5

/** generate light */
const light = new THREE.PointLight('white', 1);
light.castShadow = true;

scene.add(light, lightSphere, pointSphere, ground, moonOfLightSphere, moonOfEarth)

/** add children */
pointSphere.add(lightSphere, moonOfEarth)
lightSphere.add(moonOfLightSphere, light)

/** camera settings */
/**
 * @function rotateAroundObject
 * @description basic rotation based on the parent
 * @param {Object} obj 
 * @param {Array} param1 
 * @param {Array} param2 
 * @param {Array} param3 
 */
const rotateAroundObject =  (obj, [...x], [...y], [...z]) => {
    obj.position.set(
        Math.cos(x[0] * x[1]) * x[2],
        Math.sin(y[0] * y[1]) * y[2],
        Math.sin(z[0] * z[1]) * z[2]
    );
}

/**
 * repeat
 */
const update = () => {
    const date = Date.now() * 0.0001;
    rotateAroundObject(moonOfLightSphere, [date, 20, 6], [0, 0, 0], [date, 20, 6])
    rotateAroundObject(moonOfEarth, [date, 25, 10], [0, 0, 0], [date, 25, 10])
    rotateAroundObject(lightSphere, [date, 10, 20], [1, 1, 3], [date, 10, 20])
    rotateAroundObject(camera, [date, 10, 36], [1, 1, 38], [date, 10, -15])

    camera.lookAt(pointSphere.position)
}

/**
 * draw scene
 */
const render = () => {
    renderer.render(scene, camera)
}

/**
 * loop
 */
const GameLoop = () => {
    requestAnimationFrame(GameLoop)
    update()
    render()
}

/**
 * run
 */
GameLoop()