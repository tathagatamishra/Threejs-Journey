import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { DoubleSide } from 'three'


// Debug
const gui = new dat.GUI()

//Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Camera
const camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 2
camera.position.y = 2
camera.position.z = 5
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true
// renderer.shadowMap.type = THREE.PCFSoftShadowMap
// renderer.shadowMap.type = THREE.PCFShadowMap



// Lights & Shadows -----------------

// Directional Light    |
// Spot Light           |---->>    Only these 3 can cast shadow
// Point Light          |

// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001).name('amb')
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight('#00D5FF', 0.7)
directionalLight.position.set(2, 2, - 1)
directionalLight.castShadow = false
gui.add(directionalLight, 'castShadow').name('Directional shadow')
directionalLight.shadow.mapSize.width = 1024
directionalLight.shadow.mapSize.height = 1024
directionalLight.shadow.camera.top = 5
directionalLight.shadow.camera.right = 5
directionalLight.shadow.camera.bottom = -5
directionalLight.shadow.camera.left = -5
directionalLight.shadow.camera.near = 0.5
directionalLight.shadow.camera.far = 10
directionalLight.shadow.radius = 5

gui.add(directionalLight.shadow, 'radius').min(0).max(100)
gui.add(directionalLight, 'intensity').min(0).max(1).step(0.001)
gui.add(directionalLight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(directionalLight.position, 'y').min(0).max(5).step(0.001)
gui.add(directionalLight.position, 'z').min(- 5).max(5).step(0.001)
scene.add(directionalLight)

const dirLightHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
scene.add(dirLightHelper)
dirLightHelper.visible = false
gui.add(dirLightHelper, 'visible').name('directon light')


// Spot Light
const spotLight = new THREE.SpotLight('#FF194E', .7, 10, .5, 1, .1, 1)
scene.add(spotLight)
scene.add(spotLight.target)
spotLight.position.set(0, 3, 3)
spotLight.target.position.set(0, 0, 0)
spotLight.castShadow = false
gui.add(spotLight, 'castShadow').name('spotLight shadow')
spotLight.shadow.mapSize.width = 1024
spotLight.shadow.mapSize.height = 1024
spotLight.shadow.radius = 5
spotLight.shadow.camera.fov = 30
spotLight.shadow.camera.near = 1
spotLight.shadow.camera.far = 10

let spotShadowCamera = new THREE.CameraHelper(spotLight.shadow.camera)
let spotHelper = new THREE.SpotLightHelper(spotLight)
scene.add(spotHelper, spotShadowCamera)

spotHelper.visible = false
spotShadowCamera.visible = false
gui.add(spotHelper, 'visible').name('spot light')
gui.add(spotShadowCamera, 'visible').name('spot light cam')


// Point Light
const pointLight = new THREE.PointLight('#FFF000', .3)
pointLight.castShadow = false
gui.add(pointLight, 'castShadow').name('point shadow')
pointLight.position.set(2, 3, 2)
scene.add(pointLight)
pointLight.shadow.mapSize.width = 1024
pointLight.shadow.mapSize.height = 1024
pointLight.shadow.camera.near = 0.1
pointLight.shadow.camera.far = 10
pointLight.shadow.radius = 5

let pointLightCam = new THREE.CameraHelper(pointLight.shadow.camera)
scene.add(pointLightCam)
pointLightCam.visible = false
gui.add(pointLightCam, 'visible').name('point light cam')

let pointHelper = new THREE.PointLightHelper(pointLight, .2)
pointHelper.visible = false
gui.add(pointHelper, 'visible').name('point light')
scene.add(pointHelper)




// --------------------------------

// Textures
const textureLoader = new THREE.TextureLoader()
const bakedShadow = textureLoader.load('/textures/bakedShadow.jpg')
const simpleShadow = textureLoader.load('/textures/simpleShadow.jpg')


//Materials
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.7
material.side = DoubleSide
gui.add(material, 'metalness').min(0).max(1).step(0.001)
gui.add(material, 'roughness').min(0).max(1).step(0.001)

// Objects
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
)
sphere.castShadow = true


const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(8, 8),
    material
    // new THREE.MeshBasicMaterial({ map: bakedShadow })
)
plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.5
plane.receiveShadow = true

scene.add(sphere, plane)


// aimple plane shadow
const shadowPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1),
    new THREE.MeshBasicMaterial({
        color: '#36665C',
        transparent: true,
        alphaMap: simpleShadow
    })
)
shadowPlane.rotation.x = - Math.PI / 2
shadowPlane.position.y = plane.position.y + 0.001
scene.add(shadowPlane)




// ------------------------------




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


//Animate
const clock = new THREE.Clock()

const tick = () => {
    
    const elapsedTime = clock.getElapsedTime()

    // Move sphere
    sphere.position.x = Math.cos(elapsedTime) *2
    sphere.position.z = Math.sin(elapsedTime) *2
    sphere.position.y = Math.abs(Math.sin(elapsedTime * 3))

    shadowPlane.position.x = sphere.position.x
    shadowPlane.position.z = sphere.position.z

    shadowPlane.material.opacity = 1.2-sphere.position.y
    shadowPlane.scale.x = (1.5-sphere.position.y) 
    shadowPlane.scale.y = (1.5-sphere.position.y)


    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()