import React from 'react';
import ApiContext from '../ApiContext';
import config from '../config';

export default class AddFolder extends React.Component{
    static contextType = ApiContext;

    constructor(props, context){
        super(props);
        this.state = {
            name: ''
        }
    }


    onChange(){
        console.log(this.context);
        this.setState({
            name: document.getElementById('folder-name').value
        });
        this.context.folderError(this.state.name);
    }

    onSubmit = e => {
        e.preventDefault();
        let folder = {
            name: this.state.name
        };
        
        if(!this.context.folderExists){
            // only create a new folder if the name isnt used
            fetch(`${config.API_ENDPOINT}/folders`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(folder)
            })
                .then(response => response.json())
                .then(response => this.context.addFolder(response));
        }else{
            console.log('folder exists try a new name');
        }     
    }


    render(){
        return(
            <>
                <header>
                    <h1>New Folder</h1>
                </header>
                <form onSubmit={(e) => this.onSubmit(e)}>
                    <label htmlFor="folder-name">
                        <input type="text" placeholder="folder" id="folder-name" required onChange={() => this.onChange()} />
                    </label>

                    <input type="submit"/>
                </form>
            </>
        );
    }
}