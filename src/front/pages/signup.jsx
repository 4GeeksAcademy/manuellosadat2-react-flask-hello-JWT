import React, { useState } from "react";

export const Signup = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()

        const resp = await fetch(process.env.BACKEND_URL + "/api/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })

        const data = await resp.json()

        console.log(data)
    }

    return (

        <div className="container">

            <h1>Signup</h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="email"
                    placeholder="email"
                    onChange={(e)=>setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="password"
                    onChange={(e)=>setPassword(e.target.value)}
                />

                <button type="submit">
                    Create account
                </button>

            </form>

        </div>
    )
}