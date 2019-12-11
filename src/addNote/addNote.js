import React from 'react';
import ApiContext from '../ApiContext';
import config from '../config';
import './addNote.css';

export default class AddNote extends React.Component{
    static contextType = ApiContext;
    constructor(props){
        super(props);
        this.noteName = React.createRef();
        this.content = React.createRef();
        this.state = {
            name: {
                value: ''
            },
            modified: '',
            folderId: {
                value: ''
            },
            content: {
                value: ''
            },
            history: {
                push: () => { },
            },
        }
    }


    onChange(){
        let modified = new Date();
        this.setState({
            name: {
                value: this.noteName.current.value
            },
            modified: modified,
            folderId: {
                value: document.getElementById('folder-list').value
            },
            content: {
                value: this.content.current.value
            },
        });
        // check if file exists
        this.context.noteError(this.state.name.value);
    }

    redirectOnSubmit = async id =>{
        const { history } = this.props
        history.push(`/note/${id}`);
    }

    onSubmit = async e =>{
        // if it can be created then show in file when 
        // created
        if (!this.context.noteExists) e.preventDefault();
        const note = {
            name: this.noteName.current.value,
            folder: this.state.folderId.value,
            text: this.content.current.value
        }
        // if the note name doesnt exist
        if (!this.context.noteExists){
          
            const settings = {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(note)
            }
            // only create a new folder if the name isnt used
            const fetchResponse = await fetch(`${config.API_ENDPOINT}/notes`, settings);
            const response = await fetchResponse.json();
           
            this.context.addNote(response);   
            this.redirectOnSubmit(response.id);
        }   
       
    }

    render(){
        const action = `/folder/${this.state.folderId.value}`;
       return(

           <section className="add-note">
               <header>
                   <h1>Add a Note</h1>
               </header>
            <form action={action} onSubmit={(e) => this.onSubmit(e)}>
                
                <label htmlFor="folder-list">Select a folder:</label>
               <select id="folder-list" required>
                       {this.context.folders.map(folder => {
                           return (
                            <option key={folder.id **4} value={folder.id}>{folder.foldername}</option>
                           );
                       })}
               </select>
                       
               

                <label htmlFor="name">
                    Note name: 
                    <input id="name" type="text" placeholder="note name" ref={this.noteName} required onChange={() => this.onChange()}/>
                </label>
                <label htmlFor="content">
                    Content: 
                       <textarea id="content" ref={this.content} onChange={() => this.onChange()} required></textarea>
                </label>

                <input type="submit"/>
            </form>
           </section>
       );
    }
}