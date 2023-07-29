import * as THREE from 'three';
import { Clock } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { STLExporter } from 'three/examples/jsm/exporters/STLExporter.js';

document.addEventListener('DOMContentLoaded', function(){
    init_app();
    update_terrain_texture();
    window.handleToggleView = handleToggleView;
});

const terrain_container = document.getElementById('terrain_container');
const terrain_preview_canvas = document.getElementById('terrain_preview_canvas');

const default_y_pos = 2;
const default_z_pos = 2;
const scale_divisor = 10;
const clock = new Clock();

let renderer = null;
let scene = null;
let camera = null;
let camera_controls = null;
let geometry = null;
let wireframe_material = null;

let texture_material = null;

let terrain = null;
let light = null;
let time = 0; // used to change the light position, if that option is checked

// UI
let resolution_x = null;
let resolution_y = null;
let terrain_scale = null;
let displacement_scale = null;
let wireframe = null;
let light_rotation = null;
let light_rotation_speed = null;
let light_color_picker = null;

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
    light_rotation = document.getElementById('light_rotation');
    light_rotation_speed = document.getElementById('light_rotation_speed');
    light_color_picker = document.getElementById('light_color_picker');
    
    // Set up event listeners for UI elements
    resolution_x.addEventListener('input', update_terrain_geometry);
    resolution_y.addEventListener('input', update_terrain_geometry);
    terrain_scale.addEventListener('input', update_terrain_geometry);
    displacement_scale.addEventListener('input', update_terrain_material);
    wireframe.addEventListener('change', update_terrain_material);
    light_color_picker.addEventListener('input', update_light_color);
    
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
    light = new THREE.DirectionalLight(0xffffff, 8);
    light.position.set(10, 10, 10);
    light.target.position.set(0, 0, 0);
    scene.add(light);

    
    // initialize Terrain
    terrain = initMesh();
    scene.add(terrain);

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

function handleToggleView() {
    onWindowResize();
}

function onWindowResize() {
    const width = terrain_container.clientWidth;
    const height = terrain_container.clientHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
}

function initMesh() {

    geometry = create_terrain_geometry();

    const displacement_scale_val = Number(displacement_scale.value) / scale_divisor;

    wireframe_material = new THREE.MeshStandardMaterial({
        wireframe: true,
        emissive: 0x00ff00,
        displacementMap: new THREE.CanvasTexture(heightmap), // heightmap is set in 'MyTerrainCreator.js'
        displacementScale: displacement_scale_val,
    });


    texture_material = createCustomShaderMaterial(heightmap, texturemap, displacement_scale_val);
    const mesh = new THREE.Mesh(geometry, texture_material);

    return mesh;
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
    texture_material.uniforms.displacementMap.value = new THREE.CanvasTexture(heightmap);
    texture_material.needsUpdate = true;
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

    wireframe_material.displacementScale = displacement_scale_val;

    texture_material.uniforms.displacementScale.value = Number(displacement_scale.value) / scale_divisor;
    texture_material.needsUpdate = true;
}

export function update_terrain_texture() {
    texture_material.uniforms.textureMap.value = new THREE.CanvasTexture(texturemap);
    texture_material.needsUpdate = true;
}

export function update_textures() {
    const displacement_scale_val = Number(displacement_scale.value) / scale_divisor;

    wireframe_material = new THREE.MeshPhysicalMaterial({
        wireframe: true,
        color: 0x00ff00,
        displacementMap: new THREE.CanvasTexture(heightmap), // heightmap is set in 'MyTerrainCreator.js'
        displacementScale: displacement_scale_val,
    });

    texture_material = createCustomShaderMaterial(heightmap, texturemap, displacement_scale_val);

    if(wireframe.checked) {
        terrain.material = wireframe_material;
    }
    else {
        terrain.material = texture_material;
    }
}

export function update_terrain_geometry() {

    geometry = create_terrain_geometry();
    
    terrain.geometry.dispose();     // Clear the existing geometry from memory to free up resources
    terrain.geometry = geometry;

    // update uniforms to calculate vertex normals
    const resolution_x_val = Number(resolution_x.value);
    const resolution_y_val = Number(resolution_y.value);
    const scale = Number(terrain_scale.value);
    const scale_x = scale * resolution_x_val / Math.max(resolution_x_val, resolution_y_val);
    const scale_y = scale * resolution_y_val / Math.max(resolution_x_val, resolution_y_val);

    texture_material.uniforms.resolution_x.value = resolution_x_val;
    texture_material.uniforms.resolution_y.value = resolution_y_val;
    texture_material.uniforms.scale_x.value = scale_x;
    texture_material.uniforms.scale_y.value = scale_y;
    texture_material.needsUpdate = true;
}

// Custom Shader
// basic idea taken from 'https://discourse.threejs.org/t/calculating-vertex-normals-after-displacement-in-the-vertex-shader/16989' (21.07.2023)
// used to calculate the vertex normals after applying the displacement
const vertexShaderCode = `
    varying vec2 vertex_uv;
    varying vec3 vertex_normal;

    uniform sampler2D displacementMap;
    uniform float displacementScale;
    uniform float scale_x;
    uniform float scale_y;
    uniform float resolution_x;
    uniform float resolution_y;

    // we can use these, as all normals in our geometry face upwards (0.0, 1.0, 0.0)
    vec3 x_vector = vec3(1.0, 0.0, 0.0);
    vec3 z_vector = vec3(0.0, 0.0, 1.0);

    vec3 getNeighbourVertex(vec3 v, vec3 direction) {
        // if the x or z value of our new vector is out of bounds we return the original vector
        // if (   v.x + direction.x > scale_x 
        //     || v.z + direction.z > scale_y
        //     || v.x + direction.x < -scale_x 
        //     || v.z + direction.z < -scale_y) 
        // {
        //     return v;
        // }
        return v + direction;
    }

    vec2 getNeighbourUv(vec2 uv, vec2 direction) {
        // if the x or y value of our new vector is out of bounds we return the original vector
        if (   uv.x + direction.x > 1.0 
            || uv.y + direction.y > 1.0
            || uv.x + direction.x < 0.0 
            || uv.y + direction.y < 0.0) 
        {
            return uv;
        }
        return uv + direction;
    }

    vec3 getFaceNormal(vec3 v1, vec3 v2, vec3 v3) {
        
        vec3 edge_1 = v2 - v1;
        vec3 edge_2 = v3 - v1;
        
        vec3 face_normal = normalize(cross(edge_1, edge_2));

        return face_normal;
    }

    vec3 getVertexNormal(vec3 face_normal1, vec3 face_normal2, vec3 face_normal3, vec3 face_normal4) {
        
        vec3 vertex_normal = normalize(face_normal1 + face_normal2 + face_normal3 + face_normal4);
        
        return vertex_normal;
    }
    
    void main() {
        
        // displace the current vertex
        vec3 displaced_position = position + normal * texture2D(displacementMap, uv).r * displacementScale;

        // now we recalculate the normal for our displaced vertex

        // get the neighbouring vertex positions
        vec2 position_offset = vec2(scale_x/resolution_x, scale_y/resolution_y);

        vec3 north_neighbour = getNeighbourVertex(position, z_vector * position_offset.y);
        vec3 east_neighbour = getNeighbourVertex(position, x_vector * position_offset.x);
        vec3 south_neighbour = getNeighbourVertex(position, -z_vector * position_offset.y);
        vec3 west_neighbour = getNeighbourVertex(position, -x_vector * position_offset.x);
        
        
        // get the uv coordinates for our neighbours
        vec2 uv_offset = vec2(1.0/resolution_x, 1.0/resolution_y);

        vec2 north_neighbour_uv = getNeighbourUv(uv, vec2(0.0, uv_offset.y));
        vec2 east_neighbour_uv = getNeighbourUv(uv, vec2(uv_offset.x, 0.0));
        vec2 south_neighbour_uv = getNeighbourUv(uv, vec2(0.0, -uv_offset.y));
        vec2 west_neighbour_uv = getNeighbourUv(uv, vec2(-uv_offset.x, 0.0));


        // get the displaced neighbours
        vec3 north_displaced = north_neighbour + normal * texture2D(displacementMap, north_neighbour_uv).r * displacementScale;
        vec3 east_displaced = east_neighbour + normal * texture2D(displacementMap, east_neighbour_uv).r * displacementScale;
        vec3 south_displaced = south_neighbour + normal * texture2D(displacementMap, south_neighbour_uv).r * displacementScale;
        vec3 west_displaced = west_neighbour + normal * texture2D(displacementMap, west_neighbour_uv).r * displacementScale;

        // now calculate the face normals of our neighbours
        vec3 face_normal_north_east = getFaceNormal(displaced_position, east_displaced, north_displaced);
        vec3 face_normal_south_east = getFaceNormal(displaced_position, south_displaced, east_displaced);
        vec3 face_normal_south_west = getFaceNormal(displaced_position, west_displaced, south_displaced);
        vec3 face_normal_north_west = getFaceNormal(displaced_position, north_displaced, west_displaced);

        // finally we calculate the vertex normal
        vertex_normal = getVertexNormal(face_normal_north_east, face_normal_south_east, face_normal_south_west, face_normal_north_west);
        vertex_uv = uv;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced_position, 1.0);
    }
`;

const fragmentShaderCode = `
    uniform sampler2D textureMap;
    uniform vec3 light_color;
    uniform vec3 light_direction;
    uniform vec3 ambient;
    
    varying vec2 vertex_uv;
    varying vec3 vertex_normal;

    void main() {

        vec3 normal = normalize(vertex_normal);

        // diffuse material color
        vec3 material_diffuse = texture2D(textureMap, vertex_uv).rgb * ambient;
        
        // diffuse light
        vec3 lightDirection = normalize(light_direction);
        float cos_phi = max(dot(normal, lightDirection), 0.0);

        // calculate final color
        vec3 final_color = texture2D(textureMap, vertex_uv).rgb * ambient;
        final_color += material_diffuse * cos_phi * light_color;

        gl_FragColor = vec4(final_color, 1.0);

        //gl_FragColor = vec4((vertex_normal * 0.5) + 0.5, 1.0);
        //gl_FragColor = texture2D(textureMap, vertex_uv);
    }
`;

// Function to create a custom ShaderMaterial
function createCustomShaderMaterial(displacementCanvas, textureCanvas, displacement_scale) {
    
    const displacementMap = new THREE.CanvasTexture(displacementCanvas);
    const textureMap = new THREE.CanvasTexture(textureCanvas);
    
    const resolution_x_val = Number(resolution_x.value);
    const resolution_y_val = Number(resolution_y.value);
    const scale = Number(terrain_scale.value);

    const scale_x = scale * resolution_x_val / Math.max(resolution_x_val, resolution_y_val);
    const scale_y = scale * resolution_y_val / Math.max(resolution_x_val, resolution_y_val);


    const light_color = new THREE.Vector3(light.color.r, light.color.g, light.color.b);
    const light_direction = light.position.clone().negate();
    const ambient = new THREE.Vector3(0.2, 0.2, 0.2);


    const material = new THREE.ShaderMaterial({
        side: THREE.DoubleSide,
        vertexShader: vertexShaderCode,
        fragmentShader: fragmentShaderCode,
        uniforms: {
            displacementMap: { type: 't', value: displacementMap },
            textureMap: { type: 't', value: textureMap },
            displacementScale: { type: 'f', value: displacement_scale },
            scale_x: { type: 'f', value: scale_x },
            scale_y: { type: 'f', value: scale_y },
            resolution_x: { type: 'f', value: resolution_x_val },
            resolution_y: { type: 'f', value: resolution_y_val },
            light_color: { type: 'v3', value: light_color },
            light_direction: { type: 'v3', value: light_direction },
            ambient: { type: 'v3', value: ambient },
        }
    });

    return material;
}

function create_terrain_geometry() {
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

    let new_geometry = new THREE.BufferGeometry();
    new_geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(new Float32Array(vertices), positionNumComponents)
    );
    new_geometry.setAttribute(
        'normal',
        new THREE.BufferAttribute(new Float32Array(normals), normalNumComponents)
    );
    new_geometry.setAttribute(
        'uv',
        new THREE.BufferAttribute(new Float32Array(uvs), uvNumComponents)
    );
    new_geometry.setIndex(triangles);

    return new_geometry;
}

function update_light(delta) {

    if(light_rotation.checked) {
        const speed = Number(light_rotation_speed.value) / 100;
        
        time += delta;

        light.position.x = Math.sin(time * speed) * 10;
        light.position.z = Math.cos(time * speed) * 10;
        light.position.y = 10;

        const light_direction = light.position.clone().negate();

        texture_material.uniforms.light_direction.value = light_direction;
        texture_material.needsUpdate = true;
    }
}

function update_light_color() {
    light.color = new THREE.Color(light_color_picker.value);
    const light_color = new THREE.Vector3(light.color.r, light.color.g, light.color.b);
    texture_material.uniforms.light_color.value = light_color;
    texture_material.needsUpdate = true;
}

function render() {
    requestAnimationFrame(render);

    const delta = clock.getDelta();
    update_light(delta);

    renderer.render(scene, camera);
}

export function export_mesh() {
    const exporter = new STLExporter();

    const options = { binary: true };

    const currGeom = prepare_mesh();
    const currTerrain = new THREE.Mesh(currGeom, texture_material);

    const mesh_buffer = exporter.parse(currTerrain, options);

    let fileName = document.getElementById('geometry_name').value.trim().replace(/[\\\/:*?"<>|]/g, '');
    fileName = (fileName == '') ? 'Terrain.' : fileName + '.';

    save_array_buffer(mesh_buffer, fileName, 'stl');
}

function save_array_buffer(buffer, fileName, extension) {
    download_mesh(new Blob([buffer], {type: 'application/octet-stream'}), fileName, extension)
}   

function download_mesh(blob, fileName, extension) {
    
    const url = window.URL.createObjectURL(blob);

    let link = document.createElement('a');
    link.href = url;
    link.download = fileName + extension;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);
}

function prepare_mesh() {
    // get info
    const resolution_x_val = Number(resolution_x.value);
    const resolution_y_val = Number(resolution_y.value);
    const scale = Number(terrain_scale.value);
    const displacement_scale_val = Number(displacement_scale.value) / scale_divisor;

    const scale_x = scale * resolution_x_val / Math.max(resolution_x_val, resolution_y_val);
    const scale_y = scale * resolution_y_val / Math.max(resolution_x_val, resolution_y_val);

    // get current heightmap data
    const heightmap_texture = new THREE.CanvasTexture(heightmap);
    const heightmap_data = heightmap_texture.image.getContext('2d', { willReadFrequently: true });
    const heightmap_width = heightmap.width - 1;
    const heightmap_height = heightmap.height - 1;

    let vertices = [];
    let normals = [];
    let uvs = [];
    let triangles = [];
    let triangleIndex = 0;

    for (let y = 0; y < resolution_y_val; y++) {
        for (let x = 0; x < resolution_x_val; x++) {
            const current_index = y * resolution_x_val + x;
            
            const percent = new THREE.Vector2(x / (resolution_x_val - 1), y / (resolution_y_val - 1));

            const height_value = heightmap_data.getImageData(
                percent.x * heightmap_width, 
                percent.y * heightmap_height, 
                1, 
                1)
            .data[0] / 255; 

            const point_on_mesh = new THREE.Vector3(
                ((percent.x - 0.5) * 2 * scale_x),
                height_value * displacement_scale_val,
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

    let new_geometry = new THREE.BufferGeometry();
    new_geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(new Float32Array(vertices), positionNumComponents)
    );
    new_geometry.setAttribute(
        'normal',
        new THREE.BufferAttribute(new Float32Array(normals), normalNumComponents)
    );
    new_geometry.setAttribute(
        'uv',
        new THREE.BufferAttribute(new Float32Array(uvs), uvNumComponents)
    );
    new_geometry.setIndex(triangles);

    // recalc the normals
    new_geometry.computeVertexNormals();

    return new_geometry;
}