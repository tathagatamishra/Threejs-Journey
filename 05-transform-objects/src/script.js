import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


// Objects

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Position

// mesh.position.y = 1
// mesh.position.x = -1
mesh.position.set(0, 0, 0)

// Scale

mesh.scale.set(3,1,1)

// Rotation

mesh.rotation.reorder('YXZ')
mesh.rotation.y = Math.PI * 0.25
mesh.rotation.x = Math.PI * 0.25



// Axis helper
const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)


// Sizes

const sizes = {
    width: 800,
    height: 600
}


// Camera

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
camera.position.x = -1
camera.position.y = -1
scene.add(camera)
console.log(mesh.position.distanceTo(camera.position));


// Renderer

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)