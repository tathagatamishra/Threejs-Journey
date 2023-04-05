import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import * as dat from 'lil-gui'



// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(4, 2, 3)
scene.add(camera)



// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))






// Models

// console.log(DRACOLoader);
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/draco/')


const gltfLoader = new GLTFLoader()
// console.log(gltfLoader);

gltfLoader.setDRACOLoader(dracoLoader)


let mixer = null

// let i = {num: 0}

// console.log(i.num);

gltfLoader.load(

    '/models/Fox/glTF/Fox.gltf',
    // '/models/Duck/glTF-Draco/Duck.gltf',
    // '/models/FlightHelmet/glTF/FlightHelmet.gltf',

    (gltf) => {
        // console.log('success')
        // console.log(gltf)

        // scene.add(gltf.scene.children[0])

        // while(gltf.scene.children.length) {
        //     scene.add(gltf.scene.children[0])
        // }

        // copy and add only childrens
        // const children = [...gltf.scene.children]

        // for(let child of children) {
        //     scene.add(child)
        // }


        // Animation
        mixer = new THREE.AnimationMixer(gltf.scene)
        const action = mixer.clipAction(gltf.animations[1])
        // console.log(action);

        action.play()

        // add whole scene
        gltf.scene.scale.set(0.02, 0.02, 0.02)
        scene.add(gltf.scene)
    },

    // () => {console.log('progress')},
    // () => {console.log('error')}
)

// Debug
// const gui = new dat.GUI()

// gui.add(i, 'num').min(0).max(2).step(1)







// Floor

const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshStandardMaterial({
        color: '#444444',
        metalness: 0,
        roughness: 0.5,
        side: THREE.DoubleSide
    })
)
floor.receiveShadow = true
floor.rotation.x = - Math.PI * 0.5
scene.add(floor)






// Lights

const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.camera.left = - 7
directionalLight.shadow.camera.top = 7
directionalLight.shadow.camera.right = 7
directionalLight.shadow.camera.bottom = - 7
directionalLight.position.set(5, 5, 5)
scene.add(directionalLight)











// Controls
const controls = new OrbitControls(camera, canvas)
controls.target.set(0, 0.75, 0)
controls.enableDamping = true




// Animate

const clock = new THREE.Clock()
let previousTime = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime



    // Update animation mixer
    if(mixer !== null) {

        mixer.update(deltaTime)
    }



    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()






window.addEventListener('resize', () =>
{
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