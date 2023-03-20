import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

// importing font directly from three.js node module
// import tff from 'three/examples/fonts/helvetiker_regular.typeface.json'
// console.log(tff);



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
const renderer = new THREE.WebGLRenderer({ canvas: canvas })

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))




// ------------------------------------------


//Textures
const textureLoader = new THREE.TextureLoader()

const matcapTexter = textureLoader.load('/textures/matcaps/3.png')
const material = new THREE.MeshMatcapMaterial()
material.matcap = matcapTexter

// Font
const fontLoader = new FontLoader()

// fontLoader can't be store in variable
// it take path & callback
fontLoader.load(

    '/fonts/helvetiker_regular.typeface.json',

    // this callback do everything
    (font) => {

        // console.log(font);
        const textGeometry = new TextGeometry(

            '3 D',       // the output text

            // text property
            {
                font,     // { font: font } ES6 syntax
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

        // using BoundingBox to center the text position
        textGeometry.computeBoundingBox()

        console.log(textGeometry.boundingBox)

        // // moving geometry  // not moving mesh
        // textGeometry.translate(
        //     // text is in positive qudrant  // center it by - bevel
        //     -(textGeometry.boundingBox.max.x - 0.02) / 2,  // x * 0.5
        //     -(textGeometry.boundingBox.max.y - 0.02) / 2,  // x * 0.5
        //     -(textGeometry.boundingBox.max.z - 0.03) / 2   // x * 0.5
        // )

        // Easy way to center text   // center() works without BoundingBox
        textGeometry.center()

        const text = new THREE.Mesh(textGeometry, material)

        scene.add(text)
    }
)


console.time('donut')

const donutGeo = new THREE.TorusGeometry(0.2, 0.1, 35, 45)

for (let i = 0; i < 500; i++) {
    
    const donut = new THREE.Mesh(donutGeo, material)

    donut.position.set(
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15)
    donut.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI)

    let scale = Math.random()
    donut.scale.set(scale, scale, scale)

    scene.add(donut)
}

console.timeEnd('donut')



//-----------------------------------


// Helper
const helper = new THREE.AxesHelper()
// scene.add(helper)


// Debug
const gui = new dat.GUI()



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