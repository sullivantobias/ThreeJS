const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer;

renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)

/** game logic */
const update = () => {

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