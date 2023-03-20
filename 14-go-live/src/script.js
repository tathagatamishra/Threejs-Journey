import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'



//Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


//Camera
const camera = new THREE.PerspectiveCamera(40, sizes.width / sizes.height, 0.001, 100)
camera.position.x = 5
camera.position.y = 1
camera.position.z = 5
scene.add(camera)


//Renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true })

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 3))




// ------------------------------------------


//Textures
const textureLoader = new THREE.TextureLoader()

const matcapTexter_1 = textureLoader.load('/textures/matcaps/3.png')
const matcapTexter_2 = textureLoader.load('/textures/matcaps/18.png')
const matcapTexter_3 = textureLoader.load('/textures/matcaps/7.png')
const matcapTexter_4 = textureLoader.load('/textures/matcaps/20.png')


const material = (matcap) => { return new THREE.MeshMatcapMaterial({ matcap: matcap }) }



// Font
const fontLoader = new FontLoader()


function text3D(font, text, mat) {
    return fontLoader.load(

        font,

        (font) => {
            const textGeometry = new TextGeometry(

                text,
                {
                    font,
                    size: 0.5,
                    height: 0.2,
                    curveSegments: 6,
                    bevelEnabled: true,
                    bevelThickness: 0.03,
                    bevelSize: 0.02,
                    bevelOffset: 0,
                    bevelSegments: 4
                }
            )
            textGeometry.center()
            const textMesh = new THREE.Mesh(textGeometry, mat)
            scene.add(textMesh)
        }
    )
}

text3D(
    '/fonts/helvetiker_regular.typeface.json',
    'J A V A S C R I P T',
    material(matcapTexter_1)
)


// Basic objects
const donutGeo = new THREE.TorusGeometry(0.2, 0.1, 35, 45)
const ballGeo = new THREE.SphereGeometry(0.2, 32, 32)
const boxGeo = new THREE.BoxGeometry(.2, .2, .2)



// Randomizing mesh
function randomObj(geo, mat) {

    function randomRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    for (let i = 0; i < 500; i++) {

        const object3D = new THREE.Mesh(geo, mat)

        object3D.position.set(
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 15)

        object3D.rotation.x = Math.random() * Math.PI,
            object3D.rotation.y = Math.random() * Math.PI,
            object3D.rotation.z = Math.random() * Math.PI

        let scale = randomRange(.2, 1)
        object3D.scale.set(scale, scale, scale)

        scene.add(object3D)
    }
}


// this take only geomatery & material
randomObj(donutGeo, material(matcapTexter_2))
randomObj(ballGeo, material(matcapTexter_3))
randomObj(boxGeo, material(matcapTexter_4))



//-----------------------------------


// Helper
const helper = new THREE.AxesHelper()
// scene.add(helper)


// Debug
// const gui = new dat.GUI()



// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.autoRotate = true
controls.autoRotateSpeed = 0.1



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



//Animate

const clock = new THREE.Clock()

const gameLoop = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(gameLoop)
}

gameLoop()