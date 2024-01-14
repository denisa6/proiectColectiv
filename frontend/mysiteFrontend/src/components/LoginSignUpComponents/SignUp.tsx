import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

const SignUp = (props: any) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const navigate = useNavigate();

    const handleCancel = () => {
        window.location.href = `/`;
    };

    const addNewUser = async (event: { preventDefault: () => void }) => {
        event.preventDefault();

        setEmailError("");
        setPasswordError("");

        // Check if the user has entered both fields correctly
        if ("" === email) {
            setEmailError("Please enter your email");
            return;
        }

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError("Please enter a valid email");
            return;
        }

        if ("" === password1) {
            setPasswordError("Please enter a password");
            return;
        }

        if (password1.length < 7) {
            setPasswordError("The password must be 8 characters or longer");
            return;
        }
        if ("" === password2) {
            setPasswordError("Please enter a password");
            return;
        }

        if (password2.length < 7) {
            setPasswordError("The password must be 8 characters or longer");
            return;
        }

        try {
            fetch("http://127.0.0.1:8000/dj-rest-auth/registration/", {
                method: "POST",
                body: JSON.stringify({
                    username: username,
                    email: email,
                    password1: password1,
                    password2: password2,
                    first_name: first_name,
                    last_name: last_name,
                    role: "regular",
                }),
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    console.log(
                        JSON.stringify({
                            username: username,
                            email: email,
                            password1: password1,
                            password2: password2,
                            first_name: first_name,
                            last_name: last_name,
                            role: "regular",
                        })
                    );
                });
        } catch (error) {
            console.error(error);
        }
        setTimeout(() => {
            navigate("/");
        }, 500);
    };

    return (
        <div className={"mainContainer"}>
            <div className={"titleContainer"}>
                <div>SignUp</div>
            </div>
            <br />
            <div className="inputContainer">
                <input
                    value={username}
                    placeholder="Enter your username here"
                    onChange={(ev) => setUsername(ev.target.value)}
                    className="inputBox"
                />
                {/* <label className="errorLabel">{usernameError}</label> */}
            </div>
            <br />

            {/* FIRST NAME */}
            <div className="inputContainer">
                <input
                    value={first_name}
                    placeholder="Enter your first name here"
                    onChange={(ev) => setFirstName(ev.target.value)}
                    className="inputBox"
                />
                {/* <label className="errorLabel">{first_nameError}</label> */}
            </div>
            {/* LAST NAME */}
            <br />
            <div className="inputContainer">
                <input
                    value={last_name}
                    placeholder="Enter your last name here"
                    onChange={(ev) => setLastName(ev.target.value)}
                    className="inputBox"
                />
                {/* <label className="errorLabel">{last_nameError}</label> */}
            </div>

            {/* EMAIL */}
            <br />

            <div className={"inputContainer"}>
                <input
                    value={email}
                    placeholder="Enter your email here"
                    onChange={(ev) => setEmail(ev.target.value)}
                    className={"inputBox"}
                />
                <label className="errorLabel">{emailError}</label>
            </div>
            <br />

            {/* PASSWORD 1 */}
            <div className="inputContainer">
                <input
                    value={password1}
                    placeholder="Enter your password here"
                    onChange={(ev) => setPassword1(ev.target.value)}
                    className="inputBox"
                    type="password"
                />
                <label className="errorLabel">{passwordError}</label>
            </div>
            {/* PASSWORD 2 */}
            <br />

            <div className="inputContainer">
                <input
                    value={password2}
                    placeholder="Confirm your password here"
                    onChange={(ev) => setPassword2(ev.target.value)}
                    className="inputBox"
                    type="password"
                />
                <label className="errorLabel">{passwordError}</label>
            </div>

            <br />

            <br />

            {/* SIGN UP BUTTON */}
            <div className={"inputContainer"}>
                <input
                    className={"inputButton"}
                    type="button"
                    onClick={addNewUser}
                    value={"Sign Up"}
                />
                <input
                    className={"inputButton"}
                    type="button"
                    onClick={handleCancel}
                    value={"Cancel"}
                />
            </div>
        </div>
    );
};

export default SignUp;
