import Rating from './Rating.jsx';
import ReplyButton from './ReplyButton.jsx';
import DeleteButton from './DeleteButton.jsx';
import EditButton from './EditButton.jsx';
import Timestamp from 'react-timestamp';
import YouTag from './YouTag.jsx';

import ReplyEditor from './ReplyEditor.jsx';
import EditEditor from './EditEditor.jsx';

import {Children, React, useState} from 'react';


const Comments = ({comments, currentUser, focusCommentId, handleRating, handleDeleteCard, handleReplyComment, replyEditorVisibility, handleReplyEditor, handleEditEditor, editMode, handleUpdateComment}) => {
  useState(()=> {
    /*The below code breaks outside of use state with Error:Cannot assign to read only property '0' of object '[object Array]'
    at Array.sort*/
      if(comments[0].hasOwnProperty("replyingTo")) {
        //Order nested replies by id to demo order by time commented - (id is assigned in order of entry, lower ids preceed higher ids)
        comments.sort((reply, nextReply)=> nextReply.id-reply.id);
      } else {
        //Orders first level comments by score-(higher scores preceed lower scores)
        comments.sort((comment, nextComment)=> nextComment.score-comment.score);
      } 
  }, [comments]) //sorts comments when there are changes in comments

  return (
    <div className='flex flex-col gap-3 w-fit sm:w-[70vw] mx-auto' style={{paddingTop:!comments[0].replyingTo && "1.25rem"}}> 
        {comments.map((comment, id) => 
        <div key={comment.id} className='flex flex-col w-[100%]' style={{gap:(comment.replies && comment.replies[0] || replyEditorVisibility === true && focusCommentId === comment.id)? "0.75rem": 0}} >
            <div className="sm:hidden bg-white mx-auto min-w-[100%] max-w-[90vw] shadow-lg flex flex-col m-auto rounded p-5 gap-y-3">
                <div className='flex w-fit space-x-4 content-center items-center'>
                    <img src={comment.user.image.webp} className='h-6' alt="User Avatar" />
                    <p className="text-dark-blue font-[500]">{comment.user.username}</p>
                    {currentUser.username === comment.user.username && <YouTag/>}
                    <p className="text-grayish-blue font-[400]"><Timestamp relative date={comment.createdAt} autoUpdate/></p>
                </div>
                <div>
                    {editMode === true && comment.id === focusCommentId? <EditEditor onUpdate={handleUpdateComment} comment={comment.content} handleEditEditor={handleEditEditor} commentId={comment.id} replyingTo={comment.replyingTo}/>: <p className='content text-grayish-blue break-words font-[400]'>{comment.replyingTo && <span className="text-moderate-blue font-[500]">@{comment.replyingTo}</span>}{comment.content}</p>}
                </div>
                <div className='flex flex-row justify-between items-center'>
                    <Rating rating={comment.score} onRate={handleRating} id={comment.id}/>
                    {currentUser.username !== comment.user.username?
                    <ReplyButton onClickReply={handleReplyEditor} id={comment.id}/>:
                    <div className='flex flex-row justify-center items-center'>
                        <DeleteButton id={comment.id} onDelete={(visibility, id)=>handleDeleteCard(visibility, id)}/>
                        <EditButton onClickEdit={handleEditEditor} id={comment.id} />
                    </div>}
                </div>
            </div>
            <div className="hidden sm:flex bg-white sm:flex-row mx-auto sm:max-w-xl sm:w-[100%] sm:align-top sm:space-x-4 shadow-lg rounded p-5 gap-y-5" style={{gap:(comment.replies && comment.replies[0] || replyEditorVisibility === true && focusCommentId === comment.id)? "0.75rem": 0}}>
                <div className='sm:block w-fit space-x-4'>
                    <Rating rating={comment.score} onRate={handleRating} id={comment.id}/>
                </div>
                <div className='flex flex-col space-y-3 w-[100%]'>
                    <div className='flex flex-row justify-between items-center'>
                        <div className='flex w-fit space-x-3 content-center items-center'>
                            <img src={comment.user.image.webp} className='h-6' alt="User Avatar" />
                            <p className="text-dark-blue font-[500]">{comment.user.username}</p>
                            {currentUser.username === comment.user.username && <YouTag/>}
                            <p className="text-grayish-blue font-[400]"><Timestamp relative date={comment.createdAt}  autoUpdate/></p>
                        </div>
                        {currentUser.username !== comment.user.username?
                        <ReplyButton onClickReply={handleReplyEditor} id={comment.id}/>:
                        <div className='flex flex-row justify-center items-center'>
                            <DeleteButton id={comment.id} onDelete={(visibility, id)=>handleDeleteCard(visibility, id)}/>
                            <EditButton onClickEdit={handleEditEditor} id={comment.id} />
                        </div>}
                    </div>
                    <div>
                    {editMode === true && comment.id === focusCommentId? <EditEditor onUpdate={handleUpdateComment} comment={comment.content} handleEditEditor={handleEditEditor} commentId={comment.id} replyingTo={comment.replyingTo}/>: <p className='content text-grayish-blue break-words font-[400]'>{comment.replyingTo && <span className="text-moderate-blue font-[500]">@{comment.replyingTo}</span>}{comment.content}</p>}
                    </div>
                </div>
            </div>
            <div> 
                {(replyEditorVisibility === true && focusCommentId === comment.id) && <ReplyEditor key={comment.id} replyingTo={comment.user.username} parentId={comment.id} user={currentUser} onReply={handleReplyComment} handleReplyEditor={handleReplyEditor}/>}
            </div>
            {comment.replies.length !== 0 && //Refrencing the index to check if comment has any replies
            <div className="flex flex-row h-auto mx-auto max-w-[90vw] sm:w-[100%] md:max-w-xl">
                <div className="w-2 md:w-1 block space-y-5 me-5 sm:mx-7 md:mx-8 h-auto bg-light-gray"></div>
                <Comments comments={comment.replies} currentUser={currentUser} focusCommentId={focusCommentId} handleRating={handleRating} handleDeleteCard={handleDeleteCard} handleReplyComment={handleReplyComment} handleReplyEditor={handleReplyEditor} replyEditorVisibility={replyEditorVisibility} handleEditEditor={handleEditEditor} editMode={editMode} handleUpdateComment={handleUpdateComment}/> 
            </div>}
        </div>
        )}
    </div>
  )
}

export default Comments;
