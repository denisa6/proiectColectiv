import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props: any) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const navigate = useNavigate();

    const onButtonClick = () => {
        // Set initial error values to empty
        setUsernameError("");
        setPasswordError("");

        // Check if the user has entered both fields correctly
        if ("" === username) {
            setUsernameError("Please enter your username");
            return;
        }

        if ("" === username) {
            setUsernameError("Please enter a valid userneame");
            return;
        }

        if ("" === password) {
            setPasswordError("Please enter a password");
            return;
        }

        if (password.length < 7) {
            setPasswordError("The password must be 8 characters or longer");
            return;
        }

        try {
            fetch("http://127.0.0.1:8000/dj-rest-auth/login/", {
                method: "POST",
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                });
        } catch (error) {
            console.error(error);
        }
        setTimeout(() => {
            navigate("/showlist");
        }, 500);
    };

    const handleCancel = () => {
        window.location.href = `/`;
    };

    return (
        <div className={"mainContainer"}>
            <div className={"titleContainer"}>
                <div>Login</div>
            </div>
            <br />
            <div className={"inputContainer"}>
                <input
                    value={username}
                    placeholder="Enter your email here"
                    onChange={(ev) => setUsername(ev.target.value)}
                    className={"inputBox"}
                />
                <label className="errorLabel">{usernameError}</label>
            </div>
            <br />
            <div className={"inputContainer"}>
                <input
                    value={password}
                    placeholder="Enter your password here"
                    onChange={(ev) => setPassword(ev.target.value)}
                    className={"inputBox"}
                    type={"password"}
                />
                <label className="errorLabel">{passwordError}</label>
            </div>
            <br />
            <div className={"inputContainer"}>
                <input
                    className={"inputButton"}
                    type="button"
                    onClick={onButtonClick}
                    value={"Log in"}
                />
            </div>
            <button onClick={handleCancel}>Cancel</button>
        </div>
    );
};

export default Login;
