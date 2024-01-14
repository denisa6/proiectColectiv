import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthToken } from "../../util/auth";

const Login = (props: any) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [rightCredentials, setRightCredentials] = useState(true);

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
                    const token = data.key;
                    localStorage.setItem("token", token);

                    const username = data.username;
                    localStorage.setItem("username", username);

                    const userID = data.id;
                    localStorage.setItem("userID", userID);

                    const userRole = data.role;
                    localStorage.setItem("userRole", userRole);

                    console.log(data.non_field_errors);

                    if (
                        data.non_field_errors &&
                        data.non_field_errors[0] ==
                            "Unable to log in with provided credentials."
                    ) {
                        // setTimeout(() => {
                        //     navigate("/");
                        // }, 500);
                        setRightCredentials(false);
                    } else {
                        setTimeout(() => {
                            navigate("/showlist");
                        }, 500);
                        setRightCredentials(false);
                    }
                });
        } catch (error) {
            console.error(error);
        }

        // setTimeout(() => {
        //     navigate("/showlist");
        // }, 500);
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
                    placeholder="Enter your username here"
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
                <input
                    className={"inputButton"}
                    type="button"
                    onClick={handleCancel}
                    value={"Cancel"}
                />
                {!rightCredentials && <div> you are STUPID</div>}
            </div>
        </div>
    );
};

export default Login;
