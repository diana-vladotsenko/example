import { useEffect, useState } from "react";
import { Admin } from "../models/Admin";
import { Link } from "react-router-dom";

function Admins() {
    const [admins, setAdmins] = useState<Admin[]>([]);

    useEffect(() => {
        fetch("http://localhost:8080/admins")
            .then(res => res.json())
            .then(json => setAdmins(json));
    }, []);

    return (
        <div>
            <h2>All Admins</h2>
            {admins.map(admin => (
                <div key={admin.id} style={{ marginBottom: "10px", borderBottom: "1px solid #ccc" }}>
                    <div><strong>Name:</strong> {admin.name}</div>
                    <div><strong>Email:</strong> {admin.email}</div>
                    <Link to={`/admins/${admin.id}`}>
                        <button>View</button>
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default Admins;
