import React from 'react';
import ApiContext from '../ApiContext';
import config from '../config';
import './addNote.css';

export default class AddNote extends React.Component{
    static contextType = ApiContext;
    state={
        name: '',
        modified: '',
        folderId: '',
        content: ''
    }


    onChange(){
        let name = document.getElementById('name').value;
        let content = document.getElementById('content').value;
        let modified = new Date();
        let folderId = document.getElementById('folder-list').value;
        this.setState({
            name: name,
            modified: modified,
            folderId: folderId,
            content: content,
        });
        this.context.noteError(this.state.name);
    }

    onSubmit = e =>{
        e.preventDefault();
       
        let noteExists = this.context.noteExits;
        console.log(this.state);
        if(!noteExists){
            console.log('posting');
            // only create a new folder if the name isnt used
            fetch(`${config.API_ENDPOINT}/notes`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(this.state)
            })
                .then(response => response.json())
                .then(response => this.context.addNote(response));
        }
       
    }

    render(){
             
       return(

           <section className="add-note">
               <header>
                   <h1>Add a Note</h1>
               </header>
            <form onSubmit={(e) => this.onSubmit(e)}>
                
                <label htmlFor="folder-list">Select a folder:</label>
               <select id="folder-list" required>
                       {this.context.folders.map(folder => {
                           return (
                            <option value={folder.id}>{folder.name}</option>
                           );
                       })}
               </select>
                       
               

                <label htmlFor="name">
                    Note name: 
                    <input id="name" type="text" placeholder="note name" required onChange={() => this.onChange()}/>
                </label>
                <label htmlFor="content">
                    Content: 
                       <textarea id="content" onChange={() => this.onChange()} required></textarea>
                </label>

                <input type="submit"/>
            </form>
           </section>
       );
    }
}