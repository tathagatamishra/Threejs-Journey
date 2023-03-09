import * as THREE from 'three'
import gsap from 'gsap'

console.log(gsap);


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Helper
const helper = new THREE.AxesHelper(1)
scene.add(helper)


// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)



// gsap animation
gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 })
gsap.to(mesh.position, { duration: 1, delay: 2, x: 0 })

// gsap has its own loop recursion, no need to put in loop() below


// Animation
const loop = () => {

    // Render
    renderer.render(scene, camera)

    // pass the function 
    window.requestAnimationFrame(loop)  // no need to call
}

loop()