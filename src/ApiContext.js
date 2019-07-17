import React from 'react'

export default React.createContext({
  notes: [],
  folders: [],
  folderExists: false,
  noteExists: false,
  addFolder: () => {},
  addNote: () => {},
  deleteNote: () => {},
  folderError: () => {},
  noteError: () => {}
})
