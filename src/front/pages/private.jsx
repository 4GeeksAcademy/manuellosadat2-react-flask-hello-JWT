import React, { useEffect, useState } from "react";

export const Private = () => {

    const [message, setMessage] = useState("");

    const getPrivateData = async () => {

        const token = sessionStorage.getItem("token");

        const backendUrl = import.meta.env.VITE_BACKEND_URL

        const resp = await fetch(backendUrl + "/api/private", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        const data = await resp.json();

        setMessage(data.message);
    };

    useEffect(() => {
        getPrivateData();
    }, []);

    return (
        <div className="container mt-5">

            <h1>🔒 Private Page</h1>

            <p>{message}</p>

        </div>
    );
};