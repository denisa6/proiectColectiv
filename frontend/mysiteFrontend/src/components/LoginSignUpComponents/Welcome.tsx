import React from "react";
import { useNavigate } from "react-router-dom";

const Welcome = (props: { loggedIn: any; email: any; setLoggedIn: any }) => {
    const { loggedIn, email } = props;
    const navigate = useNavigate();

    const onButtonClickLogIn = () => {
        if (loggedIn) {
            localStorage.removeItem("user");
            props.setLoggedIn(false);
        } else {
            navigate("/login");
        }
    };

    const onButtonClickSignUp = () => {
        navigate("/signup");
    };

    return (
        <div className="mainContainer">
            <div className={"titleContainer"}>
                <div>Welcome!</div>
            </div>
            <div>This is the home page.</div>
            <div className={"buttonContainer"}>
                <input
                    className={"inputButton"}
                    type="button"
                    onClick={onButtonClickLogIn}
                    value={loggedIn ? "Log out" : "Log in"}
                />

                <input
                    className={"signInButton"}
                    type="button"
                    onClick={onButtonClickSignUp}
                    value={"Sign Up"}
                />
                {loggedIn ? <div>Your email address is {email}</div> : <div />}
            </div>
        </div>
    );
};

export default Welcome;
