import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { DoubleSide } from 'three'


// Debug
// const gui = new dat.GUI()

// Sizes

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Fog
const fog = new THREE.Fog('#262837', 1, 10)
scene.fog = fog

// Camera
const camera = new THREE.PerspectiveCamera(65, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 10
camera.position.y = 1.2
camera.position.z = 2.5
scene.add(camera)
// gui.add(camera.position, 'x').min(0).max(100).step(0.001)
// gui.add(camera.position, 'y').min(0).max(100).step(0.001)
// gui.add(camera.position, 'z').min(0).max(100).step(0.001)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor('#262837')


// -------------------------



// Textures
const textureLoader = new THREE.TextureLoader()

let grassColorTexture = textureLoader.load('/textures/grass/color.jpg')

let doorColorTex = textureLoader.load('/textures/door/color.jpg')
let doorAlphaTex = textureLoader.load('/textures/door/alpha.jpg')
let doorAOTex = textureLoader.load('/textures/door/ambientOcclusion.jpg')
let doorHeightTex = textureLoader.load('/textures/door/height.jpg')
let doorMetalTex = textureLoader.load('/textures/door/metalness.jpg')
let doorNormalTex = textureLoader.load('/textures/door/normal.jpg')
let doorRoughTex = textureLoader.load('/textures/door/roughness.jpg')

let brickColorTex = textureLoader.load('/textures/bricks/color.jpg')
let brickAOTex = textureLoader.load('/textures/bricks/ambientOcclusion.jpg')
let brickNormalTex = textureLoader.load('/textures/bricks/normal.jpg')
let brickRoughTex = textureLoader.load('/textures/bricks/roughness.jpg')

let grasColorTex = textureLoader.load('/textures/grass/color.jpg')
let grasAOTex = textureLoader.load('/textures/grass/ambientOcclusion.jpg')
let grasNormalTex = textureLoader.load('/textures/grass/normal.jpg')
let grasRoughTex = textureLoader.load('/textures/grass/roughness.jpg')
let grasHeightTex = textureLoader.load('/textures/grass/height.png')

grasColorTex.repeat.set (8,8)
grasAOTex.repeat.set    (8,8)
grasNormalTex.repeat.set(8,8)
grasRoughTex.repeat.set (8,8)
grasHeightTex.repeat.set (8,8)

grasColorTex.wrapS = THREE.RepeatWrapping
grasColorTex.wrapT = THREE.RepeatWrapping
grasAOTex.wrapS = THREE.RepeatWrapping
grasAOTex.wrapT = THREE.RepeatWrapping
grasNormalTex.wrapS = THREE.RepeatWrapping
grasNormalTex.wrapT = THREE.RepeatWrapping
grasRoughTex.wrapS = THREE.RepeatWrapping
grasRoughTex.wrapT = THREE.RepeatWrapping
grasHeightTex.wrapS = THREE.RepeatWrapping
grasHeightTex.wrapT = THREE.RepeatWrapping



// House

// Creating a Group to store all the aprts of House
// Group
const house = new THREE.Group()
scene.add(house)

// Walls
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(2, 1.5, 2),
    new THREE.MeshStandardMaterial({
        map: brickColorTex,
        aoMap: brickAOTex,
        normalMap: brickNormalTex,
        roughnessMap: brickRoughTex,
        side: DoubleSide
    })
)
walls.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2)
)

walls.position.y = (1.5 / 2) + 0.001
walls.castShadow = true
// adding wall to the house group
house.add(walls)

// Roof
const roof = new THREE.Mesh(
    new THREE.ConeGeometry(2, .8, 4),
    new THREE.MeshStandardMaterial({ color: '#CF6551', side: DoubleSide })
)
roof.castShadow = true
// roof.receiveShadow = true
roof.position.y = 1.5 + (.8 / 2)
roof.rotation.y = (Math.PI / 2) / 2
house.add(roof)

// Door
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(1.15, 1.15, 100, 100),
    new THREE.MeshStandardMaterial({
        transparent: true,
        map: doorColorTex,
        alphaMap: doorAlphaTex,
        aoMap: doorAOTex,
        displacementMap: doorHeightTex,
        displacementScale: 0.1,
        normalMap: doorNormalTex,
        metalnessMap: doorMetalTex,
        // roughnessMap: doorRoughTex,
        roughness: .3,
        side: DoubleSide
    })
)
door.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2)
)
door.rotation.y = Math.PI / 2
door.position.x = .97
door.position.y = 1 / 2
house.add(door)

// Door Light
const doorLight = new THREE.PointLight('#ff7d46', 1.5, 4)
doorLight.position.set(1.5, 1, 0)
house.add(doorLight)


// Chimni
const chimni = new THREE.Mesh(
    new THREE.BoxGeometry(.3, .4, .3),
    new THREE.MeshStandardMaterial({ color: '#D16C48', side: DoubleSide })
)
chimni.position.set(0, 2, .7)
house.add(chimni)

// Chimni
const chimni_2 = new THREE.Mesh(
    new THREE.BoxGeometry(.35, .1, .35),
    new THREE.MeshStandardMaterial({ color: '#D18A48', side: DoubleSide })
)
chimni_2.position.set(0, 2.23, .7)

house.add(chimni_2)



// Ghost
const ghost1 = new THREE.PointLight('#00FF00', 1, 3)
ghost1.position.y = 1
scene.add(ghost1)

const ghost2 = new THREE.PointLight('#0074FF', 1, 3)
ghost2.position.y = 1
scene.add(ghost2)

const ghost3 = new THREE.PointLight('#00FF00', 1, 3)
// scene.add(ghost3)



// Bushes
const bush = new THREE.Group()
scene.add(bush)

const bushGeo = new THREE.SphereGeometry()
const bushMat = new THREE.MeshStandardMaterial({ color: '#6BB765' })

const bush_1 = new THREE.Mesh(bushGeo, bushMat)
bush_1.position.set(1.5, 0, 1.5)
bush_1.scale.set(.5, .5, .5)
const bush_2 = new THREE.Mesh(bushGeo, bushMat)
bush_2.position.set(1.2, 0, 1)
bush_2.scale.set(.3, .3, .3)
const bush_3 = new THREE.Mesh(bushGeo, bushMat)
bush_3.position.set(1.5, 0, -2)
bush_3.scale.set(.4, .4, .4)
const bush_4 = new THREE.Mesh(bushGeo, bushMat)
bush_4.position.set(1.3, 0, -1.5)
bush_4.scale.set(.2, .2, .2)

bush.add(bush_1, bush_2, bush_3, bush_4)

const grassGeo = new THREE.CylinderGeometry(.2, .6, 1, 5)
const grassMat = new THREE.MeshStandardMaterial({ color: '#8DC867' })

const grass_1 = new THREE.Mesh(grassGeo, grassMat)
grass_1.position.set(1, .2, 1.2)
grass_1.scale.set(.1, .5, .1)
const grass_2 = new THREE.Mesh(grassGeo, grassMat)
grass_2.position.set(1.3, .1, .7)
grass_2.scale.set(.1, .3, .1)
const grass_3 = new THREE.Mesh(grassGeo, grassMat)
grass_3.position.set(1.8, .2, -2.3)
grass_3.scale.set(.1, .4, .1)
const grass_4 = new THREE.Mesh(grassGeo, grassMat)
grass_4.position.set(1, .1, -1.7)
grass_4.scale.set(.1, .2, .1)

bush.add(grass_1, grass_2, grass_3, grass_4)



// Graves
const graves = new THREE.Group()
scene.add(graves)

const graveGeo = new THREE.BoxGeometry(.1, .6, .4)
const graveMat = new THREE.MeshStandardMaterial({ color: '#8C99B0' })

for (let i = 0; i < 50; i++) {
    let angle = Math.random() * Math.PI * 2
    let radius = 3 + Math.random() * 6
    let x = Math.sin(angle) * radius
    let z = Math.cos(angle) * radius

    let grave = new THREE.Mesh(graveGeo, graveMat)
    grave.position.set(x, .17, z)
    grave.rotation.y = Math.random() - 0.5
    grave.rotation.x = (Math.random() - 0.5) / 3
    grave.castShadow = true

    graves.add(grave)
}



// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(30, 30, 1000, 1000),
    new THREE.MeshStandardMaterial({
        map: grasColorTex,
        aoMap: grasAOTex,
        normalMap: grasNormalTex,
        roughnessMap: grasRoughTex,
        displacementMap: grasHeightTex,
        displacementScale: 0.5,
        side: DoubleSide
    })
)
floor.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2)
)

floor.rotation.x = - Math.PI * 0.5
floor.position.y = -.3
scene.add(floor)





// -------------------------


// Lights

// Ambient light
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.05)
// gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.05)
moonLight.position.set(2, 5, -4)

// gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
// gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001)
// gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001)
// gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001)
scene.add(moonLight)



// -------------------------



// Shadows
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

moonLight.castShadow = true

bush_1.castShadow = true
bush_2.castShadow = true
bush_3.castShadow = true
bush_4.castShadow = true

ghost1.castShadow = true
ghost2.castShadow = true
ghost3.castShadow = true

walls.castShadow = true
roof.castShadow = true
doorLight.castShadow = true
chimni.castShadow = true
chimni_2.castShadow = true

floor.receiveShadow = true




// Helper
// const axisHelper = new THREE.AxesHelper(5)
// scene.add(axisHelper)


// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.minDistance = 1;
controls.maxDistance = 15;
controls.minPolarAngle = 0;
controls.maxPolarAngle =  Math.PI * 0.49;



// Animate
const clock = new THREE.Clock()

const gameLoop = () => {
    const elapsedTime = clock.getElapsedTime()


    // Ghost Animation
    const ghostAngle1 = elapsedTime * 0.1
    ghost1.position.x = Math.cos(ghostAngle1) * 4
    ghost1.position.z = Math.sin(ghostAngle1) * 4
    ghost1.position.y = Math.sin(elapsedTime * 3)

    const ghostAngle2 = -elapsedTime * 0.2
    ghost2.position.x = Math.cos(ghostAngle2) * 6
    ghost2.position.z = Math.sin(ghostAngle2) * 6
    ghost2.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 1)

    // const ghostAngle3 = -elapsedTime * 0.15
    // ghost3.position.x = Math.cos(ghostAngle3) * (5 * Math.cos(elapsedTime * .33))
    // ghost3.position.z = Math.sin(ghostAngle3) * (5 * Math.sin(elapsedTime * .5))
    // ghost3.position.y = Math.sin(elapsedTime * 1.5) + Math.sin(elapsedTime * 2)



    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(gameLoop)
}

gameLoop()



// responsive
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
