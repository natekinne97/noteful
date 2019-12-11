import React from 'react';
import ApiContext from '../ApiContext';

export default class Error extends React.Component{
    static contextType = ApiContext;

    render(){
        const folder = this.context.folderExists;
        const note = this.context.noteExists;
      
       
        if(folder){
          return(
              <>
              <h3>Folder already exist. Please choose a different name</h3>
              </>
          );
        }else if(note){
            return(
                <>
                    <h3>Note already exists. Please choose a different name</h3>
                </>
            );
        }else{
            return(
                <>
                </>
            );
        }

    }
}