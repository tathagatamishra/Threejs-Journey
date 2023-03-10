import * as THREE from 'three'

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


// Clock
const clock = new THREE.Clock()

// Animation
const loop = () => {

    // Clock 
    // elapsedTime returns Seconds  (not milliseconds)
    const elapsedTime = clock.getElapsedTime()
    console.log(elapsedTime);  

    // Update object
    // mesh.rotation.y = elapsedTime
    // mesh.rotation.y = elapsedTime * Math.PI * 2
    camera.position.y = Math.sin(elapsedTime)
    camera.position.x = Math.cos(elapsedTime)

    // look at the object center
    camera.lookAt(mesh.position)


    // Render
    renderer.render(scene, camera)

    // pass the function 
    window.requestAnimationFrame(loop)  // no need to call
}

loop()