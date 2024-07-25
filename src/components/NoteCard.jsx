import React, { useEffect, useRef, useState } from 'react'
import { autoGrow, setZIndex } from '../utils/Utils'
import { Trash } from '../icons/Trash'
function NoteCard({note}) {
    const body = JSON.parse(note.body)
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
        const newX = cardRef.current.offsetLeft - mouseMoveDir.x
        const newY =  cardRef.current.offsetTop - mouseMoveDir.y
        setPosition({
            x: newX > 0 ? newX : 0,
            y: newY > 0 ? newY : 0
        });
    };

    const mouseUp  = (e)=>{
        document.removeEventListener("mousemove", mouseMove)
        document.removeEventListener("mouseup", mouseUp)
    }

    const mouseDown = (e) => {
        setZIndex(cardRef.current)
        mouseStartPos.x = e.clientX;
        mouseStartPos.y = e.clientY;
    
        document.addEventListener("mousemove", mouseMove);
        document.addEventListener("mouseup", mouseUp);
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
            <Trash />
        </div>


        <div className='card-body'>
            <textarea 
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
