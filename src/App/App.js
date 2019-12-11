import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import AddFolder from '../addFolder/add';
import AddNote from '../addNote/addNote';
import ApiContext from '../ApiContext';
import Error from '../error/error';
import config from '../config';
import './App.css';


class App extends Component {
    state = {
        notes: [],
        folders: [],
        folderExists: false,
        noteExists: false
    };

    componentDidMount() {
        Promise.all([
            fetch(`${config.API_ENDPOINT}/notes`),
            fetch(`${config.API_ENDPOINT}/folders`)
        ])
            .then(([notesRes, foldersRes]) => {
               
                if (!notesRes.ok)
                    return notesRes.json().then(e => Promise.reject(e));
                if (!foldersRes.ok)
                    return foldersRes.json().then(e => Promise.reject(e));

                return Promise.all([notesRes.json(), foldersRes.json()]);
            })
            .then(([notes, folders]) => {
              
                this.setState({notes, folders});
            })
            .catch(error => {
                console.error({error});
            });
    }

    handleDeleteNote = noteId => {
       
        this.setState({
            notes: this.state.notes.filter(note => note.id !== Number(noteId))
        });
    };

    // check folder name and make sure it isnt a duplicate
    checkFolderName = folder =>  {
        this.setState({
            folderExists: false
        });
        this.state.folders.map(folderFound => {
            if (folder === folderFound.name) {
              
                this.setState({
                    folderExists: true
                });
            }
            return 0;
        });
    }

    addFolder = folder =>{
        this.setState({
            folders: this.state.folders.concat(folder)
        });
    }

    setNotes = notes =>{
        this.setState({
            notes: notes
        })
    }

    addNote = note =>{
       
        this.setNotes([
            ...this.state.notes,
            note
        ])
    }

    // make sure the note name isnt reused
    checkNoteName = noteName =>{
        this.setState({
            noteExists: false
        });
        this.state.notes.map(notesFound =>{
            if(notesFound.name === noteName){
              
                this.setState({
                    noteExists: true
                });
            }
            return 0;
        });
        return 0;
    }

    renderNavRoutes() {
        return (
            <>
                {['/', '/folder/:folderId', '/add-folder', '/add-note'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListNav}
                    />
                ))}
                <Route path="/note/:noteId" component={NotePageNav} />
                
                
            </>
        );
    }

    renderMainRoutes() {
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListMain}
                    />
                ))}
                <Route path="/add-folder" component={AddFolder} />
                <Route exact path="/add-note" component={AddNote} />
                <Route path="/note/:noteId" component={NotePageMain} />
                {/* Add error message on folder and note */}
                <Route path="/add-note" component={Error}/>
                <Route path="/add-folder" component={Error}/>
            </>
        );
    }

    render() {
      
        const value = {
            notes: this.state.notes,
            folders: this.state.folders,
            deleteNote: this.handleDeleteNote,
            addFolder: this.addFolder,
            addNote: this.addNote,
            folderError: this.checkFolderName,
            folderExists: this.state.folderExists,
            noteExists: this.state.noteExists,
            noteError: this.checkNoteName
        };
        return (
            <ApiContext.Provider value={value}>
                <div className="App">
                    <nav className="App__nav">{this.renderNavRoutes()}</nav>
                    <header className="App__header">
                        <h1>
                            <Link to="/">Noteful</Link>{' '}
                            <FontAwesomeIcon icon="check-double" />
                        </h1>
                    </header>
                    <main className="App__main">
                    
                    {this.renderMainRoutes()}</main>
                </div>
            </ApiContext.Provider>
        );
    }
}

export default App;
