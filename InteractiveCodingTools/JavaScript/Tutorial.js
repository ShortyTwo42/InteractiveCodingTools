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
        content: 'Ist die Live Vorschau ausgeschaltet, kann die Vorschau über diesen Button aktualisiert werden.',
        trigger: null,
        position: 'bottom-right'
    },
    { 
        target: '#coding_space_tutorial', 
        content: 'In diesem Abschnitt kann der Code zur Erstellung von Raster- und Vektorgrafiken eingetragen werden.',
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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////// MyPicFilter /////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const my_pic_filter_overview = [
    { 
        target: null, 
        content: 'Dieses Tutorial soll einen Überblick über das MyPicFilter-Tool geben.',
        trigger: 'prepareMyPicFilterTutorial();',
        position: null
    },
    { 
        target: '#filename_tutorial', 
        content: 'An dieser Stelle kann der Dateiname eingegeben werden. Wird eine Datei hochgeladen wird deren Name dort eingefügt.',
        trigger: null,
        position: 'bottom-left'
    },
    { 
        target: '#filewidth_tutorial', 
        content: 'Hier wird die Breite der aktuellen Datei in Pixeln angezeigt.',
        trigger: null,
        position: 'bottom-left'
    },
    { 
        target: '#fileheight_tutorial', 
        content: 'Und hier wird die Höhe der aktuellen Datei in Pixeln angezeigt.',
        trigger: null,
        position: 'bottom-left'
    },
    { 
        target: '#noise_tutorial', 
        content: 'An dieser Stelle kann zwischen zwei Rausch-Arten ausgewählt werden. Dem Salz-und-Pfeffer-Rauschen und dem Gauß-Rauschen.',
        trigger: null,
        position: 'bottom-left'
    },
    { 
        target: '#noise_strength_tutorial', 
        content: 'Wurde eine Rausch-Art ausgewählt kann die Intensität von dieser hier eingestellt werden und anschließend auf das Eingabebild drauf gerechnet werden.',
        trigger: null,
        position: 'bottom-left'
    },
    { 
        target: '#noise_strength_tutorial', 
        content: 'Genauere Informationen dazu finden sich in einem separatem Tutorial.',
        trigger: null,
        position: 'bottom-left'
    },
    { 
        target: '#download_button', 
        content: 'Durch Klicken auf den Speicher Button wird zunächst das Speichermenü aufgerufen.',
        trigger: null,
        position: 'bottom-left'
    },
    { 
        target: null, 
        content: 'Hier kann ausgewählt werden, welche Bilder gespeichert werden sollen und in welchem Format.',
        trigger: 'openModal("save_modal");',
        position: null
    },
    { 
        target: '#save_as_tutorial', 
        content: 'Es kann zwischen den Formaten PGM, PPM, JPG und PNG ausgewählt werden.',
        trigger: null,
        position: 'bottom-left'
    },
    { 
        target: '#save_pic_tutorial', 
        content: 'Anschließend kann ausgewählt werden, ob das Eingabebild und/oder das Ausgabebild gespeichert werden sollen.',
        trigger: null,
        position: 'bottom-left'
    },
    { 
        target: '#save_pic_tutorial', 
        content: 'Die Option das Ausgabebild zu speichern ist dabei standardmäßig angehakt.',
        trigger: null,
        position: 'bottom-left'
    },
    { 
        target: '#save_tutorial', 
        content: 'Wird auf diesen Button geklickt, werden die ausgewählten Bilder in dem ausgewähltem Format runtergeladen.',
        trigger: null,
        position: 'bottom-right'
    },
    { 
        target: null, 
        content: 'Das Eingabebild wird unter dem Dateinamen und das Ausgabebild unter dem Dateinamen + "_gefiltert" gespeichert.',
        trigger: null,
        position: null
    },
    { 
        target: '#upload_button', 
        content: 'Über diesen Button können eigene Bilder hochgeladen werden. Diese müssen im Format PGM, PPM, JPG oder PNG vorliegen.',
        trigger: 'closeModal("save_modal");',
        position: 'bottom-left'
    },
    { 
        target: '#example_button', 
        content: 'Es ist aber auch möglich bereits vorliegende Motive hochzuladen. Über diesen Button wird das Beispielbilder-Menü geöffnet.',
        trigger: null,
        position: 'bottom-left'
    },
    { 
        target: null, 
        content: 'Hier kann aus verschiedenen Motiven ausgewählt werden.',
        trigger: 'openModal("example_modal");',
        position: null
    },
    { 
        target: '#example_type_tutorial', 
        content: 'Es können sowohl Graustufen- als auch Farbbilder hochgeladen werden.',
        trigger: null,
        position: 'bottom-left'
    },
    { 
        target: '#example_upload_tutorial', 
        content: 'Durch Klicken auf diesen Button wird das aktuell ausgewählte Motiv hochgeladen.',
        trigger: 'uploadExample();',
        position: 'bottom-right'
    },
    { 
        target: '#max_original_button', 
        content: 'Dieser Button maximiert die Ansicht des Eingabebildes.',
        trigger: 'closeModal("example_modal"); toggleView("100%", "0%");',
        position: 'bottom-left'
    },
    { 
        target: '#max_filtered_button', 
        content: 'Und dieser Button maximiert die Ansicht des Ausgabebildes.',
        trigger: 'toggleView("0%", "100%");',
        position: 'bottom-left'
    },
    { 
        target: '#split_screen_button', 
        content: 'Dieser Button sorgt dafür, dass Ein- und Ausgabebild zu gleichen Teilen angezeigt werden.',
        trigger: 'toggleView("50%", "50%");',
        position: 'bottom-left'
    },
    { 
        target: '#filter_menu_tutorial', 
        content: 'Durch Klicken auf diesen Button wird das Filtermenü geöffnet.',
        trigger: null,
        position: 'bottom-right'
    },
    { 
        target: null, 
        content: 'Hier können verschiedene Filtereinstellungen vorgenommen werden.',
        trigger: 'toggleFilterMenu();',
        position: null
    },
    { 
        target: '#choose_filter_tutorial', 
        content: 'Hier kann ein Filter ausgewählt werden. Als Beispiel wird der Gauß-Filter gewählt.',
        trigger: 'selectFilter("gaussian");',
        position: 'bottom-left'
    },
    { 
        target: '#choose_border_treatment_tutorial', 
        content: 'An dieser Stelle kann die Randbehandlung ausgewählt werden.',
        trigger: 'selectBorderTreatment("none");',
        position: 'bottom-left'
    },
    { 
        target: '#choose_border_treatment_tutorial', 
        content: 'Bei keiner Randbehandlung, werden die Pixel, bei denen die Filtermaske nicht vollständig im Bild liegt schwarz gefärbt.',
        trigger: null,
        position: 'bottom-left'
    },
    { 
        target: '#choose_border_treatment_tutorial', 
        content: 'Wird sich für die Pixelwiederholung entschieden, werden die fehlenden Informationen durch Wiederholung des äußersten Pixels aufgefüllt.',
        trigger: 'selectBorderTreatment("repeat");',
        position: 'bottom-left'
    },
    { 
        target: '#choose_border_treatment_tutorial', 
        content: 'Wird sich für die Spiegelung entschieden, werden die fehlenden Informationen durch das Spiegeln der Pixel am äußeren Pixel aufgefüllt.',
        trigger: 'selectBorderTreatment("mirror");',
        position: 'bottom-left'
    },
    { 
        target: '#gaussian_info_tutorial', 
        content: 'Ein kurzer Info Text erläutert die Funktionsweise des Filters.',
        trigger: null,
        position: 'bottom'
    },
    { 
        target: '#gaussian_radius_tutorial', 
        content: 'Zusätzlich kann hier der Radius der Filtermaske ausgewählt werden.',
        trigger: null,
        position: 'top'
    },
    { 
        target: '#gaussian_radius_tutorial', 
        content: 'Die Maske wird zusätzlich visualisiert. Das rote Pixel soll das aktuelle Pixel repräsentieren und die schwarzen Pixel sind Teil der Maske.',
        trigger: null,
        position: 'top'
    },
    { 
        target: '#filter_menu_tutorial', 
        content: 'Durch erneutes Klicken auf diesen Button wird das Filtermenü wieder geschlossen.',
        trigger: 'toggleFilterMenu();',
        position: 'bottom-right'
    },
    { 
        target: '#filter_button', 
        content: 'Durch Klicken auf diesen Button wird der aktuell ausgewählte Filter mit all seinen Einstellungen auf das Eingabebild angewandt.',
        trigger: 'applyFilter();',
        position: 'bottom-right'
    },
    { 
        target: '#coding_space_tutorial', 
        content: 'Hier wird das Eingabebild angezeigt.',
        trigger: null,
        position: 'right'
    },
    { 
        target: '#preview_space_tutorial', 
        content: 'Hier wird das gefilterte Ausgabebild angezeigt.',
        trigger: null,
        position: 'left'
    },
]

const my_pic_filter_sp_noise = [
    {
        target: null, 
        content: 'Dieses Tutorial soll zeigen, wie Salz-und-Pfeffer-Rauschen auf ein Eingabebild gerechnet werden kann.',
        trigger: 'prepareMyPicFilterTutorial();',
        position: null
    },
    {
        target: '#coding_space_tutorial',
        content: 'Zunächst laden wir ein neues Eingabebild hoch.',
        trigger: 'uploadExample();',
        position: 'right'
    },
    { 
        target: '#noise_tutorial', 
        content: 'Nun wird das Salz-und-Pfeffer-Rauschen ausgewählt.',
        trigger: 'selectNoise("sp_noise");',
        position: 'bottom-left'
    },
    { 
        target: '#noise_strength_tutorial', 
        content: 'Dessen Intensität wird als "Rauschanteil" in Prozent angegeben. Setzen wir diese zunächst auf 1.',
        trigger: null,
        position: 'bottom-left'
    },
    { 
        target: '#noise_strength_tutorial', 
        content: 'Das bedeutet, dass bei einem Prozent Rauschanteil zunächst berechnet wird, wieviele Pixel ein Prozent des Eingabebildes sind.',
        trigger: 'setNoiseStrength(1);',
        position: 'bottom-left'
    },
    { 
        target: '#noise_strength_tutorial', 
        content: 'Anschließend wird für genau diese Anzahl immer wieder zufällig eine Pixelkoordinate ausgewählt und diese dann zufällig schwarz oder weiß eingefärbt.',
        trigger: null,
        position: 'bottom-left'
    },
    { 
        target: '#noise_strength_tutorial', 
        content: 'Durch Klicken auf das Häkchen wird das Rauschen auf das Eingabebild drauf gerechnet.',
        trigger: 'add_image_noise();',
        position: 'bottom-left'
    },
    { 
        target: '#coding_space_tutorial', 
        content: 'Das Eingabebild wird direkt angepasst.',
        trigger: null,
        position: 'right'
    },
    { 
        target: '#coding_space_tutorial', 
        content: 'Durch erneutes Klicken auf das Häckchen kann nochmal Rauschen auf das Bild gerechnet werden.',
        trigger: 'add_image_noise();',
        position: 'right'
    },
    {
        target: '#coding_space_tutorial', 
        content: 'Um das Bild zurückzusetzen muss man es erneut hochladen.',
        trigger: 'uploadExample();',
        position: 'right'
    },
    { 
        target: '#noise_strength_tutorial', 
        content: 'Setzen wir den Rauschanteil nun auf 30 Prozent.',
        trigger: 'setNoiseStrength(30);',
        position: 'bottom-left'
    },
    { 
        target: '#coding_space_tutorial', 
        content: 'Der Unterschied zu einem Prozent ist direkt zu erkennen, wenn wir nun diese Intensität draufrechnen.',
        trigger: 'add_image_noise();',
        position: 'right'
    },
    {
        target: '#coding_space_tutorial', 
        content: 'Das Bild wird zum Schluss nochmal zurückgesetzt durch erneutes hochladen.',
        trigger: 'uploadExample();',
        position: 'right'
    },
    {
        target: '#coding_space_tutorial', 
        content: 'Probiere es nun selbst aus. Wähle einen Rauschanteil aus und rechne diesen auf das Ausgabebild.',
        trigger: null,
        position: 'right'
    },
    {
        target: null, 
        content: 'Teste die Wirkung verschiedener Filter auf diese verrauschten Eingabebilder. Welcher ist am besten geeignet, um gegen diese Art Rauschen vorzugehen?',
        trigger: null,
        position: null
    },
]

const my_pic_filter_gaussian_noise = [
    {
        target: null, 
        content: 'Dieses Tutorial soll zeigen, wie Gauß-Rauschen auf ein Eingabebild gerechnet werden kann.',
        trigger: 'prepareMyPicFilterTutorial();',
        position: null
    },
    {
        target: '#coding_space_tutorial',
        content: 'Zunächst laden wir ein neues Eingabebild hoch.',
        trigger: 'uploadExample();',
        position: 'right'
    },
    { 
        target: '#noise_tutorial', 
        content: 'Nun wird das Gauß-Rauschen ausgewählt.',
        trigger: 'selectNoise("gaussian_noise");',
        position: 'bottom-left'
    },
    { 
        target: '#noise_strength_tutorial', 
        content: 'Dessen Intensität wird als "Rauschstärke" in Prozent angegeben. Setzen wir diese zunächst auf 10 Prozent.',
        trigger: 'setNoiseStrength(10);',
        position: 'bottom-left'
    },
    { 
        target: '#noise_strength_tutorial', 
        content: 'Die Rauschstärke bezeichnet dabei die Standardabweichung in Prozent. Die absolute Standardabweichung wird durch Abgleich mit der Farbtiefe ermittelt.',
        trigger: null,
        position: 'bottom-left'
    },
    { 
        target: '#noise_strength_tutorial', 
        content: 'Das bedeutet in diesem Fall soviel wie: Jeder Pixelwert weicht im Durchschnitt um 10 Prozent von seinem tatsächlichen Wert ab.',
        trigger: null,
        position: 'bottom-left'
    },
    { 
        target: '#noise_strength_tutorial', 
        content: 'Durch Klicken auf das Häkchen wird das Rauschen auf das Eingabebild drauf gerechnet.',
        trigger: 'add_image_noise();',
        position: 'bottom-left'
    },
    { 
        target: '#coding_space_tutorial', 
        content: 'Das Eingabebild wird direkt angepasst.',
        trigger: null,
        position: 'right'
    },
    { 
        target: '#coding_space_tutorial', 
        content: 'Durch erneutes Klicken auf das Häckchen kann nochmal Rauschen auf das Bild gerechnet werden.',
        trigger: 'add_image_noise();',
        position: 'right'
    },
    {
        target: '#coding_space_tutorial', 
        content: 'Um das Bild zurückzusetzen muss man es erneut hochladen.',
        trigger: 'uploadExample();',
        position: 'right'
    },
    { 
        target: '#noise_strength_tutorial', 
        content: 'Setzen wir die Rauschstärke nun auf 40 Prozent.',
        trigger: 'setNoiseStrength(40);',
        position: 'bottom-left'
    },
    { 
        target: '#coding_space_tutorial', 
        content: 'Der Unterschied zu 10 Prozent ist direkt zu erkennen, wenn wir nun diese Intensität draufrechnen.',
        trigger: 'add_image_noise();',
        position: 'right'
    },
    {
        target: '#coding_space_tutorial', 
        content: 'Das Bild wird zum Schluss nochmal zurückgesetzt durch erneutes hochladen.',
        trigger: 'uploadExample();',
        position: 'right'
    },
    {
        target: '#coding_space_tutorial', 
        content: 'Probiere es nun selbst aus. Wähle eine Rauschstärke aus und rechne diese auf das Ausgabebild.',
        trigger: null,
        position: 'right'
    },
    {
        target: null, 
        content: 'Teste die Wirkung verschiedener Filter auf diese verrauschten Eingabebilder. Welcher ist am besten geeignet, um gegen diese Art Rauschen vorzugehen?',
        trigger: null,
        position: null
    },
]

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////// MyTerrainCreator //////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const my_terrain_creator_overview = [
    { 
        target: null, 
        content: 'Dieses Tutorial soll einen Überblick über das MyTerrainCreator-Tool geben.',
        trigger: 'prepareMyTerrainCreatorTutorial();',
        position: null
    },
    {
        target: '#heightmap_mode_tutorial',
        content: 'Hier wird angezeigt, in welchem Modus sich das Tool befindet. Momentan befindet es sich im Heightmap Modus.',
        trigger: null,
        position: 'bottom'
    },
    {
        target: '#heightmap_filename_tutorial',
        content: 'An dieser Stelle kann der Dateiname eingegeben werden. Standardmäßig steht hier "Heightmap" (Im Texturemap Modus steht dort "Texturemap"). Wird eine Datei hochgeladen wird deren Name hier eingefügt.',
        trigger: null,
        position: 'bottom-left'
    },
    {
        target: '#heightmap_filewidth_tutorial',
        content: 'Hier wird die Breite der aktuell ausgewählten Textur in Pixeln angezeigt.',
        trigger: null,
        position: 'bottom-left'
    },
    {
        target: '#heightmap_fileheight_tutorial',
        content: 'Und hier wird die Höhe der aktuell ausgewählten Textur in Pixeln angezeigt.',
        trigger: null,
        position: 'bottom-left'
    },
    { 
        target: '#download_button', 
        content: 'Durch Klicken auf den Speicher Button wird zunächst das Speichermenü aufgerufen.',
        trigger: null,
        position: 'bottom-left'
    },
    { 
        target: null, 
        content: 'Hier kann ausgewählt werden, welche Bilder gespeichert werden sollen und in welchem Format. Auch ist es möglich die Geometrie runterzuladen.',
        trigger: 'openModal("save_modal");',
        position: null
    },
    { 
        target: '#save_as_tutorial', 
        content: 'Es kann zwischen den Formaten PGM, PPM, JPG und PNG ausgewählt werden.',
        trigger: null,
        position: 'bottom-left'
    },
    { 
        target: '#save_pic_tutorial', 
        content: 'Anschließend kann ausgewählt werden, ob Heightmap und/oder Texturemap gespeichert werden sollen. Beide Optionen sind standardmäßig angehakt',
        trigger: null,
        position: 'bottom-left'
    },
    { 
        target: '#save_terrain_tutorial', 
        content: 'Zusätzlich ist es möglich, das Terrain als STL Datei zu speichern. Als Dateiname wird standardgmäßig "Terrain" vorgeschlagen.',
        trigger: null,
        position: 'top'
    },
    { 
        target: '#save_tutorial', 
        content: 'Wird auf diesen Button geklickt, werden die ausgewählten Bilder in dem ausgewähltem Format und auch das Terrain, sofern ausgewählt, als STL runtergeladen.',
        trigger: null,
        position: 'bottom-right'
    },
    { 
        target: '#upload_tutorial', 
        content: 'Über diesen Button können eigene Bilder hochgeladen werden. Diese müssen im Format PGM, PPM, JPG oder PNG vorliegen.',
        trigger: 'closeModal("save_modal");',
        position: 'bottom-left'
    },
    { 
        target: '#upload_tutorial', 
        content: 'Im Heightmap Modus wird die Datei als Heightmap hochgeladen und im Texturemap Modus als Farbtextur.',
        trigger: null,
        position: 'bottom-left'
    },
    { 
        target: '#example_tutorial', 
        content: 'Es ist aber auch möglich bereits vorliegende Height- bzw. Texturemaps hochzuladen. Als was das Motiv hochgeladen wird ist auch hier abhängig vom aktuell ausgewählten Modus. Über diesen Button wird das Beispiel-Menü geöffnet.',
        trigger: null,
        position: 'bottom-left'
    },
    { 
        target: null, 
        content: 'Hier kann aus verschiedenen Motiven ausgewählt werden.',
        trigger: 'openModal("example_modal");',
        position: null
    },
    { 
        target: '#upload_example_tutorial', 
        content: 'Durch Klicken auf diesen Button wird das ausgewählte Motiv hochgeladen.',
        trigger: 'uploadExample();',
        position: 'bottom-right'
    },
    { 
        target: '#create_new_canvas', 
        content: 'Über diesen Button können leere Height- und Texturemaps erstellt werden. Durch Klicken wird zunächst das entsprechende Menü geöffnet.',
        trigger: 'closeModal("example_modal");',
        position: 'bottom-left'
    },
    { 
        target: null, 
        content: 'Hier können nun verschiedene Einstellungen unternommen werden.',
        trigger: 'openModal("new_canvas_modal");',
        position: null
    },
    { 
        target: '#heightmap_create_options_tutorial', 
        content: 'An dieser Stelle können Dateiname, Breite und Höhe für die Heightmap eingestellt werden. Die aktuellen Werte sind immer schon vorgetragen.',
        trigger: null,
        position: 'bottom'
    },
    { 
        target: '#texturemap_create_options_tutorial', 
        content: 'Hier können alle Werte für die Erstellung einer neuen Texturemap eingetragen werden.',
        trigger: null,
        position: 'top'
    },
    { 
        target: '#create_new_canvas_tutorial', 
        content: 'Durch Klicken auf diesen Button werden die ausgewählten Texturen neu erstellt.',
        trigger: null,
        position: 'bottom-right'
    },
    { 
        target: '#max_texture_button', 
        content: 'Dieser Button maximiert die Ansicht der aktuellen Textur.',
        trigger: 'closeModal("new_canvas_modal"); toggleView("100%", "0%");',
        position: 'bottom-left'
    },
    { 
        target: '#max_preview_button', 
        content: 'Und dieser Button maximiert die Ansicht der Vorschau.',
        trigger: 'toggleView("0%", "100%");',
        position: 'bottom-left'
    },
    { 
        target: '#split_screen_button', 
        content: 'Dieser Button sorgt dafür, dass Texturansicht und Vorschau zu gleichen Teilen angezeigt werden.',
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
        content: 'Ist sie angeschaltet, wirken sich Änderungen in den Texturen direkt auf das Terrain in der Vorschau aus.',
        trigger: null,
        position: 'bottom-right'
    },
    { 
        target: '#display_tutorial', 
        content: 'Ist die Live Vorschau ausgeschaltet, kann das Terrain in der Vorschau über diesen Button aktualisiert werden.',
        trigger: null,
        position: 'bottom-right'
    },
    { 
        target: '#undoButton', 
        content: 'Wird auf diesen Button geklickt, wird der letzte Pinselstrich der aktuell angezeigten Textur gelöscht.',
        trigger: null,
        position: 'right'
    },
    { 
        target: '#redoButton', 
        content: 'Klicken wir auf diesen Button, können versehendlich gelöschte Pinselstriche wiederhergestellt werden.',
        trigger: null,
        position: 'right'
    },
    { 
        target: '#eraserButton', 
        content: 'Klicken wir auf diesen Button, so können wir zwischen Pinsel und Radiergummi wechseln. Ist der Radiergummi aktiv, so ist das Icon blau.',
        trigger: 'toggleEraser();',
        position: 'right'
    },
    { 
        target: '#texturemapButton', 
        content: 'Klicken wir auf diesen Button, so können wir zwischen Height- und Texturemap Modus wechseln. Ist der Texturemap Modus aktiv, so ist das Icon blau.',
        trigger: 'toggleEraser(); toggleTexturemap();',
        position: 'right'
    },
    {
        target: '#texturemap_mode_tutorial',
        content: 'Auch hier wird angezeigt, um welchen Modus es sich handelt.',
        trigger: null,
        position: 'bottom'
    },
    { 
        target: '#menuButton', 
        content: 'Über das Menü Icon öffnen wir das Hauptmenü.',
        trigger: null,
        position: 'right'
    },
    { 
        target: null, 
        content: 'In diesem können wir verschiedene Anpassungen vornehmen.',
        trigger: 'toggleSidebar();',
        position: null
    },
    { 
        target: '#texturemap_color_div', 
        content: 'Hier kann die aktuelle Farbe des Pinsels ausgewählt werden (wenn wir im Texturemap Modus sind).',
        trigger: null,
        position: 'right'
    },
    { 
        target: null, 
        content: 'Wird in den Heightmap Modus zurück gewechselt, ändert sich auch etwas in den Pinseloptionen.',
        trigger: 'toggleTexturemap();',
        position: null
    },
    { 
        target: '#heightmap_color_div', 
        content: 'Jetzt kann an dieser Stelle der aktuelle Grauwert des Pinsels angepasst werden. Dieser wird als Höhe interpretiert.',
        trigger: 'scrollIntoView("brush_options_tutorial");',
        position: 'bottom-left'
    },
    { 
        target: '#opacity_tutorial', 
        content: 'Hier kann die Deckkraft des Pinsels angepasst werden.',
        trigger: null,
        position: 'bottom-left'
    },
    { 
        target: '#brush_tutorial', 
        content: 'Zudem kann an dieser Stelle die Größe des Pinsels ausgewählt werden.',
        trigger: null,
        position: 'bottom-left'
    },
    { 
        target: '#falloff_tutorial', 
        content: 'Und hier kann ausgewählt werden, ob es sich um einen "weichen" Pinsel handeln soll. Also ob die Deckkraft am Rand des Pinsels abnimmt.',
        trigger: null,
        position: 'bottom-left'
    },
    { 
        target: '#resolution_tutorial', 
        content: 'Diese Beiden Felder legen die Anzahl der Vektoren in X- und Y-Richtung fest. Minimum ist 2 und Maximum ist 500.',
        trigger: 'scrollIntoView("terrain_options_tutorial");',
        position: 'top-left'
    },
    { 
        target: '#resolution_tutorial', 
        content: 'Hier wird es auf 200 gesetzt.',
        trigger: 'changeResolution(200);',
        position: 'top-left'
    },
    { 
        target: '#terrain_scale_tutorial', 
        content: 'Hierüber wird ein Skalierungsfaktor für das gesamte Terrain in X- und Y-Richtung festgelegt. Hier wird es mit dem Faktor 10 skaliert.',
        trigger: 'changeScale(10);',
        position: 'top-left'
    },
    { 
        target: '#displacement_scale_tutorial', 
        content: 'Mit diesem Wert wird ein Faktor eingestellt, mit dem die Höhenwerte multipliziert werden.',
        trigger: null,
        position: 'top-left'
    },
    { 
        target: '#displacement_scale_tutorial', 
        content: 'Je größer der Wert, desto höher der Einfluss der Heightmap. Zunächst wird er auf 50 gesetzt.',
        trigger: 'changeDisplacementScale(50);',
        position: 'top-left'
    },
    { 
        target: '#displacement_scale_tutorial', 
        content: 'Nun wird er auf 100 gesetzt. Die Anpassung ist sofort sichtbar.',
        trigger: 'changeDisplacementScale(100);',
        position: 'top-left'
    },
    { 
        target: '#wireframe_tutorial', 
        content: 'Wird diese Option angehakt wird das Terrain als Wireframe angezeigt',
        trigger: 'toggleWireframe();',
        position: 'top-left'
    },
    { 
        target: '#light_rotation_tutorial', 
        content: 'Hier kann eingestellt werden, ob die Lichtquelle um das Terrain rotieren soll.',
        trigger: 'scrollIntoView("light_options_tutorial"); toggleWireframe();',
        position: 'top-left'
    },
    { 
        target: '#light_rotation_speed_tutorial', 
        content: 'Zudem kann hier die Geschwindigkeit, mit der um das Terrain rotiert werden soll hier angepasst werden.',
        trigger: null,
        position: 'top-left'
    },
    { 
        target: '#light_color_tutorial', 
        content: 'Auch die Farbe des Lichts kann angepasst werden.',
        trigger: null,
        position: 'top-left'
    },
    { 
        target: '#coding_space_tutorial', 
        content: 'Mit dem Mausrad kann in die Texturen rein und rausgezoomt werden.',
        trigger: 'toggleSidebar();',
        position: 'right'
    },
    { 
        target: '#coding_space_tutorial', 
        content: 'Ist die linke Maustaste gedrückt, kann auf die Textur gezeichnet werden.',
        trigger: null,
        position: 'right'
    },
    { 
        target: '#coding_space_tutorial', 
        content: 'Ist die rechte Maustaste gedrückt, kann über die Textur geschwenkt werden.',
        trigger: null,
        position: 'right'
    },
    { 
        target: '#preview_space_tutorial', 
        content: 'Auch in der Terrain Vorschau kann mithilfe des Mausrads gezoomt werden.',
        trigger: null,
        position: 'left'
    },
    { 
        target: '#preview_space_tutorial', 
        content: 'Ist die linke Maustaste gedrückt, kann die Kameraposition angepasst werden.',
        trigger: null,
        position: 'left'
    },
    { 
        target: null, 
        content: 'Versuch es nun selbst. Passe Height- und Texturemap nach deinen Wünschen an.',
        trigger: null,
        position: null
    },
]


/**
 * add tutorials with their respective type name
 */
tutorials['ict_test']                       = ict_test;
tutorials['put_pixel_overview']             = put_pixel_overview;
tutorials['put_pixel_function']             = put_pixel_function;
tutorials['my_pic_coder_overview']          = my_pic_coder_overview;
tutorials['pbm_format']                     = pbm_format;
tutorials['pgm_format']                     = pgm_format;
tutorials['ppm_format']                     = ppm_format;
tutorials['svg_format']                     = svg_format;
tutorials['my_pic_filter_overview']         = my_pic_filter_overview;
tutorials['my_pic_filter_sp_noise']         = my_pic_filter_sp_noise;
tutorials['my_pic_filter_gaussian_noise']   = my_pic_filter_gaussian_noise;
tutorials['my_terrain_creator_overview']    = my_terrain_creator_overview;


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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////// MyPicFilter /////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function prepareMyPicFilterTutorial() {
    const filterMenu = document.querySelector('.filter_menu');
    const display = filterMenu.style.display;

    if(display == '') {
        toggleFilterMenu();
    }

    toggleView('50%', '50%');
}

function selectFilter(type) {
    let selector = document.getElementById('filter_type');
    selector.value = type;
    selectNewFilter(selector);
}

function selectBorderTreatment(type) {
    let selector = document.getElementById('border_treatment');
    selector.value = type;
}

function selectNoise(type) {
    let selector = document.getElementById('image_noise');
    selector.value = type;
    update_noise_strength();
}

function setNoiseStrength(strength) {
    let noise_strength = document.getElementById('noise_percentage');
    noise_strength.value = strength;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////// MyTerrainCreator //////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function prepareMyTerrainCreatorTutorial() {
    
    const display_sidebar = document.querySelector('.my_terrain_menu').style.display;
    if (display_sidebar == '') {
        toggleSidebar();
    }

    const active_eraser = document.getElementById('eraserButton').classList.contains('active_elem');
    if (active_eraser) {
        toggleEraser();
    }
    
    const active_texturemap = document.getElementById('texturemapButton').classList.contains('active_elem');
    if (active_texturemap) {
        toggleTexturemap();
    }
    
    toggleView('50%', '50%');
}

function changeResolution(resolution) {
    document.getElementById('resolution_x').value = resolution;
    document.getElementById('resolution_y').value = resolution;
    update_terrain_geometry();
}

function changeScale(scale) {
    document.getElementById('terrain_scale').value = scale;
    update_terrain_geometry();
}

function changeDisplacementScale(displacement) {
    document.getElementById('displacement_scale').value = displacement;
    update_terrain_geometry();
}

function toggleWireframe() {
    let wireframe = document.getElementById('wireframe');
    wireframe.checked = (wireframe.checked) ? false : true;
    update_terrain_material();
}

function scrollIntoView(id) {
    const element = document.getElementById(id);
    element.scrollIntoView();
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