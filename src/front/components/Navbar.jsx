export const Navbar = () => {

    const navigate = useNavigate();
    const token = sessionStorage.getItem("token")

    const logout = () => {
        sessionStorage.removeItem("token")
        navigate("/login")
    }

    return (

        <nav className="navbar navbar-light bg-light">

            <span className="navbar-brand mb-0 h1">My App</span>

            <div>

                {!token ? (

                    <button
                        className="btn btn-primary"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </button>

                ) : (

                    <button
                        className="btn btn-danger"
                        onClick={logout}
                    >
                        Logout
                    </button>

                )}

            </div>

        </nav>
    )
}