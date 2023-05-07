import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create our base earth and add the texture from image
const loader = new THREE.TextureLoader();
const material = new THREE.MeshLambertMaterial({ map: loader.load("static/earth2.jpg")});
const geometry = new THREE.SphereGeometry(6, 50, 50);
const earth = new THREE.Mesh(geometry, material);
earth.rotation.x += 0.4;
earth.rotation.y += 4;
earth.rotation.z += 0;

scene.add(earth);
camera.position.z = 12;

// Ambient light (from stars, moon reflection etc)
const ambience = new THREE.AmbientLight(0xffffff, 0.025)
scene.add(ambience)

// Directional light
const theSun = new THREE.DirectionalLight(0xffffff, 0.35);
theSun.position.set(camera.position.x - 15, camera.position.y + 5, camera.position.z - 3);
theSun.target.position.set(0, 0, 0);
scene.add(theSun);
scene.add(theSun.target);

function animate() {
    requestAnimationFrame(animate);
    earth.rotation.y += 0.0003;
    renderer.render(scene, camera, theSun);
}
animate();