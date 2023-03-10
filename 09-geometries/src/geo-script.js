import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// Base

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
// const geometry = new THREE.BoxGeometry(1.001, 1.001, 1.001, 4,4,4)
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
// const mesh = new THREE.Mesh(geometry, material)
// scene.add(mesh)
// const geo = new THREE.BoxGeometry(1, 1, 1, 4,4,4)
// const mat = new THREE.MeshBasicMaterial({ color: 'white' })
// const mesh2 = new THREE.Mesh(geo, mat)
// scene.add(mesh2)


// custom geometry

const geometry = new THREE.BufferGeometry()

const count = 1000
const positionsArray = new Float32Array(count * 3 * 3)  // take arr length as argument

for(let i = 0; i < count * 3 * 3; i++) {  // randomly fill yhe array
    positionsArray[i] = 10*(Math.random() - 0.5)  // -0.5 to make it center
}

const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)
geometry.setAttribute('position', positionsAttribute)


const material = new THREE.MeshBasicMaterial({ color: 'white', wireframe: true })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)




// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)


// helper
const helper = new THREE.AxesHelper(1.5)
// scene.add(helper)


// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()