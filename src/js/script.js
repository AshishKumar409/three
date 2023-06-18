import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'


const renderer = new THREE.WebGLRenderer()
// renderer instance

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

camera.position.set(30,30,0)
camera.rotation.z=90
// by default camera is positioned at (x,y,z)->(0,0,0) 
//by using set method we can change the postion of camera




const boxGeometry = new THREE.BoxGeometry()
const boxMaterial = new THREE.MeshBasicMaterial({color:'green'})
const box = new THREE.Mesh(boxGeometry,boxMaterial)
scene.add(box)


const planeGeometry = new THREE.PlaneGeometry(30,30)
const planeMaterial = new THREE.MeshBasicMaterial({color:'yellow',side:THREE.DoubleSide})
const plane = new THREE.Mesh(planeGeometry,planeMaterial)
// scene.add(plane)
plane.rotation.x= 0.5*Math.PI
// console.log(-0.5*Math.PI)


const sphereGeometry = new THREE.SphereGeometry(4)
const sphereMaterial = new THREE.MeshStandardMaterial({color:'violet',wireframe:false})
const sphere = new THREE.Mesh(sphereGeometry,sphereMaterial)
scene.add(sphere)



const gridHelper = new THREE.GridHelper()
scene.add(gridHelper)

function animate(time){
    // console.log(time/1000)
    // box.rotation.x=time/5000
    // box.rotation.y=time/1000
    renderer.render(scene,camera)
    //this is used to render our scene and camera in the view
}



renderer.setAnimationLoop(animate)
//this runs every time such that every change can be rendered quickly

