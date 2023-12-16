import { useEffect, useState } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ShowAllRecipes from "./components/RecipeComponents/showAllRecipes";
import Welcome from "./components/LoginSignUpComponents/Welcome";
import Login from "./components/LoginSignUpComponents/Login";
import SignUp from "./components/LoginSignUpComponents/SignUp";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState("");

    // return (
    //     <>
    //         <ShowAllRecipes></ShowAllRecipes>
    //     </>
    // );

    return (
        <div className="App">
            <Routes>
                <Route
                    path="/"
                    element={
                        <Welcome
                            email={email}
                            loggedIn={loggedIn}
                            setLoggedIn={setLoggedIn}
                        />
                    }
                />
                <Route
                    path="/login"
                    element={
                        <Login setLoggedIn={setLoggedIn} setEmail={setEmail} />
                    }
                />
                <Route
                    path="/signup"
                    element={
                        <SignUp setLoggedIn={setLoggedIn} setEmail={setEmail} />
                    }
                />

                <Route
                    path="/showlist/*"
                    element={<ShowAllRecipes></ShowAllRecipes>}
                />
            </Routes>
        </div>
    );
}

export default App;
