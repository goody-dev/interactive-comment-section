import Rating from './Rating.jsx';
import ReplyButton from './ReplyButton.jsx';
import DeleteButton from './DeleteButton.jsx';
import EditButton from './EditButton.jsx';
import Timestamp from 'react-timestamp';
import YouTag from './YouTag.jsx';

import ReplyEditor from './ReplyEditor.jsx';

import {React, useState} from 'react';

const Comments = ({comments, currentUser, onRate, handleDeleteCard, onReply}) => {
    const [replyEditorVisibility, setReplyEditorVisibility] = useState(false); //to manage the visibility of the reply editor.
    const [focusCommentId, setFocusCommentId] = useState(null);
    const handleReplyEditor = (visibility, id) => {
        setReplyEditorVisibility(visibility);
        setFocusCommentId(id);
    }
  return (
    <div className='flex flex-col gap-3 z-0'>
        {comments.map((comment, id) => 
        <div key={comment.id} className='flex flex-col' style={{gap:(comment.replies && comment.replies[0])? "0.75rem": 0}} >
            <div className="md:hidden bg-white mx-auto w-[100%] max-w-[90vw] sm:max-w-[80%] shadow-lg flex flex-col m-auto rounded p-5 gap-y-3">
                <div className='flex w-fit space-x-4 content-center items-center'>
                    <img src={comment.user.image.webp} className='h-6' alt="User Avatar" />
                    <p className="text-dark-blue">{comment.user.username}</p>
                    {currentUser.username === comment.user.username && <YouTag/>}
                    <p className="text-grayish-blue"><Timestamp relative date={comment.createdAt}  autoUpdate/></p>
                </div>
                <div className=''>
                    <p className='text-grayish-blue'>{comment.content}</p>
                </div>
                <div className='flex flex-row justify-between items-center'>
                    <Rating rating={comment.score} onRate={onRate} id={comment.id}/>
                    {currentUser.username !== comment.user.username?
                    <ReplyButton onClickReply={handleReplyEditor} id={comment.id}/>:
                    <div className='flex flex-row justify-center items-center'>
                        <DeleteButton id={comment.id} onDelete={(visibility, id)=>handleDeleteCard(visibility, id)}/>
                        <EditButton/>
                    </div>}
                </div>
            </div>
            <div className="hidden md:flex md:flex-row bg-white mx-auto w-[100%] max-w-[90vw] md:max-w-xl md:align-top md:space-x-4 shadow-lg m-auto rounded p-5 gap-y-5">
                <div className='md:block w-fit space-x-4'>
                    <Rating rating={comment.score} onRate={onRate} id={comment.id}/>
                </div>
                <div className='flex flex-col space-y-3 w-[100%]'>
                    <div className='flex flex-row justify-between items-center'>
                        <div className='flex w-fit space-x-3 content-center items-center'>
                            <img src={comment.user.image.webp} className='h-6' alt="User Avatar" />
                            <p className="text-dark-blue">{comment.user.username}</p>
                            {currentUser.username === comment.user.username && <YouTag/>}
                            <p className="text-grayish-blue"><Timestamp relative date={comment.createdAt}  autoUpdate/></p>
                        </div>
                        {currentUser.username !== comment.user.username?
                        <ReplyButton onClickReply={handleReplyEditor} id={comment.id}/>:
                        <div className='flex flex-row justify-center items-center'>
                            <DeleteButton id={comment.id} onDelete={(visibility, id)=>handleDeleteCard(visibility, id)}/>
                            <EditButton/>
                        </div>}
                    </div>
                    <div>
                        <p className='text-grayish-blue'>{comment.content}</p>
                    </div>
                </div>
            </div>
            {(replyEditorVisibility === true && focusCommentId === comment.id) && <ReplyEditor key={comment.id} replyingTo={comment.user.username} parId={comment.id} user={currentUser} onReply={onReply} handleReplyEditor={handleReplyEditor}/>}
            {comment.replies.length !== 0 && //Refrencing the index to check if comment has any replies
            <div className="flex flex-row h-auto mx-auto max-w-[90vw] sm:max-w-[80vw] md:max-w-xl">
                <div className="w-2 md:w-1 block space-y-5 me-5 sm:mx-7 md:mx-8 h-auto bg-light-gray"></div>
                <Comments comments={comment.replies} currentUser={currentUser} onRate={onRate} handleDeleteCard={handleDeleteCard} onReply={onReply} /> 
            </div>}
        </div>
        )}
    </div>
  )
}

export default Comments;
