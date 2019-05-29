const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer;

// window object 
const { width, height } = {
    width: window.innerWidth,
    height: window.innerHeight
}

renderer.setSize(width, height)
// handle resizing 
window.addEventListener('resize', () => {
    const w = window.innerWidth
    const h = window.innerHeight

    renderer.setSize(w, h)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
})
// set controls
const controls = new THREE.OrbitControls(camera, renderer.domElement)

document.body.appendChild(renderer.domElement)
// set a square
const box = new THREE.BoxGeometry(2, 2, 2)
const cubeMaterials = []

/** material */
const cube = new THREE.Mesh(box, cubeMaterials)

scene.add(cube)
camera.position.z = 4

// light
const aL = new THREE.AmbientLight('white', 2)
aL.position.set(20, 20, 20)
scene.add(aL)

const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// build the cube
const buildShape = (materials) => {
    for (let index = 0; index < 6; index++) {
        materials.push(
            new THREE.MeshLambertMaterial({ color: getRandomColor(), side: THREE.DoubleSide })
        )
    }
}

buildShape(cubeMaterials)

/** game logic */
const update = () => {
    cube.rotation.x += 0.05
    cube.rotation.y += 0.05
}
/** draw scene  */
const render = () => {
    renderer.render(scene, camera)
}
// run game loop (update, render, repeat)
const GameLoop = () => {
    requestAnimationFrame(GameLoop)

    update()

    render()
}

GameLoop()