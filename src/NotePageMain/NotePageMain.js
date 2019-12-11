import React from 'react'
import Note from '../Note/Note'
import ApiContext from '../ApiContext'
import { findNote } from '../notes-helpers'
import './NotePageMain.css'

export default class NotePageMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = ApiContext

  

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
   
    return (
      <section className='NotePageMain'>
        <Note
          id={note.id}
          name={note.name}
          modified={note.modified}
          onDeleteNote={this.context.handleDeleteNote}
        />
        <div className='NotePageMain__content'>
          {this.renderPara(note)}
        </div>
      </section>
    )
  }
}
