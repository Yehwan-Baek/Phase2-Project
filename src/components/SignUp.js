import React,{useState} from "react";

function SignUp () {
    const [users, setUsers] = useState([])
    const [formData, setFormData] = useState({
        firstname:"",
        username:"",
        password:"",

    })
    
    function onAddUsers(newUser) {
        setUsers([...users, newUser])
    }

    function onChangeInfo(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }  

    function handleSignUp (e) {
        e.preventDefault();

        const firstNamePattern = /^[a-zA-Z]+$/;
        const usernamePattern = /^[a-z0-9]{8,}$/;
        const passwordPattern = /^\d{4,}$/;
        
        if (!firstNamePattern.test(formData.firstname)) {
            alert("First name should contain only alphabets.");
            return;
          }
    
        if (!usernamePattern.test(formData.username)) {
            alert("Username should be at least 8 lowercase letters or digits.");
            return;
        }

        if (!passwordPattern.test(formData.password)) {
            alert("Password should be at least 4 digits.");
            return;
        }
    
        fetch(`http://localhost:3000/users?username=${formData.username}`)
        .then((res) => res.json())
        .then((data) => {
            if (data.length > 0) {
                alert("This Username already exist. Try another username.");
            } else {
                const newUser = {
                    firstname: formData.firstname,
                    username: formData.username,
                    password: formData.password,
                };

                fetch("http://localhost:3000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newUser),
                })
                .then((res) => res.json())
                .then((data) => {
                    alert("Congratulations! Signed up successfully")
                    onAddUsers(data);
                });
            }
        });
    }

    return(
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSignUp}>
                <div>
                    <label>First Name : </label>
                    <input 
                    type="text"
                    id="firstname"
                    name="firstname"
                    value={formData.firstname}
                    onChange={onChangeInfo}
                    />
                </div>
                <div>
                    <label>User Name : </label>
                    <input 
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={onChangeInfo}
                    />
                </div>
                <div>
                    <label>Password : </label>
                    <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={onChangeInfo}
                    />
                </div>
                <button type="submit">Sign Up!</button>
            </form>
        </div>
    )
}

export default SignUp;