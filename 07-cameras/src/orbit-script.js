import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

// console.log(OrbitControls);

// Cursor
const cursor = {
    x: 0,
    y: 0
}

window.addEventListener("mousemove", (event) => {

    // event.clientX / sizes.width = 0 to 1
    // - 0.5  -->  -0.5 to 0 to +0.5

    cursor.x = event.clientX / sizes.width - 0.5 
    
    // upward Y axis is should be positive
    cursor.y = -(event.clientY / sizes.height - 0.5)  
    // console.log(cursor.x);
})


// Base
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Scene
const scene = new THREE.Scene()

// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
scene.add(mesh)


// axis helper
const helper = new THREE.AxesHelper(1.5)
scene.add(helper)


// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)


camera.position.z = 3
camera.lookAt(mesh.position)
scene.add(camera)


// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true


// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)



const tick = () => {
 
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()