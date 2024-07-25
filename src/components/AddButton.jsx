import Plus from "../icons/Plus";
import { useContext, useRef } from "react";
import { db } from "../appwrite/databases";
import { NoteContext } from "../context/NoteContext";
import colors from '../assets/colors'

const AddButton = () => {
    const startingPos = useRef(20);
    const {setNotes} = useContext(NoteContext)
    const addNote = async () => {
        const payload = {
            position: JSON.stringify({
                x: startingPos.current,
                y: startingPos.current,
            }),
            colors: JSON.stringify(colors[0]),
        };
        startingPos.current += 20
        const response = await db.notes.create(payload);
        setNotes((prevState) => [response, ...prevState]);
    };
 
    return (
        <div id="add-btn" onClick={addNote}>
            <Plus />
        </div>
    );
};

export default AddButton