import React, { useState, useEffect, CSSProperties } from "react";
import { Recipe } from "../../models/Recipe";

const UpdateRecipeForm = (props: { recipeId: any }) => {
	const [recipe, setRecipe] = useState<Recipe>({});

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
	
    const [formData, setFormData] = useState({
        // Define your form fields here
        difficulty: recipe.difficulty,
        name: recipe.name,
		description: recipe.description,
        time_min: recipe.time_min,
        time_max: recipe.time_max,
		number_people: recipe.number_people,
        type_recipe: recipe.type_recipe,
        estimated_price: recipe.estimated_price,
        total_calories: recipe.total_calories,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const updateRecipe = async (event: { preventDefault: () => void }) => {
        event.preventDefault();

        try {
            fetch(`http://127.0.0.1:8000/recipe/${props.recipeId}/`, {
                method: "PUT",
                body: JSON.stringify({
                    difficulty: formData.difficulty,
                    name: formData.name,
                    description: formData.description,
                    time_min: formData.time_min,
                    time_max: formData.time_max,
                    number_people: formData.number_people,
                    type_recipe: formData.type_recipe,
                    estimated_price: formData.estimated_price,
                    total_calories: formData.total_calories,
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
            window.location.href = `/`;
        }, 500);
    };
    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <h2>Update the Recipe's Fields</h2>
                <form onSubmit={updateRecipe} style={styles.form}>
                    {/* Render your form fields here */}
                    <label style={styles.label}>
                        Difficulty:
                        <input
                            type="number"
                            name="difficulty"
                            value={formData.difficulty}
                            onChange={handleChange}
                        />
                    </label>
                    <label style={styles.label}>
                        Name:
                        <input
                            type="string"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </label>
                    <label style={styles.label}>
                        Description:
                        <input
                            type="string"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </label>
                    <label style={styles.label}>
                        Time min:
                        <input
                            type="number"
                            name="time_min"
                            value={formData.time_min}
                            onChange={handleChange}
                        />
                    </label>
                    <label style={styles.label}>
                        Time max:
                        <input
                            type="number"
                            name="time_max"
                            value={formData.time_max}
                            onChange={handleChange}
                        />
                    </label>
                    <label style={styles.label}>
                        Number of people:
                        <input
                            type="number"
                            name="number_people"
                            value={formData.number_people}
                            onChange={handleChange}
                        />
                    </label>
                    <label style={styles.label}>
                        Recipe type:
                        <input
                            type="string"
                            name="type_recipe"
                            value={formData.type_recipe}
                            onChange={handleChange}
                        />
                    </label>
                    <label style={styles.label}>
                        Estimated price:
                        <input
                            type="number"
                            name="estimated_price"
                            value={formData.estimated_price}
                            onChange={handleChange}
                        />
                    </label>
                    <label style={styles.label}>
                        Total calories:
                        <input
                            type="number"
                            name="total_calories"
                            value={formData.total_calories}
                            onChange={handleChange}
                        />
                    </label>
                    {/* Repeat similar blocks for other fields */}
                    <button type="submit" style={styles.button}>
                        Submit
                    </button>
                </form>
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
        textAlign: "center",
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

export default UpdateRecipeForm;