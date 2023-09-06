import './Comment.css';
import Rating from './Rating';

const Comment = ({currentUser, id, username, content, createdAt, rating, img}) => {
    return(
        <div className="bg-white mx-auto max-w-md space-y-3 shadow-lg flex flex-col m-5 rounded p-5">
            <div className='flex w-fit space-x-4 content-center'>
                <img src={"../assets"+img} />
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

export default Comment;