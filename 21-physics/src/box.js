import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import * as CANNON from 'cannon-es'


console.log(CANNON);




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
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
camera.position.set(-10, 7, 10)
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))






// Sounds
const hitSound = new Audio('/sounds/hit.mp3')

const playSound = (collision) => {

    // console.log(collision.contact.getImpactVelocityAlongNormal())

    const impactStrength = collision.contact.getImpactVelocityAlongNormal()

    if(impactStrength > 1.5) {

        hitSound.volume = Math.random()
        hitSound.currentTime = 0
        hitSound.play()
    }
}



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

// Physics optimization
world.broadphase = new CANNON.SAPBroadphase(world)
world.allowSleep = true


world.gravity.set(0, -9, 0)


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
    
    

const floorShape0 = new CANNON.Plane()
const floorBody0 = new CANNON.Body()
floorBody0.mass = 0
floorBody0.addShape(floorShape0)
floorBody0.position = new CANNON.Vec3(0,5,-5)
floorBody0.quaternion.setFromAxisAngle(
    new CANNON.Vec3(0, 0, 0), 0
)
world.addBody(floorBody0)

const floorShape1 = new CANNON.Plane()
const floorBody1 = new CANNON.Body()
floorBody1.mass = 0
floorBody1.addShape(floorShape1)
floorBody1.position = new CANNON.Vec3(0,5,5)
floorBody1.quaternion.setFromAxisAngle(
    new CANNON.Vec3(-1, 0, 0), - Math.PI
)
world.addBody(floorBody1)

const floorShape2 = new CANNON.Plane()
const floorBody2 = new CANNON.Body()
floorBody2.mass = 0
floorBody2.addShape(floorShape2)
floorBody2.position = new CANNON.Vec3(5,5,0)
floorBody2.quaternion.setFromAxisAngle(
    new CANNON.Vec3(0, 1, 0), - Math.PI * 0.5
)
world.addBody(floorBody2)

const floorShape3 = new CANNON.Plane()
const floorBody3 = new CANNON.Body()
floorBody3.mass = 0
floorBody3.addShape(floorShape3)
floorBody3.position = new CANNON.Vec3(-5,5,0)
floorBody3.quaternion.setFromAxisAngle(
    new CANNON.Vec3(0, 1, 0), Math.PI * 0.5
)
world.addBody(floorBody3)







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





// Utils

const objectToUpdate = []


// Ball

const ball = new THREE.SphereGeometry(1, 20, 20)
const ballPaint = new THREE.MeshStandardMaterial({
    metalness: 0.3,
    roughness: 0.4,
    envMap: environmentMapTexture
})

const createSphere = (radius, position) => {
    // Three.js mesh
    const mesh = new THREE.Mesh(ball, ballPaint)
    mesh.scale.set(radius, radius, radius)
    mesh.castShadow = true
    mesh.position.copy(position)
    scene.add(mesh)

    // Cannon.js body
    const shape = new CANNON.Sphere(radius)
    const body = new CANNON.Body({
        mass: 1,
        position: new CANNON.Vec3(0,3,0),
        shape,
        material: defaultMaterial
    })
    body.position.copy(position)

    body.addEventListener('collide', playSound)

    world.addBody(body)

    // Save in array to update
    objectToUpdate.push({
        mesh,
        body
    })
}

// createSphere(0.5, {x:0, y:3, z:0})



// Box

const box = new THREE.BoxGeometry(1, 1, 1)
const boxPaint = new THREE.MeshStandardMaterial({
    metalness: 0.3,
    roughness: 0.4,
    envMap: environmentMapTexture
})

const createBox = (width, height, depth, position) => {
    // Three.js mesh
    const mesh = new THREE.Mesh(box, boxPaint)
    mesh.scale.set(width, height, depth)
    mesh.castShadow = true
    mesh.position.copy(position)
    scene.add(mesh)

    // Cannon.js body
    const shape = new CANNON.Box(new CANNON.Vec3(width / 2, height / 2, depth / 2))
    const body = new CANNON.Body({
        mass: 1,
        position: new CANNON.Vec3(0,3,0),
        shape,
        material: defaultMaterial
    })
    body.position.copy(position)

    body.addEventListener('collide', playSound)

    world.addBody(body)

    // Save in array to update
    objectToUpdate.push({
        mesh,
        body
    })
}






// Debug
const gui = new dat.GUI()
const debugObj = {}

debugObj.createSphere = () => {
    createSphere(
        (Math.random() * .4) + 0.1, 
        { 
            x: (Math.random() - 0.5) * 3, 
            y: (Math.random() + 2) * 3, 
            z: (Math.random() - 0.5) * 3 
        }
    )
}

gui.add(debugObj, 'createSphere').name('Click To Create Balls')


debugObj.createBox = () => {
    createBox(
        (Math.random() * .8) + 0.1, 
        (Math.random() * .8) + 0.1, 
        (Math.random() * .8) + 0.1, 
        { 
            x: (Math.random() - 0.5) * 3, 
            y: (Math.random() + 2) * 3, 
            z: (Math.random() - 0.5) * 3 
        }
    )
}

gui.add(debugObj, 'createBox').name('Click To Create Box')


debugObj.reset = () => {

    console.log('removing...')

    for(const object of objectToUpdate) {

         // Remove body
         object.body.removeEventListener('collide', playSound)
         world.removeBody(object.body)

         // Remove mesh
         scene.remove(object.mesh)

    }
     objectToUpdate.splice(0, objectToUpdate.length)
}

gui.add(debugObj, 'reset').name('Remove')







// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.minDistance = 5;
controls.maxDistance = 50;
controls.minPolarAngle = 0;
controls.maxPolarAngle =  Math.PI * 0.5;
controls.panSpeed = 0.3

// Animate
const clock = new THREE.Clock()

let oldElapsedTime = 0


const tick = () =>
{
    // Creating delta time for 2nd param in .step
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - oldElapsedTime
    oldElapsedTime = elapsedTime

    // Update Physics world
    world.step(1 / 60, deltaTime, 3)


    for(let object of objectToUpdate) 
    {
        object.mesh.position.copy(object.body.position)
        object.mesh.quaternion.copy(object.body.quaternion)
    }



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