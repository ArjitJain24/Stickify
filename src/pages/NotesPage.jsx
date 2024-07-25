import { useContext } from 'react'
import NoteCard from '../components/NoteCard'
import { NoteContext } from '../context/NoteContext.jsx'
import Controls from '../components/Controls'

function NotesPage() {

  const {notes} = useContext(NoteContext)


  return (
    <div>
      <Controls />
        {notes.map(note => 
            <NoteCard key={note.$id} note={note}/>
        )}
    </div>
  )
}

export default NotesPage
