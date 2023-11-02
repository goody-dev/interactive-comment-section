import './Comment.css';
import Rating from './Rating';
import Reply from './Reply.jsx';
import Delete from './Delete.jsx';
import Edit from './Edit.jsx';
import Timestamp from 'react-timestamp';


const Comment = ({currentUser, id, username, content, createdAt, rating, img, onRate}) => {
    return(
        <>
        <div className="md:hidden bg-white mx-auto max-w-[90%] sm:max-w-[80%] space-y-3 shadow-lg flex flex-col m-5 rounded p-5">
                <div className='flex w-fit space-x-4 content-center items-center'>
                    <img src={img} className='h-6' alt="User Avatar" />
                    <p className="text-dark-blue">{username}</p>
                    {currentUser === username && <YouTag/>}
                    <p className="text-grayish-blue"><Timestamp relative date={createdAt}  autoUpdate/></p>
                </div>
                <div className=''>
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
            <div className="hidden md:flex md:flex-row bg-white mx-auto max-w-[90%] md:max-w-lg md:align-top md:space-x-4 shadow-lg m-5 rounded p-5">
                <div className='md:block w-fit space-x-4'>
                    <Rating rating={rating} onRate={onRate} id={id}/>
                </div>
                <div className='flex flex-col space-y-3'>
                    <div className='flex flex-row justify-between items-center'>
                        <div className='flex w-fit space-x-3 content-center items-center'>
                            <img src={img} className='h-6' alt="User Avatar" />
                            <p className="text-dark-blue">{username}</p>
                            {currentUser === username && <YouTag/>}
                            <p className="text-grayish-blue">{createdAt}</p>
                        </div>
                        {currentUser !== username?
                        <Reply />:
                        <div className='flex flex-row justify-center items-center'>
                            <Delete/>
                            <Edit />
                        </div>}
                    </div>
                    <div>
                        <p className='text-grayish-blue'>{content}</p>
                    </div>
                </div>
            </div> 
        </>           
    )
}
const YouTag = () => {
    return (
        <button className='text-xs rounded bg-moderate-blue px-2 py-[0.7px] text-white'>
            you
        </button>
    )
}

export default Comment;