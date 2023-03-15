import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'



// ----------------------------------------

// Base
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
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 10000)
camera.position.x = 3
camera.position.y = 2
camera.position.z = 3
scene.add(camera)


// Renderer

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))



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




// ----------------------------------------

// Loader
const loadingManager = new THREE.LoadingManager()

// loadingManager.onStart = () => { console.log('start') }
// loadingManager.onLoad = () => { console.log('load') }
// loadingManager.onProgress = () => { console.log('progress') }
// loadingManager.onError = () => { console.log('error') }


// Textures

// const image = new Image()
// const texture = new THREE.Texture(image)

// image.onload = () => {

//     texture.needsUpdate = true
//     // console.log('image loaded');
// }
// image.src = '/textures/door/color.jpg'

// OR
const textureLoader = new THREE.TextureLoader(loadingManager)
const colorTexture = textureLoader.load('/textures/door/pp.jpeg')
colorTexture.repeat.x = 2
colorTexture.repeat.y = 2
colorTexture.wrapS = THREE.MirroredRepeatWrapping
colorTexture.wrapT = THREE.RepeatWrapping 

// colorTexture.offset.x = 0.5
// colorTexture.offset.y = 0.5

// // it's rotating at the corner
// colorTexture.rotation = Math.PI / 4

// // need to rotate at the center
// // so, need to move the PIVOT point
// // Pivot
// colorTexture.center.x = 0.5
// colorTexture.center.y = 0.5

// colorTexture.generateMipmaps = false
// colorTexture.minFilter = THREE.NearestFilter

// mag will make blury edges sharp as vector png
colorTexture.magFilter = THREE.NearestFilter


// const alphaTexture = textureLoader.load('/textures/door/alpha.jpg')
// const normalTexture = textureLoader.load('/textures/door/normal.jpg')
// const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
// const heightTexture = textureLoader.load('/textures/door/height.jpg')


// Loader can take 3 more callbacks functions

// const colorTexture = textureLoader.load(    
//     '/textures/door/color.jpg',
//     () => { console.log('load') },
//     () => { console.log('progress') },
//     () => { console.log('error') }
// )



// Objects
const geometry = new THREE.BoxBufferGeometry(1, 1, 1)
// console.log(geometry.attributes.uv);

// const material = new THREE.MeshStandardMaterial({ color: '#9e9e9e' })
const material = new THREE.MeshStandardMaterial({ map: colorTexture })

const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)


// Light
const light = new THREE.PointLight({ color: 'white' })
light.position.set(-2, 3, 2)
scene.add(light)

const ambLight = new THREE.AmbientLight({ color: 'white' })
ambLight.intensity = 0.31
scene.add(ambLight)




// ----------------------------------------

// Helper
const helper = new THREE.AxesHelper(5000)
scene.add(helper)

const floor = new THREE.GridHelper(10000, 10000, '#737373', '#525252')
scene.add(floor)


// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true



// Animate

const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()