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
}

module.exports.PLANETS = PLANETS