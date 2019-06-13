
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