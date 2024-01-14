import { useState } from "react";
import { getAuthToken } from "../../util/auth";
import RecipeDetailsForm from "./recipeDetailsForm";

const DeleteRecipe = (props: { recipeToDelete: any }) => {
    const [shouldShow, setShouldShow] = useState<number>(1);

    const handleDelete = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        console.log(" about to delete this");
        console.log(props.recipeToDelete.id);
        // const [shouldShow, setShouldShow] = useState<number>(1);

        fetch(`http://127.0.0.1:8000/recipe/${props.recipeToDelete.id}`, {
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + getAuthToken(),
            },
        })
            .then((response) => {
                response.json();
                console.log(response);
            })
            .then((data) => {
                console.log(data);
            });
        setTimeout(() => {
            window.location.href = `/showlist/`;
            //setShouldShow(0);
        }, 500);
    };

    const handleCancel = () => {
        window.location.href = `/showlist/`;
        //setShouldShow(0);
        // <RecipeDetailsForm recipeDetail={props.recipeToDelete} />;
    };

    if (shouldShow == 1) {
        return (
            <div id="dialog-content">
                <p>Are you sure you want to delete this item?</p>
                <div id="buttons-container">
                    <button onClick={handleDelete}>Yes</button>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            </div>
        );
    } else {
        return;
    }
};

export default DeleteRecipe;
