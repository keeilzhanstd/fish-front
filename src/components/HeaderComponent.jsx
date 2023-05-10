import { Link } from 'react-router-dom';
import { useAuth } from './auth/AuthContext';

export default function HeaderComponent() {

    const authContext = useAuth()
    const isAuthenticated = authContext.isAuthenticated

    function logout(){
        authContext.logout()
    }

    return (
        <header className="border-bottom border-light border-5 mb-1 p-2">
        <div className="container">
            <div className="row">
                <nav className="navbar navbar-expand-lg">
                    <Link className="navbar-brand ms-2 fs-2 fw-bold text-black" to="/home">Codefish</Link>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav">
                            {isAuthenticated && <li className="nav-item fs-5"><Link className="nav-link" to="/records">MRS</Link></li>}
                            {isAuthenticated && <li className="nav-item fs-5"><Link className="nav-link" to="/home">Ecommerce</Link></li>}
                        </ul>
                    </div>
                    <ul className="navbar-nav">
                        {isAuthenticated && <li className="nav-item fs-5"><Link className="nav-link" to="/cart">Cart</Link></li>}
                        {isAuthenticated && <li className="nav-item fs-5"><Link className="nav-link" to="/profile">{authContext.user.username}</Link></li>}
                        {isAuthenticated && <li className="nav-item fs-5"><Link className="nav-link" to="/logout" onClick={logout}>Logout</Link></li>}
                    </ul>
                </nav>
            </div>
        </div>
    </header>
    )
}
