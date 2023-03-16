import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'


// Base----------------------

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}


// Camera
// Base camera
const camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height, 0.1, 200)
camera.position.x = 5
camera.position.y = 5
camera.position.z = 5
scene.add(camera)


// Renderer
const renderer = new THREE.WebGLRenderer({canvas: canvas})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


// Window responsiveness -------------

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


// --------------------------------------------


const light = new THREE.PointLight()
scene.add(light)
light.position.set(1,5,1)

const alight = new THREE.AmbientLight()
scene.add(alight)
alight.intensity = 0.2

const ball = new THREE.SphereGeometry()
const colour = new THREE.MeshStandardMaterial({color: 'red'})
const coloredBall = new THREE.Mesh(ball, colour)

scene.add(coloredBall)

coloredBall.position.y = 1

// Light



// Material

// const material = new THREE.MeshBasicMaterial()


// // Objects

// const sphere = new THREE.Mesh(
//     new THREE.SphereGeometry(),
//     material
// )
// scene.add(sphere)

// const plane = new THREE.Mesh(
//     new THREE.PlaneGeometry(5, 5),
//     material
// )
// plane.rotation.x = -45
// scene.add(plane)


// --------------------------------------------

// Helper
const helper = new THREE.AxesHelper(10)
// scene.add(helper)

// Floor
const floor = new THREE.GridHelper()
// scene.add(floor)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.autoRotate = true
controls.autoRotateSpeed = 100


// Animate

// const clock = new THREE.Clock()

const tick = () =>
{
    // const elapsedTime = clock.getElapsedTime()
    
    // Update controls
    controls.update()
    
    // Render
    renderer.render(scene, camera)
    
    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()