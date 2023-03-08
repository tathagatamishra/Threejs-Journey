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

// mesh.position is Vector3 | mesh.position consist of x, y, z value of mesh

let x = mesh.position.length()
console.log("Distance between center of the scene & object " + x);

mesh.position.normalize() // normalize the vector position to 1

// Position

// mesh.position.y = 1
// mesh.position.x = -1
mesh.position.set(1, 0, -1)

// Scale

mesh.scale.set(1,1,1)

// Rotation

mesh.rotation.reorder('YXZ')  // axis order before apply rotation
// mesh.rotation.y = Math.PI * 0.25
// mesh.rotation.x = Math.PI * 0.25
mesh.rotation.set(2,4,5)



// Axis helper
const axesHelper = new THREE.AxesHelper(1.5)
scene.add(axesHelper)
// green = y
// red = x
// blue = z

// Sizes

const sizes = {
    width: 800,
    height: 600
}


// Camera

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
// camera.position.x = -1
// camera.position.y = -1
scene.add(camera)
console.log(mesh.position.distanceTo(camera.position));

// camera.lookAt(new THREE.Vector3(3,0,0))
// or
camera.lookAt(mesh.position)


// Renderer

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)