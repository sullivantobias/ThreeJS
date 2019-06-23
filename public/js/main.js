const { createPlanet } = require('./createPlanet')
const { createOrbit } = require('./createOrbit')
const { rotateAroundObject } = require('./rotateAroundObject')
const { PLANETS } = require('./planetsList')
const { createLight } = require('./createLight')

/** setup scene and camera  */
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    40000
);

/** load background texture */
const starTexture = new THREE.TextureLoader().load("../textures/background_texture.jpg");

/** setup renderer */
const renderer = new THREE.WebGLRenderer({ alpha: true });
scene.background = starTexture
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

/** create planets and orbit based on planetList */
let planets = [];
for (const planet in PLANETS) {
    if (PLANETS.hasOwnProperty(planet)) {
        const currentPlanet = PLANETS[planet];
        const texture = new THREE.TextureLoader().load(currentPlanet.texture);
        const object = createPlanet(
            currentPlanet.name,
            [currentPlanet.size, currentPlanet.segments, currentPlanet.segments],
            { map: texture }, currentPlanet.isBasic,
            currentPlanet.isBasic,
            currentPlanet.isBasic
        );

        if (currentPlanet.name !== 'Sun') {
            const planetOrbit = createOrbit(
                currentPlanet.distFromSun +
                PLANETS.Sun.size, 'red'
            )
            scene.add(planetOrbit)
        }
        planets.push({ planet: currentPlanet, object })

        scene.add(object)
    }
}

const light = createLight('white', 1)
scene.add(light)

/** set the camera position on the Z axis */
camera.position.z = 4000;

// set orbitControls
const controls = new THREE.OrbitControls(camera, renderer.domElement);

/**
 * repeat
 */
const update = () => {
    const date = Date.now() * 0.0001;
    /** make the planets move around the sun */
    for (let i = 0; i < planets.length; i++) {
        const p = planets[i];
        if (p.object.name !== 'Sun') {
            rotateAroundObject(
                p.object,
                [date, p.planet.orbSpeed, p.planet.distFromSun + PLANETS.Sun.size],
                [0, 0, 0],
                [date, p.planet.orbSpeed, p.planet.distFromSun + PLANETS.Sun.size])
        }

        p.object.rotation.y += p.planet.rotationSpeed
    }
};

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