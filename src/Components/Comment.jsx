import './Comment.css';
import Rating from './Rating';
import Reply from './Reply.jsx';
import Delete from './Delete.jsx';
import Edit from './Edit.jsx';


const Comment = ({currentUser, id, username, content, createdAt, rating, img, onRate}) => {
    return(
        <div className="bg-white mx-auto max-w-[80%] md:max-w-md space-y-3 shadow-lg flex flex-col m-5 rounded p-5">
            <div className='flex w-fit space-x-4 content-center items-center'>
                <img src={img} className='h-6' alt="User Avatar" />
                <p className="text-dark-blue">{username}</p>
                {currentUser === username && <YouTag/>}
                <p className="text-grayish-blue">{createdAt}</p>
            </div>
            <div>
                <p className='text-grayish-blue'>{content}</p>
            </div>
            <div className='flex flex-row justify-between items-center'>
                <Rating rating={rating} onRate={onRate} id={id}/>
                {currentUser !== username?
                <Reply />:
                <div className='flex flex-row justify-center items-center'>
                    <Delete/>
                    <Edit />
                </div>}
            </div>
        </div>
    )
}
const YouTag = () => {
    return (
        <button className='rounded bg-moderate-blue px-2 text-white'>
            you
        </button>
    )
}

export default Comment;