import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import {gsap} from 'gsap'




// Loaders

const loadingElement = document.querySelector('.loading')

const loadingManager = new THREE.LoadingManager(
    // Loaded
    () => 
    { 
        gsap.delayedCall(0.5, () =>
            {
                console.log('loaded'); 
                gsap.to(overlayMat.uniforms.uAlpha, {duration: 3, value: 0})
                loadingElement.classList.add('ended')
                loadingElement.style.transform = ''
            })
        // window.setTimeout(() => 
        // {
        //     // console.log('loaded'); 
        //     gsap.to(overlayMat.uniforms.uAlpha, {duration: 3, value: 0})
        //     loadingElement.classList.add('ended')
        //     loadingElement.style.transform = ''
        // }, 500)
        
    },

    // Progress
    (itemUrl, itemLoaded, itemTotal) => 
    { 
        const loadingRatio = itemLoaded / itemTotal
        console.log(loadingRatio); 
        loadingElement.style.transform = `scaleX(${loadingRatio})`
    }
)

const gltfLoader = new GLTFLoader(loadingManager)
const cubeTextureLoader = new THREE.CubeTextureLoader(loadingManager)




// Debug
const debugObject = {}







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
const camera = new THREE.PerspectiveCamera(55, sizes.width / sizes.height, 0.1, 1000)
camera.position.set(20, 5, -10)
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
})

renderer.physicallyCorrectLights = true
renderer.outputEncoding = THREE.sRGBEncoding
renderer.toneMapping = THREE.LinearEncoding
renderer.toneMappingExposure = 1
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))





// Overlay
const overlayGeo = new THREE.PlaneGeometry(2, 2, 1, 1)
const overlayMat = new THREE.ShaderMaterial({
    // wireframe: true,
    transparent:true,
    uniforms:
    {
        uAlpha: {value: 1}
    },
    vertexShader: `
        void main()
        {
            gl_Position = vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform float uAlpha;    

        void main()
        {
            gl_FragColor = vec4(1, 1, 1, uAlpha);
        }
    `
})

const overlay = new THREE.Mesh(overlayGeo, overlayMat)
scene.add(overlay)






// Update all materials
const updateAllMaterials = () =>
{
    scene.traverse((child) =>
    {
        if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
        {
            // child.material.envMap = environmentMap
            child.material.envMapIntensity = debugObject.envMapIntensity
            child.material.needsUpdate = true
            child.castShadow = true
            child.receiveShadow = true
        }
    })
}

// Environment map
const environmentMap = cubeTextureLoader.load([
    '/textures/environmentMaps/0/px.jpg',
    '/textures/environmentMaps/0/nx.jpg',
    '/textures/environmentMaps/0/py.jpg',
    '/textures/environmentMaps/0/ny.jpg',
    '/textures/environmentMaps/0/pz.jpg',
    '/textures/environmentMaps/0/nz.jpg'
])

environmentMap.encoding = THREE.sRGBEncoding

// scene.background = environmentMap
scene.environment = environmentMap

debugObject.envMapIntensity = 2.5






// Models

// console.log(DRACOLoader);
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/draco/')

gltfLoader.setDRACOLoader(dracoLoader)


let mixer = null

gltfLoader.load(
    '/models/hololiveen/scene.gltf',
    (gltf) =>
    {
        mixer = new THREE.AnimationMixer(gltf.scene)
        const action = mixer.clipAction(gltf.animations[0])
        // console.log(action);

        action.play()

        gltf.scene.scale.set(4, 4, 4)
        gltf.scene.position.set(0, -4, 0)
        gltf.scene.rotation.y = Math.PI * 0.5
        scene.add(gltf.scene)

        updateAllMaterials()
    }
)



// Lights

const directionalLight = new THREE.DirectionalLight('#ffffff', 3)
directionalLight.castShadow = true
directionalLight.shadow.camera.far = 15
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.normalBias = 0.05
directionalLight.position.set(0.25, 3, - 2.25)
scene.add(directionalLight)






// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.minDistance = 10;
controls.maxDistance = 50;
controls.minPolarAngle = 0;
controls.maxPolarAngle =  Math.PI * 0.5;
controls.panSpeed = 0.1




//Animate

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