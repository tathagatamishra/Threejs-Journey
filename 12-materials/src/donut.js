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
camera.position.x = 10
camera.position.y = 6
// camera.position.z = 6
scene.add(camera)


// Renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


// Window responsiveness -------------

window.addEventListener('resize', () => {
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



// Lights

const light = new THREE.PointLight()
scene.add(light)
light.position.set(2, 4, 2)

const alight = new THREE.AmbientLight()
scene.add(alight)
alight.intensity = 0.2




// Material

const material = new THREE.MeshStandardMaterial()
// material.wireframe = true


// Objects

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.06,32,32),
    new THREE.MeshStandardMaterial({color:'aqua', roughness: .4})
)
sphere.position.set(.8,1,1)


const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(8, 8),
    material
)
plane.rotation.x = -(Math.PI / 2)


const donut = new THREE.Mesh(
    new THREE.TorusGeometry(1, 0.5, 32, 64),
    new THREE.MeshStandardMaterial({color:'khaki'})
)
donut.rotation.x = Math.PI / 2
donut.position.y = 0.5

const donut2 = new THREE.Mesh(
    new THREE.TorusGeometry(1, 0.5, 32, 64),
    new THREE.MeshStandardMaterial({color:'pink', roughness: .6})
)
donut2.rotation.x = Math.PI / 2
donut2.position.y = 0.6


// Add everything

scene.add(sphere, plane, donut, donut2)




// --------------------------------------------


// Debug

const gui = new GUI()

{
    gui
        .add(donut2.position, 'y')
        .min(-10)
        .max(10)
        .step(0.01)
        .name('Move donut2 Y')
}
{
    gui
        .add(donut.rotation, 'y')
        .min(-10)
        .max(10)
        .step(0.01)
        .name('Rotate donut Y')
    gui
        .add(donut.rotation, 'x')
        .min(-10)
        .max(10)
        .step(0.01)
        .name('Rotate donut X')
    gui
        .add(donut.rotation, 'z')
        .min(-10)
        .max(10)
        .step(0.01)
        .name('Rotate donut Z')
    gui
        .add(donut.position, 'y')
        .min(-10)
        .max(10)
        .step(0.01)
        .name('Move donut Y')
}
{
    gui
        .add(plane.rotation, 'y')
        .min(-10)
        .max(10)
        .step(0.01)
        .name('Rotate plane Y')
    gui
        .add(plane.rotation, 'x')
        .min(-10)
        .max(10)
        .step(0.01)
        .name('Rotate plane X')
    gui
        .add(plane.rotation, 'z')
        .min(-10)
        .max(10)
        .step(0.01)
        .name('Rotate plane Z')
}
{
    gui
        .add(sphere.position, 'y')
        .min(-10)
        .max(10)
        .step(0.01)
        .name('Move sphere Y')
    gui
        .add(sphere.position, 'x')
        .min(-10)
        .max(10)
        .step(0.01)
        .name('Move sphere X')
    gui
        .add(sphere.position, 'z')
        .min(-10)
        .max(10)
        .step(0.01)
        .name('Move sphere Z')
}



// Helper
const helper = new THREE.AxesHelper(10)
scene.add(helper)

// Floor
const floor = new THREE.GridHelper()
scene.add(floor)

// Light Helper
const lightHelper = new THREE.PointLightHelper(light, 0.1)
scene.add(lightHelper)





// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
// controls.autoRotate = true
// controls.autoRotateSpeed = 1


// Animate

// const clock = new THREE.Clock()

const tick = () => {
    // const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()