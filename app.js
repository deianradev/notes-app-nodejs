const fs = require('fs')

const yargs = require('yargs')
const notes = require('./notes.js')

let command = yargs.argv._[0]

const titleOptions = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
}
const bodyOptions = {
    describe: 'The body of the note',
    demand: true,
    alias: 'b'
}

let argv = yargs
    .command('add', 'Add a new note', {
        title: titleOptions,
        body: bodyOptions
    })
    .command('read', 'Read a note', {
        title: titleOptions
    })
    .command('remove', 'Remove a note', {
        title: titleOptions
    })
    .command('list', 'List all notes')
    .help()
    .argv;

let title = argv.title;
let body = argv.body;

let addNote = (title,body)=>{
    return notes.addNote(title,body)    
}

let listNotes = () => {
    return notes.getAll()
}

let getNote = (title) => {
    return notes.getNote(title)

}

let removeNote = (title) => {
    return notes.removeNote(title);
}

let logNote = (note) => {
    notes.logNote(note);
}
if(command === 'add'){
    var note = addNote(title,body);

    if(note){
        console.log('Note created')
        logNote(note);
    } else{
    console.log('Note title already exists')
    }
    
}
else if (command === 'list'){
    let allNotes = listNotes();
    console.log(`Printing ${allNotes.length} note(s)`);
    allNotes.forEach((note) => logNote(note));
}
else if(command === 'read'){
    var note = getNote(title);
    if(note){
        console.log('Note found')
        logNote(note);
    }else{
        console.log('Note not found')
    }
}
else if(command === 'remove'){
    var noteRemoved = removeNote(title);
    var message = (noteRemoved) ? 'Note was removed' : 'Note not found';
    console.log(message);
}
else{
    console.log('command not found')
}



