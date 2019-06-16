const { createPlanet } = require('./createPlanet')
const { createOrbit } = require('./createOrbit')
const { rotateAroundObject } = require('./rotateAroundObject')
const { PLANETS } = require('./planetsList')

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    10000
);

const starTexture = new THREE.TextureLoader().load("../textures/background_texture.jpg");

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


let planets = [];
for (const planet in PLANETS) {
    if (PLANETS.hasOwnProperty(planet)) {
        const currentPlanet = PLANETS[planet];
        const texture = new THREE.TextureLoader().load(currentPlanet.texture);
        const object = createPlanet(
            currentPlanet.name,
            [currentPlanet.size, currentPlanet.segments, currentPlanet.segments],
            { map: texture });

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

camera.position.z = 1300;

// set controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);

/**
 * repeat
 */
const update = () => {
    const date = Date.now() * 0.0001;

    for (let i = 0; i < planets.length; i++) {
        const p = planets[i];
        if (p.object.name !== 'Sun') {
            rotateAroundObject(
                p.object,
                [date, p.planet.orbSpeed, p.planet.distFromSun + PLANETS.Sun.size],
                [0, 0, 0],
                [date, p.planet.orbSpeed, p.planet.distFromSun + PLANETS.Sun.size])
        }
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