import { Recipe } from "../../models/Recipe";
import { useState, useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import AddRecipeForm from "./addRecipeForm";
import UpdateRecipeForm from "./updateRecipeForm";
import DeleteRecipe from "./deleteRecipe";
import "../recipesTable.css";

const RecipeList = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [selectedRecipeId, setSelectedRecipeId] = useState(-1);
    const [deleteOrUpdate, setDeleteOrUpdate] = useState(0);
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
    const isAnyFilterModalOpen = showFilterModalName ;



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    "http://127.0.0.1:8000/recipe/?format=json"
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


   const handleFilterSubmit = async () => {
        try {
            // Make a backend API call to filter recipes by name
            let url = `http://127.0.0.1:8000/recipe/?name=${filterName}&format=json`
            let filters = ''
            if (filterName.trim() !== ""){
                filters = filters + `name=${filterName}`
            }
            if(filterDifficulty !== ""){
               filters = filters + `&difficulty=${filterDifficulty}`
            }
            if(filterIngredients !== ""){
                filters = filters + `&ingredients=${filterIngredients}`
            }
            if(filterTime !== ""){
                filters = filters + `&time=${filterTime}`
            }
            if(filterNbPeople !== ""){
                filters = filters + `&number_people=${filterNbPeople}`
            }
            if(filterTypeRecipe !== ""){
                filters = filters + `&type_recipe=${filterTypeRecipe}`
            }
            if(filterPriceMin !== ""){
                filters = filters + `&estimated_price_min=${filterPriceMin}`
            }
            if(filterPriceMax !== ""){
                filters = filters + `&estimated_price_max=${filterPriceMax}`
            }
            if(filterCalMin !== ""){
                filters = filters + `&total_calories_min=${filterCalMin}`
            }
            if(filterCalMax !== ""){
                filters = filters + `&total_calories_max=${filterCalMax}`
            }
            url = `http://127.0.0.1:8000/recipe/?${filters}&format=json`
            console.log(url)
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // You may need to include additional headers, such as authentication headers, if required by your backend
                },
            });

            if (!response.ok) {
                throw new Error(`Error filtering recipes: ${response.statusText}`);
            }

            const data = await response.json();
            setRecipes(data);
        } catch (error) {
            console.error("Error filtering recipes:", error);
        }
    };


    return (
        <div>
            <div style={{marginBottom: '10px'}}>
                <button style={{ marginRight: "10px" }} onClick={handleFilterClickName}>Filter by Name</button>

                {showFilterModalName && (
                    <div className="filter-modal">
                        <p> Name: <input
                            type="text"
                            placeholder=""
                            value={filterName}
                            onChange={(e) => setFilterName(e.target.value)}
                        /></p>
                        <p> Difficulty: <input
                            type="text"
                            placeholder=" Between 1 and 5"
                            value={filterDifficulty}
                            onChange={(e) => setFilterDifficulty(e.target.value)}
                        /></p>
                        <p>Ingredient: <input
                            type="text"
                            placeholder=""
                            value={filterIngredients}
                            onChange={(e) => setFilterIngredients(e.target.value)}
                        />
                        </p>
                        <p>Time: <input
                        type="text"
                        placeholder=""
                        value={filterTime}
                        onChange={(e) => setFilterTime(e.target.value)}
                        />
                        </p>
                        <p>Number of people: <input
                            type="text"
                            placeholder=""
                            value={filterNbPeople}
                            onChange={(e) => setFilterNbPeople(e.target.value)}
                        />
                        </p>
                        <p>Type of recipe:  <select
                                id="typeRecipeDropdown"
                                value={filterTypeRecipe}
                                onChange={(e) => setFilterTypeRecipe(e.target.value)}
                            >
                                <option value="">Select an option:</option>
                                <option value="breakfast">Breakfast</option>
                                <option value="lunch">Lunch</option>
                                <option value="dinner">Dinner</option>
                                <option value="dessert">Dessert</option>
                                <option value="snack">Snack</option>
                            </select>
                        </p>
                        <p>Price: <input
                            type="text"
                            placeholder=" Minimum"
                            value={filterPriceMin}
                            onChange={(e) => setFilterPriceMin(e.target.value)}
                            style={{ marginRight: '10px' }}
                        />
                            <input
                                type="text"
                                placeholder=" Maximum"
                                value={filterPriceMax}
                                onChange={(e) => setFilterPriceMax(e.target.value)}
                            />

                        </p>
                        <p>Calories: <input
                            type="text"
                            placeholder=" Minimum "
                            value={filterCalMin}
                            onChange={(e) => setFilterCalMin(e.target.value)}
                            style={{ marginRight: '10px' }}
                        />
                            <input
                                type="text"
                                placeholder=" Maximum "
                                value={filterCalMax}
                                onChange={(e) => setFilterCalMax(e.target.value)}
                            />

                        </p>

                    </div>
                )}

                <p></p>
                {isAnyFilterModalOpen && (
                    <button onClick={handleFilterSubmit}>Submit Filters</button>
                )}
            </div>
            {/* Add a Link to the new form component */}
            <Link to="showlist/add-recipe">
                <button>Add New Recipe</button>
            </Link>
            {/*  the empty ones le am pus sa vad cum le pune daca una sub alta sau langa*/}
            <h2>Recipe List</h2>
            <table className="recipe-table">
                <thead>
                <tr>
                {/* <th>ID</th> */}
                    <th>Difficulty</th>
                    <th>Name</th>
                    <th>Description</th>
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
                            <td>{recipe.description}</td>
                            <td>
                                {recipe.time_min} - {recipe.time_max}
                            </td>
                            <td>{recipe.number_people}</td>
                            <td>{recipe.type_recipe}</td>
                            <td>{recipe.estimated_price}</td>
                            <td>{recipe.total_calories}</td>
                            <td>
                                {/* <Link to={`/delete-recipe`}> */}
                                <button
                                    onClick={() => {
                                        setSelectedRecipeId(recipe.id!);
                                        setDeleteOrUpdate(0);
                                    }}
                                >
                                    DELETE
                                </button>
                                {/* </Link> */}
                            </td>
                            <td>
                                <button
                                    onClick={() => {
                                        setSelectedRecipeId(recipe.id!);
                                        setDeleteOrUpdate(1);
                                    }}
                                >
                                    UPDATE
                                </button>
                            </td>
                            {selectedRecipeId === recipe.id &&
                                deleteOrUpdate === 0 && (
                                    <DeleteRecipe recipeId={recipe.id} />
                                )}
                            {selectedRecipeId === recipe.id &&
                                deleteOrUpdate === 1 && (
                                    <UpdateRecipeForm recipeId={recipe.id} />
                                )}
                        </tr>
                    ))}
                </tbody>
            </table>

            <Routes>
                <Route path="showlist/add-recipe" Component={AddRecipeForm} />
            </Routes>
        </div>
    );
};

export default RecipeList;
