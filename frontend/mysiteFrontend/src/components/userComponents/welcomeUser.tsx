import React, { FC } from "react";
import { getUsername } from "../../util/auth";

const WelcomeMessage = () => {
    return (
        <div>
            <p>Welcome back, {getUsername()} !</p>
        </div>
    );
};

export default WelcomeMessage;
