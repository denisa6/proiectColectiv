import React, { useState, CSSProperties } from "react";
import Select, { components } from "react-select";
import { useEffect } from "react";
import { Ingredient } from "../../models/Ingredient";
import { getAuthToken, getUsername, getUserID } from "../../util/auth";

const AddRecipeForm = () => {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [selectedIngredients, setSelectedIngredients] = useState<number[]>(
        []
    );
    const [selectedRecipeType, setSelectedRecipeType] = useState(String);
    const [isPhotoReadyComplete, setIsPhotoReadyComplete] = useState(false);

    interface ExtendedFile extends File {
        base64?: string; // Extend the File type with an optional base64 property
    }

    interface PhotoData {
        base64URL: string; // Assuming result is a string
        file: ExtendedFile; // Assuming file is of type File
    }

    const [photoData, setPhotoData] = useState<PhotoData | null>(null);

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
        photo: "",
        creator: "",
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

    //==================================== PHOTO STUPID CRAP ======================================================================
    // PHOTO INPUT CHANGE HANDLER

    const getBase64 = (
        file: File,
        callback: (result: string) => void
    ): void => {
        let baseURL = "";
        let reader = new FileReader();

        // Convert the file to base64 text
        reader.readAsDataURL(file);

        // on reader load something...
        reader.onload = () => {
            baseURL = reader.result as string;
            callback(baseURL);
        };
    };

    //==========================================================================================================

    const handleRecipeDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        console.log(name, value);

        if (e.target.id === "photo") {
            const files = e.target.files;

            if (files && files.length > 0) {
                const selectedFile = files[0];

                getBase64(selectedFile, (result: string) => {
                    const photoString = result;
                    setRecipeData((prevData) => ({
                        ...prevData,
                        ["photo"]: photoString,
                    }));
                    console.log(photoString);
                });
            }
        } else {
            setRecipeData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };
    useEffect(() => {
        // Check if all required fields are completed
        const photoReady = recipeData.photo !== null;
        setIsPhotoReadyComplete(photoReady);
    }, [recipeData.photo]);

    const handleSelectIngredientChange = (selectedOptions: any) => {
        // Extract the selected ingredient IDs and update the state
        const selectedIds = selectedOptions.map((option: any) => option.value);
        setSelectedIngredients(selectedIds);
        console.log(selectedIngredients);
    };

    const handleSelectRecipeTypeChange = (selectedOption: any) => {
        setSelectedRecipeType(selectedOption.value);
        console.log(selectedOption.value);
        console.log(selectedIngredients);
    };

    const handleCancel = () => {
        const isUserRecipePage = window.location.href.includes("/userRecipes");

        if (isUserRecipePage) {
            window.location.href = `/userRecipes/`;
        } else {
            window.location.href = `/showlist/`;
        }
    };

    const addRecipe = async (event: { preventDefault: () => void }) => {
        if (isPhotoReadyComplete) {
            console.log(isPhotoReadyComplete);
            console.log(recipeData.photo);
            event.preventDefault();

            // const FD = new FormData();

            // Object.entries(recipeData).forEach(([key, value]) => {
            //     if (value !== undefined) {
            //         FD.append(key, value.toString());
            //         console.log(key);
            //         console.log(value);
            //         console.log(FD.getAll);
            //     }
            // });

            //FD.append("photo", uploadedPhoto as unknown as File);

            try {
                fetch("http://127.0.0.1:8000/recipe/", {
                    method: "POST",
                    body: JSON.stringify({
                        difficulty: recipeData.difficulty,
                        name: recipeData.name,
                        description: recipeData.description,
                        ingredients: selectedIngredients,
                        time_min: recipeData.time_min,
                        time_max: recipeData.time_max,
                        number_people: recipeData.number_people,
                        type_recipe: selectedRecipeType,
                        estimated_price: recipeData.estimated_price,
                        total_calories: recipeData.total_calories,
                        photo: recipeData.photo,
                        creator: getUserID(),
                        //FD,
                    }),
                    headers: {
                        Accept: "application/json",
                        "Content-Type":
                            "application/json;charset=UTF-8;multipart/form-data",
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
                const isUserRecipePage =
                    window.location.href.includes("/userRecipes");

                if (isUserRecipePage) {
                    window.location.href = `/userRecipes/`;
                } else {
                    window.location.href = `/showlist/`;
                }
            }, 500);
        }
    };

    const selectOptions = ingredients.map((ingredient) => ({
        value: ingredient.id,
        label: ingredient.name,
    }));
   const selectOptionsIngredients = selectOptions;

    const selectOptionsRecipeTypes = [
        { value: "lunch", label: "Lunch" },
        { value: "breakfast", label: "Breakfast" },
        { value: "dinner", label: "Dinner" },
        { value: "dessert", label: "Dessert" },
        { value: "snack", label: "Snack" },
    ];

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <h2>Add New Recipe</h2>
                <form onSubmit={addRecipe} style={styles.form}>
                    <label style={styles.label}>
                        Difficulty:
                        <input
                            style={styles.inputBox}
                            type="number"
                            name="difficulty"
                            value={recipeData.difficulty}
                            onChange={handleRecipeDataChange}
                        />
                    </label>
                    <label style={styles.label}>
                        Name:
                        <input
                            style={styles.inputBox}
                            type="string"
                            name="name"
                            value={recipeData.name}
                            onChange={handleRecipeDataChange}
                        />
                    </label>
                    <label style={styles.label}>
                        Description:
                        <textarea
                            style={styles.inputBox}
                            name="description"
                            value={recipeData.description}
                            onChange={(
                                e: React.ChangeEvent<HTMLTextAreaElement>
                            ) => handleRecipeDataChange(e)}
                            rows={4} // You can adjust the number of rows as needed
                            //style={{ resize: "vertical" }} // Optional: Allow vertical resizing
                        />
                    </label>
                    <label style={styles.label}>
                        Time min:
                        <input
                            style={styles.inputBox}
                            type="number"
                            name="time_min"
                            value={recipeData.time_min}
                            onChange={handleRecipeDataChange}
                        />
                    </label>
                    <label style={styles.label}>
                        Time max:
                        <input
                            style={styles.inputBox}
                            type="number"
                            name="time_max"
                            value={recipeData.time_max}
                            onChange={handleRecipeDataChange}
                        />
                    </label>
                    <label style={styles.label}>
                        Number of people:
                        <input
                            style={styles.inputBox}
                            type="number"
                            name="number_people"
                            value={recipeData.number_people}
                            onChange={handleRecipeDataChange}
                        />
                    </label>
                    <label style={styles.label}>
                        Estimated price:
                        <input
                            style={styles.inputBox}
                            type="number"
                            name="estimated_price"
                            value={recipeData.estimated_price}
                            onChange={handleRecipeDataChange}
                        />
                    </label>
                    <label style={styles.label}>
                        Total calories:
                        <input
                            style={styles.inputBox}
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
                                backgroundColor: "#ecb753",
                            }),
                            menu: (provided) => ({
                                ...provided,
                                maxHeight: "150px",
                                backgroundColor: "#ecb753",
                            }),
                            control: (provided) => ({
                                ...provided,
                                backgroundColor: "white",
                                color: "black", // Set the text color inside the select button
                                borderColor: "black", // Set the border color
                                textEmphasisColor: "black",
                                textDecorationColor: "black",
                            }),
                            option: (provided, state) => ({
                                ...provided,
                                backgroundColor: state.isFocused
                                    ? "grey"
                                    : "white", // Set the hover color here
                                color: state.isFocused ? "white" : "black", // Text color on hover
                            }),
                        }}
                    />
                    <Select
                        options={selectOptionsRecipeTypes}
                        onChange={handleSelectRecipeTypeChange}
                        placeholder="Select Recipe Type"
                        className="w-full md:w-10rem"
                        styles={{
                            container: (provided) => ({
                                ...provided,
                                backgroundColor: "#91972a",
                            }),
                            menu: (provided) => ({
                                ...provided,
                                maxHeight: "150px",
                                backgroundColor: "#ecb753",
                            }),
                            control: (provided) => ({
                                ...provided,
                                backgroundColor: "white",
                                color: "black", // Set the text color inside the select button
                                borderColor: "black", // Set the border color
                                textEmphasisColor: "black",
                                textDecorationColor: "black",
                            }),
                            option: (provided, state) => ({
                                ...provided,
                                backgroundColor: state.isFocused
                                    ? "grey"
                                    : "white", // Set the hover color here
                                color: state.isFocused ? "white" : "black", // Text color on hover
                            }),
                        }}
                    />

                    <div>
                        <h5>Upload your yummy image 😜❤ </h5>

                        <div>
                            {recipeData.photo && (
                                <img
                                    src={`${recipeData.photo}`} // Make sure to specify the correct image type
                                    alt="Problem getting your photo"
                                    width="300" // Set the width as needed
                                    height="200" // Set the height as needed
                                />
                            )}
                        </div>

                        <p>
                            <input
                                type="file"
                                id="photo"
                                accept="image/png, image/jpeg"
                                //value={recipeData.photo}
                                onChange={handleRecipeDataChange}
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
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    modal: {
        background: "#ecb753",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
        textAlign: "center",
        color: "black",
        overflowY: "auto", // Add overflowY to enable vertical scrolling
        maxHeight: "60vh", // Set a maximum height to fit the viewport
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
        backgroundColor: "white",
        color: "black",
        marginRight: "20px",
        marginLeft: "20px",
    },

    inputBox: {
        height: "30px",
        width: "300px",
        backgroundColor: "#f0f0f0", // Light gray input background
        border: "1px solid #ccc",
        borderRadius: "3px",
        padding: "0 10px",
        fontSize: "14px",
        fontWeight: "300",
        color: "#333333", // Dark gray text color
        outline: "none",
    },
};

export default AddRecipeForm;
