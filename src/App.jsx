import './App.css';
import Comments from './Components/Comments.jsx';
import CommentEditor from './Components/CommentEditor';
import Data from './data.json';
import DeleteCard from './Components/DeleteCard';

import { useState, useReducer, useEffect } from 'react';

import { produce } from 'immer';
import { comment } from 'postcss';

function App() {
    //localStorage.clear();
    let data = JSON.parse(localStorage.getItem('Data')) || Data;
    const [commentbase, dispatch] = useReducer(commentReducer, data);
    const [lastAssignedId, setLastAssignedId] = useState(4); //to keep track of last assigned ids and reference it in setting the next comments id
    const [showDeleteCard, setShowDeleteCard]= useState(false); //to manage the visibility of the delete card.
    const [replyEditorVisibility, setReplyEditorVisibility] = useState(false); //to manage the visibility of the reply editor.
    const [focusCommentId, setFocusCommentId] = useState(null); //to retrieve comment id from event points amd feed to ACTIONS.
    const [editMode, setEditMode] = useState(false);

    const handleReplyEditor = (visibility, id) => {
        setEditMode(false);
        setReplyEditorVisibility(visibility);
        setFocusCommentId(id);
    }

    const handleEditEditor = (status, id) => {
        setReplyEditorVisibility(false);
        setEditMode(status);
        setFocusCommentId(id);
    }

    //To togggle delete card's visiilty - takes true or false
    const handleDeleteCard = (visibility, id) => {
        setShowDeleteCard(visibility);
        setFocusCommentId(id);
    }

    //Takes content, generates necessary data on call and dispathes a "SEND_COMMENT" with payload to the commentReducer
    const handleSendComment = (content) => {
        let commentId=lastAssignedId+1;
        setLastAssignedId(commentId);
        
        dispatch({
            type: "SEND_COMMENT",
            payload: {
                id: commentId,
                content: content,
                createdAt: Date(),
                score: 0,
                user: commentbase.currentUser,
                replies:[]
            }
        })
    }

    //Takes (content, replyingToID, and replyingTo Username), generates necessary data on call and dispathes a "REPLY_COMMENT" with payload to the commentReducer
    const handleReplyComment = (content, parentId, replyingTo) => {
        let commentId=lastAssignedId+1;
        setLastAssignedId(commentId);
        //alert(commentId);
        dispatch({
            type: "REPLY_COMMENT",
            payload: {
                parentId: parentId,
                id: commentId,
                content: content,
                createdAt: Date(),
                score: 0,
                replyingTo: replyingTo,
                user: commentbase.currentUser,
                replies:[]
            }
        })
    }


    const handleUpdateComment = (content, commentId) => {
        dispatch({
            type: "UPDATE_COMMENT",
            payload:{
                id:commentId, 
                content,
                createdAt: Date()
            }
        })
    }

    //Takes id of comment to be deleted and dispathes a "DELETE_COMMENT" and payload to the commentReducer
    const handleDeleteComment = (id) => {
        dispatch({
            type: "DELETE_COMMENT",
            payload: {id}
        })
    }

    //Takes (id of comment to be rated, and it's new score and dispathes a "RATE_COMMENT" and payload to the commentReducer
    const handleRating = (id, score) => {
        //alert(id);
        dispatch({
            type: "RATE_COMMENT",
            payload: {id, score}
        })
    }

    return (
        <div className='font-rubik text-[1rem]'>
            {showDeleteCard && <DeleteCard showDelete={showDeleteCard} focusCommentId={focusCommentId} handleDeleteCard={handleDeleteCard} handleDeleteComment={handleDeleteComment}/>}
            <Comments comments={commentbase.comments} currentUser={commentbase.currentUser} focusCommentId={focusCommentId} handleRating={handleRating} handleDeleteCard={handleDeleteCard} handleReplyComment={handleReplyComment} handleReplyEditor={handleReplyEditor} replyEditorVisibility={replyEditorVisibility} handleEditEditor={handleEditEditor} editMode={editMode} handleUpdateComment={handleUpdateComment} />
            <CommentEditor user={commentbase.currentUser} onSend={handleSendComment} />
        </div>
    )
}

const findComment = (comments, commentId, nestKey) => {
    for(const key in comments) {
        const comment = comments[key];

        if(comment.id === commentId) {
            return comment;
        }
        if(comment[nestKey] && comment[nestKey].length !== 0) {
            const foundReply = findComment(comment[nestKey], commentId, nestKey);
            if(foundReply) {
                return foundReply;
            }
        }
    }
    return null;
}

const findAuthorComment = (comments, commentId, nestKey) => {
    for(const key in comments) {
        const comment = comments[key];

        if(comment.id === commentId) {
            return comment;
        }
        if(comment[nestKey] && comment[nestKey].length !== 0) {
            const foundReply = findComment(comment[nestKey], commentId, nestKey);
            if(foundReply) {
                return comment;
            }
        }
    }
    return null;
}

const commentReducer = produce((draft, action)=>{
    //console.log(draft.comments);
    switch(action.type) {
        case "SEND_COMMENT": {
            draft.comments.push(action.payload);
            localStorage.setItem('Data', JSON.stringify(draft));
            break;
        }
        case "RATE_COMMENT": {
            const ratedComment = findComment(draft.comments, action.payload.id, "replies") || 0;
            ratedComment && (ratedComment.score = action.payload.score);
            localStorage.setItem('Data', JSON.stringify(draft));
            break;
        }
        case "DELETE_COMMENT": {
            const updateBase = (comments, id, nestKey) => {
                let updatedBase = comments;
                let removed = updatedBase.filter((comment)=> comment.id === id);
                
                if(removed.length !== 0) {
                    updatedBase = updatedBase.filter((comment)=>comment.id !== id);
                } else {
                    for(const key in updatedBase) {
                        if(updatedBase[key][nestKey].length !== 0) {
                            updatedBase[key][nestKey] = updateBase(updatedBase[key][nestKey], id, nestKey)
                        }
                    }
                }
                localStorage.setItem('Data', JSON.stringify(draft));
                return updatedBase;
            }
            
            draft.comments = updateBase(draft.comments, action.payload.id, "replies");
            localStorage.setItem('Data', JSON.stringify(draft));
            break;
        }
        case "REPLY_COMMENT": {
            const authorComment = findAuthorComment(draft.comments, action.payload.parentId, "replies");
            authorComment && authorComment.replies.push(action.payload);
            localStorage.setItem('Data', JSON.stringify(draft));
            break;
        }
        case "UPDATE_COMMENT": {
            const commentToUpdate = findComment(draft.comments, action.payload.id, "replies");
            if(commentToUpdate) {
                commentToUpdate.content = action.payload.content;
                commentToUpdate.createdAt = action.payload.createdAt;
                localStorage.setItem('Data', JSON.stringify(draft));
            }
            break;
        }
        default: {
            draft;
            //localStorage.setItem('Data', JSON.stringify(draft));
        }
    }
})


export default App;