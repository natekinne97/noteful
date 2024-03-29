import React from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ApiContext from '../ApiContext'
import config from '../config'
import './Note.css'

// this section displays the notes
export default class Note extends React.Component {
  static defaultProps ={
    onDeleteNote: () => {},
    folderId: 0
  }
  static contextType = ApiContext;

  handleClickDelete = e => {
    e.preventDefault()
    const noteId = this.props.id
  
    fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
      method: 'DELETE',
    }).then(() => {
       
        this.context.deleteNote(noteId)
      
        // allow parent to perform extra behaviour
        this.props.onDeleteNote(noteId);
        this.props.redirectOnDelete(this.props.folderId);
      })
      .catch(error => {
       
        console.error({ error })
      })
  }

  render() {
    const { name, id, modified} = this.props
    return (
      <div className='Note'>
        <h2 className='Note__title'>
          <Link to={`/note/${id}`}>
            {name}
          </Link>
        </h2>
        <button
          className='Note__delete'
          type='button'
          onClick={this.handleClickDelete}
        >
          <FontAwesomeIcon icon='trash-alt' />
          {' '}
          remove
        </button>
        <div className='Note__dates'>
          <div className='Note__dates-modified'>
            Modified
            {' '}
            <span className='Date'>
              {format(modified, 'Do MMM YYYY')}
            </span>
          </div>
        </div>
      </div>
    )
  }
}
