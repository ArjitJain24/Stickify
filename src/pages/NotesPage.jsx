import React, { useEffect, useState } from 'react'
// import {fakeData as notes } from '../assets/fakeData.js'
import {db} from '../appwrite/databases.js'
import NoteCard from '../components/NoteCard'
import { databases } from '../appwrite/config.js'

function NotesPage() {

  const [notes, setNotes] = useState([])

  const init = async () => {
    const response = await db.notes.list()
    
    setNotes(response.documents)
  }

  useEffect(()=>{
    init()
  }, [])


  return (
    <div>
        {notes.map(note => 
            <NoteCard key={note.$id} note={note}/>
        )}
    </div>
  )
}

export default NotesPage
