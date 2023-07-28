const maximumExecutionTime = 3000;
let picture_width;
let picture_height;
let myPic;

document.addEventListener('DOMContentLoaded', function() {
    resetToDefault();
}, false);

function resetToDefault() {
    
    picture_width = 10;
    picture_height = 10;

    document.getElementById('ict-fileWidth').value = picture_width;
    document.getElementById('ict-fileHeight').value = picture_height;

    let defaultCode = ''
    defaultCode += 'for (let y = 0; y < picture_height; y++) {\n'
    defaultCode += '\tfor (let x = 0; x < picture_width; x++) {\n'
    defaultCode += '\t\tif (x == y) {\n'
    defaultCode += '\t\t\tputPixel(x, y);\n'
    defaultCode += '\t\t}\n'
    defaultCode += '\t}\n'
    defaultCode += '}'

    let textarea = document.querySelector('.ict-code');

    textarea.value = defaultCode;

    // trigger 'keyup' event to have code enumeration
    let event = new KeyboardEvent('keyup', {});
    textarea.dispatchEvent(event);

    tryExecuteCode();
}

function tryExecuteCode() {
    try {
        executeCode();
    } catch {
        console.log('something went wrong!');
    }
}

function executeCode() {

    const numRows = picture_height; // Number of rows
    const numCols = picture_width; // Number of columns
    
    // reset myPic as 2d array
    myPic = Array.from({ length: numRows }, () => Array(numCols).fill([255, 255, 255]));

    const code = document.querySelector('.ict-code').value;

    const safe_code = check_code_saefty(code);

    const userFunction = Function(safe_code);
    userFunction();

    const svgFile = createSVG();

    let display = document.querySelector('.ict-display');
    display.innerHTML = svgFile; 
}

// whitelisted functions, variables
const allowed_functions = ['putPixel', 'for', 'if'];
const functionCallRegex = /\b\w+\s*\(\s*\)/g;

// only allow certain functions and API calls
function check_code_saefty(code) {

    const non_whitelisted_functions = code.match(functionCallRegex) || []
        .map(match => match.trim().replace('(', ''))
        .filter(func => !allowed_functions.includes(func));

    if (non_whitelisted_functions.length > 0) {
        alert('Bitte verwende nur "for-Schleifen", "if-Abfragen" oder die Funktion "putPixel"');
        return '';
    }

    //add timeout to function to terminate it, if it takes too long
    let safe_code = code;
    
    return safe_code;
}

function executeWithTimeout(func, timeout) {
    
    
}

function updateOutput() {
    picture_width = parseInt(document.getElementById('ict-fileWidth').value);
    picture_height = parseInt(document.getElementById('ict-fileHeight').value);
    tryExecuteCode();
}

function putPixel(x, y, rgb = null) {
    
    if (0 <= x < picture_width && 0 <= y < picture_height) {

        let color = [0, 0, 0];
        
        // if rgb is null set color to black
        if (Number.isInteger(rgb)) {
            color = [rgb, rgb, rgb];
        }
        else if (Array.isArray(rgb) && !rgb.some(i => !Number.isInteger(i)) && rgb.length == 1) {
            color = [rgb[0], rgb[0], rgb[0]];
        }
        else if (Array.isArray(rgb) && !rgb.some(i => !Number.isInteger(i)) && rgb.length == 3) {
            color = rgb;
        }

        myPic[y][x] = color;
    }
}

function createSVG() {
    
    let svg =   '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n';
    svg +=      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + picture_width + ' ' + picture_height + '">\n';

    for (let y = 0; y < picture_height; y++) {
        for (let x = 0; x < picture_width; x++) {
            let r = myPic[y][x][0];
            let g = myPic[y][x][1];
            let b = myPic[y][x][2];

            let newRect = '<rect x="' + x +'" y="' + y + '" width="1" height="1" fill="rgb(' + r + ',' + g + ',' + b + ')"/>\n';
            svg += newRect;
        }
    }

    return svg;
}