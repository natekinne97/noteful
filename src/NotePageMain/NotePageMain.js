import React from 'react'
import Note from '../Note/Note'
import ApiContext from '../ApiContext'
import { findNote } from '../notes-helpers'
import './NotePageMain.css'

export default class NotePageMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    },
    history: {
      push: () => { },
    },
  }
  static contextType = ApiContext

  redirectToFolder = folderId =>{
    const history = this.props.history;
    history.push(`/folder/${folderId}`)
  }  

  renderPara(note){
    if (note.content.split(/\n \r|\n/) > 0){
      return(<p>{note.content}</p>)
    }else{
      return(
        <>
          {note.content.split(/\n \r|\n/).map((para, i) =>
            <p key={i}>{para}</p>
          )}
        </>
      )
    }
  }

  render() {
    const { notes=[] } = this.context
    const { noteId } = this.props.match.params
    const note = findNote(notes, noteId) || { content: '' }
    console.log(note, 'note');
    return (
      <section className='NotePageMain'>
        <Note
          id={note.id}
          name={note.name}
          modified={note.modified}
          folderId={note.folderId}
          redirectOnDelete={this.redirectToFolder}
          onDeleteNote={this.context.handleDeleteNote}
        />
        <div className='NotePageMain__content'>
          {this.renderPara(note)}
        </div>
      </section>
    )
  }
}
