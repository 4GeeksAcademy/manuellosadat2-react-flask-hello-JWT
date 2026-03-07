import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Private = () => {

    const navigate = useNavigate()

    useEffect(() => {

        const token = sessionStorage.getItem("token")

        if(!token){
            navigate("/login")
        }

    }, [])

    return(

        <div>

            <h1>Private Page 🔒</h1>

            <p>You are logged in!</p>

        </div>

    )
}