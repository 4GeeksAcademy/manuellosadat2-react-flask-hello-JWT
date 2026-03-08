import React, { useEffect, useState } from "react";

export const Private = () => {

    const [message, setMessage] = useState("");

    const getPrivateData = async () => {

        const token = sessionStorage.getItem("token");

        const resp = await fetch(process.env.BACKEND_URL + "/api/private", {
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
        <div className="container">

            <h1>Private Page 🔒</h1>

            <p>{message}</p>

        </div>
    );
};