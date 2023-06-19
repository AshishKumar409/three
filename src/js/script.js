import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui'


const renderer = new THREE.WebGLRenderer()
// renderer instance

renderer.shadowMap.enabled=true

renderer.setSize(window.innerWidth,window.innerHeight)
//setting the size of the renderer view

document.body.appendChild(renderer.domElement)
//appends the renderer to the body

const scene = new THREE.Scene()
//creates the scene

const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)
//perspective camera with its parameters i.e., field of view, aspect ratio, near plane, far plane

const orbit = new OrbitControls(camera,renderer.domElement)
// orbit instance to interact with the scene by dragging the mouse , rotate(mouse left+drag), move(mouse right+drag)
orbit.update()
// every time there is a drag on the scene update method runs. 

const axesHelper = new THREE.AxesHelper(5)
//this creates three axes i.e., x,y and z

scene.add(axesHelper)
//this adds the axes to the scene

camera.position.set(-10,10,10)
// camera.rotation.x=45
// by default camera is positioned at (x,y,z)->(0,0,0) 
//by using set method we can change the postion of camera




const boxGeometry = new THREE.BoxGeometry()
const boxMaterial = new THREE.MeshBasicMaterial({color:'green'})
const box = new THREE.Mesh(boxGeometry,boxMaterial)
scene.add(box)


const planeGeometry = new THREE.PlaneGeometry(30,30)
const planeMaterial = new THREE.MeshStandardMaterial({color:'yellow',side:THREE.DoubleSide})
const plane = new THREE.Mesh(planeGeometry,planeMaterial)
scene.add(plane)
plane.receiveShadow=true
plane.rotation.x= 0.5*Math.PI
// console.log(-0.5*Math.PI)


const sphereGeometry = new THREE.SphereGeometry(4)
const sphereMaterial = new THREE.MeshStandardMaterial({color:'violet',wireframe:false})
const sphere = new THREE.Mesh(sphereGeometry,sphereMaterial)
scene.add(sphere)

sphere.castShadow=true

sphere.position.set(0,0,0)


let gui = new dat.GUI()

let options={
    sphereColor:'#ffea00',
    wireframe:false,
    speed:0.01
}

gui.addColor(options,'sphereColor').onChange(function(e){
    sphere.material.color.set(e)
})

gui.add(options,'wireframe').onChange((e)=>{
    sphere.material.wireframe=e
})

gui.add(options,'speed',0,0.1)



const gridHelper = new THREE.GridHelper()
scene.add(gridHelper)

let step =0
let speed = 0.01

// let ambinceLight = new THREE.AmbientLight(0x333333)
// scene.add(ambinceLight)



// let directionalLight = new THREE.DirectionalLight(0xFFFFFF,0.8)
// scene.add(directionalLight)
// directionalLight.position.set(-30,50,0)
// directionalLight.shadow.camera.bottom = -12
// directionalLight.castShadow=true

// let dLightHelper = new THREE.DirectionalLightHelper(directionalLight,5)
// scene.add(dLightHelper)

// let dLightShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
// scene.add(dLightShadowHelper)

let spotLight = new THREE.SpotLight(0xFFFFFF)
scene.add(spotLight)
spotLight.position.set(-100,100,0)

let spotLightHelper = new THREE.SpotLightHelper(spotLight)
scene.add(spotLightHelper)
spotLight.castShadow=true
function animate(time){
    // console.log(time/1000)
    // box.rotation.x=time/5000
    // box.rotation.y=time/1000

    step+=options.speed
    sphere.position.y = 10*Math.abs(Math.sin(step))
    renderer.render(scene,camera)
    //this is used to render our scene and camera in the view
}



renderer.setAnimationLoop(animate)
//this runs every time such that every change can be rendered quickly

