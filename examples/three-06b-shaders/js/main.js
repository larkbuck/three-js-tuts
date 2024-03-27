
/* Set up for the shader tutorial by Suboptimal Engineer

LINK: https://youtu.be/EntBBM6nqQA?feature=shared

Watch video then START ADDING SHADER CODE TO BOXGEOMETRY when you get to 3'51" of video

For starter code:
- Lights added
- Axes helper enabled to visualize x, y, and z coordinates 
- Cube has wireframes enables in meshStandardMaterial
    - https://threejs.org/docs/#api/en/materials/MeshNormalMaterial

 */


//~~~~~~~Import Three.js (also linked to as an import map in the HTML)~~~~~~
import * as THREE from 'three';


// Import add-ons
import { OrbitControls } from 'https://unpkg.com/three@0.162.0/examples/jsm/controls/OrbitControls.js';
import { Stats } from 'https://unpkg.com/three@0.162.0/examples/jsm/libs/stats.module.js';
// import { GLTFLoader } from 'https://unpkg.com/three@0.162.0/examples/jsm/loaders/GLTFLoader.js'; // to load 3d models



// ~~~~~~~~~~~~~~~~Set up scene, camera, + renderer~~~~~~~~~~~~~~~~

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


// ~~~~~~~~~~~~~~~~ Add Lights ~~~~~~~~~~~~~~~~

// ambient light which is for the whole scene
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
ambientLight.castShadow = true;
scene.add(ambientLight);

// directional light - parallel sun rays
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
// directionalLight.castShadow = true;
directionalLight.position.set(0, 32, 64);
scene.add(directionalLight);


// ~~~~~~~~~~~~~~~~ Initiate add-ons ~~~~~~~~~~~~~~~~

const controls = new OrbitControls(camera, renderer.domElement);
// const loader = new GLTFLoader(); // to load 3d models

// ~~~~> add axes helper to visualize x, y, and z coordinates
const axesHelper = new THREE.AxesHelper(16);
scene.add(axesHelper);


// ~~~~~~~~~~~~~~~~ Create Geometry ~~~~~~~~~~~~~~~~

// -----> boilerplate starter code for tut
// const boxGeometry = new THREE.BoxGeometry(1, 1, 1, 16, 16, 16); // with 16 segmented faces along each side of the box

// const boxMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000, wireframe: true, }); // red wireframe

// const cube = new THREE.Mesh(boxGeometry, boxMaterial);
// scene.add(cube);

// ----> COPY BOILERPLATE ABOVE AND ADD YOUR SHADER CODE HERE ↓↓↓↓
// (Follow YouTube Tut starting at 3'51" - link here: https://youtu.be/EntBBM6nqQA?feature=shared&t=231)

const boxGeometry = new THREE.BoxGeometry(1, 1, 1, 16, 16, 16); // with 16 segmented faces along each side of the box

const boxMaterial = new THREE.ShaderMaterial({
    wireframe: true, vertexShader:
        `void main() {
        // projectionMatrix, modelViewMatrix, position -> passed in from Three.js
\
        // gl_Position = projectionMatrix
        //   * modelViewMatrix
        //   * vec4(position.x, position.y, position.z, 1.0);

        // gl_Position = projectionMatrix
        //   * modelViewMatrix
        //   * vec4(position.x, sin(position.z), position.z, 1.0);
          
        gl_Position = projectionMatrix
          * modelViewMatrix
          * vec4(position.x, sin(position.z) + position.y, position.z, 1.0);

        // gl_Position = projectionMatrix
        //   * modelViewMatrix
        //   * vec4(position.x, sin(position.z/4.0) + position.y, position.z, 1.0);

        // gl_Position = projectionMatrix
        //   * modelViewMatrix
        //   * vec4(position.x, 4.0*sin(position.z/4.0) + position.y, position.z, 1.0);
}`,
    fragmentShader:
        `void main() {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }`,
}); // added shader

const cube = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(cube);




// ~~~~~~~~~~~~~~~~Position Camera~~~~~~~~~~~~~~~~
camera.position.z = 5;



// ~~~~~~~~~~~~~~~~ Animation Loop ~~~~~~~~~~~~~~~~
// (similar to draw loop in p5.js, updates every frame)

function animate() {
    requestAnimationFrame(animate); // start loop by with frame update

    // →→→→→→ add your animation here ↓↓↓↓

    // camera.position.z += .03;
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;



    // always end animation loop with renderer
    renderer.render(scene, camera);
}

animate(); // execute animation function
