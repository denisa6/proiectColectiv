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
    //const [showComponent, setShowComponent] = useState(false);

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

    return (
        <div>
            {/* Add a Link to the new form component */}
            <Link to="/add-recipe">
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
							{selectedRecipeId === recipe.id && deleteOrUpdate === 0 && (
                                <DeleteRecipe recipeId={recipe.id} />
                            )}
							{selectedRecipeId === recipe.id && deleteOrUpdate === 1 && (
                                <UpdateRecipeForm recipeId={recipe.id} />
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>

            <Routes>
                <Route path="/add-recipe" Component={AddRecipeForm} />
                {/* <Route path={`/delete-recipe/`} Component={DeleteRecipe} /> */}
            </Routes>
			
        </div>
    );
};

export default RecipeList;
