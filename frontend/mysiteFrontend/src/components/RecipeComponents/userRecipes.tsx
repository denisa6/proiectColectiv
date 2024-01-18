import { CSSProperties, useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import DeleteRecipe from "./deleteRecipe.tsx";
import UpdateRecipeForm from "./updateRecipeForm.tsx";
import RecipeDetailsForm from "./recipeDetailsForm.tsx";
import AddRecipeForm from "./addRecipeForm.tsx";
import { Recipe } from "../../models/Recipe.ts";
import { getUserID } from "../../util/auth.tsx";

const UserRecipeList = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [allrecipes, setAllRecipes] = useState<Recipe[]>([]);
    const [selectedRecipeId, setSelectedRecipeId] = useState(-1);
    const [desiredCommand, setDesiredCommand] = useState(0);
    const [filterName, setFilterName] = useState("");
    const [filterDifficulty, setFilterDifficulty] = useState("");
    const [filterIngredients, setFilterIngredients] = useState("");
    const [filterTime, setFilterTime] = useState("");
    const [filterNbPeople, setFilterNbPeople] = useState("");
    const [filterTypeRecipe, setFilterTypeRecipe] = useState("");
    const [filterPriceMin, setFilterPriceMin] = useState("");
    const [filterPriceMax, setFilterPriceMax] = useState("");
    const [filterCalMin, setFilterCalMin] = useState("");
    const [filterCalMax, setFilterCalMax] = useState("");
    const [showFilterModalName, setShowFilterModalName] = useState(false);
    const [showDeleteFilters, setShowDeleteFilters] = useState(false);
    const isAnyFilterModalOpen = showFilterModalName;
    const [currentPage, setCurrentPage] = useState(1);
    let [filters, setFilters] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response2 = await fetch(
                    `http://127.0.0.1:8000/recipe/user/${getUserID()}/?${filters}&format=json`
                );
                const data2 = await response2.json();
                setAllRecipes(data2);
                const response = await fetch(
                    `http://127.0.0.1:8000/recipe/user/${getUserID()}/?page=${currentPage}&${filters}&format=json`
                );
                const data = await response.json();
                setRecipes(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleFilterClickName = () => {
        setShowFilterModalName((prev) => !prev);
        setShowDeleteFilters((prev) => !prev);
    };

    const handleClickPrev = () => {
        setCurrentPage(currentPage - 1);
        console.log(currentPage);
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `http://127.0.0.1:8000/recipe/user/${getUserID()}/?page=${
                        currentPage - 1
                    }&${filters}&format=json`
                );
                const data = await response.json();
                setRecipes(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    };

    const handleClickNext = () => {
        setCurrentPage(currentPage + 1);
        console.log(currentPage);
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `http://127.0.0.1:8000/recipe/user/${getUserID()}/?page=${
                        currentPage + 1
                    }&${filters}&format=json`
                );
                const data = await response.json();
                setRecipes(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    };

    const handleDeleteFilters = () => {
        setFilterName("");
        setFilterDifficulty("");
        setFilterIngredients("");
        setFilterTime("");
        setFilterNbPeople("");
        setFilterTypeRecipe("");
        setFilterPriceMin("");
        setFilterPriceMax("");
        setFilterCalMin("");
        setFilterCalMax("");
        setFilters("");
        setCurrentPage(1);
    };

    const handleFilterSubmit = async () => {
        try {
            // Make a backend API call to filter recipes by name
            let url = `http://127.0.0.1:8000/recipe/user/${getUserID()}/?name=${filterName}&format=json`;
            filters = "";
            setCurrentPage(1);
            if (filterName.trim() !== "") {
                filters = filters + `name=${filterName}`;
                console.log(filters);
            }
            if (filterDifficulty !== "") {
                filters = filters + `&difficulty=${filterDifficulty}`;
            }
            if (filterIngredients !== "") {
                filters = filters + `&ingredients=${filterIngredients}`;
            }
            if (filterTime !== "") {
                filters = filters + `&time=${filterTime}`;
            }
            if (filterNbPeople !== "") {
                filters = filters + `&number_people=${filterNbPeople}`;
            }
            if (filterTypeRecipe !== "") {
                filters = filters + `&type_recipe=${filterTypeRecipe}`;
            }
            if (filterPriceMin !== "") {
                filters = filters + `&estimated_price_min=${filterPriceMin}`;
            }
            if (filterPriceMax !== "") {
                filters = filters + `&estimated_price_max=${filterPriceMax}`;
            }
            if (filterCalMin !== "") {
                filters = filters + `&total_calories_min=${filterCalMin}`;
            }
            if (filterCalMax !== "") {
                filters = filters + `&total_calories_max=${filterCalMax}`;
            }
            url = `http://127.0.0.1:8000/recipe/user/${getUserID()}/?page=${currentPage}&${filters}&format=json`;
            console.log(url);
            setFilters(filters);
            const response2 = await fetch(
                `http://127.0.0.1:8000/recipe/user/${getUserID()}/?${filters}&format=json`
            );
            const data2 = await response2.json();
            setAllRecipes(data2);
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    // You may need to include additional headers, such as authentication headers, if required by your backend
                },
            });

            if (!response.ok) {
                throw new Error(
                    `Error filtering recipes: ${response.statusText}`
                );
            }

            const data = await response.json();
            setRecipes(data);
        } catch (error) {
            console.error("Error filtering recipes:", error);
        }
    };

    return (
        <div>
            <Link to="/showlist/*">
                <button style={styles.inputButton}>Back to the main </button>
            </Link>

            <div style={{ marginBottom: "10px" }}>
                <button
                    style={styles.inputButton}
                    onClick={handleFilterClickName}
                >
                    Filters
                </button>

                {showFilterModalName && (
                    <div className="filter-modal">
                        <p>
                            {" "}
                            Name:{" "}
                            <input
                                style={styles.inputBox}
                                type="text"
                                placeholder=""
                                value={filterName}
                                onChange={(e) => setFilterName(e.target.value)}
                            />
                        </p>
                        <p>
                            {" "}
                            Difficulty:{" "}
                            <input
                                style={styles.inputBox}
                                type="text"
                                placeholder=" Between 1 and 5"
                                value={filterDifficulty}
                                onChange={(e) =>
                                    setFilterDifficulty(e.target.value)
                                }
                            />
                        </p>
                        <p>
                            Ingredient:{" "}
                            <input
                                style={styles.inputBox}
                                type="text"
                                placeholder=""
                                value={filterIngredients}
                                onChange={(e) =>
                                    setFilterIngredients(e.target.value)
                                }
                            />
                        </p>
                        <p>
                            Time:{" "}
                            <input
                                style={styles.inputBox}
                                type="text"
                                placeholder=""
                                value={filterTime}
                                onChange={(e) => setFilterTime(e.target.value)}
                            />
                        </p>
                        <p>
                            Number of people:{" "}
                            <input
                                style={styles.inputBox}
                                type="text"
                                placeholder=""
                                value={filterNbPeople}
                                onChange={(e) =>
                                    setFilterNbPeople(e.target.value)
                                }
                            />
                        </p>
                        <p>
                            Type of recipe:{" "}
                            <select
                                id="typeRecipeDropdown"
                                value={filterTypeRecipe}
                                onChange={(e) =>
                                    setFilterTypeRecipe(e.target.value)
                                }
                            >
                                <option value="">Select an option:</option>
                                <option value="breakfast">Breakfast</option>
                                <option value="lunch">Lunch</option>
                                <option value="dinner">Dinner</option>
                                <option value="dessert">Dessert</option>
                                <option value="snack">Snack</option>
                            </select>
                        </p>
                        <p>
                            Price:{" "}
                            <input
                                style={{
                                    ...styles.inputBox,
                                    ...styles.additionalStyles,
                                }}
                                type="text"
                                placeholder=" Minimum"
                                value={filterPriceMin}
                                onChange={(e) =>
                                    setFilterPriceMin(e.target.value)
                                }
                            />
                            <input
                                style={styles.inputBox}
                                type="text"
                                placeholder=" Maximum"
                                value={filterPriceMax}
                                onChange={(e) =>
                                    setFilterPriceMax(e.target.value)
                                }
                            />
                        </p>
                        <p>
                            Calories:{" "}
                            <input
                                style={{
                                    ...styles.inputBox,
                                    ...styles.additionalStyles,
                                }}
                                type="text"
                                placeholder=" Minimum "
                                value={filterCalMin}
                                onChange={(e) =>
                                    setFilterCalMin(e.target.value)
                                }
                            />
                            <input
                                style={styles.inputBox}
                                type="text"
                                placeholder=" Maximum "
                                value={filterCalMax}
                                onChange={(e) =>
                                    setFilterCalMax(e.target.value)
                                }
                            />
                        </p>
                    </div>
                )}

                <p></p>
                {isAnyFilterModalOpen && (
                    <button
                        style={styles.inputButton}
                        onClick={handleFilterSubmit}
                    >
                        Submit Filters
                    </button>
                )}
                {isAnyFilterModalOpen && (
                    <button
                        style={styles.inputButton}
                        onClick={handleDeleteFilters}
                    >
                        Delete Filters
                    </button>
                )}
            </div>
            {/* Add a Link to the new form component */}
            <Link to="showlist/add-recipe">
                <button style={styles.inputButton}>Add New Recipe</button>
            </Link>
            {/*  the empty ones le am pus sa vad cum le pune daca una sub alta sau langa*/}
            <h2>Recipe List</h2>
            <ol style={styles.list}>
                {recipes.map((recipe, index) => (
                    <li
                        key={recipe.id}
                        style={{
                            ...styles.listItem,
                            ...(index % 2 === 0
                                ? styles.evenItem
                                : styles.oddItem),
                        }}
                    >
                        <div className="title" style={{ marginBottom: "10px" }}>
                            {recipe.name}
                        </div>
                        <div className="descr" style={{ marginBottom: "10px" }}>
                            Time: {`${recipe.time_min} - ${recipe.time_max}`} |
                            Difficulty: {recipe.difficulty}
                        </div>
                        <button
                            style={{
                                ...styles.button,
                                ...(index % 2 === 0
                                    ? styles.whiteButton
                                    : styles.yellowButton),
                            }}
                            onClick={() => {
                                setSelectedRecipeId(recipe.id!);
                                setDesiredCommand(2);
                            }}
                        >
                            View Details
                        </button>
                        {selectedRecipeId === recipe.id &&
                            desiredCommand === 2 && (
                                <RecipeDetailsForm recipeDetail={recipe} />
                            )}
                    </li>
                ))}
            </ol>

            <button
                style={styles.inputButton}
                onClick={handleClickPrev}
                disabled={currentPage === 1}
            >
                Prev
            </button>
            <button style={{ marginRight: "10px" }}>{currentPage}</button>
            <button
                style={styles.inputButton}
                onClick={handleClickNext}
                disabled={currentPage === Math.ceil(allrecipes.length / 10)}
            >
                Next
            </button>

            <Routes>
                <Route
                    path="showlist/add-recipe"
                    element={<AddRecipeForm />}
                />
            </Routes>
        </div>
    );
};
              

            </div>
            );
            };

//////===========================================   STYLES  =====================================================

const styles: { [key: string]: CSSProperties } = {
    list: {
        listStyle: "none",
        padding: 0,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between", // Adjust the space between columns
    },

    listItem: {
        width: "30%", // Set width to allow three items on a row with some spacing
        marginBottom: "30px", // Increase margin for additional spacing
        border: "1px solid #ecb753",
        borderRadius: "5px",
        padding: "15px",
        boxSizing: "border-box", // Ensure padding is included in the width
        display: "flex",
        flexDirection: "column",
    },

    evenItem: {
        backgroundColor: "#ffffff",
        color: "black", // White background for even items
    },

    oddItem: {
        backgroundColor: "#ecb753",
        color: "black", // Dark yellow background for odd items
    },

    button: {
        marginTop: "15px",
        padding: "8px 12px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },

    whiteButton: {
        backgroundColor: "#ffffff", // White button color for dark yellow row
        color: "#ecb753",
        // Dark yellow text color for button
    },

    yellowButton: {
        backgroundColor: "#ecb753", // Dark yellow button color for white row
        color: "#ffffff", // White text color for button
    },

    buttonContainer: {
        display: "flex",
        marginTop: "20px",
    },

    logoutButton: {
        backgroundColor: "red", // Dark yellow button color
        color: "black", // Dark gray text color
        padding: "10px",
        fontSize: "16px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        marginBottom: "10px",
        marginRight: "10px",
        marginLeft: "15px", // Margin between buttons
    },

    inputButton: {
        backgroundColor: "#ecb753", // Dark yellow button color
        color: "#333333", // Dark gray text color
        padding: "10px",
        fontSize: "16px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        marginBottom: "10px",
        marginRight: "10px", // Margin between buttons
    },

    headerContainer: {
        position: "fixed",
        top: 0,
        right: 0,
        padding: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",

        color: "#ffffff", // Adjust the text color
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
    additionalStyles: {
        marginRight: "15px",
    },
};

export default UserRecipeList;
