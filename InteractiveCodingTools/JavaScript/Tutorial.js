const tutorials = {};

/**
 * add your tutorial here
 * 
 * "target"     is the id of the element you want to describe
 * "content"    is the text you write for the current tutorial step
 * "trigger"    is a function you want to trigger, when this step is called
 * "position"   is the position, where the tutorial toast should be placed
 */
const ict_test = [
    { 
        target: '#save_button', 
        content: 'Über das Speicher-Symbol können Dateien abgespeichert werden.',
        trigger: 'console.log("hello");',
        position: 'bottom-left'
    },
    { 
        target: '#upload', 
        content: 'Über das Ordner-Symbol können eigene Dateien hochgeladen werden.', 
        trigger: 'tryFileDownload();',
        position: 'bottom-left'
    },
    { 
        target: null, 
        content: 'Dies ist das Ende meines Test Tutorials.',
        trigger: null,
        position: 'bottom-left'
    },
];

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////// putPixel Tutorials /////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const put_pixel_overview = [
    { 
        target: null, 
        content: 'Dieses Tutorial soll einen Überblick über das PutPixel-Tool geben.',
        trigger: 'toggleView("50%", "50%");',
        position: null
    },
    { 
        target: '#dimensions_tutorial', 
        content: 'Im Header des Tools werden die aktuellen Dimensionen des Pixelrasters angezeigt.',
        trigger: null,
        position: 'bottom'
    },
    { 
        target: '#dimensions_tutorial', 
        content: 'Breite und Höhe können individuell angepasst werden. Dies geht über die jeweiligen "+" und "-" Buttons oder durch direkte Eingabe ins Nummernfeld. Anschließend wird der aktuelle Code mit den neuen Werten ausgeführt.',
        trigger: 'file_width.value = 25; file_height.value = 20; updateOutput();',
        position: 'bottom'
    },
    { 
        target: '#dimensions_tutorial', 
        content: 'Es können Werte zwischen 1 und 256 eingetragen werden.',
        trigger: null,
        position: 'bottom'
    },
    { 
        target: '#menu_tutorial', 
        content: 'Darunter befindet sich ein Menüband.',
        trigger: null,
        position: 'bottom'
    },
    { 
        target: '#reset_tutorial', 
        content: 'Dieser Button setzt das Tool auf seinen Ursprünglichen Zustand zurück. Sowohl die Dimensionen als auch der Code werden zurückgesetzt und anschließend ausgeführt.',
        trigger: 'resetToDefault();',
        position: 'bottom-left'
    },
    { 
        target: '#code_max_tutorial', 
        content: 'Dieser Button maximiert den Code Editor.',
        trigger: 'toggleView("100%", "0%");',
        position: 'bottom-left'
    },
    { 
        target: '#preview_max_tutorial', 
        content: 'Dieser Button maximiert die Vorschau.',
        trigger: 'toggleView("0%", "100%");',
        position: 'bottom-left'
    },
    { 
        target: '#split_tutorial', 
        content: 'Dieser Button sorgt dafür, dass Editor und Vorschau zu gleichen Teilen angezeigt werden.',
        trigger: 'toggleView("50%", "50%");',
        position: 'bottom-left'
    },
    { 
        target: '#execute_tutorial', 
        content: 'Wird auf dieses Symbol geklickt, wird der aktuelle Code ausgeführt.',
        trigger: null,
        position: 'bottom-right'
    },
    { 
        target: '#coding_space_tutorial', 
        content: 'Hier kann eigener Code eingetippt werden. Zu beachten ist, dass nur "For-Schleifen", "If-Abfragen" oder die "putPixel" Funktion aufgerufen werden dürfen.',
        trigger: null,
        position: 'right'
    },
    { 
        target: '#coding_space_tutorial', 
        content: 'Auch wird die Ausführung des Codes nach 5 Sekunden abgebrochen, um Endlosschleifen zu unterbinden.',
        trigger: null,
        position: 'right'
    },
    { 
        target: '#preview_space_tutorial', 
        content: 'Und zuletzt wird hier das Ergebnis, der letzten erfolgreichen Code-Ausführung angezeigt.',
        trigger: null,
        position: 'left'
    },
]

const put_pixel_function = [
    { 
        target: null, 
        content: 'Dieses Tutorial soll einen Überblick über die "putPixel" Funktion geben.',
        trigger: 'toggleView("50%", "50%");',
        position: null
    },
    { 
        target: '#coding_space_tutorial', 
        content: 'Die "putPixel" Funktion selbst kann auf drei verschiedene Arten aufgerufen werden.',
        trigger: 'putPixelExample1();',
        position: 'right'
    },
    { 
        target: '#coding_space_tutorial', 
        content: 'So kann sie beispielsweise nur mit eine X- und Y-Koordinate aufgerufen werden.',
        trigger: null,
        position: 'right'
    },
    { 
        target: '#preview_space_tutorial', 
        content: 'Wird sie dann ausgeführt, wird das entsprechende Pixel schwarz gefärbt.',
        trigger: 'tryExecuteCode();',
        position: 'left'
    },
    { 
        target: '#coding_space_tutorial', 
        content: 'Wird zusätzlich ein Wert zwischen 0 und 255 als drittes Argument übergeben können auch Grauwerte angezeigt werden.',
        trigger: 'putPixelExample2();',
        position: 'right'
    },
    { 
        target: '#preview_space_tutorial', 
        content: 'Wird sie dann ausgeführt, wird das entsprechende Pixel in dem angegebenen Grauwert gefärbt.',
        trigger: 'tryExecuteCode();',
        position: 'left'
    },
    { 
        target: '#coding_space_tutorial', 
        content: 'Es ist aber auch möglich als drittes Argument ein Array mit jeweils dem Rot, Grün und Blau Anteil zu übergeben.',
        trigger: 'putPixelExample3();',
        position: 'right'
    },
    { 
        target: '#coding_space_tutorial', 
        content: 'Jeder dieser Werte kann zwischen 0 und 255 liegen.',
        trigger: 'putPixelExample3();',
        position: 'right'
    },
    { 
        target: '#preview_space_tutorial', 
        content: 'Wird die Funktion dann aufgerufen, wird das entsprechende Pixel in dem angegebenen Farbwert eingefärbt.',
        trigger: 'tryExecuteCode();',
        position: 'left'
    },
    { 
        target: '#coding_space_tutorial', 
        content: 'Werde nun selbst kreativ.',
        trigger: 'putPixelExample4();',
        position: 'right'
    },
]

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////// MyPicCoder Tutorials ////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const my_pic_coder_overview = [
    { 
        target: null, 
        content: 'Dieses Tutorial soll einen Überblick über das MyPicCoder-Tool geben.',
        trigger: 'toggleView("50%", "50%");',
        position: null
    },
    { 
        target: '#filename_tutorial', 
        content: 'An dieser Stelle kann der Dateiname eingegeben werden. Wird eine Datei hochgeladen wird deren Name dort eingefügt.',
        trigger: null,
        position: 'bottom-left'
    },
    { 
        target: '#filename_tutorial', 
        content: 'Wird eine Datei runtergeladen, wird sie unter diesem Namen gespeichert.',
        trigger: null,
        position: 'bottom-left'
    },
    { 
        target: '#save_tutorial', 
        content: 'Durch Klicken auf diesen Button wird die aktuelle Datei gespeichert. Der Dateityp wird aus dem Inhalt des Editors automatisch festgestellt.',
        trigger: null,
        position: 'bottom-left'
    },
    { 
        target: '#upload_tutorial', 
        content: 'Über diesen Button können eigene Dateien hochgeladen werden. Diese Dateien müssen PBMs, PGMs, PPMs oder SVGs sein.',
        trigger: null,
        position: 'bottom-left'
    },
    { 
        target: '#example_tutorial', 
        content: 'Über diesen Button wird das Beispielmenü geöffnet.',
        trigger: null,
        position: 'bottom-left'
    },
    { 
        target: null, 
        content: 'Hier können verschiedene Beispielmotive ausgewählt werden und in den Editor eingefügt werden.',
        trigger: 'openModal("example_modal");',
        position: null
    },
    { 
        target: '#example_type_tutorial', 
        content: 'Über diese Auswahl kann zwischen den verschiedenen Typen PBM, PGM, PPM oder SVG gewechselt werden.',
        trigger: null,
        position: 'bottom-left'
    },
    { 
        target: '#example_options_tutorial', 
        content: 'Es werden immer drei Motive im jeweiligen Typen vorgeschlagen, von denen eins ausgewählt werden kann.',
        trigger: null,
        position: 'bottom-left'
    },
    { 
        target: '#upload_example_tutorial', 
        content: 'Wurde Typ und Motiv ausgewählt kann das Beispiel über diesen Button hochgeladen werden.',
        trigger: null,
        position: 'bottom-right'
    },
    { 
        target: '#code_max_tutorial', 
        content: 'Dieser Button maximiert den Editor.',
        trigger: 'closeModal("example_modal"); toggleView("100%", "0%");',
        position: 'bottom-left'
    },
    { 
        target: '#preview_max_tutorial', 
        content: 'Dieser Button maximiert die Vorschau.',
        trigger: 'toggleView("0%", "100%");',
        position: 'bottom-left'
    },
    { 
        target: '#split_tutorial', 
        content: 'Dieser Button sorgt dafür, dass Editor und Vorschau zu gleichen Teilen angezeigt werden.',
        trigger: 'toggleView("50%", "50%");',
        position: 'bottom-left'
    },
    { 
        target: '#live_preview_tutorial', 
        content: 'Mithilfe dieses Sliders kann die Live Vorschau an bzw. aus geschaltet werden.',
        trigger: null,
        position: 'bottom-right'
    },
    { 
        target: '#live_preview_tutorial', 
        content: 'Ist sie angeschaltet, wirken sich Änderungen im Code direkt auf die Vorschau aus.',
        trigger: null,
        position: 'bottom-right'
    },
    { 
        target: '#display_tutorial', 
        content: 'Ist die Live Vorschau ausgeschaltet, kann die Vorschau über diesen Button aktualisiert werden',
        trigger: null,
        position: 'bottom-right'
    },
    { 
        target: '#coding_space_tutorial', 
        content: 'In diesem Abschnitt kann der Code zur erstellung von Raster- und Vektorgrafiken eingetragen werden.',
        trigger: null,
        position: 'right'
    },
    { 
        target: '#preview_space_tutorial', 
        content: 'Dieser Abschnitt zeigt das Ergebnis des ausgewerteten Code.',
        trigger: null,
        position: 'left'
    },
]

const pbm_format = [
    { 
        target: null, 
        content: 'Dieses Tutorial soll einen Überblick über das Format Portable Bitmap (PBM) geben.',
        trigger: 'toggleView("50%", "50%");',
        position: null
    },
    { 
        target: '#coding_space_tutorial', 
        content: 'In der ersten Zeile wird "P1" eingetragen. Dadurch wird angegeben, dass es sich um ein PBM handelt.',
        trigger: 'pbmExample(0);',
        position: 'right'
    },
    { 
        target: '#coding_space_tutorial', 
        content: 'In der zweiten Zeile werden die Dimensionen des PBMs angegeben. Zuerst die Breite und dann die Höhe.',
        trigger: 'pbmExample(1);',
        position: 'right'
    },
    { 
        target: '#coding_space_tutorial', 
        content: 'Danach können die einzelnen Werte eingetragen werden. Dieser Teil wird Body genannt. Bei PBMs gibt es nur zwei mögliche Werte: 0 für weiße Pixel und 1 für schwarze Pixel.',
        trigger: 'pbmExample(2);',
        position: 'right'
    },
    { 
        target: '#coding_space_tutorial', 
        content: 'Hierbei ist zu beachten, dass die einzelnen Werte durch ein Leerzeichen getrennt werden müssen.',
        trigger: null,
        position: 'right'
    },
    { 
        target: '#coding_space_tutorial', 
        content: 'Der Code im Body selbst kann auch in einer Zeile geschrieben werden und würde trotzdem gleich interpretiert werden.',
        trigger: 'pbmExample(3);',
        position: 'right'
    },
    { 
        target: '#coding_space_tutorial', 
        content: 'Es wird aber empfohlen, mit der Entertaste Zeilenumbrüche einzufügen, wenn die jeweilige Breite der Grafik erreicht wurde.',
        trigger: 'pbmExample(2);',
        position: 'right'
    },  
]

const pgm_format = [
    { 
        target: null, 
        content: 'Dieses Tutorial soll einen Überblick über das Format Portable Graymap (PGM) geben.',
        trigger: 'toggleView("50%", "50%");',
        position: null
    },
    { 
        target: '#coding_space_tutorial', 
        content: 'In der ersten Zeile wird "P2" eingetragen. Dadurch wird angegeben, dass es sich um ein PGM handelt.',
        trigger: 'pgmExample(0);',
        position: 'right'
    },
    { 
        target: '#coding_space_tutorial', 
        content: 'In der zweiten Zeile werden die Dimensionen des PGMs angegeben. Zuerst die Breite und dann die Höhe.',
        trigger: 'pgmExample(1);',
        position: 'right'
    },
    { 
        target: '#coding_space_tutorial', 
        content: 'In der dritten Zeile wird nun die Farbtiefe eingetragen. Diese gibt an, wie viele Abstufungen von Helligkeitswerten es gibt. Der Maximalwert beträgt meist 255.',
        trigger: 'pgmExample(2);',
        position: 'right'
    },
    { 
        target: '#coding_space_tutorial', 
        content: '0 beschreibt dabei schwarze Pixel, der Wert der Farbtiefe selbst beschreibt weiße Pixel und alle Werte dazwischen beschreiben verschiedene Grautöne.',
        trigger: null,
        position: 'right'
    },
    { 
        target: '#coding_space_tutorial', 
        content: 'Darauf folgen, durch Leerzeichen getrennte, Werte in den Grenzen zwischen 0 und der angegebenen Farbtiefe.',
        trigger: 'pgmExample(3);',
        position: 'right'
    },
    { 
        target: '#coding_space_tutorial', 
        content: 'Der Code im Body selbst kann auch in einer Zeile geschrieben werden und würde trotzdem gleich interpretiert werden.',
        trigger: 'pgmExample(4);',
        position: 'right'
    },
    { 
        target: '#coding_space_tutorial', 
        content: 'Es wird aber empfohlen, mit der Entertaste Zeilenumbrüche einzufügen, wenn die jeweilige Breite der Grafik erreicht wurde.',
        trigger: 'pgmExample(3);',
        position: 'right'
    },  
]

const ppm_format = [
    { 
        target: null, 
        content: 'Dieses Tutorial soll einen Überblick über das Format Portable Pixmap (PPM) geben.',
        trigger: 'toggleView("50%", "50%");',
        position: null
    },
    { 
        target: '#coding_space_tutorial', 
        content: 'In der ersten Zeile wird "P3" eingetragen. Dadurch wird angegeben, dass es sich um ein PPM handelt.',
        trigger: 'ppmExample(0);',
        position: 'right'
    },
    { 
        target: '#coding_space_tutorial', 
        content: 'In der zweiten Zeile werden die Dimensionen des PPMs angegeben. Zuerst die Breite und dann die Höhe.',
        trigger: 'ppmExample(1);',
        position: 'right'
    },
    { 
        target: '#coding_space_tutorial', 
        content: 'In der dritten Zeile wird nun die Farbtiefe eingetragen. Diese gibt an, wie viele Abstufungen von Helligkeitswerten es gibt. Der Maximalwert beträgt meist 255.',
        trigger: 'ppmExample(2);',
        position: 'right'
    },
    { 
        target: '#coding_space_tutorial', 
        content: 'Die Pixelwerte werden hierbei durch drei Werte beschrieben. Bei diesen Dreierpäckchen gibt der erste Wert den Rot-, der zweite Wert den Grün- und der dritte Wert den Blauanteil an.',
        trigger: null,
        position: 'right'
    },
    { 
        target: '#coding_space_tutorial', 
        content: 'Diese Werte werden nun in den Body eingetragen. Sie sind jeweils durch ein Leerzeichen zu trennen. Es kann helfen zwei Leerzeichen zwischen den Dreiergruppen einzufügen.',
        trigger: 'ppmExample(3);',
        position: 'right'
    },
    { 
        target: '#coding_space_tutorial', 
        content: 'Der Code im Body selbst kann auch in einer Zeile geschrieben werden und würde trotzdem gleich interpretiert werden.',
        trigger: 'ppmExample(4);',
        position: 'right'
    },
    { 
        target: '#coding_space_tutorial', 
        content: 'Es wird aber empfohlen, mit der Entertaste Zeilenumbrüche einzufügen, wenn die jeweilige Breite der Grafik erreicht wurde.',
        trigger: 'ppmExample(3);',
        position: 'right'
    },  
]

const svg_format = [
    { 
        target: null, 
        content: 'Dieses Tutorial soll einen Überblick über das Format Scalable Vector Graphic (SVG) geben.',
        trigger: 'toggleView("50%", "50%");',
        position: null
    },
    { 
        target: '#coding_space_tutorial', 
        content: 'Zunächst wird der SVG-Tag geöffnet. Damit definieren wir unser Koordinatensystem.',
        trigger: 'svgExample(0);',
        position: 'right'
    },
    { 
        target: '#coding_space_tutorial', 
        content: 'die ersten beiden Zahlen in "viewBox" beschreiben die obere linke Ecke des Koordinatensystems und die letzten beiden Zahlen die untere rechte Ecke.',
        trigger: null,
        position: 'right'
    },
    { 
        target: '#coding_space_tutorial', 
        content: 'Der Ursprung des Koordinatensystems ist also in der oberen linken Ecke.',
        trigger: null,
        position: 'right'
    },
    { 
        target: '#coding_space_tutorial', 
        content: 'Fügen wir nun eine Grundform in das Koordinatensystem ein. In diesem Fall <rect>',
        trigger: 'svgExample(1);',
        position: 'right'
    },
    { 
        target: '#coding_space_tutorial', 
        content: 'Hierbei beschreiben "x" und "y" die Koordinate der oberen linken Ecke des Rechtecks und "width" und "height" die Breite und Höhe.',
        trigger: null,
        position: 'right'
    },
    { 
        target: '#coding_space_tutorial', 
        content: 'Diese können frei angepasst werden, sollten im besten Fall aber innerhalb des definierten Koordinatensystems liegen.',
        trigger: 'svgExample(2);',
        position: 'right'
    },
    { 
        target: '#coding_space_tutorial', 
        content: 'Mit dem "fill" Attribut können wir die Farbe der Form festlegen. Dies kann beispielsweise durch das schreiben des englischen Namens der Farbe geschehen.',
        trigger: 'svgExample(3);',
        position: 'right'
    },
    { 
        target: '#coding_space_tutorial', 
        content: 'Es ist aber auch möglich dort RGB Farben einzutragen. Dafür schreiben wir beispielsweise in das "fill" Attribut "rgb(150, 150, 150)". Werte zwischen 0 und 255 können für jeden Kanal angegeben werden.',
        trigger: 'svgExample(4);',
        position: 'right'
    },
    { 
        target: '#coding_space_tutorial', 
        content: 'Mit dem "stroke" Attribut können wir die Farbe des Umrisses festlegen. Auch hier kann die Farbe auf beide Arten angegeben werden.',
        trigger: 'svgExample(5);',
        position: 'right'
    },
    { 
        target: '#coding_space_tutorial', 
        content: 'Das "stroke-width" Attribut gibt die Breite des Umrisses an. Standardmäßig ist die Breite auf 1 gesetzt.',
        trigger: 'svgExample(6);',
        position: 'right'
    },
    { 
        target: null, 
        content: 'Wichtig ist, dass auf die Rechtschreibung geachtet wird. Wird beispielsweise "width" oder "height" falsch geschrieben, wird die Form nicht angezeigt.',
        trigger: null,
        position: null
    },
]

/**
 * add tutorials with their respective type name
 */
tutorials['ict_test']               = ict_test;
tutorials['put_pixel_overview']     = put_pixel_overview;
tutorials['put_pixel_function']     = put_pixel_function;
tutorials['my_pic_coder_overview']  = my_pic_coder_overview;
tutorials['pbm_format']             = pbm_format;
tutorials['pgm_format']             = pgm_format;
tutorials['ppm_format']             = ppm_format;
tutorials['svg_format']             = svg_format;


/**
 * add custom functions you want to call via the trigger method here
 */
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////// PutPixel //////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function putPixelExample1() {
    picture_width = 10;
    picture_height = 10;

    file_width.value = picture_width;
    file_height.value = picture_height;

    let exampleCode = ''
    exampleCode += 'putPixel(0, 0);'

    const textarea = document.getElementById('editing');

    textarea.value = exampleCode;

    // trigger 'keyup' event to have code enumeration
    let event = new KeyboardEvent('keyup', {});
    textarea.dispatchEvent(event);

    // trigger 'input' event to have syntax highlighting
    event = new KeyboardEvent('input', {});
    textarea.dispatchEvent(event);
}

function putPixelExample2() {
    picture_width = 10;
    picture_height = 10;

    file_width.value = picture_width;
    file_height.value = picture_height;

    let exampleCode = ''
    exampleCode += 'putPixel(0, 0, 100);'

    const textarea = document.getElementById('editing');

    textarea.value = exampleCode;

    // trigger 'keyup' event to have code enumeration
    let event = new KeyboardEvent('keyup', {});
    textarea.dispatchEvent(event);

    // trigger 'input' event to have syntax highlighting
    event = new KeyboardEvent('input', {});
    textarea.dispatchEvent(event);
}

function putPixelExample3() {
    picture_width = 10;
    picture_height = 10;

    file_width.value = picture_width;
    file_height.value = picture_height;

    let exampleCode = ''
    exampleCode += 'putPixel(0, 0, [30, 60, 90]);'

    const textarea = document.getElementById('editing');

    textarea.value = exampleCode;

    // trigger 'keyup' event to have code enumeration
    let event = new KeyboardEvent('keyup', {});
    textarea.dispatchEvent(event);

    // trigger 'input' event to have syntax highlighting
    event = new KeyboardEvent('input', {});
    textarea.dispatchEvent(event);
}

function putPixelExample4() {
    picture_width = 10;
    picture_height = 10;

    file_width.value = picture_width;
    file_height.value = picture_height;

    let exampleCode = ''
    exampleCode += 'for (let y = 0; y < picture_height; y++) {\n'
    exampleCode += '\tfor (let x = 0; x < picture_width; x++) {\n'
    exampleCode += '\t\tif (x != y) {\n'
    exampleCode += '\t\t\tputPixel(x, y, [25 * x, 25 * y, 12 * x + 12 * y]);\n'
    exampleCode += '\t\t}\n'
    exampleCode += '\t}\n'
    exampleCode += '}'

    const textarea = document.getElementById('editing');

    textarea.value = exampleCode;

    // trigger 'keyup' event to have code enumeration
    let event = new KeyboardEvent('keyup', {});
    textarea.dispatchEvent(event);

    // trigger 'input' event to have syntax highlighting
    event = new KeyboardEvent('input', {});
    textarea.dispatchEvent(event);

    tryExecuteCode();
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////// MyPicCoder /////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function pbmExample(step) {
    
    let fileContent = '';
    
    switch(step) {
        case 0:
            fileContent =   'P1';
            break;
        case 1: 
            fileContent =   'P1\n';
            fileContent +=  '3 2';
            break;
        case 2:
            fileContent =   'P1\n';
            fileContent +=  '3 2\n';
            fileContent +=  '1 0 1\n'
            fileContent +=  '0 1 0'
            break;
        case 3:
            fileContent =   'P1\n';
            fileContent +=  '3 2\n';
            fileContent +=  '1 0 1 0 1 0'
            break;
    }

    const textarea = document.querySelector('.ict-code');
    textarea.value = fileContent;

    display();

    // trigger 'keyup' event to have code enumeration
    let event = new KeyboardEvent('keyup', {});
    textarea.dispatchEvent(event);

    // trigger 'input' event to have syntax highlighting
    event = new KeyboardEvent('input', {});
    textarea.dispatchEvent(event);
}

function pgmExample(step) {
    
    let fileContent = '';
    
    switch(step) {
        case 0:
            fileContent =   'P2';
            break;
        case 1: 
            fileContent =   'P2\n';
            fileContent +=  '3 2';
            break;
        case 2:
            fileContent =   'P2\n';
            fileContent +=  '3 2\n';
            fileContent +=  '2';
            break;
        case 3:
            fileContent =   'P2\n';
            fileContent +=  '3 2\n';
            fileContent +=  '2\n';
            fileContent +=  '0 1 2\n'
            fileContent +=  '1 2 0'
            break;
        case 4:
            fileContent =   'P2\n';
            fileContent +=  '3 2\n';
            fileContent +=  '2\n';
            fileContent +=  '0 1 2 1 2 0'
            break;
    }

    const textarea = document.querySelector('.ict-code');
    textarea.value = fileContent;

    display();

    // trigger 'keyup' event to have code enumeration
    let event = new KeyboardEvent('keyup', {});
    textarea.dispatchEvent(event);

    // trigger 'input' event to have syntax highlighting
    event = new KeyboardEvent('input', {});
    textarea.dispatchEvent(event);
}

function ppmExample(step) {
    
    let fileContent = '';
    
    switch(step) {
        case 0:
            fileContent =   'P3';
            break;
        case 1: 
            fileContent =   'P3\n';
            fileContent +=  '4 2';
            break;
        case 2:
            fileContent =   'P3\n';
            fileContent +=  '4 2\n';
            fileContent +=  '1';
            break;
        case 3:
            fileContent =   'P3\n';
            fileContent +=  '4 2\n';
            fileContent +=  '1\n';
            fileContent +=  '0 0 0  0 0 1  0 1 0  0 1 1\n'
            fileContent +=  '1 0 0  1 0 1  1 1 0  1 1 1'
            break;
        case 4:
            fileContent =   'P3\n';
            fileContent +=  '4 2\n';
            fileContent +=  '1\n';
            fileContent +=  '0 0 0  0 0 1  0 1 0  0 1 1  1 0 0  1 0 1  1 1 0  1 1 1'
            break;
    }

    const textarea = document.querySelector('.ict-code');
    textarea.value = fileContent;

    display();

    // trigger 'keyup' event to have code enumeration
    let event = new KeyboardEvent('keyup', {});
    textarea.dispatchEvent(event);

    // trigger 'input' event to have syntax highlighting
    event = new KeyboardEvent('input', {});
    textarea.dispatchEvent(event);
}

function svgExample(step) {
    
    let fileContent = '';
    
    switch(step) {
        case 0:
            fileContent =   '<svg viewBox="0 0 10 10">\n';
            fileContent +=  '</svg>';
            break;
        case 1: 
            fileContent =   '<svg viewBox="0 0 10 10">\n';
            fileContent +=  '\t<rect x="2" y="2" width="6" height="6"/>\n';
            fileContent +=  '</svg>';
            break;
        case 2: 
            fileContent =   '<svg viewBox="0 0 10 10">\n';
            fileContent +=  '\t<rect x="1" y="3" width="4" height="3"/>\n';
            fileContent +=  '</svg>';
            break;
        case 3:
            fileContent =   '<svg viewBox="0 0 10 10">\n';
            fileContent +=  '\t<rect x="2" y="2" width="6" height="6" fill="gray"/>\n';
            fileContent +=  '</svg>';
            break;
        case 4:
            fileContent =   '<svg viewBox="0 0 10 10">\n';
            fileContent +=  '\t<rect x="2" y="2" width="6" height="6" fill="rgb(150, 150, 150)"/>\n';
            fileContent +=  '</svg>';
            break;
        case 5:
            fileContent =   '<svg viewBox="0 0 10 10">\n';
            fileContent +=  '\t<rect x="2" y="2" width="6" height="6" fill="rgb(150, 150, 150)"\n'
            fileContent +=  '\t\tstroke="rgb(0, 0, 0)"/>\n';
            fileContent +=  '</svg>';
            break;
        case 6:
            fileContent =   '<svg viewBox="0 0 10 10">\n';
            fileContent +=  '\t<rect x="2" y="2" width="6" height="6" fill="rgb(150, 150, 150)"\n'
            fileContent +=  '\t\tstroke="rgb(0, 0, 0)" stroke-width="0.5"/>\n';
            fileContent +=  '</svg>';
            break;
    }

    const textarea = document.querySelector('.ict-code');
    textarea.value = fileContent;

    display();

    // trigger 'keyup' event to have code enumeration
    let event = new KeyboardEvent('keyup', {});
    textarea.dispatchEvent(event);

    // trigger 'input' event to have syntax highlighting
    event = new KeyboardEvent('input', {});
    textarea.dispatchEvent(event);
}

/*
 * interactive tutorials:
 * This part controlls the functionallity of the tutorials. To add content please do so above
 */
let current_tutorial_step = 0;
let current_tutorial = null;
let focused_element = null;

let tutorial_toast = null;
let tutorial_title = null;
let tutorial_content = null;
let tutorial_prev = null;
let tutorial_next = null;
let tutorial_overlay = null;

function initIctTutorial() {
    // check if the tutorial toast exists, if that's the case initialize it
    tutorial_toast = document.getElementById('ict-tutorial_toast');

    if (tutorial_toast) {
        tutorial_title = document.getElementById('ict-tutorial_title');
        tutorial_content = document.getElementById('ict-tutorial_content');
        tutorial_prev = document.getElementById('ict-tutorial_prev');
        tutorial_next = document.getElementById('ict-tutorial_next');
        tutorial_overlay = document.getElementById('ict-overlay');      
        
        // Event listeners for next and previous buttons
        tutorial_prev.addEventListener('click', handlePrev);
        tutorial_next.addEventListener('click', handleNext);
    }
}

function startTutorial(type, title='Tutorial') {
    try {
        current_tutorial = tutorials[type];
        current_tutorial_step = 0;
        tutorial_title.textContent = title;
        showTutorial(current_tutorial_step);
    }
    catch {
        console.log('something went wrong. Perhaps you didn\'t define this tutorial type yet.');
    }
}

function showTutorial(step) {
    // remove last focus, if it exists
    if(focused_element) {
        focused_element.classList.remove('ict-focused_element');
    }
    
    const { target, content, trigger, position } = current_tutorial[step];
    const targetElement = document.querySelector(target);

    tutorial_toast.style.display = 'block';
    tutorial_content.textContent = content;
    tutorial_content.style.display = 'block';
    tutorial_overlay.style.display = 'block';

    if (targetElement) {
        // add focus to our target element if there is one
        targetElement.classList.add('ict-focused_element');
        focused_element = targetElement;

        // Position the tutorial toast to our target 
        const rect = targetElement.getBoundingClientRect();    

        position_toast(rect, position);
        
    }
    else {
        // center the toast, if there is no target element
        tutorial_toast.style.top = '50%';
        tutorial_toast.style.left = '50%';
        tutorial_toast.style.transform = 'translate(-50%, -50%)';
    }

    if (trigger) {
        const triggerFunction = Function(trigger);
        triggerFunction();
    }
}

function position_toast(rect, position) {
    
    // if transform was set, set it to "none"
    if(tutorial_toast.style.transform) {
        tutorial_toast.style.transform = 'none';
    }

    const tutorial_rect = tutorial_toast.getBoundingClientRect();  
    
    let tmp = 0;


    switch (position) {
        case 'top':
            tmp = rect.top - tutorial_rect.height;
            tutorial_toast.style.top = tmp + 'px';

            tmp = rect.left + (((rect.right - rect.left) / 2) - (tutorial_rect.width / 2));
            tutorial_toast.style.left = tmp + 'px';
            break;
        case 'top-right':
            tmp = rect.top - tutorial_rect.height;
            tutorial_toast.style.top = tmp + 'px';

            tmp = rect.right - tutorial_rect.width;
            tutorial_toast.style.left = tmp + 'px';
            break;
        case 'right-top':
            tutorial_toast.style.top = rect.top + 'px';

            tutorial_toast.style.left = rect.right + 'px';
            break;
        case 'right':
            tmp = rect.top + (((rect.bottom - rect.top) / 2) - (tutorial_rect.height / 2)); 
            tutorial_toast.style.top = tmp + 'px';

            tutorial_toast.style.left = rect.right + 'px';
            break;
        case 'right-bottom':
            tmp = rect.bottom - tutorial_rect.height;
            tutorial_toast.style.top = tmp + 'px';

            tutorial_toast.style.left = rect.right + 'px';
            break;
        case 'bottom-right':
            tutorial_toast.style.top = rect.bottom + 'px';
            
            tmp = rect.right - tutorial_rect.width;
            tutorial_toast.style.left = tmp + 'px';
            break;
        case 'bottom':
            tutorial_toast.style.top = rect.bottom + 'px';

            tmp = rect.left + (((rect.right - rect.left) / 2) - (tutorial_rect.width / 2));
            tutorial_toast.style.left = tmp + 'px';
            break;
        case 'bottom-left':
            tutorial_toast.style.top = rect.bottom + 'px';

            tutorial_toast.style.left = rect.left + 'px';
            break;
        case 'left-bottom':
            tmp = rect.bottom - tutorial_rect.height;
            tutorial_toast.style.top = tmp + 'px';

            tmp = rect.left - tutorial_rect.width;
            tutorial_toast.style.left = tmp + 'px';
            break;
        case 'left':
            tmp = rect.top + (((rect.bottom - rect.top) / 2) - (tutorial_rect.height / 2)); 
            tutorial_toast.style.top = tmp + 'px';

            tmp = rect.left - tutorial_rect.width;
            tutorial_toast.style.left = tmp + 'px';
            break;
        case 'left-top':
            tutorial_toast.style.top = rect.top + 'px';
            
            tmp = rect.left - tutorial_rect.width;
            tutorial_toast.style.left = tmp + 'px';
            break;
        case 'top-left':
            tmp = rect.top - tutorial_rect.height;
            tutorial_toast.style.top = tmp + 'px';

            tutorial_toast.style.left = rect.left + 'px';
            break;
        default:
            // center the toast, if there is no explicit position
            tutorial_toast.style.top = '50%';
            tutorial_toast.style.left = '50%';
            tutorial_toast.style.transform = 'translate(-50%, -50%)';
            break;
    }
}

function hideTutorial() {
    if(focused_element) {
        focused_element.classList.remove('ict-focused_element');
    }
    
    tutorial_toast.style.display = 'none';
    tutorial_overlay.style.display = 'none';
}

function handleNext() {
    current_tutorial_step++;
    if (current_tutorial_step < current_tutorial.length) {
        showTutorial(current_tutorial_step);
    } else {
        hideTutorial();
    }
}

function handlePrev() {
    if (current_tutorial_step > 0) {
        current_tutorial_step--;
        showTutorial(current_tutorial_step);
    }
}