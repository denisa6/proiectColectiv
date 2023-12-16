const DeleteRecipe = (props: { recipeId: any }) => {
    const handleDelete = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        console.log(" about to delete this");
        console.log(props.recipeId);

        fetch(`http://127.0.0.1:8000/recipe/${props.recipeId}`, {
            method: "DELETE",
        })
            .then((response) => {
                response.json();
                console.log(response);
            })
            .then((data) => {
                console.log(data);
            });
        setTimeout(() => {
            window.location.href = `/`;
        }, 500);
    };

    const handleCancel = () => {
        window.location.href = `/showlist/`;
    };

    return (
        // <dialog ref={modalRef} className="modal">
        <div id="dialog-content">
            <p>Are you sure you want to delete this item?</p>
            <div id="buttons-container">
                <button onClick={handleDelete}>Yes</button>
                <button onClick={handleCancel}>Cancel</button>
            </div>
        </div>
        // </dialog>
        // nu  stiu de ce nu pot sa l fac dialog
    );
};

export default DeleteRecipe;
