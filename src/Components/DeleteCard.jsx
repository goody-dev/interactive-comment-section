const DeleteCard = () => {
    return(
        <div>
            <h1>Delete Comment</h1>
            <p>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
            <div>
                <button>NO, CANCEL</button>
                <button>YES, DELETE</button>
            </div>
        </div>
    )
}

export default DeleteCard;