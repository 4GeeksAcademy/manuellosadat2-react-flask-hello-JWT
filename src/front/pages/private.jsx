import React, { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"

export const Private = () => {

    const [message, setMessage] = useState("")
    const { token } = useAuth()

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    useEffect(() => {

        const getData = async () => {

            const resp = await fetch(`${backendUrl}/api/private`, {

                headers: {
                    Authorization: "Bearer " + token
                }

            })

            const data = await resp.json()

            setMessage(data.message)

        }

        getData()

    }, [])

    return (

        <div className="container mt-5">

            <h1>Private Page</h1>

            <p>{message}</p>

        </div>

    )

}