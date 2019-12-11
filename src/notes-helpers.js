
export const findFolder = (folders=[], folderId) =>
  folders.find(folder => folder.id === folderId)

export const findNote = (notes=[], noteId) =>{
  
  
  return notes.find(note => {
    return note.id === Number(noteId)
  })
}
  

export const getNotesForFolder = (notes=[], folderId) => {
  
  if(!folderId){
    return notes;
  }else{
    return notes.filter(note => note.folderId === Number(folderId))
  }

}

export const countNotesForFolder = (notes=[], folderId) =>{
  return notes.filter(note => note.folderId === folderId).length
}
  
