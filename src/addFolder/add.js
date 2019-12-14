import React from 'react';
import ApiContext from '../ApiContext';
import config from '../config';

export default class AddFolder extends React.Component{
    static contextType = ApiContext;

    static defaultProps = {
        history: {
            push: () => { },
        },
    }

    constructor(props, context){
        super(props);
        this.inputName = React.createRef();
        this.state = {
            name: {
                value: ''
            }
        }
    }


    onChange(name){
        this.setState({
            name: {
                value: name
            }
        });
        this.context.folderError(this.state.name.value);
    }

    redirectToFolder = id =>{
        const { history } = this.props
        history.push(`/folder/${id}`);
    }

    onSubmit = e => {
        e.preventDefault();
        const name = this.inputName.current.value;
       
       
        if(!this.context.folderExists){
            
            // only create a new folder if the name isnt used
            fetch(`${config.API_ENDPOINT}/folders`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    foldername: name,
                })
            })
                .then(response => response.json())
                .then(res => {
                    console.log(res);
                    this.context.addFolder(res)
                    this.redirectToFolder(res.id);
                })
                .catch(err=>console.log(err, 'error'));

            this.inputName.current.value = '';
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
                        <input type="text" placeholder="Folder name" id="folder-name" ref={this.inputName} required onChange={e => this.onChange(e.target.value)} />
                    </label>

                    <input type="submit"/>
                </form>
            </>
        );
    }
}