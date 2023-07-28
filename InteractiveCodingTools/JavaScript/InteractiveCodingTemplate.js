/* This part is just for visuals (adding line numbers, adjusting textarea height, ...) */
// add line numbers to our editor
document.addEventListener('DOMContentLoaded', function(){
    initIctNumbers();
    try {
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
    } 
    catch {

    }
});

function initIctNumbers() {
    const number_inputs = document.querySelectorAll('.ict-numbers');

    number_inputs.forEach(element => {
        element.addEventListener('change', checkNumberValue);
    });
}

const default_min = 1;
const default_max = 100;

function checkNumberValue() {
    const min_value = isNaN(parseInt(this.min)) ? default_min : parseInt(this.min);
    const max_value = isNaN(parseInt(this.max)) ? default_max : parseInt(this.max);
    const curr_value = isNaN(parseInt(this.value)) ? min_value : parseInt(this.value);

    const new_value = Math.max(min_value, Math.min(max_value, curr_value))
    this.value = new_value;
}

function decreaseNumber(id) {
    const number_input = document.getElementById(id);
    const min_value = isNaN(parseInt(number_input.min)) ? default_min : parseInt(number_input.min);
    const curr_value = isNaN(parseInt(number_input.value)) ? min_value : parseInt(number_input.value);
    const step = isNaN(parseInt(number_input.step)) ? 1 : parseInt(number_input.step);

    const new_value = (curr_value - step < min_value) ? min_value : curr_value - step;
    number_input.value = new_value;

    try {
        handleDecrease(id);
    }
    catch{

    }
}

function increaseNumber(id) {
    const number_input = document.getElementById(id);
    const max_value = isNaN(parseInt(number_input.max)) ? default_max : parseInt(number_input.max);
    const curr_value = isNaN(parseInt(number_input.value)) ? max_value : parseInt(number_input.value);

    const step = isNaN(parseInt(number_input.step)) ? 1 : parseInt(number_input.step);

    const new_value = (curr_value + step > max_value) ? max_value : curr_value + step;
    number_input.value = new_value;

    try {
        handleIncrease(id);
    }
    catch{

    }
}

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

    try {
        handleToggleView();
    }
    catch {

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

function openModal(modal_id) {
    const modal = document.getElementById(modal_id);

    modal.style.display = 'block';
}

function closeModal(modal_id) {
    const modal = document.getElementById(modal_id);

    modal.style.display = 'none';
}

function getSelectedRadioValue(name) {
    const radio_buttons = document.getElementsByName(name);

    for(let i = 0; i < radio_buttons.length; i++) {
        if(radio_buttons[i].checked) {
            return radio_buttons[i].value;
        }
    }

    return null;
}