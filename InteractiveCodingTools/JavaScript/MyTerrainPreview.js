import * as THREE from '../ThreeJS/node_modules/three/build/three.module.js';

const terrain_container = document.getElementById('terrain_container');
const terrain_preview_canvas = document.getElementById('terrain_preview_canvas');

let renderer = null;
let scene = null;
let camera = null;
let geometry = null;
let material = null;
let test_cube = null;

function init_scene() {
    renderer = new THREE.WebGLRenderer({ canvas: terrain_preview_canvas });
    renderer.setSize(terrain_preview_canvas.clientWidth, terrain_preview_canvas.clientHeight);
    
    scene = new THREE.Scene();
    
    camera = new THREE.PerspectiveCamera(75, terrain_preview_canvas.clientWidth / terrain_preview_canvas.clientHeight, 0.1, 100);
    camera.position.z = 5;
    
    geometry = new THREE.BoxGeometry(1, 1, 1);
    material = new THREE.MeshBasicMaterial({color: 0x00ff00});
    test_cube = new THREE.Mesh(geometry, material);
    
    scene.add(test_cube);
}

init_scene();

// function to render the scene
function render() {
    requestAnimationFrame(render);
    test_cube.rotation.x += 0.01;
    test_cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}
  
// Start rendering
render();


function onWindowResize() {
    const width = terrain_container.clientWidth;
    const height = terrain_container.clientHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
}

window.addEventListener('resize', onWindowResize);