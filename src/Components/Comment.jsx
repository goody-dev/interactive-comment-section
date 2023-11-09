import './Comment.css';
import Rating from './Rating';
import ReplyButton from './ReplyButton.jsx';
import DeleteButton from './DeleteButton.jsx';
import EditButton from './EditButton.jsx';
import Timestamp from 'react-timestamp';

import Reply from './Reply.jsx'


const Comment = ({currentUser, id, username, content, createdAt, rating, img, onRate, replies}) => {
    return(
        <div className='w-100 mx-auto'>
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
                    <ReplyButton />:
                    <div className='flex flex-row justify-center items-center'>
                        <DeleteButton />
                        <EditButton />
                    </div>}
                </div>
            </div>
            <div className="hidden md:flex md:flex-row bg-white mx-auto max-w-[90%] md:max-w-xl md:align-top md:space-x-4 shadow-lg m-5 rounded p-5">
                <div className='md:block w-fit space-x-4'>
                    <Rating rating={rating} onRate={onRate} id={id}/>
                </div>
                <div className='flex flex-col space-y-3'>
                    <div className='flex flex-row justify-between items-center'>
                        <div className='flex w-fit space-x-3 content-center items-center'>
                            <img src={img} className='h-6' alt="User Avatar" />
                            <p className="text-dark-blue">{username}</p>
                            {currentUser === username && <YouTag/>}
                            <p className="text-grayish-blue"><Timestamp relative date={createdAt}  autoUpdate/></p>
                        </div>
                        {currentUser !== username?
                        <ReplyButton />:
                        <div className='flex flex-row justify-center items-center'>
                            <DeleteButton/>
                            <EditButton />
                        </div>}
                    </div>
                    <div>
                        <p className='text-grayish-blue'>{content}</p>
                    </div>
                </div>
            </div>
            {replies[0] && //Refrencing the index to check if comment has any replies
            <div className="flex flex-row h-auto mx-auto max-w-[90%] sm:max-w-[80%] md:max-w-xl">
                <div className="w-2 md:w-1 block me-5 sm:mx-7 md:mx-8 h-auto bg-light-gray"></div>
                <div className="flex flex-col gap-5">
                    {replies.map((reply, id) => <Reply key={id} id={reply.id} username={reply.user.username} content={reply.content} createdAt={reply.createdAt} rating={reply.score} img={reply.user.image.webp} replies={reply.replies} currentUser={currentUser} onRate={onRate}/>)}
                </div>
            </div>}
            
        </div>           
    )
}
const YouTag = () => {
    return (
        <button className='text-xs rounded bg-moderate-blue px-2 py-[0.7px] text-white'>
            you
        </button>
    )
}

/*const Reply = ({...props}) => {
    return (
        <>
        <div className="md:hidden bg-white mx-auto max-w-[90%] sm:max-w-[80%] space-y-3 shadow-lg flex flex-col m-5 rounded p-5">
                <div className='flex w-fit space-x-4 content-center items-center'>
                    <img src={props.img} className='h-6' alt="User Avatar" />
                    <p className="text-dark-blue">{props.username}</p>
                    {props.currentUser === props.username && <YouTag/>}
                    <p className="text-grayish-blue"><Timestamp relative date={props.createdAt}  autoUpdate/></p>
                </div>
                <div className=''>
                    <p className='text-grayish-blue'>{props.content}</p>
                </div>
                <div className='flex flex-row justify-between items-center'>
                    <Rating rating={props.rating} onRate={props.onRate} id={props.id}/>
                    {props.currentUser !== props.username?
                    <ReplyButton />:
                    <div className='flex flex-row justify-center items-center'>
                        <DeleteButton/>
                        <EditButton />
                    </div>}
                </div>
            </div>
            <div className="hidden md:flex md:flex-row bg-white mx-auto max-w-[90%] md:max-w-xl  md:align-top md:space-x-4 shadow-lg m-5 rounded p-5">
                <div className='md:block w-fit space-x-4'>
                    <Rating rating={props.rating} onRate={props.onRate} id={props.id}/>
                </div>
                <div className='flex flex-col space-y-3'>
                    <div className='flex flex-row justify-between items-center'>
                        <div className='flex w-fit space-x-3 content-center items-center'>
                            <img src={props.img} className='h-6' alt="User Avatar" />
                            <p className="text-dark-blue">{props.username}</p>
                            {props.currentUser === props.username && <YouTag/>}
                            <p className="text-grayish-blue"><Timestamp relative date={props.createdAt}  autoUpdate/></p>
                        </div>
                        {props.currentUser !== props.username?
                        <ReplyButton />:
                        <div className='flex flex-row justify-center items-center'>
                            <DeleteButton/>
                            <EditButton />
                        </div>}
                    </div>
                    <div>
                        <p className='text-grayish-blue'>{props.content}</p>
                    </div>
                </div>
            </div>
        </>
    )
}*/

export default Comment;