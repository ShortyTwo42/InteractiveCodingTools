const $radius = 1;
const $length = (2 * $radius + 1) * (2 * $radius + 1);
const tolerance = 0.5;

// initialize the course
generate_grid('median');
generate_grid('mean');
generate_grid('gaussian');

function generate_grid(type) {
    
    const numberGrid = document.getElementById(type + '_grid');

    // clear existing grid items
    while (numberGrid.firstChild) {
        numberGrid.removeChild(numberGrid.firstChild);
    }

    const mySolution = document.getElementById(type + '_solution');

    // clear solution
    while (mySolution.firstChild) {
        mySolution.removeChild(mySolution.firstChild);
    }

    let array = [];
    switch (type) {
        case 'median':
            array = get_median_values($length);
            break;
        case 'mean':
            array = get_grid_values($length);
            break;
        case 'gaussian':
            array = get_grid_values($length);
            break;
    }

    // Create the grid
    for (let i = 0; i < $length; i++) {
        const gridVal = array[i];
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid_item');
        gridItem.style.backgroundColor = 'rgb(' + gridVal + ',' + gridVal + ',' + gridVal + ')';
        gridItem.style.color = (gridVal <= 127) ? 'white' : 'black';
        gridItem.textContent = gridVal;
        gridItem.setAttribute('data-value', gridVal);
        numberGrid.appendChild(gridItem);
    }
}

function get_median_values(length) {
    let array = get_grid_values(length);

    const noise = Math.random() < 0.5 ? 255 : 0;
    const rand_index = Math.floor(Math.random() * length);

    array[rand_index] = noise;

    return array;
}

function get_grid_values(length) {
    const array = [];
    const mean = 0;
    const standard_deviation = get_random_int(5, 60);
    const startValue = get_random_int(standard_deviation, 255 - standard_deviation);

    for (let i = 0; i < length; i++) {
        const noise = Math.floor(get_gaussian_random_value(mean, standard_deviation));
        const val = Math.floor(Math.max(0, Math.min(255, startValue + noise)));
        array.push(val);
    }

    return array;
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

function get_random_int(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function check_solution(type) {
    
    const answer = document.getElementById(type + '_answer').value;
    const numberGrid = document.getElementById(type + '_grid');
    
    // get grid items
    const grid_items = numberGrid.childNodes;
    const array = []
    
    grid_items.forEach(function(item) {
        if(item.dataset) {
            array.push(item.dataset.value);
        }
    });

    switch (type) {
        case 'median':
            check_solution_median(array, answer);
            break;
        case 'mean':
            check_solution_mean(array, answer);
            break;
        case 'gaussian':
            check_solution_gaussian(array, answer);
            break;
    }
}

function show_solution(type) {
    
    const answer = 'show';
    const numberGrid = document.getElementById(type + '_grid');
    
    // get grid items
    const grid_items = numberGrid.childNodes;
    const array = []
    
    grid_items.forEach(function(item) {
        if(item.dataset) {
            array.push(item.dataset.value);
        }
    });
    
    switch (type) {
        case 'median':
            check_solution_median(array, answer);
            break;
        case 'mean':
            check_solution_mean(array, answer);
            break;
        case 'gaussian':
            check_solution_gaussian(array, answer);
            break;
    }
}

function check_solution_median(array, answer) {
    const sorted_array = quicksort(array);
    const new_value = sorted_array[(sorted_array.length - 1) / 2];

    const mySolution = document.getElementById('median_solution');

    // clear solution
    while (mySolution.firstChild) {
        mySolution.removeChild(mySolution.firstChild);
    }

    const p1 = document.createElement('p');
    
    if (answer == new_value) {
        p1.setAttribute('class', 'success_text');
        p1.innerText = 'Herzlichen Glückwunsch, das war die richtige Antwort';
    }
    else if (answer == 'show') {
        p1.setAttribute('class', 'disabled_text');
        p1.innerText = 'Aufgelöste Antwort'
    }
    else {
        p1.setAttribute('class', 'error_text');
        p1.innerText = 'Die richtige Antwort wurde noch nicht gegeben';
    }

    mySolution.appendChild(p1);

    if (answer == 'show' || answer == new_value) {
        // create the solution string
        let solution_string = 'Zunächst sortieren wir das Eingabe Array:<br/><br/>'
        solution_string += array_to_string(array) + '<br/>';
        solution_string += '&rarr;' + array_to_string(sorted_array) + '<br/><br/>';
        solution_string += 'Anschließend wählen wir das mittlere Element aus dem sortierten Array aus. In diesem Fall wäre der neue Pixelwert <b>"' + new_value + '"</b>'

        const p2 = document.createElement('p');
        p2.innerHTML = solution_string;

        mySolution.appendChild(p2);
    }
}

function check_solution_mean(array, answer) {
    
    const solution = mean_solution(array);

    const mySolution = document.getElementById('mean_solution');

    // clear solution
    while (mySolution.firstChild) {
        mySolution.removeChild(mySolution.firstChild);
    }

    const p1 = document.createElement('p');
    
    let p2_bool = true;

    if (parseFloat(answer) == solution.exact_mean) {
        p1.setAttribute('class', 'success_text');
        p1.innerText = 'Herzlichen Glückwunsch, du hast die exakte Antwort gegeben';
    }
    else if (answer == solution.mean) {
        p1.setAttribute('class', 'success_text');
        p1.innerText = 'Herzlichen Glückwunsch, das war die richtige Antwort';
    }
    else if (parseFloat(answer) - tolerance <= solution.exact_mean && parseFloat(answer) + tolerance >= solution.exact_mean) {
        p1.setAttribute('class', 'success_text');
        p1.innerText = 'Herzlichen Glückwunsch, deine Antwort liegt im Toleranzbereich';
    }
    else if (answer == 'show') {
        p1.setAttribute('class', 'disabled_text');
        p1.innerText = 'Aufgelöste Antwort'
    }
    else {
        p1.setAttribute('class', 'error_text');
        p1.innerText = 'Die richtige Antwort wurde noch nicht gegeben';
        p2_bool = false;
    }

    mySolution.appendChild(p1);

    if (p2_bool) {
        // create the solution string
        let solution_string = 'Zunächst summieren wir alle Pixelwerte in unserem Array auf und teilen diese anschließend durch die Gesamtanzahl der Werte um den Mittelwert zu berechnen. '; 
        solution_string += 'Sollte der Mittelwert eine Dezimalzahl sein, so runden wir das Ergebnis auf die nächste natürliche Zahl:<br/><br/>'
        solution_string += solution.string + '<br/><br/>';
        solution_string += 'In diesem Fall beträgt der neue Pixelwert also <b>"' + solution.mean + '"</b>'

        const p2 = document.createElement('p');
        p2.innerHTML = solution_string;

        mySolution.appendChild(p2);
    }
}

function check_solution_gaussian(array, answer) {
    
    const solution = gaussian_solution(array);

    const mySolution = document.getElementById('gaussian_solution');

    // clear solution
    while (mySolution.firstChild) {
        mySolution.removeChild(mySolution.firstChild);
    }

    const p1 = document.createElement('p');
    
    let p2_bool = true;

    if (parseFloat(answer) == solution.exact_gaussian) {
        p1.setAttribute('class', 'success_text');
        p1.innerText = 'Herzlichen Glückwunsch, du hast die exakte Antwort gegeben';
    }
    else if (answer == solution.gaussian) {
        p1.setAttribute('class', 'success_text');
        p1.innerText = 'Herzlichen Glückwunsch, das war die richtige Antwort';
    }
    else if (parseFloat(answer) - tolerance <= solution.exact_gaussian && parseFloat(answer) + tolerance >= solution.exact_gaussian) {
        p1.setAttribute('class', 'success_text');
        p1.innerText = 'Herzlichen Glückwunsch, deine Antwort liegt im Toleranzbereich';
    }
    else if (answer == 'show') {
        p1.setAttribute('class', 'disabled_text');
        p1.innerText = 'Aufgelöste Antwort'
    }
    else {
        p1.setAttribute('class', 'error_text');
        p1.innerText = 'Die richtige Antwort wurde noch nicht gegeben';
        p2_bool = false;
    }

    mySolution.appendChild(p1);

    if (p2_bool) {
        // create the solution string
        let solution_string = 'Jeder Pixelwert wird mit seinem entsprechenden Gewicht gewichtet und aufsummiert. ';
        solution_string += 'Anschließend teilen wir den somit berechneten Wert durch die aufsummierten Gewichtswerte, damit wir wieder eine Zahl zwischen 0 und 255 erhalten.'; 
        solution_string += 'Sollte der neue Pixelwert eine Dezimalzahl sein, so runden wir das Ergebnis auf die nächste natürliche Zahl:<br/><br/>'
        solution_string += solution.string + '<br/><br/>';
        solution_string += 'In diesem Fall beträgt der neue Pixelwert also <b>"' + solution.gaussian + '"</b>'

        const p2 = document.createElement('p');
        p2.innerHTML = solution_string;

        mySolution.appendChild(p2);
    }
}

// recursive quicksort algorithm
function quicksort(array) {
    if (array.length <= 1) {
        return array;
    }
    
    let pivot = parseInt(array[0]);
    
    let left = []; 
    let right = [];
    
    for (let i = 1; i < array.length; i++) {
        array[i] < pivot ? left.push(array[i]) : right.push(array[i]);
    }
    
    return quicksort(left).concat(pivot, quicksort(right));
}

function array_to_string(array) {
    let array_string = '[';
    
    for (let i = 0; i < array.length; i++) {
        array_string += array[i];
        if(i + 1 != array.length) {
            array_string += ', ';
        }
    }

    array_string += ']';

    return array_string;
}

function mean_solution(array) {
    
    let sum = 0;
    let string = '(';

    for (let i = 0; i < array.length; i++) {
        sum += parseInt(array[i]);
        string += array[i];
        if(i + 1 != array.length) {
            string += ' + ';
        }
    }
    const exact_mean = sum / array.length;
    const mean = Math.round(exact_mean);

    string += ') / ' + array.length + '<br/>';
    string += '= ' + sum + ' / ' + array.length  + '<br/>';
    string += '&asymp; ' + mean;

    return { exact_mean: exact_mean, mean: mean, string: string };
}

function gaussian_solution(array) {
   
    const weight_info = gaussian_weights(array.length);
    
    let sum = 0;
    let string = '(';
    let string_weight = '(';

    for (let i = 0; i < array.length; i++) {
        
        const weighted_elem = parseInt(array[i]) * parseInt(weight_info.weights[i])
        sum += weighted_elem;
        string += array[i] + ' * ' + weight_info.weights[i];
        string_weight += weighted_elem;

        if(i + 1 != array.length) {
            string += ' + ';
            string_weight += ' + ';
        }
    }

    const exact_gaussian = sum / weight_info.weight_sum;
    const gaussian = Math.round(exact_gaussian);

    string_weight += ')' + ' / ' + weight_info.weight_sum;
    string += ') / ' + weight_info.weight_sum  + '<br/>';
    string += '= ' + string_weight  + '<br/>'; 
    string += '= ' + sum + ' / ' + weight_info.weight_sum + '<br/>'; 
    string += '&asymp; ' + gaussian; 

    return { exact_gaussian: exact_gaussian, gaussian: gaussian, string: string };
}

function gaussian_weights(length) {

    // to get an array of length n we look at row = length - 1
    let row = parseInt(Math.sqrt(length) - 1);

    // init prev element and return array
    let prevElem = 1;
    let pascal_array = [];
    pascal_array.push(prevElem);

    for (let i = 1; i <= row; i++) {
        let currElem = (prevElem * (row - i + 1)) / i;
        pascal_array.push(currElem);
        prevElem = currElem;
    }

    let return_array = [];
    let weight_sum = 0;
    for (let i = 0; i < pascal_array.length; i++) {
        for (let j = 0; j < pascal_array.length; j++) {
            const index = (i * pascal_array.length) + j;
            return_array[index] = pascal_array[i] * pascal_array[j];
            weight_sum += pascal_array[i] * pascal_array[j];
        }
    }

    return { weights: return_array, weight_sum: weight_sum };
}