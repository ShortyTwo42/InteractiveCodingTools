function uploadFile() {
    let file = document.getElementById('file-upload').files[0];
    
    if(file) {
        let reader = new FileReader();

        // define what should be done with the raw text once it is read
        reader.onload = function(e) {
            const buffer = e.target.result;
            const uint8Array = new Uint8Array(buffer);
            const fileContent = prepareFile(uint8Array);

            if (fileContent == -1) {
                // wrong format or couldn't process data
                alert('Das Format wurde nicht erkannt oder es gab Probleme beim Auslesen der Daten, bitte versuchen Sie es mit einer anderen Datei vom Typen "pbm", "pgm", "ppm" oder "svg"')
                return;
            }

            let textarea = document.querySelector('.ict-code');
            textarea.value = fileContent;

            // trigger 'keyup' event to have code enumeration
            let event = new KeyboardEvent('keyup', {});
            textarea.dispatchEvent(event);

            display();
        }

        reader.readAsArrayBuffer(file);
        // cuts off file extension
        let fileName = file.name.split('.').slice(0, -1).join('.');
        document.getElementById('ict-fileName').value = fileName;
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
    
    const startIndex = skipWhiteSpace(uint8Array);

    // Check the first few bytes of the file after skipping white spaces
    const isPPM = uint8Array[startIndex] === 0x50 && uint8Array[startIndex + 1] === 0x33; // PPM starts with "P3"
    const isPGM = uint8Array[startIndex] === 0x50 && uint8Array[startIndex + 1] === 0x32; // PGM starts with "P2"
    const isPBM = uint8Array[startIndex] === 0x50 && uint8Array[startIndex + 1] === 0x31; // PPM starts with "P1"

    let fileContent = -1;
    if (isPPM) {
        fileContent = new TextDecoder().decode(uint8Array);
        fileContent = fileContent.trim();
    } else if (isPGM) {
        fileContent = new TextDecoder().decode(uint8Array);
        fileContent = fileContent.trim();
    } else if (isPBM) {
        fileContent = new TextDecoder().decode(uint8Array);
        fileContent = fileContent.trim();
    } else {
        // check if it is an svg
        fileContent = new TextDecoder().decode(uint8Array);
        fileContent = fileContent.trim();

        if(!(fileContent.startsWith('<svg') || fileContent.startsWith('<?xml') && fileContent.includes('<svg'))) {
            fileContent = -1;
        } 
    }

    return fileContent;
}
   
function downloadFile() {

    let content = getContent();

    if (content == -1) {
        console.log('Format wurde nicht erkannt');
        return;
    }

    let rawFile = content.rawFile;

    // add necessary tags to make it a valid SVG file
    if(content.fileInfo.type == 'image/svg+xml') {
        rawFile = transformToSvg(rawFile, 'image/svg+xml');
    }

    const blob = new Blob([rawFile], {type: content.fileInfo.type});

    const url = window.URL.createObjectURL(blob);

    let fileName = document.getElementById('ict-fileName').value.trim().replace(/[\\\/:*?"<>|]/g, '');
    fileName = (fileName == '') ? 'Bild.' : fileName + '.';

    let link = document.createElement('a');
    link.href = url;
    link.download = fileName + content.fileInfo.extension;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);
}

function getContent() {
    let content = {};

    // get the input of our editor
    const rawFile = document.querySelector('.ict-code').value.trim();

    const fileInfo = getFileInfo(rawFile);

    if(fileInfo == -1) {
        return fileInfo;
    }

    content.fileInfo = fileInfo;
    content.rawFile = rawFile;

    return content;
}

function transformToSvg(rawFile, type = 'image/svg+xml') {
    
    let svg = '';
    
    switch (type) {
        case 'image/x-portable-bitmap':
            var cleanFile = preprocessFile(rawFile);
            // console.log(cleanFile);

            var lines = cleanFile.split('\n');              // split lines into array
            lines.shift();                                  // remove header (P1)
            var dimensions = lines.shift().split(' ');      // get the dimensions
            var width = parseInt(dimensions[0]);            // get width from dimension
            var height = parseInt(dimensions[1]);           // get height from dimension

            svg += '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n';
            svg += '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + width + ' ' + height + '">\n';

            var picInfo = lines.join(' ').trim().split(/\s+/);

            for (var y = 0; y < height; y++) { 
                for (var x = 0; x < width; x++) {
                    
                    var currIndex = width * y + x;
                    
                    // check if in range. If not, set default values
                    if(currIndex >= picInfo.length) {
                        var pixelVal = 'white';
                    }
                    else {
                        var pixelVal = parseInt(picInfo[currIndex]) == 1 ? 'black' : 'white';
                    }

                    var newRect = '<rect x="' + x +'" y="' + y + '" width="1" height="1" fill="'+ pixelVal +'"/>\n'
                    svg += newRect;
                }
            }

            svg += '</svg>';

            break;
        case 'image/x-portable-graymap':
            var cleanFile = preprocessFile(rawFile);
            // console.log(cleanFile);
            
            var lines = cleanFile.split('\n');              // split lines into array
            lines.shift();                                  // remove header (P2)
            var dimensions = lines.shift().split(' ');      // get the dimensions
            var width = parseInt(dimensions[0]);            // get width from dimension
            var height = parseInt(dimensions[1]);           // get height from dimension
            var maxValue = parseInt(lines.shift());         // get the brightness maxValue 
            
            svg += '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n';
            svg += '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + width + ' ' + height + '">\n';

            var picInfo = lines.join(' ').trim().split(/\s+/);

            for (var y = 0; y < height; y++) { 
                for (var x = 0; x < width; x++) {
                    
                    var currIndex = width * y + x;
                    
                    // check if in range. If not, set default values
                    if(currIndex >= picInfo.length) {
                        var pixelVal = 255;
                    }
                    else {
                        var pixelVal = Math.round((parseInt(picInfo[currIndex]) / maxValue) * 255);
                    }

                    var newRect = '<rect x="' + x +'" y="' + y + '" width="1" height="1" fill="rgb(' + pixelVal + ',' + pixelVal + ',' + pixelVal + ')"/>\n'
                    svg += newRect;
                }
            }

            svg += '</svg>';
            
            break;
        case 'image/x-portable-pixmap':
            var cleanFile = preprocessFile(rawFile);
            // console.log(cleanFile);

            var lines = cleanFile.split('\n');              // split lines into array
            lines.shift();                                  // remove header (P3)
            var dimensions = lines.shift().split(' ');      // get the dimensions
            var width = parseInt(dimensions[0]);            // get width from dimension
            var height = parseInt(dimensions[1]);           // get height from dimension
            var maxValue = parseInt(lines.shift());         // get the brightness maxValue 
            
            svg += '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n';
            svg += '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + width + ' ' + height + '">\n';

            var picInfo = lines.join(' ').trim().split(/\s+/);

            for (var y = 0; y < height; y++) { 
                for (var x = 0; x < width; x++) {
                    
                    var currIndex = (width * y + x) * 3;
                    
                    // check if in range. If not, set default values
                    if(currIndex >= picInfo.length) {
                        var pixelVal = 255;
                        var r = pixelVal;
                        var g = pixelVal;
                        var b = pixelVal;
                    }
                    else {
                        var r = Math.round((parseInt(picInfo[currIndex]) / maxValue) * 255);
                        var g = Math.round((parseInt(picInfo[currIndex + 1]) / maxValue) * 255);
                        var b = Math.round((parseInt(picInfo[currIndex + 2]) / maxValue) * 255);
                    }

                    var newRect = '<rect x="' + x +'" y="' + y + '" width="1" height="1" fill="rgb(' + r + ',' + g + ',' + b + ')"/>\n'
                    svg += newRect;
                }
            }

            svg += '</svg>';

            break;
        case 'image/svg+xml':
            svg = rawFile;
        
            if (!svg.includes('xmlns')) {
                svg = svg.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
            }
            
            if (!svg.includes('<?xml')) {
                svg = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n${svg}`;
            }
            break;
        default:
            break;
    }
    
    return svg;
}

function getFileInfo(rawFile) {
    
    let fileInfo = {}

    if(rawFile.startsWith('P1')) {
        fileInfo.type = 'image/x-portable-bitmap';
        fileInfo.extension = 'pbm';
    }
    else if(rawFile.startsWith('P2')) {
        fileInfo.type = 'image/x-portable-graymap';
        fileInfo.extension = 'pgm';
    }  
    else if(rawFile.startsWith('P3')) {
        fileInfo.type = 'image/x-portable-pixmap';
        fileInfo.extension = 'ppm';
    }  
    else if(rawFile.startsWith('<svg') || rawFile.startsWith('<?xml') && rawFile.includes('<svg')) {
        fileInfo.type = 'image/svg+xml';
        fileInfo.extension = 'svg';
    }
    else {
        fileInfo = -1;
    }  

    return fileInfo;
}

function display() {
    
    const content = getContent();

    if(content == -1) {
        console.log('Format wurde nicht erkannt');
        return;
    }

    let svgFile = '';
    try {
        svgFile = transformToSvg(content.rawFile, content.fileInfo.type);
    }
    catch {
        
    }

    let display = document.querySelector('.ict-display');
    display.innerHTML = svgFile;   
}

function toggleAutoRefresh(checkbox) {
    
    let textarea = document.querySelector('.ict-code');
    
    if(checkbox.checked) {
        textarea.setAttribute('oninput', 'display()');
    }
    else {
        textarea.setAttribute('oninput', '');
    }
}

function preprocessFile(rawFile) {
    
    // this gets rid of comments after a '#'
    let processedFile = rawFile.replace(/#[^\n]*/g, '');
    
    // this removes all empty lines
    processedFile = processedFile.replace(/^\s*\n/gm, '');
    
    return processedFile;
}

function changeSVG() {
    const example_type = document.getElementById('example_type').value;

    const example_3_div = document.getElementById('example_3_div');
    const example_4_div = document.getElementById('example_4_div');

    if (example_type == 'xml') {
        example_3_div.style.display = 'none';
        example_4_div.style.display = '';

        if(getSelectedRadioValue('example') == 'videogame_character') {
            document.getElementById('example_4').checked = true;
        }
    } else {
        example_3_div.style.display = '';
        example_4_div.style.display = 'none';

        if(getSelectedRadioValue('example') == 'file_icon') {
            document.getElementById('example_3').checked = true;
        }
    }
}

async function uploadExample() {
      
    // for SVGs we use the extension xml, so the live server doesn't inject javascript
    const example_type = document.getElementById('example_type').value;
    const value = getSelectedRadioValue('example');
    
    let fileUrl = null;
    let fileName = '';

    switch (value) {
        case 'smiley':
            fileUrl = '../Sample_Images/MyPicCoder/smiley.' + example_type;
            fileName = value;
            break;
        case 'house':
            fileUrl = '../Sample_Images/MyPicCoder/house.' + example_type;
            fileName = value;
            break;
        case 'videogame_character':
            fileUrl = '../Sample_Images/MyPicCoder/videogame_character.' + example_type;
            fileName = value;
            break;
        case 'file_icon':
            fileUrl = '../Sample_Images/MyPicCoder/file_icon.' + example_type;
            fileName = value;
            break;
    }


    try {
        const response = await fetch(fileUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const fileContent = await response.text();
        
        if(fileContent) {
            
            const textarea = document.querySelector('.ict-code');
            textarea.value = fileContent;

            display();
            
            document.getElementById('ict-fileName').value = fileName;

            // trigger 'keyup' event to have code enumeration
            let event = new KeyboardEvent('keyup', {});
            textarea.dispatchEvent(event);
        }
    } catch (error) {
        alert('Beim hochladen des Beispiels kam es zu einem Problem');
    }
}