import { Recipe } from "../../models/Recipe";
import { useState, useEffect, CSSProperties } from "react";
import { Link, Route, Routes } from "react-router-dom";
import AddRecipeForm from "./addRecipeForm";
import UpdateRecipeForm from "./updateRecipeForm";
import DeleteRecipe from "./deleteRecipe";
import RecipeDetailsForm from "./recipeDetailsForm";
import "../recipesTable.css";

const RecipeList = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [allrecipes, setAllRecipes] = useState<Recipe[]>([]);
    const [selectedRecipeId, setSelectedRecipeId] = useState(-1);
    const [selectedRecipeToUpdate, setSelectedRecipeToUpdate] =
        useState<Recipe>();
    const [deleteOrUpdate, setDeleteOrUpdate] = useState(0);
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
    const isAnyFilterModalOpen = showFilterModalName;
    const [currentPage, setCurrentPage] = useState(1);
    const [recipeForDetail, setRecipeForDetail] = useState<Recipe>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response2 = await fetch(
                    `http://127.0.0.1:8000/recipe/?format=json`
                );
                const data2 = await response2.json();
                setAllRecipes(data2);
                const response = await fetch(
                    `http://127.0.0.1:8000/recipe/?page=${currentPage}&format=json`
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
    };

    const handleClickPrev = () => {
        setCurrentPage(currentPage - 1);
        console.log(currentPage);
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `http://127.0.0.1:8000/recipe/?page=${
                        currentPage - 1
                    }&format=json`
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
                    `http://127.0.0.1:8000/recipe/?page=${
                        currentPage + 1
                    }&format=json`
                );
                const data = await response.json();
                setRecipes(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    };

    const handleFilterSubmit = async () => {
        try {
            // Make a backend API call to filter recipes by name
            let url = `http://127.0.0.1:8000/recipe/?name=${filterName}&format=json`;
            let filters = "";
            if (filterName.trim() !== "") {
                filters = filters + `name=${filterName}`;
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
            url = `http://127.0.0.1:8000/recipe/?${filters}&format=json`;
            console.log(url);
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
        <div style={styles.modalContainer}>
            <div style={styles.header}>
                <Link to="/logout">
                    <button style={styles.logoutButton}>Logout</button>
                </Link>
            </div>

            <div style={styles.modalContainer}>
                <div style={styles.header}>
                    <Link to="/logout">
                        <button style={styles.logoutButton}>Logout</button>
                    </Link>

                    <Link to="/userRecipes">
                        <button>see your recipes </button>
                    </Link>
                    <Link to="/userRecipes">
                        <button>see your recipes </button>
                    </Link>

                    <div style={{ marginBottom: "10px" }}>
                        <button
                            style={styles.filterButton}
                            onClick={handleFilterClickName}
                        >
                            Filter by Name
                        </button>
                    </div>
                    <div style={{ marginBottom: "10px" }}>
                        <button
                            style={styles.filterButton}
                            onClick={handleFilterClickName}
                        >
                            Filter by Name
                        </button>
                    </div>
                </div>
                {showFilterModalName && (
                    <div className="filter-modal" style={styles.filterModal}>
                        <div
                            className="filter-modal"
                            style={styles.filterModal}
                        >
                            <p>
                                {" "}
                                Name:{" "}
                                <input
                                    type="text"
                                    placeholder=""
                                    value={filterName}
                                    onChange={(e) =>
                                        setFilterName(e.target.value)
                                    }
                                />
                            </p>
                            <p>
                                {" "}
                                Difficulty:{" "}
                                <input
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
                                    type="text"
                                    placeholder=""
                                    value={filterTime}
                                    onChange={(e) =>
                                        setFilterTime(e.target.value)
                                    }
                                />
                            </p>
                            <p>
                                Number of people:{" "}
                                <input
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
                                    type="text"
                                    placeholder=" Minimum"
                                    value={filterPriceMin}
                                    onChange={(e) =>
                                        setFilterPriceMin(e.target.value)
                                    }
                                    style={{ marginRight: "10px" }}
                                />
                                <input
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
                                    type="text"
                                    placeholder=" Minimum "
                                    value={filterCalMin}
                                    onChange={(e) =>
                                        setFilterCalMin(e.target.value)
                                    }
                                    style={{ marginRight: "10px" }}
                                />
                                <input
                                    type="text"
                                    placeholder=" Maximum "
                                    value={filterCalMax}
                                    onChange={(e) =>
                                        setFilterCalMax(e.target.value)
                                    }
                                />
                            </p>
                        </div>
                    </div>
                )}

                <p></p>
                {isAnyFilterModalOpen && (
                    <button onClick={handleFilterSubmit}>Submit Filters</button>
                )}
            </div>
            {/* Add a Link to the new form component */}
            <Link to="showlist/add-recipe">
                <button style={styles.addButton}>Add New Recipe</button>
            </Link>
            {/*  the empty ones le am pus sa vad cum le pune daca una sub alta sau langa*/}
            <h2>Recipe List</h2>
            <table className="recipe-table">
                <thead>
                    <tr>
                        <th>Difficulty</th>
                        <th>Name</th>
                        {/* <th>Description</th> */}
                        <th>Time (min)</th>
                        <th>Number of People</th>
                        <th>Type of Recipe</th>
                        <th>Estimated Price</th>
                        <th>Total Calories</th>
                    </tr>
                </thead>
                <tbody>
                    {recipes.map((recipe) => (
                        <tr key={recipe.id}>
                            {/* <td>{recipe.id}</td> */}
                            <td>{recipe.difficulty}</td>
                            <td>{recipe.name}</td>
                            {/* <td>{recipe.description}</td> */}
                            <td>
                                {recipe.time_min} - {recipe.time_max}
                            </td>
                            <td>{recipe.number_people}</td>
                            <td>{recipe.type_recipe}</td>
                            <td>{recipe.estimated_price}</td>
                            <td>{recipe.total_calories}</td>

                            <td>
                                <button
                                    onClick={() => {
                                        setSelectedRecipeId(recipe.id!);
                                        setDesiredCommand(2);
                                    }}
                                >
                                    View Details
                                </button>
                            </td>
                            {selectedRecipeId === recipe.id &&
                                desiredCommand === 2 && (
                                    <RecipeDetailsForm recipeDetail={recipe} />
                                    // setRecipeForDetail(recipe);
                                )}
                        </tr>
                    ))}
                </tbody>
            </table>

            <button
                style={{ marginRight: "10px" }}
                onClick={handleClickPrev}
                disabled={currentPage === 1}
            >
                Prev
            </button>
            <button style={{ marginRight: "10px" }}>{currentPage}</button>
            <button
                style={{ marginRight: "10px" }}
                onClick={handleClickNext}
                disabled={currentPage === Math.ceil(allrecipes.length / 5)}
            >
                Next
            </button>

            <button
                style={{ marginRight: "10px" }}
                onClick={handleClickPrev}
                disabled={currentPage === 1}
            >
                Prev
            </button>
            <button style={{ marginRight: "10px" }}>{currentPage}</button>
            <button
                style={{ marginRight: "10px" }}
                onClick={handleClickNext}
                disabled={currentPage === Math.ceil(allrecipes.length / 5)}
            >
                Next
            </button>

            <Routes>
                {/* <Route path="showlist/details" element={<RecipeDetailsForm recipeDetail={recipe} />} /> */}
                <Route path="showlist/add-recipe" Component={AddRecipeForm} />
            </Routes>
            <button
                style={{ marginRight: "10px" }}
                onClick={handleClickPrev}
                disabled={currentPage === 1}
            >
                Prev
            </button>
            <button style={{ marginRight: "10px" }}>{currentPage}</button>
            <button
                style={{ marginRight: "10px" }}
                onClick={handleClickNext}
                disabled={currentPage === Math.ceil(allrecipes.length / 5)}
            >
                Next
            </button>

            <Routes>
                {/* <Route path="showlist/details" element={<RecipeDetailsForm recipeDetail={recipe} />} /> */}
                <Route path="showlist/add-recipe" Component={AddRecipeForm} />
            </Routes>
        </div>
    );
};

//////===========================================   STYLES  =====================================================

const styles: { [key: string]: CSSProperties } = {
    pageContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: "20px",
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "10px",
        width: "100%",
    },
    logoutButton: {
        alignSelf: "flex-end",
    },
    addButton: {
        marginRight: "10px",
    },
    filterButton: {
        marginRight: "10px",
    },
    filterModal: {
        // Customize styles for the filter modal
    },
    pageContent: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
    pageContentWithFilter: {
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
    },
    // Add more styles as needed
};

export default RecipeList;
