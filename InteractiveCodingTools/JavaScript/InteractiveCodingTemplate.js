/* This part is just for visuals (adding line numbers, adjusting textarea height, ...) */
// add line numbers to our editor
document.addEventListener('DOMContentLoaded', function(){
    initIctNumbers();
    initIctEditor();
    initIctTutorial();
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

function initIctEditor() {
    // check if an editor exists, if that's the case initialize it
    const editor = document.querySelector('.ict-editor');

    if (editor) {
        const editor = document.querySelector('.ict-editor');
        const editing = document.querySelector('.ict-editing');
        const textarea = document.getElementById('editing');
        const highlighting = document.getElementById('highlighting');
        const lineNumbers = document.querySelector('.ict-lineNumbers');
        
        textarea.addEventListener('keydown', function(event) {
            handleLineNumbers(event, editor, editing, textarea, highlighting, lineNumbers);
            check_tab(textarea, event);
        });

        textarea.addEventListener('keyup', function(event) {
            handleLineNumbers(event, editor, editing, textarea, highlighting, lineNumbers);
        });

        textarea.addEventListener('input', function() {
            update_syntax(textarea.value);
        }); 
    }
}

function handleLineNumbers(event, editor, editing, textarea, highlighting, lineNumbers) { 
    const numberOfLines = event.target.value.split('\n').length;
    lineNumbers.innerHTML = Array(numberOfLines).fill('<span></span>').join('');
    const newWidth = calcWidth(textarea.value);
    
    textarea.style.minWidth = newWidth + 'ch';
    highlighting.style.minWidth = newWidth + 'ch';
    editor.style.minWidth = (newWidth + 4) + 'ch';
    editing.style.minWidth = (newWidth + 4) + 'ch';

    const newHeight = calcHeight(textarea.value) + 'rem';
    textarea.style.minHeight = newHeight;
    highlighting.style.minHeight = newHeight;
    editor.style.minHeight = newHeight;
    editing.style.minHeight = newHeight;
}

/* 
 *  syntax highlighting taken from 
 *  "https://css-tricks.com/creating-an-editable-textarea-that-supports-syntax-highlighted-code/".
 *  Few adjustments were made for our purposes
 */
function update_syntax(text) {
    let result_element = document.querySelector('#highlighting-content');
     // Handle final newlines (see article)
    if(text[text.length-1] == '\n') { // If the last character is a newline character
        text += ' '; // Add a placeholder space character to the final line 
    }
    // Update code
    result_element.innerHTML = text.replace(new RegExp('&', 'g'), '&amp').replace(new RegExp('<', 'g'), '&lt').replace(new RegExp('>', 'g'), '&gt');
    // Syntax Highlight
    Prism.highlightElement(result_element);
}

function check_tab(element, event) {
    const code = element.value;
    if(event.key == 'Tab') {
        /* Tab key pressed */
        event.preventDefault(); // stop normal
        const before_tab = code.slice(0, element.selectionStart); // text before tab
        const after_tab = code.slice(element.selectionEnd, element.value.length); // text after tab
        const cursor_pos = element.selectionEnd + 1; // where cursor moves after tab - moving forward by 1 char to after tab
        element.value = before_tab + "\t" + after_tab; // add tab char
        // move cursor
        element.selectionStart = cursor_pos;
        element.selectionEnd = cursor_pos;
        update_syntax(element.value); // Update text to include indent
    }
}