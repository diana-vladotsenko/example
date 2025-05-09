import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Word } from "../models/Word";
import { Admin } from "../models/Admin";

function SingleAdminWords() {
    const { id } = useParams();
    const [words, setWords] = useState<Word[]>([]);
    const [admin, setAdmin] = useState<Admin | null>(null);

    useEffect(() => {
        fetch(`http://localhost:8080/admins/${id}/words`)
            .then(res => res.json())
            .then(json => setWords(json));

        fetch(`http://localhost:8080/admins/${id}`)
            .then(res => res.json())
            .then(json => setAdmin(json));
    }, [id]);

    return (
        <div style={{ padding: "20px" }}>
            <h2>Admin Profile</h2>
            {admin && (
                <div style={{ marginBottom: "30px" }}>
                    <div><strong>Name:</strong> {admin.name}</div>
                    <div><strong>Email:</strong> {admin.email}</div>
                </div>
            )}

            <h3>Words Added by {admin?.name}</h3>
            {words.map(word => (
                <div key={word.id} style={{ marginBottom: "10px", borderBottom: "1px solid #ccc", paddingBottom: "10px" }}>
                    <div><strong>Type:</strong> {word.type}</div>
                    <div><strong>Description:</strong> {word.description}</div>
                </div>
            ))}
        </div>
    );
}

export default SingleAdminWords;
