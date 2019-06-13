
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