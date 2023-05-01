import React from "react";
import {Outlet, Link} from "react-router-dom"
import "../style/NavBar.css"

function NavBar() {
    return (
        <React.Fragment>
            <nav>
                <ul className="ul">
                    <li>
                        <Link to="/">HOME</Link>
                    </li>
                    <li>
                        <Link to="/signup">SIGN UP</Link>
                    </li>
                    <li>
                        <Link to="/signin">SIGN IN</Link>
                    </li>
                </ul>
            </nav>
            <Outlet/>
        </React.Fragment>
    )
}

export default NavBar;