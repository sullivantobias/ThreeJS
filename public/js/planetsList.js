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
        distFromSun: 58 * 3,
        texture: '../textures/mercury_texture.jpg'
    },
    Venus: {
        name: "Venus",
        size: 6,
        segments: 32,
        orbSpeed: 3.5 * 2,
        distFromSun: 108 * 3,
        texture: '../textures/venus_texture.jpg'
    },
    Earth: {
        name: "Earth",
        size: 6.4,
        segments: 32,
        orbSpeed: 3 * 2,
        distFromSun: 149 * 3,
        texture: '../textures/earth_texture.jpg'
    },
    Mars: {
        name: "Mars",
        size: 3.4,
        segments: 32,
        orbSpeed: 2.4 * 2,
        distFromSun: 228 * 3,
        texture: '../textures/mars_texture.jpg'
    },
    Jupiter: {
        name: "Jupiter",
        size: 71,
        segments: 32,
        orbSpeed: 1.3 * 2,
        distFromSun: 778 * 3,
        texture: '../textures/jupiter_texture.jpg'
    },
    Saturn: {
        name: "Saturn",
        size: 60,
        segments: 32,
        orbSpeed: 0.96 * 2,
        distFromSun: 1427 * 3,
        texture: '../textures/saturn_texture.jpg'
    },
    Uranus: {
        name: "Uranus",
        size: 25.5,
        segments: 32,
        orbSpeed: 0.68 * 2,
        distFromSun: 2871 * 3,
        texture: '../textures/uranus_texture.jpg'
    },
    Neptune: {
        name: "Neptune",
        size: 24.7,
        segments: 32,
        orbSpeed: 0.54 * 2,
        distFromSun: 4498 * 3,
        texture: '../textures/neptune_texture.jpg'
    },
}

module.exports.PLANETS = PLANETS