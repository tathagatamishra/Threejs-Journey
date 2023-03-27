import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'


// Base----------------------

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}


// Camera
// Base camera
const camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height, 0.1, 200)
camera.position.x = 10
camera.position.y = 6
// camera.position.z = 6
scene.add(camera)


// Renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


// Window responsiveness -------------

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


// --------------------------------------------



// Lights

const light = new THREE.PointLight()
scene.add(light)
light.position.set(2, 4, 2)

const alight = new THREE.AmbientLight()
scene.add(alight)
alight.intensity = 0.2



// Textures Loader ------

const textureLoader = new THREE.TextureLoader()


// Matcaps -----
const matcapTexture1 = textureLoader.load('./textures/matcaps/1.png')
const matcapTexture2 = textureLoader.load('./textures/matcaps/2.png')
const matcapTexture3 = textureLoader.load('./textures/matcaps/3.png')
const matcapTexture4 = textureLoader.load('./textures/matcaps/4.png')
const matcapTexture5 = textureLoader.load('./textures/matcaps/5.png')
const matcapTexture6 = textureLoader.load('./textures/matcaps/6.png')
const matcapTexture7 = textureLoader.load('./textures/matcaps/7.png')
const matcapTexture8 = textureLoader.load('./textures/matcaps/8.png')

// Image
const doorColor = textureLoader.load('./textures/door/color.jpg')
const doorAlpha = textureLoader.load('./textures/door/alpha.jpg')
const doorAmbient = textureLoader.load('./textures/door/ambientOcclusion.jpg')
const doorHeight = textureLoader.load('./textures/door/height.jpg')
const doorMetal = textureLoader.load('./textures/door/metalness.jpg')
const doorNormal = textureLoader.load('./textures/door/normal.jpg')
const doorRough = textureLoader.load('./textures/door/roughness.jpg')


// Pixelated
const gradientTexture = textureLoader.load('./textures/gradients/3.jpg')
gradientTexture.magFilter = THREE.NearestFilter
gradientTexture.magFilter = THREE.NearestFilter
gradientTexture.generateMipmaps = false



// Materials --------

const toonMat = new THREE.MeshToonMaterial()
toonMat.gradientMap = gradientTexture
// toonMat.wireframe = true



const material_1 = new THREE.MeshStandardMaterial()
// material.wireframe = true
// material.opacity = 0.5
material_1.transparent = true
material_1.side = THREE.DoubleSide

// material.color = 'pink'      // this wont work
// material.color.set('pink')
// material.color = new THREE.Color(0xFF5733)

material_1.alphaMap = doorAlpha
material_1.map = doorColor
material_1.aoMap = doorAmbient
// material_1.aoMapIntensity = 1
material_1.displacementMap = doorHeight
material_1.displacementScale = 0.1
material_1.roughnessMap = doorRough
material_1.metalnessMap = doorMetal
material_1.normalMap = doorNormal
material_1.normalScale.set(.5,.5)


const material_2 = new THREE.MeshNormalMaterial()
// material_2.flatShading = true

const fog_Material = new THREE.MeshDepthMaterial()


// ------------------------
const material_3 = new THREE.MeshMatcapMaterial()
material_3.matcap = matcapTexture8
const material_4 = new THREE.MeshMatcapMaterial()
material_4.matcap = matcapTexture5
const material_5 = new THREE.MeshMatcapMaterial()
material_5.matcap = matcapTexture2





// Environment Map

const envTexture = new THREE.CubeTextureLoader

const envMapTexture = envTexture.load([
    './textures/environmentMaps/0/px.jpg',
    './textures/environmentMaps/0/nx.jpg',
    './textures/environmentMaps/0/py.jpg',
    './textures/environmentMaps/0/ny.jpg',
    './textures/environmentMaps/0/pz.jpg',
    './textures/environmentMaps/0/nz.jpg'
])

const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7
material.roughness = 0.2
material.envMap = envMapTexture



// Objects -------

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(),
    material
)
sphere.position.set(0, 0, -3)


const box = new THREE.Mesh(
    new THREE.BoxGeometry(1.5, 1.5, 1.5, 100,100,100),
    toonMat
)

box.geometry.setAttribute(
    'uv2',
    new THREE.BufferAttribute(box.geometry.attributes.uv.array, 2)
)


const donut = new THREE.Mesh(
    new THREE.TorusGeometry(.8, 0.3, 64, 120),
    material
)
donut.position.set(0, 0, 3)
donut.rotation.set(0, (Math.PI / 2), 0)



// Add everything

scene.add(sphere, box, donut)





// --------------------------------------------


// Debug

const gui = new GUI()
gui.add(material, 'metalness').min(0).max(1).step(0.0001)
gui.add(material, 'roughness').min(0).max(1).step(0.0001)
gui.add(material_1, 'displacementScale').min(-10).max(10).step(0.0001)




// Helper
const helper = new THREE.AxesHelper(10)
// scene.add(helper)

// Floor
const floor = new THREE.GridHelper()
scene.add(floor)

// Light Helper
const lightHelper = new THREE.PointLightHelper(light, 0.1)
// scene.add(lightHelper)





// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
// controls.autoRotate = true
// controls.autoRotateSpeed = 1


// Animate

const clock = new THREE.Clock()

const tick = () => {

    const elapsedTime = clock.getElapsedTime()


    // Update objects
    donut.rotation.y = -0.1 * elapsedTime
    donut.rotation.x = -0.1 * elapsedTime
    donut.rotation.z = -0.1 * elapsedTime

    sphere.rotation.y = 0.1 * elapsedTime
    sphere.rotation.x = -0.1 * elapsedTime
    sphere.rotation.z = 0.1 * elapsedTime

    box.rotation.y = 0.1 * elapsedTime
    box.rotation.x = 0.1 * elapsedTime
    box.rotation.z = -0.1 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()