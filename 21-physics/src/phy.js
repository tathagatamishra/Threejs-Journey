import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import CANNON from 'cannon'


console.log(CANNON);

// Debug
const gui = new dat.GUI()



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
const camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height, 0.1, 100)
camera.position.set(- 6, 4, 6)
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))





// Textures
const textureLoader = new THREE.TextureLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()

const environmentMapTexture = cubeTextureLoader.load([
    '/textures/environmentMaps/0/px.png',
    '/textures/environmentMaps/0/nx.png',
    '/textures/environmentMaps/0/py.png',
    '/textures/environmentMaps/0/ny.png',
    '/textures/environmentMaps/0/pz.png',
    '/textures/environmentMaps/0/nz.png'
])






// Physics

//  World
const world = new CANNON.World()
world.gravity.set(0, -9, 0)


// Materials
// const concMat = new CANNON.Material('concrete')
// const plasticMat = new CANNON.Material('plastic')

// const concPlasticContactMat = new CANNON.ContactMaterial(
//     concMat,
//     plasticMat,
//     {
//         friction: 0.1,
//         restitution: 0.7
//     }
// )

// world.addContactMaterial(concPlasticContactMat)



const defaultMaterial = new CANNON.Material('default')

const defaultContactMat = new CANNON.ContactMaterial(
    defaultMaterial,
    defaultMaterial,
    {
        friction: 0.1,
        restitution: 0.7
    }
)

world.addContactMaterial(defaultContactMat)


// Apply physics material to all
world.defaultContactMaterial = defaultContactMat




// Sphere Shape
const sphereShape = new CANNON.Sphere(0.5)

// Sphere Body
const sphereBody = new CANNON.Body({
    mass: 1,
    position: new CANNON.Vec3(0, 3, 0), 
    shape: sphereShape,
    // material: defaultMaterial
})

sphereBody.applyLocalForce(new CANNON.Vec3(150, 0, 0), new CANNON.Vec3(0, 0, 0))

world.addBody(sphereBody)

gui
    .add(sphereBody.position, 'y')
    .min(.5)
    .max(10)
    .step(0.01)
    .name('Up & Down')
gui
    .add(sphereBody.position, 'x')
    .min(-5)
    .max(5)
    .step(0.01)
    .name('Left & Right')
gui
    .add(sphereBody.position, 'z')
    .min(-5)
    .max(5)
    .step(0.01)
    .name('Forward Backward')


// Floor
const floorShape = new CANNON.Plane()

const floorBody = new CANNON.Body()

// floorBody.material = defaultMaterial
floorBody.mass = 0
floorBody.addShape(floorShape)
floorBody.quaternion.setFromAxisAngle(
    new CANNON.Vec3(-1, 0, 0),
    Math.PI * 0.5
)
world.addBody(floorBody)




// // Sphere Shape 2
// const sphereShape2 = new CANNON.Sphere(1)
// const sphereBody2 = new CANNON.Body({
//     mass: 0,
//     position: new CANNON.Vec3(-.5, -0.3, -.5), 
//     shape: sphereShape2
// })
// world.addBody(sphereBody2)

// // Sphere Shape 3
// const sphereShape3 = new CANNON.Sphere(1)
// const sphereBody3 = new CANNON.Body({
//     mass: 0,
//     position: new CANNON.Vec3(4, -0.3, 4), 
//     shape: sphereShape3
// })
// world.addBody(sphereBody3)




// Test sphere
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    new THREE.MeshStandardMaterial({
        metalness: 0.3,
        roughness: 0.4,
        envMap: environmentMapTexture,
        envMapIntensity: 0.5
    })
)
sphere.castShadow = true
sphere.position.y = 0.5
scene.add(sphere)


// Sphere 2 3 
// const sphere2 = new THREE.Mesh(
//     new THREE.SphereGeometry(1, 32, 32),
//     new THREE.MeshStandardMaterial({
//         color: '#777777',
//         metalness: 0.3,
//         roughness: 0.4,
//         envMap: environmentMapTexture,
//         envMapIntensity: 0.5
//     })
// )
// sphere2.castShadow = true
// sphere2.position.set(-.5, -0.3, -.5)

// const sphere3 = new THREE.Mesh(
//     new THREE.SphereGeometry(1, 32, 32),
//     new THREE.MeshStandardMaterial({
//         color: '#777777',
//         metalness: 0.3,
//         roughness: 0.4,
//         envMap: environmentMapTexture,
//         envMapIntensity: 0.5
//     })
// )
// sphere3.castShadow = true
// sphere3.position.set(4, -0.3, 4)
// scene.add(sphere3, sphere2)



// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshStandardMaterial({
        color: '#777777',
        metalness: 0.3,
        roughness: 0.4,
        envMap: environmentMapTexture,
        envMapIntensity: 0.5,
        side: THREE.DoubleSide
    })
)
floor.receiveShadow = true
floor.rotation.x = - Math.PI * 0.5
scene.add(floor)





// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2)
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
controls.enableDamping = true


// Animate
const clock = new THREE.Clock()

let oldElapsedTime = 0


const tick = () =>
{
    // Creating delta time for 2nd param in .step
    const elapsedTime = clock.getElapsedTime()

    const deltaTime = elapsedTime - oldElapsedTime

    oldElapsedTime = elapsedTime

    // console.log(deltaTime);

    sphereBody.applyForce(new CANNON.Vec3(-0.5,0,0), sphereBody.position)

    // Update Physics world
    world.step(1 / 60, deltaTime, 3)

    // console.log(sphereBody.position.y);
    // assign the sphereBody.position to mesh sphere

    // sphere.position.set(
    //     sphereBody.position.x,
    //     sphereBody.position.y,
    //     sphereBody.position.z
    // )

    // or,  copy the Vec3 of cannon to Vector3 of three.js
    sphere.position.copy(sphereBody.position)



    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()





// Responsive
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