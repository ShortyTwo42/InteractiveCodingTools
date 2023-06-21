/* This part is just for visuals (adding line numbers, adjusting textarea height, ...) */
// add line numbers to our editor
document.addEventListener('DOMContentLoaded', function(){
    const editor = document.querySelector('.ict-editor');
    const textarea = document.querySelector('.ict-code');
    const lineNumbers = document.querySelector('.ict-lineNumbers');

    textarea.addEventListener('keyup', event => {
        const numberOfLines = event.target.value.split('\n').length;
        lineNumbers.innerHTML = Array(numberOfLines).fill('<span></span>').join('');
        let newWidth = calcWidth(textarea.value);
        textarea.style.minWidth = newWidth + 'ch';
        editor.style.minWidth = (newWidth + 6) + 'ch';

        let newHeight = calcHeight(textarea.value) + 'rem';
        textarea.style.minHeight = newHeight;
        editor.style.minHeight = newHeight;
    });

    // prevent 'tab' press from jumping to next input and do normal tab instead
    textarea.onkeydown = function(e) {
        if (e.keyCode === 9) {
            this.setRangeText('\t', this.selectionStart, this.selectionStart, 'end');
            return false;
        }
    }
});

// Dealing with Textarea Height
function calcHeight(value) {
    let numberOfLineBreaks = (value.match(/\n/g) || []).length;
    // lines * line-height
    let newHeight = (numberOfLineBreaks + 1) * 1.3;
    return newHeight;
}

function calcWidth(value) {
    let lines = value.split('\n');

    let maxLength = 0;
    lines.forEach((line) => {
        if (line.length > maxLength) {
            maxLength = line.length
        }
    })

    return maxLength + 1;
}

function toggleView(codingSpace_width, previewSpace_width) {
    const codingSpace = document.querySelector('.ict-codingSpace');
    const previewSpace = document.querySelector('.ict-previewSpace');
    codingSpace.style.width = codingSpace_width;
    previewSpace.style.width = previewSpace_width;

    switch (codingSpace_width) {
        case '100%':
            codingSpace.style.padding = '0.5rem';
            previewSpace.style.padding = '0rem';
            break;
        case '50%':
            codingSpace.style.padding = '0.5rem';
            previewSpace.style.padding = '0.5rem';
            break;
        case '0%':
            codingSpace.style.padding = '0rem';
            previewSpace.style.padding = '0.5rem';
            break
    }
}

function tryFileUpload() {
    try {
        // implement this in your own javascript
        uploadFile();
    } 
    catch {
        console.log('"uploadFile()" function is not yet implemented! \n Please implement it in your own Javascript.');
    }
}

function tryFileDownload() {
    try {
        // implement this in your own javascript
        downloadFile();
    } 
    catch {
        console.log('"downloadFile()" function is not yet implemented! \n Please implement it in your own Javascript.');
    }
}