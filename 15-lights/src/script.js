import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper'
import * as dat from 'lil-gui'



// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}


// Scene
const scene = new THREE.Scene()

// Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
// camera.position.x = 1
camera.position.y = 2
camera.position.z = 5
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))



// -----------------------------



// Lights

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
// scene.add(ambientLight)

const pointLight = new THREE.PointLight('white', .6, 10)
pointLight.position.set(0, 2, 0)
scene.add(pointLight)

const directLight = new THREE.DirectionalLight('green', 1)
directLight.position.set(0, 0, 1)
scene.add(directLight)

const hemiLight = new THREE.HemisphereLight('red', 'blue', 1)
hemiLight.position.set(0, 1, -0.3)
scene.add(hemiLight)

const areaLight = new THREE.RectAreaLight('#D9FF00', 1, 5, .5)
areaLight.position.set(0, -0.5, 2.5)
scene.add(areaLight)
const areaLight2 = new THREE.RectAreaLight('#D9FF00', 1, 5, .5)
areaLight2.position.set(0, -0.5, -2.5)
areaLight2.rotation.y = Math.PI
scene.add(areaLight2)

const spotLight = new THREE.SpotLight('blue', 1, 3, .4, .1, 1)
scene.add(spotLight)
scene.add(spotLight.target)
spotLight.target.position.z = .5

// Light Helper

// let hemiHelper = new THREE.HemisphereLightHelper(hemiLight, .2)
// scene.add(hemiHelper)

// let directHelper = new THREE.DirectionalLightHelper(directLight, .2)
// scene.add(directHelper)

// let pointHelper = new THREE.PointLightHelper(pointLight, .2)
// scene.add(pointHelper)

// let spotHepler = new THREE.SpotLightHelper(spotLight)
// scene.add(spotHepler)

// let rectAreaHelper = new RectAreaLightHelper(areaLight)
// let rectAreaHelper2 = new RectAreaLightHelper(areaLight2)
// scene.add(rectAreaHelper, rectAreaHelper2)





// --------------------------------


// Material
const material_1 = new THREE.MeshStandardMaterial()
const material_2 = new THREE.MeshStandardMaterial()
material_2.flatShading = true
material_2.roughness = 0.4
material_1.roughness = 0.4
material_1.side = THREE.DoubleSide

// Objects

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material_2
)
sphere.position.x = - 1.5

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.75, 0.75, 0.75),
    material_1
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 32, 64),
    material_1
)
torus.position.x = 1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    material_1
)
plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.65

scene.add(sphere, cube, torus, plane)



// ----------------------------------



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




// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true


// Animate

const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime
    cube.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    cube.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime


    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}
tick()