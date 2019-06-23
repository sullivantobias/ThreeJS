const PLANETS = {
    Sun: {
        name: "Sun",
        size: 696,
        segments: 32,
        rotationSpeed: 0.07,
        texture: '../textures/sun_texture.jpg',
        isBasic: true
    },
    Mercury: {
        name: "Mercury",
        size: 2.5,
        segments: 32,
        rotationSpeed: 0.00011,
        orbSpeed: 4.7 * 2,
        distFromSun: 58 * 3,
        texture: '../textures/mercury_texture.jpg',
        isBasic: false
    },
    Venus: {
        name: "Venus",
        size: 6,
        segments: 32,
        rotationSpeed: 0.00007,
        orbSpeed: 3.5 * 2,
        distFromSun: 108 * 3,
        texture: '../textures/venus_texture.jpg',
        isBasic: false
    },
    Earth: {
        name: "Earth",
        size: 6.4,
        segments: 32,
        rotationSpeed: 0.017,
        orbSpeed: 3 * 2,
        distFromSun: 149 * 3,
        texture: '../textures/earth_texture.jpg',
        isBasic: false
    },
    Mars: {
        name: "Mars",
        size: 3.4,
        segments: 32,
        rotationSpeed: 0.00868,
        orbSpeed: 2.4 * 2,
        distFromSun: 228 * 3,
        texture: '../textures/mars_texture.jpg',
        isBasic: false
    },
    Jupiter: {
        name: "Jupiter",
        size: 71,
        segments: 32,
        rotationSpeed: 0.47,
        orbSpeed: 1.3 * 2,
        distFromSun: 778 * 3,
        texture: '../textures/jupiter_texture.jpg',
        isBasic: false
    },
    Saturn: {
        name: "Saturn",
        size: 60,
        segments: 32,
        rotationSpeed: 0.35,
        orbSpeed: 0.96 * 2,
        distFromSun: 1427 * 3,
        texture: '../textures/saturn_texture.jpg',
        isBasic: false
    },
    Uranus: {
        name: "Uranus",
        size: 25.5,
        segments: 32,
        rotationSpeed: 0.0932,
        orbSpeed: 0.68 * 2,
        distFromSun: 2871 * 3,
        texture: '../textures/uranus_texture.jpg',
        isBasic: false
    },
    Neptune: {
        name: "Neptune",
        size: 24.7,
        segments: 32,
        rotationSpeed: 0.0965,
        orbSpeed: 0.54 * 2,
        distFromSun: 4498 * 3,
        texture: '../textures/neptune_texture.jpg',
        isBasic: false
    },
}

module.exports.PLANETS = PLANETS