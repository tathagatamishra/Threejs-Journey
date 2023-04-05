import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import GUI from 'lil-gui'

// console.log(GUI);


// Base

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Sizes

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

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

// Camera

// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)



// Renderer

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))





//light

const light = new THREE.PointLight({ color: 'white' })
light.position.set(-1, 1, 1)
scene.add(light)

const ambLight = new THREE.AmbientLight({ color: 'white' })
ambLight.intensity = 0.2
scene.add(ambLight)


// Object

const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshStandardMaterial({ color: 0xff0000, })
material.roughness = 0.1
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)




// Debug

const gui = new GUI()

// gui.add(mesh.position, 'y', -10, 10, 0.01)
// gui.add(mesh.position, 'x', -10, 10, 0.01)
// gui.add(mesh.position, 'z', -10, 10, 0.01)

gui
    .add(mesh.position, 'y')
    .min(-10)
    .max(10)
    .step(0.01)
    .name('Up & Down')

gui
    .add(mesh.scale, 'y')
    .min(-10)
    .max(10)
    .step(0.01)
    .name('scale Y')
gui
    .add(mesh.scale, 'x')
    .min(-10)
    .max(10)
    .step(0.01)
    .name('scale X')
gui
    .add(mesh.scale, 'z')
    .min(-10)
    .max(10)
    .step(0.01)
    .name('scale Z')

gui.add(mesh, 'visible')

gui.add(material, 'wireframe')
gui.add(material, 'roughness')

gui.addColor(material, 'color').name('color')
gui.addColor(light, 'color').name('light color')

const parameters = {
    spin: () => {

        // console.log('spin');
        // mesh.rotation.y++
        gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + 10 })
    }
}

gui.add(parameters, 'spin')

gui.add(controls, 'autoRotate')
gui.add(controls, 'autoRotateSpeed')
gui.add(controls, 'enableDamping')
gui.add(controls, 'enablePan')
gui.add(controls, 'enableZoom')



// Animate

const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()