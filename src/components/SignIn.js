import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';

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
        <div>
            <h2>Sign In</h2>
            <form onSubmit={handleSignIn}>
                <div>
                    <label>User Name : </label>
                    <input 
                        type="text"
                        id="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Password : </label>
                    <input
                        type="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Sign Up!</button>
            </form>
        </div>
    )
}

export default SignIn;