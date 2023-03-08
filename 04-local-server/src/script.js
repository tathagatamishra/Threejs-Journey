import * as THREE from 'three'

const scene = new THREE.Scene()

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(50, sizes.width/sizes.height)
camera.position.z = 3

const renderer = new THREE.WebGLRenderer({canvas: document.querySelector('canvas.webgl')})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(5)


const light = new THREE.PointLight(0xffffff)
light.position.set(10,10,10)
const amb = new THREE.AmbientLight(0xffffff, 0.1)

scene.add(light, amb)


const geo = new THREE.TorusGeometry(0.6, 0.2, 32, 64)

const mat = new THREE.MeshStandardMaterial({color:'Gold'})
mat.roughness = 0.3
const mesh = new THREE.Mesh(geo, mat)

scene.add(mesh)


function loop() {
    
    mesh.rotation.x += 0.01
    mesh.rotation.y += 0.01
    
    renderer.render(scene, camera)
    requestAnimationFrame(loop)
}

loop()