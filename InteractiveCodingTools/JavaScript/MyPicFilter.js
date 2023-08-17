// used to store information
let currentPicture = null;
let filteredPicture = null;
let currentFilterType = 'none';

document.addEventListener('DOMContentLoaded', function(){
    // initialize filter previews
    setFilterPreview('median');
    setFilterPreview('mean');
    setFilterPreview('gaussian');
});

function uploadFile() {

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
                alert('Das Format wurde nicht erkannt oder es gab Probleme beim Auslesen der Daten, bitte versuchen Sie es mit einer anderen Datei vom Typen ".pgm", ".ppm", ".jpg" oder ".pgm"')
                return;
            }

            // set pixel values of canvas element
            const canvas = document.getElementById('original_img');
            const ctx = canvas.getContext('2d', { willReadFrequently: true });

            switch(fileInfo.type) {
                case 'pgm':
                    currentPicture = fileInfo;
                    pgmToCanvas(canvas, currentPicture);
                    break;
                case 'ppm':
                    currentPicture = fileInfo;
                    ppmToCanvas(canvas, currentPicture);
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

function pgmToCanvas(canvas, picInfo) {
    // get rid of download as ppm
    let save_as = document.getElementById('save_as');
    let hide_option = save_as.querySelector('option[value=ppm]');
    let show_option = save_as.querySelector('option[value=pgm]');
    hide_option.style.display = 'none';
    show_option.style.display = '';
    save_as.value = 'pgm';
    
    document.getElementById('ict-fileWidth').value = picInfo.width;
    document.getElementById('ict-fileHeight').value = picInfo.height;
    
    canvas.width = picInfo.width;
    canvas.height = picInfo.height;
    let context = canvas.getContext('2d');

    for (let x = 0; x < canvas.width; x++) {
        for (let y = 0; y < canvas.height; y++) {
            context.fillStyle = 'rgb(' + picInfo.image[y][x] + ', ' + picInfo.image[y][x] + ', ' + picInfo.image[y][x] + ')';
            context.fillRect(x, y, 1, 1);
        }
    }
}

function ppmToCanvas(canvas, picInfo) {
    // get rid of download as pgm
    let save_as = document.getElementById('save_as');
    let hide_option = save_as.querySelector('option[value=pgm]');
    let show_option = save_as.querySelector('option[value=ppm]');
    hide_option.style.display = 'none';
    show_option.style.display = '';
    save_as.value = 'ppm';

    document.getElementById('ict-fileWidth').value = picInfo.width;
    document.getElementById('ict-fileHeight').value = picInfo.height;

    canvas.width = picInfo.width;
    canvas.height = picInfo.height;
    let context = canvas.getContext('2d');

    for (let x = 0; x < canvas.width; x++) {
        for (let y = 0; y < canvas.height; y++) {
            context.fillStyle = 'rgb(' + picInfo.image[y][x][0] + ', ' + picInfo.image[y][x][1] + ', ' + picInfo.image[y][x][2] + ')';
            context.fillRect(x, y, 1, 1);
        }
    } 
}

function jpgToCanvas(canvas, ctx, buffer) {
    const blob = new Blob([buffer], {type: 'image/jpg'});
    const imageURL = URL.createObjectURL(blob);

    const image = new Image();

    image.onload = async function() {
        canvas.width = image.width;
        canvas.height = image.height;

        document.getElementById('ict-fileWidth').value = image.width;
        document.getElementById('ict-fileHeight').value = image.height;

        ctx.drawImage(image, 0, 0);         

        setFileInfoFromCanvas(canvas, ctx);

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

        document.getElementById('ict-fileWidth').value = image.width;
        document.getElementById('ict-fileHeight').value = image.height;

        ctx.drawImage(image, 0, 0);   
        
        setFileInfoFromCanvas(canvas, ctx);

        URL.revokeObjectURL(imageURL);
    }

    image.onerror = function() {
        alert('Bild konnte nicht geladen werden');
    };

    image.src = imageURL;
}

function setFileInfoFromCanvas(canvas, ctx) {
    // check if the image is a grayscale image
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

    currentPicture = {};

    currentPicture.width = canvas.width;
    currentPicture.height = canvas.height;
    currentPicture.maxValue = 255;

    let isGrayscale = true;
    for (let i = 0; i < imageData.length; i += 4) {
        const r = imageData[i];
        const g = imageData[i + 1];
        const b = imageData[i + 2];

        if (r !== g || r !== b) {
            isGrayscale = false;
            break;
        }
    }

    let image = [];

    if (isGrayscale) {
        currentPicture.type = 'pgm';

        for (let y = 0; y < currentPicture.height; y++) {
            let newRow = [];
            for (let x = 0; x < currentPicture.width; x++) {
                // we only access the red color channel as its a grayscale image
                const pixel_index = (y * canvas.width + x) * 4;
                const pixelVal = imageData[pixel_index];
                
                newRow.push(pixelVal);
            }
            image.push(newRow);
        }
        currentPicture.image = image;

        // get rid of download as ppm
        let save_as = document.getElementById('save_as');
        let hide_option = save_as.querySelector('option[value=ppm]');
        let show_option = save_as.querySelector('option[value=pgm]');
        hide_option.style.display = 'none';
        show_option.style.display = '';
        save_as.value = 'pgm';
    }
    else {
        currentPicture.type = 'ppm';

        for (let y = 0; y < currentPicture.height; y++) {
            let newRow = [];
            for (let x = 0; x < currentPicture.width; x++) {
                // we only access the red, green and blue color channel as its a color image (ignore alpha channel)
                const pixel_index = (y * canvas.width + x) * 4;
                let rgb = [];

                rgb.push(imageData[pixel_index]);      //r
                rgb.push(imageData[pixel_index + 1]);  //g
                rgb.push(imageData[pixel_index + 2]);  //b
                
                newRow.push(rgb);
            }
            image.push(newRow);
        }
        currentPicture.image = image;

        // get rid of download as pgm
        let save_as = document.getElementById('save_as');
        let hide_option = save_as.querySelector('option[value=pgm]');
        let show_option = save_as.querySelector('option[value=ppm]');
        hide_option.style.display = 'none';
        show_option.style.display = '';
        save_as.value = 'ppm';
    } 
}

function preprocessFile(rawFile) {

    // this gets rid of comments after a '#'
    let processedFile = rawFile.replace(/#[^\n]*/g, '');
    
    // this removes all empty lines
    processedFile = processedFile.replace(/^\s*\n/gm, '');
    
    return processedFile;
}

function applyFilter() {
    if (currentPicture) {
        // set pixel values of canvas element
        let canvas = document.getElementById('filtered_img');
        
        switch(currentFilterType) {
            case 'none':
                applyNone(canvas);
                break;
            case 'median':
                applyMedian(canvas);
                break;
            case 'mean':
                applyMean(canvas);
                break;
            case 'gaussian':
                applyGaussian(canvas);
                break;
        }
    }
    else {
        // no pic uploaded yet
        alert('Es wurde noch kein Bild zum filtern hochgeladen');
    }
}

function applyNone(canvas) {
    filteredPicture = structuredClone(currentPicture);
    if (filteredPicture.type == 'pgm') {
        pgmToCanvas(canvas, filteredPicture);
    }
    else if (filteredPicture.type == 'ppm') {
        ppmToCanvas(canvas, filteredPicture);
    }
}

function applyMedian(canvas) {
    filteredPicture = structuredClone(currentPicture);

    const radius = parseInt(document.getElementById('median_radius').value);
    const border_treatment = document.getElementById('border_treatment').value;

    for (let x = 0; x < currentPicture.width; x++) {
        for (let y = 0; y < currentPicture.height; y++) {

            let no_border_treatment = false;
            let median_array = [];
            if (currentPicture.type == 'ppm') {
                median_array = {};
                median_array.r = [];
                median_array.g = [];
                median_array.b = [];
            }

            for (let i = x - radius; i <= x + radius; i++) {
                for (let j = y - radius; j <= y + radius; j++) {
                    let x_index = get_x(i, border_treatment);
                    let y_index = get_y(j, border_treatment);

                    // early termination when no border treatment is applied
                    if (x_index == -1 || y_index == -1) {
                        i = x + radius
                        j = y + radius
                        no_border_treatment = true;
                    }
                    else {
                        switch (currentPicture.type) {
                            case 'pgm':
                                median_array.push(currentPicture.image[y_index][x_index]);
                                break;
                            case 'ppm':
                                median_array.r.push(currentPicture.image[y_index][x_index][0]);
                                median_array.g.push(currentPicture.image[y_index][x_index][1]);
                                median_array.b.push(currentPicture.image[y_index][x_index][2]);
                                break;
                        }
                    }
                }
            }

            if (no_border_treatment) {
                switch (currentPicture.type) {
                    case 'pgm':
                        filteredPicture.image[y][x] = 0;
                        break;
                    case 'ppm':
                        filteredPicture.image[y][x][0] = 0;
                        filteredPicture.image[y][x][1] = 0;
                        filteredPicture.image[y][x][2] = 0;
                        break;
                }
            } else {
                switch (currentPicture.type) {
                    case 'pgm':
                        // sort array
                        let col = quicksort(median_array);
                        col = col[(median_array.length - 1) / 2];
                        filteredPicture.image[y][x] = col;
                        break;
                    case 'ppm':
                        // sort arrays
                        let r = quicksort(median_array.r);
                        r = r[(median_array.r.length - 1) / 2];
                        let g = quicksort(median_array.g);
                        g = g[(median_array.g.length - 1) / 2];
                        let b = quicksort(median_array.b);
                        b = b[(median_array.b.length - 1) / 2];
                        filteredPicture.image[y][x][0] = r;
                        filteredPicture.image[y][x][1] = g;
                        filteredPicture.image[y][x][2] = b;
                        break;
                }
            }        
        }
    }
    
    if (currentPicture.type == 'pgm') {
        pgmToCanvas(canvas, filteredPicture);
    }
    else if (currentPicture.type == 'ppm') {
        ppmToCanvas(canvas, filteredPicture);
    }
}

function applyMean(canvas) {
    filteredPicture = structuredClone(currentPicture);

    const length = parseInt(document.getElementById('mean_radius').value) * 2 + 1;
    const kernel = Array(length).fill(1);
    const kernel_divisor = kernel.length;
    const border_treatment = document.getElementById('border_treatment').value;

    let tmp_img = convolve1D(currentPicture.image, kernel, kernel_divisor, 'horizontal', border_treatment);
    filteredPicture.image = convolve1D(tmp_img, kernel, kernel_divisor, 'vertical', border_treatment);

    if (currentPicture.type == 'pgm') {
        pgmToCanvas(canvas, filteredPicture);
    }
    else if (currentPicture.type == 'ppm') {
        ppmToCanvas(canvas, filteredPicture);
    }
}

function applyGaussian(canvas) { 
    filteredPicture = structuredClone(currentPicture);

    const length = parseInt(document.getElementById('gaussian_radius').value) * 2 + 1;
    const kernel = pascal_triangle(length);
    const kernel_divisor = kernel.reduce(function(a, b) { return a + b;} );
    const border_treatment = document.getElementById('border_treatment').value;

    let tmp_img = convolve1D(currentPicture.image, kernel, kernel_divisor, 'horizontal', border_treatment);
    filteredPicture.image = convolve1D(tmp_img, kernel, kernel_divisor, 'vertical', border_treatment);

    if (currentPicture.type == 'pgm') {
        pgmToCanvas(canvas, filteredPicture);
    }
    else if (currentPicture.type == 'ppm') {
        ppmToCanvas(canvas, filteredPicture);
    }
}

// get x index for current filter
function get_x(i, border_treatment) {
    let x;

    // border treatment for x
    if (i < 0) {
        switch (border_treatment) {
            case 'none':
                x = -1;
                break;
            case 'repeat':
                x = 0;
                break;
            case 'mirror':
                let tmp = i * -1;
                x = (tmp >= currentPicture.width) ? currentPicture.width - 1 : tmp;
                break;
        }
    }
    else if (i >= currentPicture.width) {
        switch (border_treatment) {
            case 'none':
                x = -1;
                break;
            case 'repeat':
                x = currentPicture.width - 1;
                break;
            case 'mirror':
                let tmp = (currentPicture.width - 1) - (i - (currentPicture.width - 1));
                x = (tmp < 0) ? 0 : tmp;
                break;
        }
    }
    else {
        x = i;
    }

    return x;   
}

// get y index for current filter
function get_y(j, border_treatment) {
    let y;

    // border treatment for y
    if (j < 0) {
        switch (border_treatment) {
            case 'none':
                y = -1;
                break;
            case 'repeat':
                y = 0;
                break;
            case 'mirror':
                let tmp = j * -1;
                y = (tmp >= currentPicture.height) ? currentPicture.height - 1 : tmp;
                break;
        }
    }
    else if (j >= currentPicture.height) {
        switch (border_treatment) {
            case 'none':
                y = -1;
                break;
            case 'repeat':
                y = currentPicture.height - 1;
                break;
            case 'mirror':
                let tmp = (currentPicture.height - 1) - (j - (currentPicture.height - 1));
                y = (tmp < 0) ? 0 : tmp;
                break;
        }
    }
    else {
        y = j;
    }

    return y;   
}

function convolve1D(input_img, kernel, kernel_divisor, direction, border_treatment) {

    let return_img = structuredClone(input_img);

    const radius = (kernel.length - 1) / 2;

    for (let x = 0; x < currentPicture.width; x++) {
        for (let y = 0; y < currentPicture.height; y++) {

            let no_border_treatment = false;
            let new_value = 0;
            if (currentPicture.type == 'ppm') {
                new_value = {};
                new_value.r = 0;
                new_value.g = 0;
                new_value.b = 0;
            }

            let kernel_index = 0;
            switch (direction) {
                case 'horizontal':
                    for (let i = x - radius; i <= x + radius; i++) {
                        let x_index = get_x(i, border_treatment);
        
                        // early termination when no border treatment is applied
                        if (x_index == -1) {
                            i = x + radius
                            no_border_treatment = true;
                        }
                        else {
                            switch (currentPicture.type) {
                                case 'pgm':
                                    new_value += input_img[y][x_index] * kernel[kernel_index];
                                    break;
                                case 'ppm':
                                    new_value.r += input_img[y][x_index][0] * kernel[kernel_index];
                                    new_value.g += input_img[y][x_index][1] * kernel[kernel_index];
                                    new_value.b += input_img[y][x_index][2] * kernel[kernel_index];
                                    break;
                            }
                        }
                        kernel_index++; 
                    }
                    break;
                case 'vertical':
                    for (let j = y - radius; j <= y + radius; j++) {
                        let y_index = get_y(j, border_treatment);
        
                        // early termination when no border treatment is applied
                        if (y_index == -1) {
                            j = y + radius
                            no_border_treatment = true;
                        }
                        else {
                            switch (currentPicture.type) {
                                case 'pgm':
                                    new_value += input_img[y_index][x] * kernel[kernel_index];
                                    break;
                                case 'ppm':
                                    new_value.r += input_img[y_index][x][0] * kernel[kernel_index];
                                    new_value.g += input_img[y_index][x][1] * kernel[kernel_index];
                                    new_value.b += input_img[y_index][x][2] * kernel[kernel_index];
                                    break;
                            }
                        }
                        kernel_index++; 
                    }
                    break;
            }

            if (no_border_treatment) {
                switch (currentPicture.type) {
                    case 'pgm':
                        return_img[y][x] = 0;
                        break;
                    case 'ppm':
                        return_img[y][x][0] = 0;
                        return_img[y][x][1] = 0;
                        return_img[y][x][2] = 0;
                        break;
                }
            } else {
                switch (currentPicture.type) {
                    case 'pgm':
                        // divide by divisor to normalize the new value
                        return_img[y][x] = new_value / kernel_divisor;
                        break;
                    case 'ppm':
                        // divide by divisor to normalize the new values
                        return_img[y][x][0] = new_value.r / kernel_divisor;
                        return_img[y][x][1] = new_value.g / kernel_divisor;
                        return_img[y][x][2] = new_value.b / kernel_divisor;
                        break;
                }
            }  
        }
    }

    return return_img;
}

function pascal_triangle(length) {

    // to get an array of length n we look at row = length - 1
    let row = length - 1;

    // init prev element and return array
    let prevElem = 1;
    let return_array = [];
    return_array.push(prevElem);

    for (let i = 1; i <= row; i++) {
        let currElem = (prevElem * (row - i + 1)) / i;
        return_array.push(currElem);
        prevElem = currElem;
    }

    return return_array;
}

function toggleFilterMenu() {
    const filterMenu = document.querySelector('.filter_menu');
    const codingSpace = document.querySelector('.ict-codingSpace');
    const previewSpace = document.querySelector('.ict-previewSpace');
    const add_noise_button = document.getElementById('add_noise_button');
    const download_button = document.getElementById('download_button');
    const upload_button = document.getElementById('upload_button');
    const example_button = document.getElementById('example_button');
    const max_original_button = document.getElementById('max_original_button');
    const split_screen_button = document.getElementById('split_screen_button');
    const max_filtered_button = document.getElementById('max_filtered_button');
    const filter_button = document.getElementById('filter_button');
    const file_upload = document.getElementById('file-upload');
    
    let display = filterMenu.style.display;

    switch (display) {
        case 'none':
            codingSpace.style.display = display;
            previewSpace.style.display = display;
            filterMenu.style.display = '';
            add_noise_button.disabled = true;
            download_button.disabled = true;
            upload_button.disabled = true;
            example_button.disabled = true;
            max_original_button.disabled = true;
            split_screen_button.disabled = true;
            max_filtered_button.disabled = true;
            filter_button.disabled = true;
            file_upload.disabled = true;
            break;
        case '':
            codingSpace.style.display = '';
            previewSpace.style.display = '';
            filterMenu.style.display = 'none';
            add_noise_button.disabled = false;
            download_button.disabled = false;
            upload_button.disabled = false;
            example_button.disabled = false;
            max_original_button.disabled = false;
            split_screen_button.disabled = false;
            max_filtered_button.disabled = false;
            filter_button.disabled = false;
            file_upload.disabled = false;
            break;
    }
}

function selectNewFilter($this) {
    const none = document.getElementById('none_tab');
    const median = document.getElementById('median_tab');
    const mean = document.getElementById('mean_tab');
    const gaussian = document.getElementById('gaussian_tab');

    currentFilterType = $this.value;

    switch (currentFilterType) {
        case 'none':
            none.style.display = '';
            median.style.display = 'none';
            mean.style.display = 'none';
            gaussian.style.display = 'none';
            break;
        case 'median':
            none.style.display = 'none';
            median.style.display = '';
            mean.style.display = 'none';
            gaussian.style.display = 'none';
            break;
        case 'mean':
            none.style.display = 'none';
            median.style.display = 'none';
            mean.style.display = '';
            gaussian.style.display = 'none';
            break;
        case 'gaussian':
            none.style.display = 'none';
            median.style.display = 'none';
            mean.style.display = 'none';
            gaussian.style.display = '';
            break;
    }
}

function setFilterPreview(filter_type) {
    
    const middle_pixel = Number(document.getElementById(filter_type + '_radius').max);
    const max_filter_size = middle_pixel * 2 + 1;
    const current_radius = Number(document.getElementById(filter_type + '_radius').value);
    const display = document.getElementById(filter_type + '_filter_preview');
    const lower_limit = middle_pixel - current_radius;
    const upper_limit = middle_pixel + current_radius;

    let svg = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n';
    svg += '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + max_filter_size + ' ' + max_filter_size + '" class="preview_svg">\n';

    for (let y = 0; y < max_filter_size; y++) { 
        for (let x = 0; x < max_filter_size; x++) {
            
            let pixelVal = '#ffffff';
            if(x == middle_pixel && y == middle_pixel) {
                pixelVal = '#ff0000';
            }
            else if (lower_limit <= x && x <= upper_limit && lower_limit <= y && y <= upper_limit ) {
                pixelVal = '#000000';
            }

            let newRect = '<rect x="' + x +'" y="' + y + '" width="1" height="1" fill="'+ pixelVal +'" style="stroke-width: 0.05; stroke: var(--emperor)"/>\n'
            svg += newRect;
        }
    }

    svg += '</svg>';

    display.innerHTML = svg;
}

function handleDecrease(id) {
    let type = id.split('_')[0];
    setFilterPreview(type)
}

function handleIncrease(id) {
    let type = id.split('_')[0];
    setFilterPreview(type)
}

// recursive quicksort algorithm
function quicksort(array) {
    if (array.length <= 1) {
        return array;
    }
    
    let pivot = array[0];
    
    let left = []; 
    let right = [];
    
    for (let i = 1; i < array.length; i++) {
        array[i] < pivot ? left.push(array[i]) : right.push(array[i]);
    }
    
    return quicksort(left).concat(pivot, quicksort(right));
}

function downloadFile() {

    // get info
    const image_type = document.getElementById('save_as').value;
    const save_input = document.getElementById('save_input_image').checked;
    const save_output = document.getElementById('save_output_image').checked;

    if (!save_input && !save_output) {
        alert('Bitte wähle mindestens eines der beiden Bilder über die Checkbox aus');
    }
    
    if (save_input) {
        save_image('input', image_type);
    }

    if (save_output) {
        save_image('output', image_type);
    }
}

function save_image(image_source, image_type) {
    
    switch(image_source) {
        case 'input':
            if (!currentPicture) {
                alert('Es liegt kein Input Bild vor');
                return;
            }
            break;
        case 'output':
            if (!filteredPicture) {
                alert('Es liegt kein Output Bild vor');
                return;
            }
            break;
    }
    
    switch(image_type) {
        case 'pgm':
            save_pgm(image_source);
            break;
        case 'ppm':
            save_ppm(image_source);
            break;
        case 'jpg':
            save_jpg(image_source);
            break;
        case 'png':
            save_png(image_source);
            break;
    }
}

function save_pgm(image_source) {
    
    let picture = null;
    let filtered = '';
    
    switch(image_source) {
        case 'input':
            picture = currentPicture;
            break;
        case 'output':
            picture = filteredPicture;
            filtered = '_gefiltert';    
            break;
    }

    let picture_string = 'P2\n';
    picture_string += picture.width + ' ' + picture.height + '\n';
    picture_string += picture.maxValue + '\n';
    for (let y = 0; y < picture.height; y++) {
        for (let x = 0; x < picture.width; x++) {
            picture_string += picture.image[y][x] + ' ';
        }
        picture_string += '\n';
    }

    let blob = new Blob([picture_string], {type: 'image/x-portable-graymap'});
    let url = window.URL.createObjectURL(blob);

    let fileName = document.getElementById('ict-fileName').value.trim().replace(/[\\\/:*?"<>|]/g, '') + filtered;
    fileName = (fileName == '') ? 'Bild.' : fileName + '.';

    let link = document.createElement('a');
    link.href = url;
    link.download = fileName + 'pgm';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);
}


function save_ppm(image_source) {
    
    let picture = null;
    let filtered = '';
    
    switch(image_source) {
        case 'input':
            picture = currentPicture;
            break;
        case 'output':
            picture = filteredPicture;  
            filtered = '_gefiltert';   
            break;
    }

    let picture_string = 'P3\n';
    picture_string += picture.width + ' ' + picture.height + '\n';
    picture_string += picture.maxValue + '\n';
    for (let y = 0; y < picture.height; y++) {
        for (let x = 0; x < picture.width; x++) {
            picture_string += picture.image[y][x][0] + ' ' + picture.image[y][x][1] + ' ' + picture.image[y][x][2] + ' ';
        }
        picture_string += '\n';
    }

    let blob = new Blob([picture_string], {type: 'image/x-portable-pixmap'});
    let url = window.URL.createObjectURL(blob);

    let fileName = document.getElementById('ict-fileName').value.trim().replace(/[\\\/:*?"<>|]/g, '') + filtered;
    fileName = (fileName == '') ? 'Bild.' : fileName + '.';

    let link = document.createElement('a');
    link.href = url;
    link.download = fileName + 'ppm';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);
}

function save_jpg(image_source) {
    
    let canvas = null;
    let filtered = '';
    
    switch(image_source) {
        case 'input':
            canvas = document.getElementById('original_img');;
            break;
        case 'output':
            canvas = document.getElementById('filtered_img');  
            filtered = '_gefiltert';   
            break;
    }

    let url = canvas.toDataURL('image/jpg');

    let fileName = document.getElementById('ict-fileName').value.trim().replace(/[\\\/:*?"<>|]/g, '') + filtered;
    fileName = (fileName == '') ? 'Bild.' : fileName + '.';

    let link = document.createElement('a');
    link.href = url;
    link.download = fileName + 'jpg';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);
}

function save_png(image_source) {
    
    let canvas = null;
    let filtered = '';
    
    switch(image_source) {
        case 'input':
            canvas = document.getElementById('original_img');;
            break;
        case 'output':
            canvas = document.getElementById('filtered_img');  
            filtered = '_gefiltert';   
            break;
    }

    let url = canvas.toDataURL('image/png');

    let fileName = document.getElementById('ict-fileName').value.trim().replace(/[\\\/:*?"<>|]/g, '') + filtered;
    fileName = (fileName == '') ? 'Bild.' : fileName + '.';

    let link = document.createElement('a');
    link.href = url;
    link.download = fileName + 'png';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);
}

// ToDo: add example images here
async function uploadExample() {
        
    const example_type = document.getElementById('example_type').value;
    const value = getSelectedRadioValue('example');
    
    let fileUrl = null;
    let fileName = '';

    switch (value) {
        case 'mona_lisa':
            fileUrl = '../Sample_Images/MyPicFilter/mona_lisa_' + example_type + '.jpg';
            fileName = value;
            break;
        case 'cute_cat':
            fileUrl = '../Sample_Images/MyPicFilter/beautiful_cat_' + example_type + '.jpg';
            fileName = value;
            break;
        case 'drop_of_water':
            fileUrl = '../Sample_Images/MyPicFilter/drop_of_water_' + example_type + '.jpg';
            fileName = value;
            break;
    }

    try {
        const response = await fetch(fileUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const arrayBuffer = await response.arrayBuffer();

        if(arrayBuffer) {
            const buffer = arrayBuffer;
            const uint8Array = new Uint8Array(buffer);
            const fileInfo = prepareFile(uint8Array);
    
            // set pixel values of canvas element
            const canvas = document.getElementById('original_img');
            const ctx = canvas.getContext('2d', { willReadFrequently: true });

            switch(fileInfo.type) {
                case 'pgm':
                    currentPicture = fileInfo;
                    pgmToCanvas(canvas, currentPicture);
                    break;
                case 'ppm':
                    currentPicture = fileInfo;
                    ppmToCanvas(canvas, currentPicture);
                    break;
                case 'jpg':
                    jpgToCanvas(canvas, ctx, buffer);
                    break;
                case 'png':
                    pngToCanvas(canvas, ctx, buffer);
                    break;
            }
            
            document.getElementById('ict-fileName').value = fileName;
        }
    } catch (error) {
        alert('Beim hochladen des Beispiels kam es zu einem Problem');
    }
}

function add_image_noise() {
    
    if (currentPicture) {
        
        const image_noise = document.getElementById('image_noise').value;
        const noise_percentage = Number(document.getElementById('noise_percentage').value) / 100;

        switch (image_noise) {
            case 'sp_noise':
                add_salt_and_pepper(noise_percentage);
                break;
            case 'gaussian_noise':
                add_gaussian_noise(noise_percentage);
                break;
        }

        const canvas = document.getElementById('original_img');

        if (currentPicture.type == 'pgm') {
            pgmToCanvas(canvas, currentPicture);
        }
        else if (currentPicture.type == 'ppm') {
            ppmToCanvas(canvas, currentPicture);
        }
    }
    else {
        // no pic uploaded yet
        alert('Es wurde noch kein Bild hochgeladen');
    }   
}

function add_salt_and_pepper(noise_percentage) {
    
    const numPixels = currentPicture.width * currentPicture.height;
    const numNoisyPixels = Math.round(numPixels * noise_percentage);
    
    switch (currentPicture.type) {
        case 'pgm':
            for (let i = 0; i < numNoisyPixels; i++) {
                // get random pixel
                const x = Math.floor(Math.random() * currentPicture.width);
                const y = Math.floor(Math.random() * currentPicture.height);
        
                // randomly choose if pixel should be black or white;
                const col = Math.random() < 0.5 ? currentPicture.maxValue : 0;

                // set pixel color
                currentPicture.image[y][x] = col;
            }
            break;
        case 'ppm':
            for (let i = 0; i < numNoisyPixels; i++) {
                // get random pixel
                const x = Math.floor(Math.random() * currentPicture.width);
                const y = Math.floor(Math.random() * currentPicture.height);
        
                // randomly choose if pixel should be black or white;
                const col = Math.random() < 0.5 ? currentPicture.maxValue : 0;

                // set pixel color
                currentPicture.image[y][x][0] = col;
                currentPicture.image[y][x][1] = col;
                currentPicture.image[y][x][2] = col;
            }
            break;
    }
}

function add_gaussian_noise(standard_deviation_percent) {
    const mean = 0;
    const standard_deviation = Math.round(currentPicture.maxValue * standard_deviation_percent);

    switch (currentPicture.type) {
        case 'pgm':
            
            for(let x = 0; x < currentPicture.width; x++) {
                for(let y = 0; y < currentPicture.height; y++) {
                    const noise = get_gaussian_random_value(mean, standard_deviation);
        
                    let col = currentPicture.image[y][x] + noise;

                    // make sure, the values are in the allowed range
                    col = Math.max(0, Math.min(currentPicture.maxValue, col));
        
                    // set pixel color
                    currentPicture.image[y][x] = col;
                }
            }
            
            break;
        case 'ppm':
            
            for(let x = 0; x < currentPicture.width; x++) {
                for(let y = 0; y < currentPicture.height; y++) {
                    const noise = get_gaussian_random_value(mean, standard_deviation);

                    let r = currentPicture.image[y][x][0] + noise;
                    let g = currentPicture.image[y][x][1] + noise;
                    let b = currentPicture.image[y][x][2] + noise;

                    // make sure, the values are in the allowed range
                    r = Math.max(0, Math.min(currentPicture.maxValue, r));
                    g = Math.max(0, Math.min(currentPicture.maxValue, g));
                    b = Math.max(0, Math.min(currentPicture.maxValue, b));

                    // set pixel color
                    currentPicture.image[y][x][0] = r;
                    currentPicture.image[y][x][1] = g;
                    currentPicture.image[y][x][2] = b;
                }
            }

            break;
    }
    
}

/**
 * function taken from "https://stackoverflow.com/questions/25582882/javascript-math-random-normal-distribution-gaussian-bell-curve"
 * changed up for my own purposes
 */
function get_gaussian_random_value(mean, standard_deviation) {
    let u = 0;
    let v = 0;
    
    while(u === 0) {
        u = Math.random(); //Converting [0,1) to (0,1)
    }
    while(v === 0) {
        v = Math.random(); //Converting [0,1) to (0,1)
    }

    const noise = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    
    return noise * standard_deviation + mean;
}

function update_noise_strength() {
    
    const image_noise = document.getElementById('image_noise').value;
    const noise_percentage_label = document.getElementById('noise_percentage_label');

    switch(image_noise) {
        case 'sp_noise':
            noise_percentage_label.innerHTML = 'Rauschanteil (%)';
            break;
        case 'gaussian_noise':
            noise_percentage_label.innerHTML = 'Rauschstärke (%)';
            break;
    }
}