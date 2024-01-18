import { useState, useEffect, CSSProperties } from "react";
import { Ingredient } from "../../models/Ingredient";

import DeleteRecipe from "./deleteRecipe";
import UpdateRecipeForm from "./updateRecipeForm";
import { getUserID } from "../../util/auth";

const RecipeDetailsForm = (props: { recipeDetail: any }) => {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [desiredCommand, setDesiredCommand] = useState(-1);
    console.log(props.recipeDetail.creator);
    console.log(props.recipeDetail.creator);

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

    const handleDownloadPDF = async () => {
        try {
            // Assuming there is an endpoint on the backend for generating and serving the PDF
            const response = await fetch(
                `http://127.0.0.1:8000/recipe/${props.recipeDetail.id}/download/`,
                {
                    method: "GET",
                    headers: {
                        Accept: "application/pdf",
                    },
                }
            );

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = props.recipeDetail.name + "_details.pdf";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } catch (error) {
            console.error("Error downloading PDF:", error);
        }
    };
    const currentIngredientsSet = new Set();
    props.recipeDetail.ingredients.forEach((item: number) => {
    // Ensure 'ingredients' array is defined and item is a valid index
        if (ingredients && ingredients[item - 1] && ingredients[item - 1].name) {
            currentIngredientsSet.add(ingredients[item - 1].name);
        } else {
            console.error(
                `Invalid index or missing 'name' property for ingredient at index ${item}`
            );
        }
    });
    const currentIngredients = Array.from(currentIngredientsSet);

    useEffect(() => {
        setFormData({
            difficulty: props.recipeDetail.difficulty,
            name: props.recipeDetail.name,
            description: props.recipeDetail.description,
            ingredients: props.recipeDetail.ingredients,
            time_min: props.recipeDetail.time_min,
            time_max: props.recipeDetail.time_max,
            number_people: props.recipeDetail.number_people,
            type_recipe: props.recipeDetail.type_recipe,
            estimated_price: props.recipeDetail.estimated_price,
            total_calories: props.recipeDetail.total_calories,
            photo: props.recipeDetail.photo,
        });
        console.log(props.recipeDetail?.photo);
        console.log("cvbhnjkl;");
    }, [props.recipeDetail]);

    useEffect(() => {
        const recipeIngredients = ingredients.filter(
            (ingredient) =>
                props.recipeDetail.ingredients.indexOf(ingredient.id) > -1
        );
        setIngredientNames([]);
        recipeIngredients.forEach((ingredient) =>
            setIngredientNames((ingredientArr) => [
                ...ingredientArr,
                ingredient.name,
            ])
        );
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
        photo: "",
    });

    const [ingredientNames, setIngredientNames] = useState<string[]>([]);

    const handleExitDetail = () => {
        const isUserRecipePage = window.location.href.includes("/userRecipes");

        if (isUserRecipePage) {
            window.location.href = `/userRecipes/`;
        } else {
            window.location.href = `/showlist/`;
        }
    };
    const handleCancel = () => {
        setDesiredCommand(-1);
    };
    return (
        <div style={styles.overlay}>
            <div style={styles.modal} modal-class="modal-fullscreen">
                <div style={styles.header}>
                    <button
                        style={styles.inputButton}
                        onClick={handleDownloadPDF}
                    >
                        Download PDF
                    </button>
                    <button
                        style={styles.exitButton}
                        onClick={handleExitDetail}
                    >
                        Exit
                    </button>
                </div>

                <h1>{props.recipeDetail.name}</h1>
                {/* {formData.photo && (
                    <div>
                        <img src={formData.photo} alt="My Image" />
                    </div>
                )} */}

                <div style={styles.ingredientsAndPhotoContainer}>
                    <div style={styles.infoContainer}>
                        <h2>Recipe Information: </h2>
                        <p>
                            <b>
                                {"Difficulty: ".concat(
                                    String(formData.difficulty)
                                )}
                            </b>
                        </p>
                        <p>
                            <b>
                                {"Estimated Time: ".concat(
                                    String(formData.time_min)
                                )}{" "}
                                - {formData.time_max}
                            </b>
                        </p>
                        <p>
                            <b>
                                {"Number of People: ".concat(
                                    String(formData.number_people)
                                )}
                            </b>
                        </p>
                        <p>
                            <b>
                                {"Recipe Type: ".concat(formData.type_recipe)}
                            </b>
                        </p>
                        <p>
                            <b>
                                {"Estimated Price: ".concat(
                                    String(formData.estimated_price)
                                )}
                            </b>
                        </p>
                        <p>
                            <b>
                                {"Total Calories: ".concat(
                                    String(formData.total_calories)
                                )}{" "}
                            </b>
                        </p>
                    </div>
                    <div style={styles.ingredientsContainer}>
                        <h2>Ingredients:</h2>
                        <ul>
                            {currentIngredients.map((ingredient, index) => (
                                <li key={index}>{ingredient.toString()}</li> // APARE EROARE NU STIU DE CE DAR IN BROWSER NU ARE NIMIC
                            ))}
                        </ul>
                    </div>
                    {true && (
                        <div style={styles.photoContainer}>
                            <img
                                src={props.recipeDetail?.photo}
                                alt="Problem getting your photo"
                                width="300"
                                height="200"
                            />
                        </div>
                    )}
                </div>
                <div style={styles.descriptionContainer}>
                    {props.recipeDetail.description}
                </div>

                <div id="buttons-container">
                    {props.recipeDetail.creator == getUserID() && (
                        <div>
                            {" "}
                            <td>
                                {/* <Link to={`/delete-recipe`}> */}
                                <button
                                    style={styles.inputButton}
                                    onClick={() => {
                                        setDesiredCommand(0);
                                    }}
                                >
                                    Delete
                                </button>
                                {/* </Link> */}
                            </td>
                            <td>
                                <button
                                    style={styles.inputButton}
                                    onClick={() => {
                                        setDesiredCommand(1);
                                    }}
                                >
                                    Update
                                </button>
                            </td>
                        </div>
                    )}
                    {desiredCommand === 0 && (
                        <DeleteRecipe recipeToDelete={props.recipeDetail} />
                    )}
                    {desiredCommand === 1 && (
                        <UpdateRecipeForm recipeToUpdate={props.recipeDetail} />
                    )}
                </div>
            </div>
        </div>
    );
};

const styles: { [key: string]: CSSProperties } = {
    title: {
        alignItems: "center",
        background: "#ecb753",
    },
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
        color: "black",
        background: "rgba(236, 183, 83, 0.8)", // Adjust the alpha value to control transparencyyyy
    },
    modal: {
        background: "white",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
        textAlign: "left",
        width: "80%", // Set the width as needed
        height: "80%", // Set the height as needed
        overflow: "auto", // Add scrollbar if content exceeds the available space
        boxSizing: "border-box",
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

    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "10px",
    },

    exitButton: {
        backgroundColor: "red",
        border: "none",
        color: "#fff",
        cursor: "pointer",
        fontSize: "16px",
    },

    content: {
        overflow: "auto", // Add scrollbar if content exceeds the available space
        maxHeight: "calc(100% - 40px)", // Set the maximum height, considering header and padding
    },
    generic: {
        color: "white",
    },
    inputButton: {
        backgroundColor: "#ecb753", // Dark yellow button color
        color: "#333333", // Dark gray text color
        padding: "10px",
        fontSize: "16px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        marginRight: "20px",
        marginLeft: "20px",
    },

    ingredientsAndPhotoContainer: {
        display: "flex",
        //flexDirection: "column", // Display children in a column
        alignItems: "flex-start", // Align items to the start of the cross axis
        justifyContent: "space-evenly",
    },
    ingredientsContainer: {
        marginBottom: "20px", // Add margin between ingredients and photo
    },
    photoContainer: {
        alignSelf: "flex-start", // Align photo to the start of the cross axis
    },
    infoContainer: {
        display: "flex",
        flexDirection: "column",
    },
    descriptionContainer: {
        marginRight: "40px",
        marginLeft: "40px",
        marginBottom: "40px",
        marginTop: "40px",
    },
};

export default RecipeDetailsForm;
