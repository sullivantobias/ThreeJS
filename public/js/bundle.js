(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

/**
 * @function createOrbit
 * @param {*} distance 
 * @param {*} color 
 */
const createOrbit = (distance, color) => {
    const geometry = new THREE.CircleGeometry(distance, 256);
    geometry.vertices.shift();
    geometry.rotateX(-Math.PI / 2);
    const material = new THREE.LineBasicMaterial({ color: color });
    const mesh = new THREE.Line(geometry, material);

    return mesh
}

module.exports.createOrbit = createOrbit
},{}],2:[function(require,module,exports){
/**
 * @function createPlanet
 * @description draw the planet based on parameters
 * @param {String} name
 * @param {Array} geometry
 * @param {Object} material
 * @param {Boolean} castShadow
 * @param {Boolean} receiveShadow
 * @param {Boolean} basic
 */
const createPlanet = (
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

module.exports.createPlanet = createPlanet
},{}],3:[function(require,module,exports){
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
const mercuryOrb = createOrbit(58 + 696, 'grey')

let planets = [];
for (const planet in PLANETS) {
    if (PLANETS.hasOwnProperty(planet)) {
        const currentPlanet = PLANETS[planet];
        const texture = new THREE.TextureLoader().load(currentPlanet.texture);
        const object = createPlanet(
            currentPlanet.name,
            [currentPlanet.size, currentPlanet.segments, currentPlanet.segments],
            { map: texture });
        planets.push({ planet: currentPlanet, object })
        scene.add(object)
    }
}

scene.add(mercuryOrb)

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

console.log(planets)
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
},{"./createOrbit":1,"./createPlanet":2,"./planetsList":4,"./rotateAroundObject":5}],4:[function(require,module,exports){
const PLANETS = {
    Sun: {
        name: "Sun",
        size: 696,
        segments: 32,
        texture: '../textures/sun_texture.jpg'
    },
    Mercury: {
        name: "Mercury",
        size: 2.5,
        segments: 32,
        orbSpeed: 4.7 * 2,
        distFromSun: 58,
        texture: '../textures/mercury_texture.jpg'
    }
}

module.exports.PLANETS = PLANETS
},{}],5:[function(require,module,exports){

/**
 * @function rotateAroundObject
 * @description basic rotation based on the parent
 * @param {Object} obj 
 * @param {Array} param1 
 * @param {Array} param2 
 * @param {Array} param3 
 */
const rotateAroundObject = (obj, [...x], [...y], [...z]) => {
    obj.position.set(
        Math.cos(x[0] * x[1]) * x[2],
        Math.sin(y[0] * y[1]) * y[2],
        Math.sin(z[0] * z[1]) * z[2]
    );
}

module.exports.rotateAroundObject = rotateAroundObject
},{}]},{},[3]);
