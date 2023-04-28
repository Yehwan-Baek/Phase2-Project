import React from "react";
import {Outlet, Link} from "react-router-dom"

function NavBar() {
    return (
        <React.Fragment>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/signup">Sign Up</Link>
                    </li>
                    <li>
                        <Link to="/signin">Sign In</Link>
                    </li>
                </ul>
            </nav>
            <Outlet/>
        </React.Fragment>
    )
}

export default NavBar;