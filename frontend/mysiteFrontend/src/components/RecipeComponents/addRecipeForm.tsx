import React, { useState, CSSProperties } from "react";
import Select, { ActionMeta, MultiValue } from "react-select";
import { useEffect } from "react";
import { Ingredient } from "../../models/Ingredient";

const AddRecipeForm = () => {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [selectedIngredients, setSelectedIngredients] = useState<number[]>(
        []
    );

    // fetch ingredients for the dropdown menu
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

    const [formData, setFormData] = useState({
        // Define your form fields here
        difficulty: "",
        name: "",
        description: "",
        ingredients: [],
        time_min: "",
        time_max: "",
        number_people: "",
        type_recipe: "",
        estimated_price: "",
        total_calories: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSelectChange = (selectedOptions: any) => {
        // Extract the selected ingredient IDs and update the state
        const selectedIds = selectedOptions.map((option: any) => option.value);
        setSelectedIngredients(selectedIds);
    };

    const handleCancel = () => {
        window.location.href = `/showlist/`;
    };

    // to format the photo so it  ll be accepted as a file
    const addRecipe = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        const imagePath = "/path/to/local/photo.jpg"; // Replace with the actual path to your local image
        const FD = new FormData();
        FD.append("photo", imagePath);

        try {
            fetch("http://127.0.0.1:8000/recipe/", {
                method: "POST",
                body: JSON.stringify({
                    difficulty: formData.difficulty,
                    name: formData.name,
                    description: formData.description,
                    ingredients: selectedIngredients,
                    time_min: formData.time_min,
                    time_max: formData.time_max,
                    number_people: formData.number_people,
                    type_recipe: formData.type_recipe,
                    estimated_price: formData.estimated_price,
                    total_calories: formData.total_calories,
                    FD,
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
            window.location.href = `/showlist`;
            console.log(selectedIngredients);
        }, 500);
    };

    const selectOptions = ingredients.map((ingredient) => ({
        value: ingredient.id,
        label: ingredient.name,
    }));

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <h2>Add New Recipe</h2>
                <form onSubmit={addRecipe} style={styles.form}>
                    {/* Render your form fields here */}

                    {/* ingredients drop down menu*/}

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
                        {/* class RecipeTypeChoices(models.TextChoices): REGULAR =
                        'regular' BREAKFAST = 'breakfast' LUNCH = 'lunch' DINNER
                        = 'dinner' DESSERT = 'dessert' SNACK = 'snack' */}
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
                    <Select
                        isMulti
                        options={selectOptions}
                        onChange={handleSelectChange}
                        placeholder="Select Ingredients"
                        className="w-full md:w-10rem"
                        styles={{
                            container: (provided) => ({
                                ...provided,
                                backgroundColor: "black",
                            }),
                            menu: (provided) => ({
                                ...provided,
                                maxHeight: "150px",
                                backgroundColor: "black",
                            }),
                            option: (provided, state) => ({
                                ...provided,
                                backgroundColor: state.isFocused
                                    ? "blue"
                                    : "black", // Set the hover color here
                                color: state.isFocused ? "white" : "inherit", // Text color on hover
                            }),
                        }}
                    />

                    <div id="buttons-container">
                        <button type="submit" style={styles.button}>
                            Submit
                        </button>
                        <button onClick={handleCancel}>Cancel</button>
                    </div>
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

export default AddRecipeForm;
