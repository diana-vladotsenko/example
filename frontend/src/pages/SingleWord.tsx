import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Word } from "../models/Word.ts";

function SingleWord() {
    const { wordId } = useParams();
    const [words, setWords] = useState<Word>();

    useEffect(() => {
        fetch("http://localhost:8080/words/" + wordId)
            .then(res => res.json())
            .then(json => setWords(json));
    }, [wordId]);

    return (
        <div style={{
            maxWidth: "600px",
            margin: "50px auto",
            padding: "30px",
            border: "1px solid #ccc",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(132, 103, 212, 0.1)",
            fontFamily: "Arial, sans-serif",
            backgroundColor: "#f9f9f9"
        }}>
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>{words?.type}</h2>
            <div><strong>id:</strong> {words?.id}</div>
            <div><strong>type:</strong> {words?.type}</div>
            <div><strong>description:</strong> {words?.description}</div>
        </div>
    );
}

export default SingleWord;
