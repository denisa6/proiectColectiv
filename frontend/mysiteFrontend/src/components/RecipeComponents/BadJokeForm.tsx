import React, { useState, useEffect, CSSProperties } from "react";

const BadJokeForm = () => {
  const [joke, setJoke] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/bad_jokes/");
        const data = await response.json();
        setJoke(data[0].joke);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Fetch joke when component mounts

  const handleExitDetail = () => {
    const isUserRecipePage = window.location.href.includes('/userRecipes');

    if (isUserRecipePage) {
      window.location.href = `/userRecipes/`;
    } else {
      window.location.href = `/showlist/`;
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button style={styles.exitButton} onClick={handleExitDetail}>
          Exit
        </button>
        <h2>Bring the salt for this joke 🧂</h2>
        <p>{joke}</p>
      </div>
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    background: "#000",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
    textAlign: "left",
    width: "50%", // Adjust the width as needed
    overflow: "auto", // Add scrollbar if content exceeds the available space
    boxSizing: "border-box",
    position: "relative", // To position the exit button inside the modal
  },
  exitButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "none",
    border: "none",
    color: "#fff",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default BadJokeForm;
