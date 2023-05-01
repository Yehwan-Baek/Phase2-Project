import React from "react";
import { useNavigate } from "react-router-dom";
import MyCalendar from "./MyCalender";
import { Button } from '@mui/material';
import "../style/MyPage.css"

function MyPage() {
    const username = localStorage.getItem("firstname");

    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.removeItem("firstname");
        navigate("/");
    };

    return(
        <div className="my-page">
            <Button variant="text" onClick={handleSignOut} className="btn">Sign Out</Button>
            <h2>My Page</h2>
            <p>Welcome, {username}! Plan your today routine!</p>
            <MyCalendar />
        </div>
    )
}

export default MyPage;