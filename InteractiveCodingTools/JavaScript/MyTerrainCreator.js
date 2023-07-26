import { 
    update_terrain_heightmap, 
    update_terrain_texture, 
    update_terrain_geometry,
    update_terrain_material, 
    update_textures
} from 'modules/MyTerrainPreview.js';

// initialize everything
document.addEventListener('DOMContentLoaded', function() {
    // set functions from other module and make them visible outside of this modal
    window.update_terrain_heightmap = update_terrain_heightmap;
    window.update_terrain_texture = update_terrain_texture;
    window.update_terrain_geometry = update_terrain_geometry;
    window.handleDecrease = handleDecrease;
    window.handleIncrease = handleIncrease;
    window.downloadFile = downloadFile;
    window.uploadFile = uploadFile;
    window.toggleAutoRefresh = toggleAutoRefresh;
    window.display = display;
    window.createNewCanvas = createNewCanvas;
    initDrawingApp();
});


/////////////////////////////////////////////////////////////////// Drawing App ///////////////////////////////////////////////////////////////////
let active_type = null;
let active_canvas = null;
let active_ctx = null;

let heightmap = null;
let heightmap_ctx = null;

let texturemap = null;
let texturemap_ctx = null;

let canvasContainer = null;
let myTerrainMenu = null;

// Set up initial variables
let lastHeightmapX = 0;
let lastHeightmapY = 0;
let lastTexturemapX = 0;
let lastTexturemapY = 0;
let isDrawing = false;
let brushSize = 25;
let autorefresh = true;
let heightmapHistory = [];
let heightmapStep = -1;
let texturemapHistory = [];
let texturemapStep = -1;
const maxHistoryEntries = 20;

// for zooming and panning
const minZoom = 0.1;
const maxZoom = 5;
let isPanning = false;
let currentZoom = 1;
let lastMouseX = 0;
let lastMouseY = 0;

// UI Elements
let menuButton = null;
let heightmapMode = null;
let heightmapColorDiv = null;
let heightColorInput = null;
let heightColorPreview = null;
let texturemapMode = null;
let texturemapColorDiv = null;
let textureColorInput = null;
let opacityInput = null;
let brushSizeInput = null;
let falloffCheckbox = null;
let undoButton = null;
let redoButton = null;
let eraserButton = null;
let texturemapButton = null;


function initDrawingApp() {
    //////////////////////////////////// heightmap ////////////////////////////////////
    // Set the heightmap and its context
    heightmap = document.getElementById('heightmap');
    heightmap_ctx = heightmap.getContext('2d');

    // set width and height display
    document.getElementById('ict-fileWidth').value = heightmap.width;
    document.getElementById('ict-fileHeight').value = heightmap.height;
    
    // make the background black initially
    heightmap_ctx.fillStyle = '#000000';
    heightmap_ctx.fillRect(0, 0, heightmap.width, heightmap.height);
    
    // push initial history entry for heightmap
    active_type = 'heightmap';
    pushHistory();

    // init brush parameters
    heightmap_ctx.strokeStyle = '#ffffff'; // init as white
    heightmap_ctx.lineWidth = brushSize;
    heightmap_ctx.lineCap = 'round';
    heightmap_ctx.lineJoin = 'round';
    
    // set some additional parameters
    heightmap_ctx.imageSmoothingEnabled = true;

    // Set up event listeners
    heightmap.addEventListener('mousedown', startDrawing);
    heightmap.addEventListener('mousemove', draw);
    heightmap.addEventListener('mouseup', stopDrawing);
    heightmap.addEventListener('mouseout', stopDrawingOnLeave);
    heightmap.addEventListener('mouseover', startDrawingOnEnter);

    //////////////////////////////////// texturemap ///////////////////////////////////
    // Set the texturemap and its context
    texturemap = document.getElementById('texturemap');
    texturemap_ctx = texturemap.getContext('2d');

    // set width and height display
    document.getElementById('ict-fileWidth_texturemap').value = texturemap.width;
    document.getElementById('ict-fileHeight_texturemap').value = texturemap.height;
    
    // make the background white initially
    texturemap_ctx.fillStyle = '#ffffff';
    texturemap_ctx.fillRect(0, 0, texturemap.width, texturemap.height);

    // push initial history entry for texturemap
    active_type = 'texturemap';
    pushHistory();

    // init brush parameters
    texturemap_ctx.strokeStyle = '#000000'; // init as black
    texturemap_ctx.lineWidth = brushSize;
    texturemap_ctx.lineCap = 'round';
    texturemap_ctx.lineJoin = 'round';
    
    // set some additional parameters
    texturemap_ctx.imageSmoothingEnabled = true;

    // Set up event listeners
    texturemap.addEventListener('mousedown', startDrawing);
    texturemap.addEventListener('mousemove', draw);
    texturemap.addEventListener('mouseup', stopDrawing);
    texturemap.addEventListener('mouseout', stopDrawingOnLeave);
    texturemap.addEventListener('mouseover', startDrawingOnEnter);

    /////////////////////////////////////// UI ///////////////////////////////////////
    // Get view elemets
    myTerrainMenu = document.querySelector('.my_terrain_menu');
    canvasContainer = document.querySelector('.canvas_container');

    // Set up zooming and panning
    canvasContainer.addEventListener('mousedown', startPanning);
    canvasContainer.addEventListener('mousemove', handlePanning);
    canvasContainer.addEventListener('mouseup', stopPanning);
    canvasContainer.addEventListener('mouseleave', stopPanningOnLeave);
    canvasContainer.addEventListener('wheel', handleZoom);
    
    // Get UI elements
    menuButton = document.getElementById('menuButton');
    heightmapMode = document.getElementById('heightmap_mode');
    heightmapColorDiv = document.getElementById('heightmap_color_div');
    heightColorInput = document.getElementById('height_color');
    heightColorPreview = document.getElementById('height_color_preview');
    texturemapMode = document.getElementById('texturemap_mode');
    texturemapColorDiv = document.getElementById('texturemap_color_div');
    textureColorInput = document.getElementById('texture_color');
    opacityInput = document.getElementById('opacity');
    brushSizeInput = document.getElementById('brushSize');
    falloffCheckbox = document.getElementById('falloff');
    undoButton = document.getElementById('undoButton');
    redoButton = document.getElementById('redoButton');
    eraserButton = document.getElementById('eraserButton');
    texturemapButton = document.getElementById('texturemapButton');

    // Set up event listeners for UI elements
    menuButton.addEventListener('click', toggleSidebar);
    heightColorInput.addEventListener('input', updateColor);
    textureColorInput.addEventListener('input', updateColor);
    opacityInput.addEventListener('input', updateOpacity);
    brushSizeInput.addEventListener('input', updateBrushSize);
    falloffCheckbox.addEventListener('change', updateFalloff);
    undoButton.addEventListener('click', undo);
    redoButton.addEventListener('click', redo);
    eraserButton.addEventListener('click', toggleEraser);
    texturemapButton.addEventListener('click', toggleTexturemap);

    // Set heightmap to current elements
    active_type = 'heightmap';
    active_canvas = heightmap;
    active_ctx = heightmap_ctx;
}

// drawing functions
function startDrawing(e) {
    // Left mouse button
    if (e.button === 0) {
        e.preventDefault();
        isDrawing = true;

        const mousePos = getMousePosition(e);

        let lastX;
        let lastY;
        switch(active_type) {
            case 'heightmap':
                lastHeightmapX = mousePos.x;
                lastHeightmapY = mousePos.y;

                lastX = lastHeightmapX;
                lastY = lastHeightmapY;
                break;
            case 'texturemap':
                lastTexturemapX = mousePos.x;
                lastTexturemapY = mousePos.y;

                lastX = lastTexturemapX;
                lastY = lastTexturemapY;
                break;
        }

        active_ctx.beginPath();
        active_ctx.moveTo(lastX, lastY);
        active_ctx.lineTo(mousePos.x, mousePos.y);
        active_ctx.stroke();
    }
}

function draw(e) {
    if (isDrawing) {
        e.preventDefault();

        const mousePos = getMousePosition(e);

        let lastX;
        let lastY;
        switch(active_type) {
            case 'heightmap':
                lastX = lastHeightmapX;
                lastY = lastHeightmapY;

                lastHeightmapX = mousePos.x;
                lastHeightmapY = mousePos.y;

                if (autorefresh) {
                    update_terrain_heightmap();
                }
                break;
            case 'texturemap':
                lastX = lastTexturemapX;
                lastY = lastTexturemapY;

                lastTexturemapX = mousePos.x;
                lastTexturemapY = mousePos.y;

                if (autorefresh) {
                    update_terrain_texture();
                }
                break;
        }

        active_ctx.beginPath();
        active_ctx.moveTo(lastX, lastY);
        active_ctx.lineTo(mousePos.x, mousePos.y);
        active_ctx.stroke();
    }
}

function stopDrawing(e) {
    // Left mouse button
    if (e.button === 0) {
        e.preventDefault();
        isDrawing = false;

        pushHistory();
    }
}

function stopDrawingOnLeave(e) {
    if (isDrawing) {
        e.preventDefault(); 
        isDrawing = false;

        pushHistory();
    }
}

function startDrawingOnEnter(e) {
    // Left mouse button
    if (e.buttons === 1) {
        e.preventDefault();
        isDrawing = true;

        const mousePos = getMousePosition(e);

        let lastX;
        let lastY;
        switch(active_type) {
            case 'heightmap':
                lastHeightmapX = mousePos.x;
                lastHeightmapY = mousePos.y;

                lastX = lastHeightmapX;
                lastY = lastHeightmapY;
                break;
            case 'texturemap':
                lastTexturemapX = mousePos.x;
                lastTexturemapY = mousePos.y;

                lastX = lastTexturemapX;
                lastY = lastTexturemapY;
                break;
        }

        active_ctx.beginPath();
        active_ctx.moveTo(lastX, lastY);
        active_ctx.lineCap = "round";
        active_ctx.lineJoin = "round";
        active_ctx.lineTo(mousePos.x, mousePos.y);
        active_ctx.stroke();
    }
}

function getMousePosition(e) {
    const rect = active_canvas.getBoundingClientRect();
    const scaleX = active_canvas.width / rect.width;
    const scaleY = active_canvas.height / rect.height;
    return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY
    };
}

// functions to handle zooming and panning
function handleZoom(e) {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.1 : -0.1;
    const oldZoom = currentZoom;
    // makes sure our zoom stays inside its bounds
    currentZoom = Math.min(Math.max(currentZoom + delta, minZoom), maxZoom); 
    const zoomFactor = currentZoom / oldZoom;
    const containerRect = canvasContainer.getBoundingClientRect();
    const x = e.clientX - containerRect.left;
    const y = e.clientY - containerRect.top;
    const canvasX = x + canvasContainer.scrollLeft;
    const canvasY = y + canvasContainer.scrollTop;
    const offsetX = canvasX * zoomFactor - canvasX;
    const offsetY = canvasY * zoomFactor - canvasY;
    canvasContainer.scrollLeft += offsetX;
    canvasContainer.scrollTop += offsetY;

    heightmap.style.width = `${heightmap.width * currentZoom}px`;
    heightmap.style.height = `${heightmap.height * currentZoom}px`;
    
    texturemap.style.width = `${texturemap.width * currentZoom}px`;
    texturemap.style.height = `${texturemap.height * currentZoom}px`;
}

function startPanning(e) {
    // Right mouse button
    if (e.button === 2) {
        e.preventDefault();
        isPanning = true;
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
    }
}

function handlePanning(e) {
    if (isPanning) {
        e.preventDefault();
        const deltaX = e.clientX - lastMouseX;
        const deltaY = e.clientY - lastMouseY;
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
        canvasContainer.scrollLeft -= deltaX;
        canvasContainer.scrollTop -= deltaY;
    }
}

function stopPanning(e) {
    // Right mouse button
    if (e.button === 2) {
        e.preventDefault();
        isPanning = false;
    }
}

function stopPanningOnLeave(e) {
    if (isPanning) {
        e.preventDefault();
        isPanning = false;
    }
}

/////////////////////////////////////////////////////////////////////// UI ////////////////////////////////////////////////////////////////////////
function toggleSidebar() {
    let display = myTerrainMenu.style.display;

    switch(display) {
        case 'none':
            myTerrainMenu.style.display = '';
            canvasContainer.style.display = 'none';
            undoButton.disabled = true;
            redoButton.disabled = true;
            break;
        case '':
            myTerrainMenu.style.display = 'none';
            canvasContainer.style.display = '';
            undoButton.disabled = false;
            redoButton.disabled = false;
            break;
    }
}

function updateColor() {

    const active = eraserButton.classList.contains('active_elem');

    switch(active_type) {
        case 'heightmap':
            const decVal = isNaN(parseInt(heightColorInput.value)) ? 0 : parseInt(heightColorInput.value);
            const hexVal = (decVal.toString(16).length == 1) ? '0' + decVal.toString(16) : decVal.toString(16);
            const grayscale = '#' + hexVal + hexVal + hexVal;
            
            heightColorPreview.value = grayscale;

            if (!active) {
                heightmap_ctx.strokeStyle = grayscale;
                updateFalloff();
            }
            break;
        case 'texturemap':
            const col = textureColorInput.value;

            if (!active) {
                texturemap_ctx.strokeStyle = col;
                updateFalloff();
            }
            break;
    }

    
}

function updateOpacity() {
    const x = isNaN(parseFloat(opacityInput.value)) ? 0 : parseFloat(opacityInput.value) / 100;
    const y = Math.exp(6 * x - 6);

    let active = eraserButton.classList.contains('active_elem');
    if (!active) {
        heightmap_ctx.globalAlpha = y;
        texturemap_ctx.globalAlpha = y;
    }
}

function updateBrushSize() {
    const brushSize = isNaN(parseFloat(brushSizeInput.value)) ? 0 : parseFloat(brushSizeInput.value);
    heightmap_ctx.lineWidth = brushSize;
    texturemap_ctx.lineWidth = brushSize;
}

// Function to update the color falloff
function updateFalloff() {
    if (falloffCheckbox.checked) {
        const active = eraserButton.classList.contains('active_elem');
        if (!active) {
            heightmap_ctx.shadowColor = heightColorPreview.value;
            heightmap_ctx.shadowBlur = brushSizeInput.value / 2;
            heightmap_ctx.lineWidth = 0;

            texturemap_ctx.shadowColor = textureColorInput.value;
            texturemap_ctx.shadowBlur = brushSizeInput.value / 2;
            texturemap_ctx.lineWidth = 0;
        }
    } else {
        heightmap_ctx.shadowColor = 'rgba(0, 0, 0, 0)';
        heightmap_ctx.shadowBlur = 0;
        texturemap_ctx.shadowColor = 'rgba(0, 0, 0, 0)';
        texturemap_ctx.shadowBlur = 0;
        updateBrushSize();
    }
}

function undo() {
    switch(active_type) {
        case 'heightmap':
            if(heightmapStep > 0) {
                heightmapStep--;
                let canvasPic = new Image();
                canvasPic.src = heightmapHistory[heightmapStep];
                canvasPic.onload = function() {
                    heightmap_ctx.drawImage(canvasPic, 0, 0);
                }
                
            }
            break;
        case 'texturemap':
            if(texturemapStep > 0) {
                texturemapStep--;
                let canvasPic = new Image();
                canvasPic.onload = function() {
                    texturemap_ctx.drawImage(canvasPic, 0, 0);
                }
                canvasPic.src = texturemapHistory[texturemapStep];
            }
            break;
    }
}

function redo() {
    switch(active_type) {
        case 'heightmap':
            if(heightmapStep < heightmapHistory.length - 1) {
                heightmapStep++;
                let canvasPic = new Image();
                canvasPic.onload = function() {
                    heightmap_ctx.drawImage(canvasPic, 0, 0);
                }
                canvasPic.src = heightmapHistory[heightmapStep];
            }
            break;
        case 'texturemap':
            if(texturemapStep < texturemapHistory.length - 1) {
                texturemapStep++;
                let canvasPic = new Image();
                canvasPic.onload = function() {
                    texturemap_ctx.drawImage(canvasPic, 0, 0);
                }
                canvasPic.src = texturemapHistory[texturemapStep];
            }
            break;
    }
}

function pushHistory() {
    switch(active_type) {
        case 'heightmap':
            heightmapStep++;
            if (heightmapStep < heightmapHistory.length) {
                heightmapHistory.length = heightmapStep;
            }
            heightmapHistory.push(heightmap.toDataURL());
            
            if (heightmapHistory.length > maxHistoryEntries) {
                heightmapHistory.shift();
                heightmapStep--;
            }
            break;
        case 'texturemap':
            texturemapStep++;
            if (texturemapStep < texturemapHistory.length) {
                texturemapHistory.length = texturemapStep;
            }
            texturemapHistory.push(texturemap.toDataURL());

            if (texturemapHistory.length > maxHistoryEntries) {
                texturemapHistory.shift();
                texturemapStep--;
            }
            break;
    }
}

function toggleEraser() {
    const active = eraserButton.classList.contains('active_elem');

    if (active) {
        eraserButton.classList.remove('active_elem');
        
        // set brush parameters to current values
        updateColor();
        updateOpacity();
        updateFalloff();
    }
    else {
        eraserButton.classList.add('active_elem');

        // set brush parameters to current values
        heightmap_ctx.strokeStyle = '#000000';
        heightmap_ctx.shadowColor = 'rgba(0, 0, 0, 0)';
        heightmap_ctx.shadowBlur = 0;
        heightmap_ctx.globalAlpha = 1;

        texturemap_ctx.strokeStyle = '#ffffff';
        texturemap_ctx.shadowColor = 'rgba(0, 0, 0, 0)';
        texturemap_ctx.shadowBlur = 0;
        texturemap_ctx.globalAlpha = 1;
    }
}

function toggleTexturemap() {
    const active = texturemapButton.classList.contains('active_elem');

    if (active) {
        texturemapButton.classList.remove('active_elem');
        
        heightmapMode.style.display = '';
        texturemapMode.style.display = 'none';

        heightmapColorDiv.style.display = '';
        texturemapColorDiv.style.display = 'none';

        heightmap.style.display = '';
        texturemap.style.display = 'none';

        active_canvas = heightmap;
        active_ctx = heightmap_ctx;
        active_type = 'heightmap';

        // set brush parameters to current values
        updateColor();
        updateOpacity();
        updateFalloff();
    }
    else {
        texturemapButton.classList.add('active_elem');

        heightmapMode.style.display = 'none';
        texturemapMode.style.display = '';

        heightmapColorDiv.style.display = 'none';
        texturemapColorDiv.style.display = '';

        heightmap.style.display = 'none';
        texturemap.style.display = '';

        active_canvas = texturemap;
        active_ctx = texturemap_ctx;
        active_type = 'texturemap';

        // set brush parameters to current values
        updateColor();
        updateOpacity();
        updateFalloff();
    }
}

function handleDecrease(id) {  
    switch (id) {
        case 'opacity':
            updateOpacity();
            break;
        case 'brushSize':
            updateBrushSize();
            break;
        case 'height_color':
            updateColor();
            break;
        case 'resolution_x':
            update_terrain_geometry();
            break;
        case 'resolution_y':
            update_terrain_geometry();
            break;
        case 'terrain_scale':
            update_terrain_geometry();
            break;
        case 'displacement_scale':
            update_terrain_material();
            break;
    }
}

function handleIncrease(id) {
    switch (id) {
        case 'opacity':
            updateOpacity();
            break;
        case 'brushSize':
            updateBrushSize();
            break;
        case 'height_color':
            updateColor();
            break;
        case 'resolution_x':
            update_terrain_geometry();
            break;
        case 'resolution_y':
            update_terrain_geometry();
            break;
        case 'terrain_scale':
            update_terrain_geometry();
            break;
        case 'displacement_scale':
            update_terrain_material();
            break;
    }
}

function createNewCanvas() {
    /////////////////////////////// create heightmap ///////////////////////////////
    if(document.getElementById('create_new_heightmap').checked) {
        // get information
        const heightmap_filename = document.getElementById('new_heightmap_name').value;
        const heightmap_width = document.getElementById('new_heightmap_width').value;
        const heightmap_height = document.getElementById('new_heightmap_height').value;

        heightmap.width = heightmap_width;
        heightmap.height = heightmap_height;

        // set width, height and filename display
        document.getElementById('ict-fileWidth').value = heightmap.width;
        document.getElementById('ict-fileHeight').value = heightmap.height;
        document.getElementById('ict-fileName').value = heightmap_filename;

        // make the background black initially
        heightmap_ctx.fillStyle = '#000000';
        heightmap_ctx.fillRect(0, 0, heightmap.width, heightmap.height);  
    }

    /////////////////////////////// create texturemap ///////////////////////////////
    if(document.getElementById('create_new_texturemap').checked) {
        // get information
        const texturemap_filename = document.getElementById('new_texturemap_name').value;
        const texturemap_width = document.getElementById('new_texturemap_width').value;
        const texturemap_height = document.getElementById('new_texturemap_height').value;

        texturemap.width = texturemap_width;
        texturemap.height = texturemap_height;

        // set width, height and filename display
        document.getElementById('ict-fileWidth_texturemap').value = texturemap.width;
        document.getElementById('ict-fileHeight_texturemap').value = texturemap.height;
        document.getElementById('ict-fileName_texturemap').value = texturemap_filename;

        // make the background black initially
        texturemap_ctx.fillStyle = '#ffffff';
        texturemap_ctx.fillRect(0, 0, texturemap.width, texturemap.height);  
    }

    update_textures();
    
    //////////////////// reset brush parameters to current values ///////////////////
    updateColor();
    updateOpacity();
    updateBrushSize();
    heightmap_ctx.lineCap = 'round';
    heightmap_ctx.lineJoin = 'round';
    texturemap_ctx.lineCap = 'round';
    texturemap_ctx.lineJoin = 'round';
}

function downloadFile() {
    // get info
    const image_type = document.getElementById('save_as').value;
    const save_heightmap = document.getElementById('save_heightmap').checked;
    const save_texturemap = document.getElementById('save_texturemap').checked;
    const save_terrain = document.getElementById('save_terrain').checked;

    if (!save_heightmap && !save_texturemap && !save_terrain) {
        alert('Bitte wähle mindestens eine der Speichermöglichkeiten über die Checkbox aus');
    }

    if (save_heightmap) {
        save_image('heightmap', image_type);
    }

    if (save_texturemap) {
        save_image('texturemap', image_type);
    }

    if (save_terrain) {
        save_geometry();
    }
}

function save_image(image_source, image_type) {
    
    let canvas = null;
    let ctx = null;
    let default_filename = '';
    
    switch(image_source) {
        case 'heightmap':
            canvas = heightmap;
            ctx = heightmap_ctx;
            default_filename = 'Heightmap';
            break;
        case 'texturemap':
            canvas = texturemap;
            ctx = texturemap_ctx;
            default_filename = 'Texturemap';
            break;
    }

    switch(image_type) {
        case 'pgm_ppm':
            if(image_source == 'heightmap') {
                save_pgm(canvas, ctx, default_filename);
            }
            else {
                save_ppm(canvas, ctx, default_filename);
            }
            break;
        case 'jpg':
            save_jpg(canvas, default_filename);
            break;
        case 'png':
            save_png(canvas, default_filename);
            break;
    }
}

function save_pgm(canvas, ctx, default_filename) {
    
    const image_data = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    let picture_string = 'P2\n';
    picture_string += canvas.width + ' ' + canvas.height + '\n';
    picture_string += '255\n';
    for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
            // we only access the red color channel as its a grayscale image
            const pixel_index = (y * canvas.width + x) * 4;
            picture_string += image_data.data[pixel_index] + ' '; 
        }
        picture_string += '\n';
    }

    let blob = new Blob([picture_string], {type: 'image/x-portable-graymap'});
    let url = window.URL.createObjectURL(blob);

    let fileName = document.getElementById('ict-fileName').value.trim().replace(/[\\\/:*?"<>|]/g, '');
    fileName = (fileName == '') ? default_filename + '.' : fileName + '.';

    let link = document.createElement('a');
    link.href = url;
    link.download = fileName + 'pgm';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);
}

function save_ppm(canvas, ctx, default_filename) {
    
    const image_data = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    let picture_string = 'P3\n';
    picture_string += canvas.width + ' ' + canvas.height + '\n';
    picture_string += '255\n';
    for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
            // we only access the red, green and blue color channel as its a color image (ignore alpha channel)
            const pixel_index = (y * canvas.width + x) * 4;
            picture_string += image_data.data[pixel_index] + ' ' + image_data.data[pixel_index + 1] + ' ' + image_data.data[pixel_index + 2] + ' '; 
        }
        picture_string += '\n';
    }

    let blob = new Blob([picture_string], {type: 'image/x-portable-pixmap'});
    let url = window.URL.createObjectURL(blob);

    let fileName = document.getElementById('ict-fileName_texturemap').value.trim().replace(/[\\\/:*?"<>|]/g, '');
    fileName = (fileName == '') ? default_filename + '.' : fileName + '.';

    let link = document.createElement('a');
    link.href = url;
    link.download = fileName + 'ppm';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);
}

function save_jpg(canvas, default_filename) {
    
    let url = canvas.toDataURL('image/jpg');

    let fileName = document.getElementById('ict-fileName').value.trim().replace(/[\\\/:*?"<>|]/g, '');
    fileName = (fileName == '') ? default_filename + '.' : fileName + '.';

    let link = document.createElement('a');
    link.href = url;
    link.download = fileName + 'jpg';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);
}

function save_png(canvas, default_filename) {
    
    let url = canvas.toDataURL('image/png');

    let fileName = document.getElementById('ict-fileName').value.trim().replace(/[\\\/:*?"<>|]/g, '');
    fileName = (fileName == '') ? default_filename + '.' : fileName + '.';

    let link = document.createElement('a');
    link.href = url;
    link.download = fileName + 'png';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);
}

function save_geometry() {
    console.log('not yet implemented');
}

export function uploadFile() {

    let file = document.getElementById('file-upload').files[0];
    
    if(file) {
        let reader = new FileReader();

        // define what should be done with the raw text once it is read
        reader.onload = function(e) {
            const buffer = e.target.result;
            const uint8Array = new Uint8Array(buffer);
            const fileInfo = prepareFile(uint8Array);

            if (fileInfo.image == -1) {
                // wrong format or couldn't process data
                alert('Das Format wurde nicht erkannt oder es gab Probleme beim Auslesen der Daten, bitte versuchen Sie es mit einer anderen Datei vom Typen "pgm" oder "ppm"')
                return;
            }

            // get relevant canvas
            let canvas = null;
            let ctx = null;
            switch (active_type) {
                case 'heightmap':
                    if (fileInfo.type == 'ppm') {
                        alert('Für Heightmaps muss das Format "pgm" verwendet werden');
                        return;
                    }
                    canvas = heightmap;
                    ctx = heightmap_ctx;
                    switch(fileInfo.type) {
                        case 'pgm':
                        case 'ppm':
                            document.getElementById('ict-fileWidth').value = fileInfo.width;
                            document.getElementById('ict-fileHeight').value = fileInfo.height;
                            break;
                    }
                    break;
                case 'texturemap':
                    canvas = texturemap;
                    ctx = texturemap_ctx;
                    switch(fileInfo.type) {
                        case 'pgm':
                        case 'ppm':
                            document.getElementById('ict-fileWidth_texturemap').value = fileInfo.width;
                            document.getElementById('ict-fileHeight_texturemap').value = fileInfo.height;
                            break;
                    }
                    break;
            }
        
            switch(fileInfo.type) {
                case 'pgm':
                    pgmToCanvas(canvas, fileInfo);
                    break;
                case 'ppm':
                    ppmToCanvas(canvas, fileInfo);
                    break;
                case 'jpg':
                    jpgToCanvas(canvas, ctx, buffer);
                    break;
                case 'png':
                    pngToCanvas(canvas, ctx, buffer);
                    break;
            }
        }
        
        reader.readAsArrayBuffer(file);

        // cuts off file extension
        const fileName = file.name.split('.').slice(0, -1).join('.');

        switch(active_type) {
            case 'heightmap':
                document.getElementById('ict-fileName').value = fileName;
                break;
            case 'texturemap':
                document.getElementById('ict-fileName_texturemap').value = fileName;
                break;
        }
    }
}

// function to skip all leading white spaces in the file
function skipWhiteSpace(uint8Array) {
    let index = 0;
    while (index < uint8Array.length && (uint8Array[index] === 0x20 || uint8Array[index] === 0x09 || uint8Array[index] === 0x0A || uint8Array[index] === 0x0D)) {
        index++;
    }
    return index;
}

function prepareFile(uint8Array) {
    let fileInfo = {};
    let file = null;
    
    let startIndex = skipWhiteSpace(uint8Array);

    // Check the first few bytes of the file after skipping white spaces
    const isPPM = uint8Array[startIndex] === 0x50 && uint8Array[startIndex + 1] === 0x33; // PPM starts with "P3" or "P6"
    const isPGM = uint8Array[startIndex] === 0x50 && uint8Array[startIndex + 1] === 0x32; // PGM starts with "P2" or "P5"
    const isJPG = uint8Array[startIndex] === 0xFF && uint8Array[startIndex + 1] === 0xD8; // JPG starts with 0xFFD8
    const isPNG = uint8Array[startIndex] === 0x89 && uint8Array[startIndex + 1] === 0x50 && uint8Array[startIndex + 2] === 0x4E && uint8Array[startIndex + 3] === 0x47; // PNG starts with PNG signature

    let type = -1;
    if (isPPM) {
        type = 'ppm';
        file = new TextDecoder().decode(uint8Array);
        file = file.trim();
    } else if (isPGM) {
        type = 'pgm';
        file = new TextDecoder().decode(uint8Array);
        file = file.trim();
    } else if (isJPG) {
        type = 'jpg';
    } else if (isPNG) {
        type = 'png';
    } 

    fileInfo.type = type;

    let processedFile = [];

    switch (fileInfo.type) {
        case -1:
            processedFile = -1;
            break;
        case 'pgm':
            file = preprocessFile(file);

            var lines = file.split('\n');                       // split lines into array
            lines.shift();                                      // remove header (P2)
            var dimensions = lines.shift().split(' ');          // get the dimensions
            fileInfo.width = parseInt(dimensions[0]);           // get width from dimension
            fileInfo.height = parseInt(dimensions[1]);          // get height from dimension
            fileInfo.maxValue   = parseInt(lines.shift());      // get the brightness maxValue 
            var picInfo = lines.join(' ').trim().split(/\s+/);

            for (var y = 0; y < fileInfo.height; y++) {
                var newRow = [];
                for (var x = 0; x < fileInfo.width; x++) {
                    var currIndex = fileInfo.width * y + x;

                    // check if in range. If not, set default values
                    if(currIndex >= picInfo.length) {
                        var pixelVal = 255;
                    }
                    else {
                        var pixelVal = Math.round((parseInt(picInfo[currIndex]) / fileInfo.maxValue ) * 255);
                    }
                    newRow.push(pixelVal);
                }
                processedFile.push(newRow);
            }
            break;
        case 'ppm':
            file = preprocessFile(file);

            var lines = file.split('\n');                       // split lines into array
            lines.shift();                                      // remove header (P2)
            var dimensions = lines.shift().split(' ');          // get the dimensions
            fileInfo.width = parseInt(dimensions[0]);           // get width from dimension
            fileInfo.height = parseInt(dimensions[1]);          // get height from dimension
            fileInfo.maxValue = parseInt(lines.shift());        // get the brightness maxValue 
            var picInfo = lines.join(' ').trim().split(/\s+/);

            for (var y = 0; y < fileInfo.height; y++) {
                var newRow = [];
                for (var x = 0; x < fileInfo.width; x++) {
                    var currIndex = (fileInfo.width * y + x) * 3;

                    var rgb = [];

                    // check if in range. If not, set default values
                    if(currIndex >= picInfo.length) {
                        var pixelVal = 255;
                        rgb.push(pixelVal); //r
                        rgb.push(pixelVal); //g
                        rgb.push(pixelVal); //b
                    }
                    else {
                        rgb.push(Math.round((parseInt(picInfo[currIndex]) / fileInfo.maxValue ) * 255));      //r
                        rgb.push(Math.round((parseInt(picInfo[currIndex + 1]) / fileInfo.maxValue ) * 255));  //g
                        rgb.push(Math.round((parseInt(picInfo[currIndex + 2]) / fileInfo.maxValue ) * 255));  //b
                    }
                    newRow.push(rgb);
                }
                processedFile.push(newRow);
            }
            break;
    }

    fileInfo.image = processedFile;

    return fileInfo;
}

function preprocessFile(rawFile) {

    // this gets rid of comments after a '#'
    let processedFile = rawFile.replace(/#[^\n]*/g, '');
    
    // this removes all empty lines
    processedFile = processedFile.replace(/^\s*\n/gm, '');
    
    return processedFile;
}

function pgmToCanvas(canvas, picInfo) {    
    canvas.width = picInfo.width;
    canvas.height = picInfo.height;
    let context = canvas.getContext('2d');

    for (let x = 0; x < canvas.width; x++) {
        for (let y = 0; y < canvas.height; y++) {
            context.fillStyle = 'rgb(' + picInfo.image[y][x] + ', ' + picInfo.image[y][x] + ', ' + picInfo.image[y][x] + ')';
            context.fillRect(x, y, 1, 1);
        }
    }

    update_textures();

    //////////////////// reset brush parameters to current values ///////////////////
    updateColor();
    updateOpacity();
    updateBrushSize();
    heightmap_ctx.lineCap = 'round';
    heightmap_ctx.lineJoin = 'round';
    texturemap_ctx.lineCap = 'round';
    texturemap_ctx.lineJoin = 'round';
}

function ppmToCanvas(canvas, picInfo) {
    canvas.width = picInfo.width;
    canvas.height = picInfo.height;
    let context = canvas.getContext('2d');

    for (let x = 0; x < canvas.width; x++) {
        for (let y = 0; y < canvas.height; y++) {
            context.fillStyle = 'rgb(' + picInfo.image[y][x][0] + ', ' + picInfo.image[y][x][1] + ', ' + picInfo.image[y][x][2] + ')';
            context.fillRect(x, y, 1, 1);
        }
    } 

    update_textures();

    //////////////////// reset brush parameters to current values ///////////////////
    updateColor();
    updateOpacity();
    updateBrushSize();
    heightmap_ctx.lineCap = 'round';
    heightmap_ctx.lineJoin = 'round';
    texturemap_ctx.lineCap = 'round';
    texturemap_ctx.lineJoin = 'round';
}

function jpgToCanvas(canvas, ctx, buffer) {
    const blob = new Blob([buffer], {type: 'image/jpg'});
    const imageURL = URL.createObjectURL(blob);

    const image = new Image();

    image.onload = async function() {
        canvas.width = image.width;
        canvas.height = image.height;

        switch (active_type) {
            case 'heightmap':
                const imageBitmap = await createImageBitmap(image);
                ctx.filter = 'grayscale(100%)';
                ctx.drawImage(imageBitmap, 0, 0);
                ctx.filter = 'none';
                document.getElementById('ict-fileWidth').value = image.width;
                document.getElementById('ict-fileHeight').value = image.height; 
                break;
            case 'texturemap':
                ctx.drawImage(image, 0, 0);   
                document.getElementById('ict-fileWidth_texturemap').value = image.width;
                document.getElementById('ict-fileHeight_texturemap').value = image.height;    
                break;
        }

        update_textures();

        //////////////////// reset brush parameters to current values ///////////////////
        updateColor();
        updateOpacity();
        updateBrushSize();
        heightmap_ctx.lineCap = 'round';
        heightmap_ctx.lineJoin = 'round';
        texturemap_ctx.lineCap = 'round';
        texturemap_ctx.lineJoin = 'round';

        URL.revokeObjectURL(imageURL);
    }

    image.onerror = function() {
        alert('Bild konnte nicht geladen werden');
    };

    image.src = imageURL;
}

function pngToCanvas(canvas, ctx, buffer) {
    const blob = new Blob([buffer], {type: 'image/png'});
    const imageURL = URL.createObjectURL(blob);

    const image = new Image();

    image.onload = async function() {
        canvas.width = image.width;
        canvas.height = image.height;

        switch (active_type) {
            case 'heightmap':
                const imageBitmap = await createImageBitmap(image);
                ctx.filter = 'grayscale(100%)';
                ctx.drawImage(imageBitmap, 0, 0);
                document.getElementById('ict-fileWidth').value = image.width;
                document.getElementById('ict-fileHeight').value = image.height; 
                break;
            case 'texturemap':
                ctx.drawImage(image, 0, 0);   
                document.getElementById('ict-fileWidth_texturemap').value = image.width;
                document.getElementById('ict-fileHeight_texturemap').value = image.height;    
                break;
        }

        update_textures();

        //////////////////// reset brush parameters to current values ///////////////////
        updateColor();
        updateOpacity();
        updateBrushSize();
        heightmap_ctx.lineCap = 'round';
        heightmap_ctx.lineJoin = 'round';
        texturemap_ctx.lineCap = 'round';
        texturemap_ctx.lineJoin = 'round';

        URL.revokeObjectURL(imageURL);
    }

    image.onerror = function() {
        alert('Bild konnte nicht geladen werden');
    };

    image.src = imageURL;
}

function toggleAutoRefresh(checkbox) {
    autorefresh = checkbox.checked;
    if(autorefresh) {
        display();
    }
}

function display() {
    update_terrain_heightmap();
    update_terrain_texture();
}