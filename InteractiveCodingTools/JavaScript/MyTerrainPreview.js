import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

document.addEventListener('DOMContentLoaded', function(){
    init_app();
    update_terrain_texture();
});

const terrain_container = document.getElementById('terrain_container');
const terrain_preview_canvas = document.getElementById('terrain_preview_canvas');

const default_y_pos = 2;
const default_z_pos = 2;
const scale_divisor = 10;


let renderer = null;
let scene = null;
let camera = null;
let camera_controls = null;
let geometry = null;
let texture_material = null;
let wireframe_material = null;
let terrain = null;
let light = null;

// UI
let resolution_x = null;
let resolution_y = null;
let terrain_scale = null;
let displacement_scale = null;
let wireframe = null;

const positionNumComponents = 3;
const normalNumComponents = 3;
const uvNumComponents = 2;

function init_app() {
    window.addEventListener('resize', onWindowResize);
    window.addEventListener('beforeunload', onCleanup);

    // Get UI elements
    resolution_x = document.getElementById('resolution_x');
    resolution_y = document.getElementById('resolution_y');
    terrain_scale = document.getElementById('terrain_scale');
    displacement_scale = document.getElementById('displacement_scale');
    wireframe = document.getElementById('wireframe');
    
    // Set up event listeners for UI elements
    resolution_x.addEventListener('input', update_terrain_geometry);
    resolution_y.addEventListener('input', update_terrain_geometry);
    terrain_scale.addEventListener('input', update_terrain_geometry);
    displacement_scale.addEventListener('input', update_terrain_material);
    wireframe.addEventListener('change', update_terrain_material);
    
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
    const scale = Number(terrain_scale.value);
    camera = new THREE.PerspectiveCamera(75, terrain_preview_canvas.clientWidth / terrain_preview_canvas.clientHeight, 0.1, 2000);
    camera.position.z = scale * default_z_pos;
    camera.position.y = scale * default_y_pos;
    camera.position.x = 0;
    camera.lookAt(0, 0, 0);

    // setup camera controlls 
    camera_controls = new OrbitControls(camera, terrain_preview_canvas);
    camera_controls.maxDistance = scale * 10;
    camera_controls.minDistance = scale * 1;
    camera_controls.enableDamping = true;
    camera_controls.dampingFactor = 0.15;
    camera_controls.enablePan = false;

    // setup scene lighting
    const color = 0xffffff;
    const intensity = 1;
    light = new THREE.AmbientLight(color, intensity);
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
    // get info
    const resolution_x_val = Number(resolution_x.value);
    const resolution_y_val = Number(resolution_y.value);
    const scale = Number(terrain_scale.value);
    const displacement_scale_val = Number(displacement_scale.value) / scale_divisor;

    const scale_x = scale * resolution_x_val / Math.max(resolution_x_val, resolution_y_val);
    const scale_y = scale * resolution_y_val / Math.max(resolution_x_val, resolution_y_val);

    // update camera
    camera.position.z = scale * default_z_pos;
    camera.position.y = scale * default_y_pos;
    camera.position.x = 0;
    camera.lookAt(0, 0, 0);
    camera_controls.maxDistance = scale * 10;
    camera_controls.minDistance = scale * 1;

    let vertices = [];
    let normals = [];
    let uvs = [];
    let triangles = [];
    let triangleIndex = 0;

    for (let y = 0; y < resolution_y_val; y++) {
        for (let x = 0; x < resolution_x_val; x++) {
            let current_index = y * resolution_x_val + x;
            
            let percent = new THREE.Vector2(x / (resolution_x_val - 1), y / (resolution_y_val - 1));

            let point_on_mesh = new THREE.Vector3(
                ((percent.x - 0.5) * 2 * scale_x),
                0,
                -((percent.y - 0.5) * 2 * scale_y),
            )

            vertices[current_index] = point_on_mesh;
            normals[current_index] = new THREE.Vector3(0, 1, 0);
            uvs[current_index] = percent;

            if (x != (resolution_x_val - 1) && y != (resolution_y_val - 1)) {
                triangles[triangleIndex] = current_index;
                triangles[triangleIndex + 1] = current_index + resolution_x_val + 1;
                triangles[triangleIndex + 2] = current_index + resolution_x_val;

                triangles[triangleIndex + 3] = current_index;
                triangles[triangleIndex + 4] = current_index + 1;
                triangles[triangleIndex + 5] = current_index + resolution_x_val + 1;

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

    texture_material = new THREE.MeshPhysicalMaterial({
        map: new THREE.CanvasTexture(texturemap), // texture is set in 'MyTerrainCreator.js'
        displacementMap: new THREE.CanvasTexture(heightmap), // heightmap is set in 'MyTerrainCreator.js'
        displacementScale: displacement_scale_val,
        side: THREE.DoubleSide,
    });

    wireframe_material = new THREE.MeshPhysicalMaterial({
        wireframe: true,
        color: 0x00ff00,
        displacementMap: new THREE.CanvasTexture(heightmap), // heightmap is set in 'MyTerrainCreator.js'
        displacementScale: displacement_scale_val,
    });

    const mesh = new THREE.Mesh(geometry, texture_material);

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

export function update_terrain_heightmap() {
    // Update the heightmap on the material
    texture_material.displacementMap.needsUpdate = true;
    wireframe_material.displacementMap.needsUpdate = true;
}

export function update_terrain_material() {
    const displacement_scale_val = Number(displacement_scale.value) / scale_divisor;
    
    if(wireframe.checked) {
        terrain.material = wireframe_material;
    }
    else {
        terrain.material = texture_material;
    }

    texture_material.displacementScale = displacement_scale_val;
    wireframe_material.displacementScale = displacement_scale_val;
}

export function update_terrain_texture() {
    // Update the texturemap on the material
    texture_material.map.needsUpdate = true;
}

export function update_textures() {
    const displacement_scale_val = Number(displacement_scale.value) / scale_divisor;

    texture_material = new THREE.MeshPhysicalMaterial({
        map: new THREE.CanvasTexture(texturemap), // texture is set in 'MyTerrainCreator.js'
        displacementMap: new THREE.CanvasTexture(heightmap), // heightmap is set in 'MyTerrainCreator.js'
        displacementScale: displacement_scale_val,
        side: THREE.DoubleSide,
    });

    wireframe_material = new THREE.MeshPhysicalMaterial({
        wireframe: true,
        color: 0x00ff00,
        displacementMap: new THREE.CanvasTexture(heightmap), // heightmap is set in 'MyTerrainCreator.js'
        displacementScale: displacement_scale_val,
    });

    if(wireframe.checked) {
        terrain.material = wireframe_material;
    }
    else {
        terrain.material = texture_material;
    }
}

export function update_terrain_geometry() {
    
    // get info
    const resolution_x_val = Number(resolution_x.value);
    const resolution_y_val = Number(resolution_y.value);
    const scale = Number(terrain_scale.value);

    const scale_x = scale * resolution_x_val / Math.max(resolution_x_val, resolution_y_val);
    const scale_y = scale * resolution_y_val / Math.max(resolution_x_val, resolution_y_val);

    // update camera
    camera.position.z = scale * default_z_pos;
    camera.position.y = scale * default_y_pos;
    camera.position.x = 0;
    camera.lookAt(0, 0, 0);
    camera_controls.maxDistance = scale * 10;
    camera_controls.minDistance = scale * 1;

    let vertices = [];
    let normals = [];
    let uvs = [];
    let triangles = [];
    let triangleIndex = 0;

    for (let y = 0; y < resolution_y_val; y++) {
        for (let x = 0; x < resolution_x_val; x++) {
            let current_index = y * resolution_x_val + x;
            
            let percent = new THREE.Vector2(x / (resolution_x_val - 1), y / (resolution_y_val - 1));

            let point_on_mesh = new THREE.Vector3(
                ((percent.x - 0.5) * 2 * scale_x),
                0,
                -((percent.y - 0.5) * 2 * scale_y),
            )

            vertices[current_index] = point_on_mesh;
            normals[current_index] = new THREE.Vector3(0, 1, 0);
            uvs[current_index] = percent;

            if (x != (resolution_x_val - 1) && y != (resolution_y - 1)) {
                triangles[triangleIndex] = current_index + resolution_x_val;
                triangles[triangleIndex + 1] = current_index + resolution_x_val + 1;
                triangles[triangleIndex + 2] = current_index;

                triangles[triangleIndex + 3] = current_index + resolution_x_val + 1;
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
    
    terrain.geometry.dispose();     // Clear the existing geometry from memory to free up resources
    terrain.geometry = geometry;
}