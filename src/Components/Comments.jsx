import Rating from './Rating.jsx';
import ReplyButton from './ReplyButton.jsx';
import DeleteButton from './DeleteButton.jsx';
import EditButton from './EditButton.jsx';
import Timestamp from 'react-timestamp';
import YouTag from './YouTag.jsx';

import ReplyEditor from './ReplyEditor.jsx';
import EditEditor from './EditEditor.jsx';

import {React, useState} from 'react';


const Comments = ({comments, currentUser, focusCommentId, handleRating, handleDeleteCard, handleReplyComment, replyEditorVisibility, handleReplyEditor, handleEditEditor, editMode, handleUpdateComment}) => {
    /*let tagRegex = /[@]{1}[a-z]+/;
    let comment = document.getElementsByClassName("content");
    for(const i in comment) {
        console.log(comment[i].innerHTML);
        comment[i].innerHTML.replace(tagRegex||0, "replaced")
    }*/
    //let tagRegex = /[@]{1}[a-z]+/g;
    //let match = comment.match(tagRegex);
    //comment = comment.replace(tagRegex, <span>"@maxblagun"</span>);

  return (
    <div className='flex flex-col gap-3 z-0'>
        {comments.map((comment, id) => 
        <div key={comment.id} className='flex flex-col' style={{gap:(comment.replies && comment.replies[0] || replyEditorVisibility === true && focusCommentId === comment.id)? "0.75rem": 0}} >
            <div className="sm:hidden bg-white mx-auto w-[100%] max-w-[90vw] shadow-lg flex flex-col m-auto rounded p-5 gap-y-3">
                <div className='flex w-fit space-x-4 content-center items-center'>
                    <img src={comment.user.image.webp} className='h-6' alt="User Avatar" />
                    <p className="text-dark-blue">{comment.user.username}</p>
                    {currentUser.username === comment.user.username && <YouTag/>}
                    <p className="text-grayish-blue"><Timestamp relative date={comment.createdAt} autoUpdate/></p>
                </div>
                <div className=''>
                    {editMode === true && comment.id === focusCommentId? <EditEditor onUpdate={handleUpdateComment} comment={comment.content} handleEditEditor={handleEditEditor} commentId={comment.id} />: <p className='content text-grayish-blue'>{/*comment.replyingTo && <span>@{comment.replyingTo},</span>*/} {comment.content}</p>}
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
            <div className="hidden sm:flex sm:flex-row bg-white mx-auto w-[100%] max-w-[90vw] sm:max-w-xl sm:align-top sm:space-x-4 shadow-lg m-auto rounded p-5 gap-y-5">
                <div className='sm:block w-fit space-x-4'>
                    <Rating rating={comment.score} onRate={handleRating} id={comment.id}/>
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
                            <EditButton onClickEdit={handleEditEditor} id={comment.id} />
                        </div>}
                    </div>
                    <div>
                    {editMode === true && comment.id === focusCommentId? <EditEditor onUpdate={handleUpdateComment} comment={comment.content} handleEditEditor={handleEditEditor} commentId={comment.id} replyingTo={comment.replyingTo}/>: <p className='content text-grayish-blue'>{/*comment.replyingTo && <span>@{comment.replyingTo},</span>*/} {comment.content}</p>}
                    </div>
                </div>
            </div>
            {(replyEditorVisibility === true && focusCommentId === comment.id) && <ReplyEditor key={comment.id} replyingTo={comment.user.username} parentId={comment.id} user={currentUser} onReply={handleReplyComment} handleReplyEditor={handleReplyEditor}/>}
            {comment.replies.length !== 0 && //Refrencing the index to check if comment has any replies
            <div className="flex flex-row h-auto mx-auto max-w-[90vw] sm:max-w-[80vw] md:max-w-xl">
                <div className="w-2 md:w-1 block space-y-5 me-5 sm:mx-7 md:mx-8 h-auto bg-light-gray"></div>
                <Comments comments={comment.replies} currentUser={currentUser} focusCommentId={focusCommentId} handleRating={handleRating} handleDeleteCard={handleDeleteCard} handleReplyComment={handleReplyComment} handleReplyEditor={handleReplyEditor} replyEditorVisibility={replyEditorVisibility} handleEditEditor={handleEditEditor} editMode={editMode} handleUpdateComment={handleUpdateComment}/> 
            </div>}
        </div>
        )}
    </div>
  )
}

export default Comments;
