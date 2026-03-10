import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signup = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {

            const backendUrl = import.meta.env.VITE_BACKEND_URL

            const resp = await fetch(`${backendUrl}/api/signup`, {
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

            console.log("Response:", data)

            if (resp.ok) {
                alert("User created successfully!")
                navigate("/login")
            } else {
                alert(data.msg || "Signup failed")
            }

        } catch (error) {
            console.error("Signup error:", error)
            alert("Server error. Check backend.")
        }
    }

    return (

        <div className="container mt-5">

            <h1>Signup</h1>

            <form onSubmit={handleSubmit}>

                <input
                    className="form-control mb-3"
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    required
                />

                <input
                    className="form-control mb-3"
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    required
                />

                <button className="btn btn-success" type="submit">
                    Create account
                </button>

            </form>

        </div>
    )
}