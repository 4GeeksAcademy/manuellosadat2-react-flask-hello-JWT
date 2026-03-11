import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const { login } = useAuth()

    const handleSubmit = async (e) => {

        e.preventDefault()

        const backendUrl = import.meta.env.VITE_BACKEND_URL

        const resp = await fetch(`${backendUrl}/api/login`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                password
            })

        })

        const data = await resp.json()

        if (!resp.ok) {

            alert(data.msg)
            return

        }

        login(data.token)

        navigate("/private")

    }

    return (

        <div className="container mt-5">

            <h1>Login</h1>

            <form onSubmit={handleSubmit}>

                <input
                    className="form-control mb-3"
                    type="email"
                    placeholder="email"
                    onChange={(e)=>setEmail(e.target.value)}
                />

                <input
                    className="form-control mb-3"
                    type="password"
                    placeholder="password"
                    onChange={(e)=>setPassword(e.target.value)}
                />

                <button className="btn btn-primary">
                    Login
                </button>

            </form>

        </div>

    )
}