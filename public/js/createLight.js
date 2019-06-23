/**
 * @function createLight
 * @param {*} color 
 * @param {*} intensity 
 * @param {*} distance 
 */
const createLight = (color, intensity, distance) => {
    const light = new THREE.PointLight(color, intensity, distance);

    return light;
}

module.exports.createLight = createLight;