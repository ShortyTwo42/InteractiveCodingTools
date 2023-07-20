import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

document.addEventListener('DOMContentLoaded', function(){
    init_app();
});

const terrain_container = document.getElementById('terrain_container');
const terrain_preview_canvas = document.getElementById('terrain_preview_canvas');

let renderer = null;
let scene = null;
let camera = null;
let camera_controls = null;
let geometry = null;
let material = null;
let terrain = null;
let light = null;

const positionNumComponents = 3;
const normalNumComponents = 3;
const uvNumComponents = 2;

function init_app() {
    window.addEventListener('resize', onWindowResize);
    window.addEventListener('beforeunload', onCleanup);
    
    // setup Renderer
    renderer = new THREE.WebGLRenderer({ 
        canvas: terrain_preview_canvas,
        antialias: true,
        powerPreference: 'high-performance' 
    });
    renderer.setSize(terrain_preview_canvas.clientWidth, terrain_preview_canvas.clientHeight);
    
    // setup Scene
    scene = new THREE.Scene();
    
    // setup Camera
    camera = new THREE.PerspectiveCamera(75, terrain_preview_canvas.clientWidth / terrain_preview_canvas.clientHeight, 0.1, 100);
    camera.position.z = 2;
    camera.position.y = 2;
    camera.lookAt(0, 0, 0);

    // setup camera controlls 
    camera_controls = new OrbitControls(camera, terrain_preview_canvas);
    camera_controls.maxDistance = 10;
    camera_controls.minDistance = 1;
    camera_controls.enableDamping = true;
    camera_controls.dampingFactor = 0.15;
    camera_controls.enablePan = false;

    // setup scene lighting
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.AmbientLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);

    
    // initialize Terrain
    terrain  = createMesh();
    scene.add(terrain );

    // Start rendering
    render();
}

function onCleanup() {
    scene.traverse((o) => {
        if (o.isMesh) {
            o.material.dispose();
            o.geometry.dispose();
        }
    });

    renderer.dispose();
}

function onWindowResize() {
    const width = terrain_container.clientWidth;
    const height = terrain_container.clientHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
}

function createMesh() {
    const resolution_x = 10;
    const resolution_y = 15;
    const scale = 1;
    const scale_x = scale * resolution_x / Math.max(resolution_x, resolution_y);
    const scale_y = scale * resolution_y / Math.max(resolution_x, resolution_y);

    let vertices = [];
    let normals = [];
    let uvs = [];
    let triangles = [];
    let triangleIndex = 0;

    for (let y = 0; y < resolution_y; y++) {
        for (let x = 0; x < resolution_x; x++) {
            let current_index = y * resolution_x + x;
            
            let percent = new THREE.Vector2(x / (resolution_x - 1), y / (resolution_y - 1));

            let point_on_mesh = new THREE.Vector3(
                (percent.x - 0.5) * 2 * scale_x,
                0,
                (percent.y - 0.5) * 2 * scale_y,
            )

            vertices[current_index] = point_on_mesh;
            normals[current_index] = new THREE.Vector3(0, 1, 0);
            uvs[current_index] = percent;

            if (x != (resolution_x - 1) && y != (resolution_y - 1)) {
                triangles[triangleIndex] = current_index + resolution_x;
                triangles[triangleIndex + 1] = current_index + resolution_x + 1;
                triangles[triangleIndex + 2] = current_index;

                triangles[triangleIndex + 3] = current_index + resolution_x + 1;
                triangles[triangleIndex + 4] = current_index + 1;
                triangles[triangleIndex + 5] = current_index;

                triangleIndex += 6;
            }
        }
    }

    // transform into 1D arrays to push into the data structure
    vertices = flatten3(vertices);
    normals = flatten3(normals);
    uvs = flatten2(uvs);

    geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(new Float32Array(vertices), positionNumComponents)
    );
    geometry.setAttribute(
        'normal',
        new THREE.BufferAttribute(new Float32Array(normals), normalNumComponents)
    );
    geometry.setAttribute(
        'uv',
        new THREE.BufferAttribute(new Float32Array(uvs), uvNumComponents)
    );
    geometry.setIndex(triangles);

    //material = new THREE.MeshPhongMaterial({color: 0x00ff00, wireframe: false})
    material = new THREE.MeshPhysicalMaterial({color: 0x00ff00, wireframe: true});
    const mesh = new THREE.Mesh(geometry, material);

    return mesh;
}

function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

function flatten3(array) {
    let result = [];
    for (let i = 0; i < array.length; i++) {
        result.push(array[i].x);
        result.push(array[i].y);
        result.push(array[i].z);
    }
    return result;
}

function flatten2(array) {
    let result = [];
    for (let i = 0; i < array.length; i++) {
        result.push(array[i].x);
        result.push(array[i].y);
    }
    return result;
}