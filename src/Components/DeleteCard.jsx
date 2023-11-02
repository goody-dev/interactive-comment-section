const DeleteCard = () => {
    return(
        <div className="p-5 rounded-lg bg-white shadow-lg w-[90%] mx-auto max-w-[285px] space-y-2">
            <h1 className="">Delete Comment</h1>
            <p className="text-sm">Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
            <div className="flex flex-row justify-between">
                <button className="p-1 bg-grayish-blue rounded-sm text-white">NO, CANCEL</button>
                <button className="p-1 bg-soft-red rounded-sm text-white">YES, DELETE</button>
            </div>
        </div>
    )
}

export default DeleteCard;