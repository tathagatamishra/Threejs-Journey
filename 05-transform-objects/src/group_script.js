import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


// group
const group = new THREE.Group()
scene.add(group)

// objects
const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({ color: 'HotPink' })
)
const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({ color: 'LightSkyBlue' })
)
cube2.position.set(3,0,0)
const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({ color: 'LightGreen' })
)
cube3.position.set(-3,0,0)


group.add(cube1, cube2, cube3)
// now we can move whole group
group.position.set(0,1,0)
group.scale.set(1,3,1)
group.rotation.set(0,1,0)


// Axis helper
const helper = new THREE.AxesHelper(1)
scene.add(helper)


// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.set(0,0,5)
scene.add(camera)


// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)