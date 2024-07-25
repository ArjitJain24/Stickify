import React, { useEffect, useRef, useState } from 'react'
import { autoGrow, setZIndex , bodyParser, setNewOffset} from '../utils/Utils'
import Spinner  from '../icons/Spinner'
import { db } from '../appwrite/databases'
import DeleteButton from './DeleteButton'



function NoteCard({note}) {
    const [saving, setSaving] = useState(false);
    const keyUpTimer = useRef(null);

    const body = bodyParser(note.body)
    const colors = JSON.parse(note.colors)
    const defaultPosition = JSON.parse(note.position)
    const [position, setPosition] = useState(defaultPosition)

    const textAreaRef = useRef(null)
    const cardRef = useRef(null)


    useEffect(()=>{
        autoGrow(textAreaRef)
    }, [])
    

    const mouseStartPos = {x : 0, y : 0}
    const mouseMove = (e) => {
        //1 - Calculate move direction
        let mouseMoveDir = {
            x: mouseStartPos.x - e.clientX,
            y: mouseStartPos.y - e.clientY,
        };
     
        //2 - Update start position for next move.
        mouseStartPos.x = e.clientX;
        mouseStartPos.y = e.clientY;
     
        //3 - Update card top and left position.
        const newPosition = setNewOffset(cardRef.current, mouseMoveDir)
        setPosition(newPosition)
    };

    const mouseUp  = (e)=>{
        document.removeEventListener("mousemove", mouseMove)
        document.removeEventListener("mouseup", mouseUp)

        const newPosition = setNewOffset(cardRef.current)
        saveData('position', newPosition)

    }

    const mouseDown = (e) => {
        if(e.target.className === 'card-header'){
            setZIndex(cardRef.current)
            mouseStartPos.x = e.clientX;
            mouseStartPos.y = e.clientY;
        
            document.addEventListener("mousemove", mouseMove);
            document.addEventListener("mouseup", mouseUp);
        }
    };


    const saveData = async (key, value) => {
        const payload = { [key]: JSON.stringify(value) }
        try {
            await db.notes.update(note.$id, payload)
        } catch (error) {
            console.log(error)
        }
        setSaving(false);
    }

    const handleKeyUp = async () => {
        //1 - Initiate "saving" state
        setSaving(true);
     
        //2 - If we have a timer id, clear it so we can add another two seconds
        if (keyUpTimer.current) {
            clearTimeout(keyUpTimer.current);
        }
     
        //3 - Set timer to trigger save in 2 seconds
        keyUpTimer.current = setTimeout(() => {
            saveData("body", textAreaRef.current.value);
        }, 2000);
    };


  return (
    <div  
    className='card' 
    style={{backgroundColor: colors.colorBody, 
            left: `${position.x}px`, 
            top: `${position.y}px`}}
    ref={cardRef}>

        <div 
        onMouseDown={mouseDown}
        className='card-header' 
        style={{backgroundColor: colors.colorHeader}}>
            <DeleteButton 
            noteId={note.$id}
            />
            {
            saving && (
                <div className="card-saving">
                <Spinner color={colors.colorText} />
                <span style={{ color: colors.colorText }}>Saving...</span>
            </div>
            )
            }
        </div>


        <div className='card-body'>
            <textarea 
            onKeyUp={handleKeyUp}
            onFocus={() => setZIndex(cardRef.current)}
            style={{color: colors.colorText}} 
            defaultValue={body}
            ref={textAreaRef}
            onInput={()=>autoGrow(textAreaRef)}>
            </textarea>
        </div>
    </div>
  )
}

export default NoteCard
