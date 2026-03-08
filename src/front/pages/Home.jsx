import React from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {

    const navigate = useNavigate()

    return (

        <div className="container text-center mt-5">

            <h1 className="display-4">🚀 Authentication App</h1>

            <p className="lead">
                React + Flask + JWT Authentication
            </p>

            <div className="mt-4">

                <button
                    className="btn btn-primary m-2"
                    onClick={()=>navigate("/signup")}
                >
                    Signup
                </button>

                <button
                    className="btn btn-success m-2"
                    onClick={()=>navigate("/login")}
                >
                    Login
                </button>

                <button
                    className="btn btn-warning m-2"
                    onClick={()=>navigate("/private")}
                >
                    Private Page
                </button>

            </div>

        </div>
    )
}