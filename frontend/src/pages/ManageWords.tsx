import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { Link } from "react-router-dom";
import { Word } from "../models/Word.ts";
import { Admin } from "../models/Admin.ts";

function ManageWords() {
  const [words, setWords] = useState<Word[]>([]);
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [selectedAdminId, setSelectedAdminId] = useState<number | null>(null);

  const typeRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchWords();
    fetch("http://localhost:8080/admins")
      .then(res => res.json())
      .then(json => setAdmins(json));
  }, []);

  const fetchWords = () => {
    fetch("http://localhost:8080/words")
      .then(res => res.json())
      .then(json => setWords(json));
  };

  const deleteWord = (id: number) => {
    fetch(`http://localhost:8080/words/${id}`, {
      method: "DELETE",
    }).then(res => res.json())
      .then(json => {
        if (!json.message) {
          toast.success("Word is deleted!");
          fetchWords();
        } else {
          toast.error(json.message);
        }
      });
  };

  const addWord = () => {
    if (!selectedAdminId) {
      toast.error("Please select an admin.");
      return;
    }

    const newWord = {
      type: typeRef.current?.value,
      description: descriptionRef.current?.value,
      admin: { id: selectedAdminId }
    };

    fetch("http://localhost:8080/words", {
      method: "POST",
      body: JSON.stringify(newWord),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json())
      .then(json => {
        if (!json.message) {
          toast.success("Word added successfully!");
          fetchWords();
          if (typeRef.current) typeRef.current.value = "";
          if (descriptionRef.current) descriptionRef.current.value = "";
          setSelectedAdminId(null);
        } else {
          toast.error(json.message);
        }
      });
  };

  return (
    <div>
      <h2>Add Word</h2>
      <label>Type</label><br />
      <input ref={typeRef} type="text" /><br />
      <label>Description</label><br />
      <input ref={descriptionRef} type="text" /><br />
      <label>Admin</label><br />
      <select value={selectedAdminId ?? ''} onChange={(e) => setSelectedAdminId(Number(e.target.value))}>
        <option value="">Select admin</option>
        {admins.map(admin => (
          <option key={admin.id} value={admin.id}>
            {admin.name} ({admin.email})
          </option>
        ))}
      </select><br />
      <button onClick={addWord} style={{ marginTop: "20px" }}>Add</button>

      <table style={{ width: "800px", border: "1px solid black", marginTop: "60px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Description</th>
            <th>Admin</th>
          </tr>
        </thead>
        <tbody>
          {words.map(word => (
            <tr key={word.id}>
              <td>{word.id}</td>
              <td>{word.type}</td>
              <td>{word.description}</td>
              <td>{word.admin?.name ?? '—'}</td>
              <td>
                <button onClick={() => deleteWord(word.id)}>Delete</button>
                <Link to={"/editWord/" + word.id}>
                  <button>Edit</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
}

export default ManageWords;
