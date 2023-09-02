import './Comment.css';

const Comment = ({id, username, content, createdAt, rating}) => {
    return(
        <div className="bg-white mx-5 md:mx-auto max-w-md space-y-3 shadow-lg flex flex-col m-5 rounded p-5">
            <div className='flex w-fit space-x-4 content-center'>
                <img src="${data.user.image.png}" />
                <p>{username}</p>
                <p>{createdAt}</p>
            </div>
            <div>
                <p>{content}</p>
            </div>
            <div className='flex justify-between content-center'>
                <Rating rating={rating}/>
                <a src=''>Reply</a>
            </div>
        </div>
    )
}

const Rating = ({rating}) => {
    return (
        <div className='flex bg-light-gray rounded p-1 h-fit space-x-3'>
            <button>+</button>
            <p>{rating}</p>
            <button>-</button>
        </div>
    )
}

export default Comment;