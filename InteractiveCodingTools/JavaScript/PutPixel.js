const maxAllowedTime = 5000;
let picture_width;
let picture_height;
let myPic;

let file_width = null;
let file_height = null;

document.addEventListener('DOMContentLoaded', function() {
    file_width = document.getElementById('ict-fileWidth');
    file_height = document.getElementById('ict-fileHeight');
    
    file_width.addEventListener('input', updateOutput);
    file_height.addEventListener('input', updateOutput);

    resetToDefault();
}, false);

function resetToDefault() {
    
    picture_width = 10;
    picture_height = 10;

    file_width.value = picture_width;
    file_height.value = picture_height;

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

// whitelisted functions
const allowed_functions = ['putPixel', 'for', 'if'];
const functionCallRegex = /\b\w+\.\w+\s*\(\s*[^)]*\s*\)/g;

// only allow certain functions and API calls
function check_code_saefty(code) {

    const non_whitelisted_functions = code.match(functionCallRegex) || []
        .map(match => match.match(/\b\w+\.\w+/)[0])
        .filter(func => !allowed_functions.includes(func));

    if (non_whitelisted_functions.length > 0) {
        let string = 'Diese Funktionsaufrufe haben die Durchführung verhindert:\n';
        for (let i = 0; i < non_whitelisted_functions.length; i++) {
            string += non_whitelisted_functions[i] + '\n';
        }
        alert('Bitte verwende nur "for-Schleifen", "if-Abfragen" oder die Funktion "putPixel"\n' + string);
        return '';
    }

    return addTimeout(code);
}

const timeLimitText = '"Das erlaubte Zeitlimit (5 Sekunden) für die Durchführung des Codes wurde überschritten. Möglicherweise gibt es eine Endlosschleife oder eine Schleife wird zu häufig aufgerufen."';

function addTimeout(userCode) {
    // we add this code after every loop call, to break the function, if it takes too long (prevents infinite loops)
    let addCode = 'if (should_stop(startTime)) {\n';
    addCode += '\talert('+ timeLimitText + ');\n';
    addCode += '\treturn;\n';
    addCode += '}\n';

    const lines = userCode.split('\n');
    const modifiedLines = [];

    modifiedLines.push('const startTime = new Date().getTime();\n');
  
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.includes('for (') || line.includes('while (') || line.includes('do {')) {
            modifiedLines.push(line);
            modifiedLines.push(addCode);
        } 
        else {
            modifiedLines.push(line);
        }
    }
    return modifiedLines.join('\n');
}

// we call this function to check if we should break our current function because it takes too much time
function should_stop(startTime) {
    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - startTime;

    return elapsedTime > maxAllowedTime;
}

function updateOutput() {
    
    picture_width = parseInt(file_width.value);
    picture_height = parseInt(file_height.value);

    picture_width = Math.max(file_width.min, Math.min(file_width.max, picture_width));
    picture_height = Math.max(file_height.min, Math.min(file_height.max, picture_height));

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

function handleDecrease() {
    updateOutput();
}

function handleIncrease() {
    updateOutput();
}