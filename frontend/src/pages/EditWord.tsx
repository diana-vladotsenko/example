import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { Word } from "../models/Word.ts";


function EditWord() {
    const { wordId } = useParams();
    const typeRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const [words, setWords] = useState<Word>();
    const navigate = useNavigate();

    const editWord = () => {
        const modifiedWord = {
            type: typeRef.current?.value,
            description: descriptionRef.current?.value,
        }
        fetch("http://localhost:8080/words/" + wordId,
            {
                method: "PUT",
                body: JSON.stringify(modifiedWord),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(res => res.json())
            .then(json => {
                if (json.message && json.timestamp && json.status) {
                    toast.error(json.message);
                } else {
                    navigate("/addWord");
                }
            });
    };

    useEffect(() => {
        fetch("http://localhost:8080/words/" + wordId)
            .then(res => res.json())
            .then(json => setWords(json))
    }, [wordId]);

    return (
        <div>
            <h2>Edit</h2>
            <label>Type</label> <br />
            <input ref={typeRef} type="text" defaultValue={words?.type} /> <br />
            <label>Description</label> <br />
            <input ref={descriptionRef} type="text" defaultValue={words?.description} /> <br />
            <button onClick={() => editWord()} style={{ marginTop: "20px" }}>Edit</button>
            <ToastContainer />
        </div>
    );
}

export default EditWord;
