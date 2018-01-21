const fs = require('fs')

let fetchNotes = () => {
    try{
        let notesString = fs.readFileSync('notes-data.json')
        return JSON.parse(notesString);
    }
    catch(e){
        return [];
    }
}

let saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json',JSON.stringify(notes));
}

var addNote = (title, body) => {
    var notes = fetchNotes();
    var note = {
        title,
        body
    }

    let duplicateNodes = notes.filter((note)=> note.title === title)
    
    if(duplicateNodes.length === 0){
        notes.push(note);
        saveNotes(notes);
        return note;
    }
}

let getAll = () => {
    return fetchNotes();
}

let getNote = (title) => {
    let notes = fetchNotes()
    let filteredNotes = notes.filter((note) => note.title === title)
    return filteredNotes[0];
}

let removeNote = (title) => {
    let notes = fetchNotes();
    var filteredNotes = notes.filter((note)=> note.title !== title)
    saveNotes(filteredNotes);
    return notes.length !== filteredNotes.length;
}

/*Utility Functions */
let logNote = (note) => {
    console.log('----')
    console.log(`Title: ${note.title}`)
    console.log(`Body: ${note.body}`)
}

module.exports = {
    addNote,
    removeNote,
    getNote,
    getAll,
    logNote
}