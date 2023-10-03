const tutorials = {};

/**
 * add your tutorial here
 * 
 * target is the id of the element you want to describe
 * content is the text you write for the current tutorial step
 * trigger is a function you want to trigger, when this step is called
 */
const ict_test = [
    { 
        target: '#save_button', 
        content: 'Über das Speicher-Symbol können Dateien abgespeichert werden.',
        trigger: 'console.log("hello");' 
    },
    { 
        target: '#upload', 
        content: 'Über das Ordner-Symbol können eigene Dateien hochgeladen werden.', 
        trigger: 'tryFileDownload();' 
    },
    { 
        target: null, 
        content: 'Dies ist das Ende meines Test Tutorials.',
        trigger: null
    },
];



// add tutorials with their respective type name
tutorials['ict_test'] = ict_test;