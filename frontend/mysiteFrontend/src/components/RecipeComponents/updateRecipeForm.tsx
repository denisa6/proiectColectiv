import React, { useState, useEffect, CSSProperties } from "react";
import { Recipe } from "../../models/Recipe";
import { Ingredient } from "../../models/Ingredient";
import Select from "react-select";
import {
    getAuthToken,
    getUserID,
    getUserRole,
    getUsername,
} from "../../util/auth";

const UpdateRecipeForm = (props: { recipeId: any }) => {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [selectedIngredients, setSelectedIngredients] = useState<number[]>(
        []
    );
    const [uploadedPhoto, setUploadedPhoto] = useState<File | null>(null);
    const [recipeData, setRecipeData] = useState({
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
        photo: undefined,
        creator: getUserID(),
    });

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

    const handleRecipeDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "photo") {
            const files = e.target.files;

            if (files && files.length > 0) {
                const selectedFile = files[0];
                console.log(selectedFile);
                setUploadedPhoto(selectedFile);
                console.log("kljjghdasfml;");
            }
        }
        setRecipeData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // const [formData, setFormData] = useState({
    //     // Define your form fields here
    //     difficulty: recipeData.difficulty,
    //     name: recipeData.name,
    //     description: recipeData.description,
    //     ingredients: selectedIngredients,
    //     time_min: recipeData.time_min,
    //     time_max: recipeData.time_max,
    //     number_people: recipeData.number_people,
    //     type_recipe: recipeData.type_recipe,
    //     estimated_price: recipeData.estimated_price,
    //     total_calories: recipeData.total_calories,
    // });

    const handleSelectIngredientChange = (selectedOptions: any) => {
        // Extract the selected ingredient IDs and update the state
        const selectedIds = selectedOptions.map((option: any) => option.value);
        setSelectedIngredients(selectedIds);
    };

    const handleCancel = () => {
        window.location.href = `/showlist/`;
    };

    const selectOptions = ingredients.map((ingredient) => ({
        value: ingredient.id,
        label: ingredient.name,
    }));
    const selectOptionsIngredients = selectOptions.sort((a, b) =>
        a.label.localeCompare(b.label)
    );

    const updateRecipe = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        console.log(getUserID());
        console.log(getUserID());
        console.log(getUserID());

        const data = JSON.stringify({
            difficulty: recipeData.difficulty,
            name: recipeData.name,
            description: recipeData.description,
            ingredients: selectedIngredients,
            time_min: recipeData.time_min,
            time_max: recipeData.time_max,
            number_people: recipeData.number_people,
            type_recipe: recipeData.type_recipe,
            estimated_price: recipeData.estimated_price,
            total_calories: recipeData.total_calories,
            photo: recipeData.photo,
            creator: getUserID(),
        });

        console.log(data);

        try {
            fetch(`http://127.0.0.1:8000/recipe/${props.recipeId}/`, {
                method: "PUT",
                body: JSON.stringify({
                    difficulty: recipeData.difficulty,
                    name: recipeData.name,
                    description: recipeData.description,
                    ingredients: selectedIngredients,
                    time_min: recipeData.time_min,
                    time_max: recipeData.time_max,
                    number_people: recipeData.number_people,
                    type_recipe: recipeData.type_recipe,
                    estimated_price: recipeData.estimated_price,
                    total_calories: recipeData.total_calories,
                    photo: recipeData.photo,
                    creator: getUserID(),
                }),
                headers: {
                    Accept: "application/json",
                    "Content-Type":
                        "application/json;charset=UTF-8;multipart/form-data",
                    Authorization: "Bearer " + getAuthToken(),
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
        }, 5000000);
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
                            value={recipeData.difficulty}
                            onChange={handleRecipeDataChange}
                        />
                    </label>
                    <label style={styles.label}>
                        Name:
                        <input
                            type="string"
                            name="name"
                            value={recipeData.name}
                            onChange={handleRecipeDataChange}
                        />
                    </label>
                    <label style={styles.label}>
                        Description:
                        <input
                            type="string"
                            name="description"
                            value={recipeData.description}
                            onChange={handleRecipeDataChange}
                        />
                    </label>
                    <label style={styles.label}>
                        Time min:
                        <input
                            type="number"
                            name="time_min"
                            value={recipeData.time_min}
                            onChange={handleRecipeDataChange}
                        />
                    </label>
                    <label style={styles.label}>
                        Time max:
                        <input
                            type="number"
                            name="time_max"
                            value={recipeData.time_max}
                            onChange={handleRecipeDataChange}
                        />
                    </label>
                    <label style={styles.label}>
                        Number of people:
                        <input
                            type="number"
                            name="number_people"
                            value={recipeData.number_people}
                            onChange={handleRecipeDataChange}
                        />
                    </label>
                    <label style={styles.label}>
                        Recipe type:
                        <input
                            type="string"
                            name="type_recipe"
                            value={recipeData.type_recipe}
                            onChange={handleRecipeDataChange}
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
                            value={recipeData.estimated_price}
                            onChange={handleRecipeDataChange}
                        />
                    </label>
                    <label style={styles.label}>
                        Total calories:
                        <input
                            type="number"
                            name="total_calories"
                            value={recipeData.total_calories}
                            onChange={handleRecipeDataChange}
                        />
                    </label>
                    <Select
                        isMulti
                        options={selectOptionsIngredients}
                        onChange={handleSelectIngredientChange}
                        placeholder="Select Ingredients"
                        className="w-full md:w-10rem"
                        styles={{
                            container: (provided) => ({
                                ...provided,
                                backgroundColor: "#91972a",
                            }),
                            menu: (provided) => ({
                                ...provided,
                                maxHeight: "150px",
                                backgroundColor: "#b6c454",
                            }),
                            control: (provided) => ({
                                ...provided,
                                backgroundColor: "#d8d174",
                                color: "black", // Set the text color inside the select button
                                borderColor: "black", // Set the border color
                                textEmphasisColor: "black",
                                textDecorationColor: "black",
                            }),
                            option: (provided, state) => ({
                                ...provided,
                                backgroundColor: state.isFocused
                                    ? "#91972a"
                                    : "#b6c454", // Set the hover color here
                                color: state.isFocused ? "black" : "black", // Text color on hover
                            }),
                        }}
                    />
                    <div>
                        <h5>Upload your yummy image 😜❤ </h5>
                        <p>
                            <input
                                type="file"
                                id="photo"
                                accept="image/png, image/jpeg"
                                value={recipeData.photo}
                                onChange={handleRecipeDataChange}
                                required
                            />
                        </p>
                    </div>
                    <div id="buttons-container">
                        <button type="submit" style={styles.button}>
                            Submit
                        </button>
                        <button style={styles.button} onClick={handleCancel}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

/////===========================================   STYLES  =====================================================
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
        background: "#91972a",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
        textAlign: "center",
        color: "black",
    },
    form: {
        display: "flex",
        flexDirection: "column" as "column",
        alignItems: "center",
    },
    label: {
        marginBottom: 10,
        textAlign: "center",
        color: "black",
    },
    button: {
        padding: "10px",
        marginTop: "10px",
        backgroundColor: "#d8d174",
        color: "black",
    },
};
export default UpdateRecipeForm;
