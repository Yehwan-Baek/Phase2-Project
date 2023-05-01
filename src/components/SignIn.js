import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material'
import "../style/SignUp.css"

function SignIn () {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username:"",
        password:""
    })

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    }

   function handleSignIn(e) {
    e.preventDefault();

    fetch("http://localhost:3000/users")
        .then((response) => response.json())
        .then((data) => {
        const user = data.find((user) => user.username === formData.username);
        if (user && user.password === formData.password) {
            localStorage.setItem("firstname", user.firstname);
            localStorage.setItem("id", user.id);
            navigate(`/${formData.username}/mypage`);
        } else {
            alert("You put the wrong username or password. Try again.");
        }
        })
        .catch((error) => {
        console.error("Error:", error);
        });
    }

    return(
        <div className="sign">
            <h2>Sign In</h2>
            <form onSubmit={handleSignIn}>
                <div>
                    <TextField 
                        type="text"
                        label="Username"
                        id="username"
                        value={formData.username}
                        onChange={handleChange}
                        InputLabelProps={{style: { color: 'white' },}}
                        inputProps={{ style: { color: 'white' } }}
                    />
                </div>
                <div>
                    <TextField
                        type="password"
                        label="Password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        InputLabelProps={{style: { color: 'white' },}}
                        inputProps={{ style: { color: 'white' } }}
                    />
                </div>
                <Button variant="contained" type="submit" className="button">Sign In</Button>
            </form>
        </div>
    )
}

export default SignIn;