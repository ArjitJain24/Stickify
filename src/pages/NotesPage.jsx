import { useContext } from 'react'
import NoteCard from '../components/NoteCard'
import { NoteContext } from '../context/NoteContext.jsx'

function NotesPage() {

  const {notes} = useContext(NoteContext)


  return (
    <div>
        {notes.map(note => 
            <NoteCard key={note.$id} note={note}/>
        )}
    </div>
  )
}

export default NotesPage
