import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// Base

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)


// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}


// responsive window resizing

window.addEventListener('resize', () => {
    // console.log('window resizing')

    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


// double click to full screen
window.addEventListener('dblclick', () => {
    // console.log('double click')

    if(!document.fullscreenElement) {

        canvas.requestFullscreen()  // fullscreen the canvas
        // console.log('go fullscreen');
    }
    else {

        document.exitFullscreen()
        // console.log('leave fullscreen');
    }
})



// Camera
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
// controls.enabled = false
controls.enableDamping = true


// axis helper
const helper = new THREE.AxesHelper(1.5)
scene.add(helper)


// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// my devicePixelRatio 1.5
// renderer.setPixelRatio(window.devicePixelRatio)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))  // limit




const tick = () => {

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()