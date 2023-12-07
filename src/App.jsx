import './App.css';
import Comments from './Components/Comments.jsx';
import CommentEditor from './Components/CommentEditor';
import Data from './data.json';
import DeleteCard from './Components/DeleteCard';

import { useState, useReducer, useEffect } from 'react';

import { produce } from 'immer';
import { comment } from 'postcss';

function App() {
    const [commentbase, dispatch] = useReducer(commentReducer, Data);
    const [lastId, setLastId] = useState(4); //to keep track of last assigned ids and reference it in setting the next comments id
    const [showDeleteCard, setShowDeleteCard]= useState(false); //to manage the visibility of the delete card.
    const [replyEditorVisibility, setReplyEditorVisibility] = useState(false); //to manage the visibility of the reply editor.
    const [commentToDlt, setCommentToDlt] = useState(); //to retrieve comment idea from event points

    //To togggle delete card's visiilty - takes true or false
    const handleDeleteCard = (visibility, id) => {
        setShowDeleteCard(visibility);
        setCommentToDlt(id);
    }

    //To toggle reply card's visibility - takes true or false
    const handleReplyEditor = (visibility) => {
        setReplyEditorVisibility(visibility);
    }

    //Takes content, generates necessary data on call and dispathes a "SEND_COMMENT" with payload to the commentReducer
    const handleSendComment = (content) => {
        let commentId=lastId+1;
        setLastId(commentId);
        
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
        let commentId=lastId+1;
        setLastId(commentId);
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


    const handleUpdateComment = () => {
        dispatch({
            type: "UPDATE_COMMENT",
            comment: content
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
        <div>
            {showDeleteCard && <DeleteCard commentToDlt={commentToDlt} handleDeleteCard={handleDeleteCard} handleDeleteComment={handleDeleteComment}/>}
            <Comments comments={commentbase.comments} currentUser={commentbase.currentUser} onRate={handleRating} handleDeleteCard={handleDeleteCard} onReply={handleReplyComment} replyEditor={replyEditorVisibility} handleReplyEditor={handleReplyEditor}/>
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

const commentReducer = produce((draft, action)=>{
    //console.log(draft.comments);
    switch(action.type) {
        case "SEND_COMMENT": {
            draft.comments.push(action.payload);
            break;
        }
        case "RATE_COMMENT": {
            const ratedComment = findComment(draft.comments, action.payload.id, "replies") || 0;
            ratedComment && (ratedComment.score = action.payload.score);
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
                console.log(updatedBase[2]);
                return updatedBase;
            }
            
            draft.comments = updateBase(draft.comments, action.payload.id, "replies");
            break;
        }
        case "REPLY_COMMENT": {
            const repliedComment = findComment(draft.comments, action.payload.parentId, "replies");
            //console.log(action.payload.parentId);
            repliedComment && repliedComment.replies.push(action.payload);
            break;
        }
        default: {
            draft
        }
    }
})


export default App;