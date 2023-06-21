function uploadFile() {
    let file = document.getElementById('file-upload').files[0];
    
    if(file) {
        let reader = new FileReader();

        // define what should be done with the raw text once it is read
        reader.onload = function(e) {
            let content = e.target.result;

            let textarea = document.querySelector('.ict-code');
            textarea.innerHTML = content;

            // trigger 'keyup' event to have code enumeration
            let event = new KeyboardEvent('keyup', {});
            textarea.dispatchEvent(event);

            display();
        }

        reader.readAsText(file);
        // cuts off file extension
        let fileName = file.name.split('.').slice(0, -1).join('.');
        document.getElementById('ict-fileName').value = fileName;

    }
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

    let blob = new Blob([rawFile], {type: content.fileInfo.type});

    let url = window.URL.createObjectURL(blob);

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
    let rawFile = document.querySelector('.ict-code').value.trim();

    let fileInfo = getFileInfo(rawFile);

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
            console.log(cleanFile);

            var lines = cleanFile.split('\n');              // split lines into array
            lines.shift();                                  // remove header (P1)
            var dimensions = lines.shift().split(' ');      // get the dimensions
            var width = parseInt(dimensions[0]);            // get width from dimension
            var height = parseInt(dimensions[1]);           // get height from dimension

            svg += '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n';
            svg += '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + width + ' ' + height + '">\n';

            var picInfo = lines.join(' ').split(/\s+/);

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
            console.log(cleanFile);
            
            var lines = cleanFile.split('\n');              // split lines into array
            lines.shift();                                  // remove header (P2)
            var dimensions = lines.shift().split(' ');      // get the dimensions
            var width = parseInt(dimensions[0]);            // get width from dimension
            var height = parseInt(dimensions[1]);           // get height from dimension
            var maxValue = parseInt(lines.shift());         // get the brightness maxValue 
            
            svg += '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n';
            svg += '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + width + ' ' + height + '">\n';

            var picInfo = lines.join(' ').split(/\s+/);

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
            console.log(cleanFile);

            var lines = cleanFile.split('\n');              // split lines into array
            lines.shift();                                  // remove header (P3)
            var dimensions = lines.shift().split(' ');      // get the dimensions
            var width = parseInt(dimensions[0]);            // get width from dimension
            var height = parseInt(dimensions[1]);           // get height from dimension
            var maxValue = parseInt(lines.shift());         // get the brightness maxValue 
            
            svg += '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n';
            svg += '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + width + ' ' + height + '">\n';

            var picInfo = lines.join(' ').split(/\s+/);

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
    
    let content = getContent();

    if(content == -1) {
        console.log('Format wurde nicht erkannt');
        return;
    }

    let svgFile = transformToSvg(content.rawFile, content.fileInfo.type);

    //console.log(svgFile);

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