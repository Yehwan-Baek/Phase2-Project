import React from "react";
import { useNavigate } from "react-router-dom";
import MyCalendar from "./MyCalender";

function MyPage() {
    const username = localStorage.getItem("firstname");

    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.removeItem("firstname");
        navigate("/");
    };

    return(
        <div>
            <button onClick={handleSignOut}>Sign Out</button>
            <h2>My Page</h2>
            <p>Welcome, {username}! Plan your today rutine!</p>
            <MyCalendar />
        </div>
    )
}

export default MyPage;