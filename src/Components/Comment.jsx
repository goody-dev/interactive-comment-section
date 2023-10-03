import './Comment.css';
import Rating from './Rating';
import ReplyIcon from '../assets/images/icon-reply.svg';
import DeleteIcon from '../assets/images/icon-delete.svg';
import EditIcon from '../assets/images/icon-edit.svg';


const Comment = ({currentUser, id, username, content, createdAt, rating, img}) => {
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
                <Rating rating={rating}/>
                {currentUser !== username?
                <ReplyButton />:
                <div className='flex flex-row justify-center items-center'>
                    <DeleteButton/>
                    <EditButton />
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
const ReplyButton = () => {
    return (
        <button className='flex flex-row justify-center items-center'>
            <img src={ReplyIcon} />
            <p className='ms-1 text-moderate-blue bg-white'>Reply</p>
        </button>
    )
}
const DeleteButton = () => {
    return (
        <button className='flex flex-row justify-center items-center'>
            <img src={DeleteIcon} />
            <p className='ms-1 text-moderate-blue bg-white'>Delete</p>
        </button>
    )
}
const EditButton = () => {
    return (
        <button className='flex flex-row justify-center items-center ms-3'>
            <img src={EditIcon} />
            <p className='ms-1 text-moderate-blue bg-white'>Edit</p>
        </button>
    )
}

export default Comment;