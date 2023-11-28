const DeleteCard = ({handleDeleteCard}) => {
    return(
        <div className="m-0 p-0 h-[100vh] fixed flex justify-center bg-grayish-blue w-[100vw] bg-opacity-70 z-50">
        <div className="p-5 rounded-lg bg-white shadow-lg w-[90%] m-auto sm:max-w-[375px] space-y-2">
            <h1 className="">Delete Comment</h1>
            <p className="text-sm">Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
            <div className="flex flex-row justify-between">
                <button onClick={handleDeleteCard} className="p-1 bg-grayish-blue rounded-sm text-white">NO, CANCEL</button>
                <button className="p-1 bg-soft-red rounded-sm text-white">YES, DELETE</button>
            </div>
        </div>
        </div>
    )
}

export default DeleteCard;