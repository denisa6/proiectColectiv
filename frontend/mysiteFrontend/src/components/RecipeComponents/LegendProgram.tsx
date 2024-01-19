import React, { useState, useEffect, CSSProperties } from "react";

const LegendProgram = () => {

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
        <h2>How to use our site?</h2>
        <p>You can see all the recipes that are provided by our site, but also store your own recipes.
          <br/> Our recipes are characterised by:
          <br/> <br/> Difficulty: Is a field that will be completed with a number from 1 to 5 that will represent how
          advanced is this recipe
          <br/>1: No cooking experience
          <br/>2: Beginner
          <br/>3: Good at cooking
          <br/>4: Regular cook (have tried more complicated recipes)
          <br/>5: Expert
          <br/> <br/>Name of the recipe <br/><br/> The Description of how the recipe can be done. When completing this
          field keep in mind that any kind of person can try this recipe so try to be as explicit as possible. 😊
          <br /> <br/> Time min: is an estimate of the minimum time it can take. This estimate is done in minutes<br/> Time
          max: is an estimate of the maximum time it will take to cook this recipe. This estimate is done in minutes.
          <br /> <br/> Number of people is an estimate for what number of people can this dish be served to.
          <br /> <br/> Estimated price: in here try to put how much did the included ingredients cost.
          <br /> <br/> Total calories: this field is for the fittness people that want to stay on top of their calories.
          <br /> <br/> Try to introduce the ingredients for this recipe and if an ingredient is not present in the list try to
          contact one of our admins.
          <br /> <br/> Recipe Type: Choose whether this recipe it's intended for breakfast, lunch, dinner, snack or dessert.
          <br /> <br/> In the photo section upload an image of your recipe and if you do not have one, a random one from our
          site will be provided.
          <br /> <br/> If you make a mistake do not panic. You can just update your recipe on your personal recipe page. But
          keep in mind that you can only update and delete your own recipes.
          <br/> <br /> If you are looking for something new to cook you can just use our filters in order to find the recipe
          perfect four you.
          <br/> <br /> If you want to show the recipe to other people you can also download it and print it after.
          <br/> <br /> If you are in the mood for an unsalty joke you can checkout our jokes generator, but please bring the
          salt so you can taste them better. 😉
          <br/></p>
        <h3>Enjoy your cooking and do not forget: In food we trust.</h3>
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
    width: "70%", // Adjust the width as needed
    maxHeight: "80vh", // Set maximum height (adjust as needed)
    overflowY: "auto", // Add vertical scrollbar if content exceeds the available space
    boxSizing: "border-box",
    position: "relative",
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

export default LegendProgram;
