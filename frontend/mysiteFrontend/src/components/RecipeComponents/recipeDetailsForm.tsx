import React, { useState, useEffect, CSSProperties } from "react";
import { Recipe } from "../../models/Recipe";
import { Ingredient } from "../../models/Ingredient";

const RecipeDetailsForm = (props: { recipeId: any }) => {
	const [recipe, setRecipe] = useState<Recipe>({});
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `http://127.0.0.1:8000/recipe/${props.recipeId}/?format=json`
                );
                const data = await response.json();
                setRecipe(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    "http://127.0.0.1:8000/ingredient/?format=json"
                );
                const data = await response.json();
                setIngredients(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        setFormData({
            difficulty: recipe.difficulty,
            name: recipe.name,
            description: recipe.description,
            ingredients: recipe.ingredients,
            time_min: recipe.time_min,
            time_max: recipe.time_max,
            number_people: recipe.number_people,
            type_recipe: recipe.type_recipe,
            estimated_price: recipe.estimated_price,
            total_calories: recipe.total_calories,
            photo: recipe.photo
        });
    }, [recipe]);

    useEffect(() => {
        const recipeIngredients = ingredients.filter((ingredient) => recipe.ingredients.indexOf(ingredient.id) > -1);
        setIngredientNames([]);
        recipeIngredients.forEach(ingredient => setIngredientNames(ingredientArr => [...ingredientArr, ingredient.name]));
    }, [ingredients]);

    const [formData, setFormData] = useState({
        difficulty: 0,
        name: "",
        description: "",
        ingredients: [],
        time_min: 0,
        time_max: 0,
        number_people: 0,
        type_recipe: "",
        estimated_price: 0,
        total_calories: 0,
        photo: ""
    });

    const [ingredientNames, setIngredientNames] = useState<string[]>([]);

    const handleCancel = () => {
        window.location.href = `/showlist/`;
    };
    return (
        <div style={styles.overlay}>
            <div style={styles.modal} modal-class="modal-fullscreen">
                <h1>{recipe.name}</h1>
                <h2>Description:</h2>
                <p>{formData.description}</p>
                <h2>Ingredients: </h2>
                <p>{ingredientNames.join(", ")}</p>
                <h2>Recipe Information: </h2>
                <p><small><i>{"Difficulty: ".concat(formData.difficulty)}</i></small></p>
                <p><small><i>{"Estimated Time: ".concat(formData.time_min)} - {formData.time_max}</i></small></p>
                <p><small><i>{"Number of People: ".concat(formData.number_people)}</i></small></p>
                <p><small><i>{"Recipe Type: ".concat(formData.type_recipe)}</i></small></p>
                <p><small><i>{"Estimated Price: ".concat(formData.estimated_price)}</i></small></p>
                <p><small><i>{"Total Calories: ".concat(formData.total_calories)} </i></small></p>
                <div id="buttons-container">
                        <button onClick={handleCancel}>Exit</button>
                    </div>
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
    },
    form: {
        display: "flex",
        flexDirection: "column" as "column",
        alignItems: "center",
    },
    label: {
        marginBottom: 10,
        textAlign: "center",
    },
    button: {
        padding: "10px",
        marginTop: "10px",
    },
};

export default RecipeDetailsForm;