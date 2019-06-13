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