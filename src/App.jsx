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
    const [showReplyEditor, setShowReplyEditor] = useState(false); //to manage the visibility of the reply editor.
    const [commentId, setCommentId] = useState(); //to retrieve comment idea from event points

    //To togggle delete card's visiilty - takes true or false
    const handleDeleteCard = (status, id) => {
        setShowDeleteCard(status);
        setCommentId(id);
        //alert(commentId);
    }

    //To toggle reply card's visibility - takes true or false
    const handleReplyEditor = (status) => {
        setShowReplyEditor(status);
    }

    //Takes content, generates necessary data on call and dispathes a "SEND_COMMENT" with payload to the commentReducer
    const handleSendComment = (content) => {
        let commentId=lastId+1;
        setLastId(commentId);
        //alert(commentId);
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
            {showDeleteCard && <DeleteCard commentId={commentId} handleDeleteCard={handleDeleteCard} handleDeleteComment={handleDeleteComment}/>}
            <Comments comments={commentbase.comments} currentUser={commentbase.currentUser} onRate={handleRating} handleDeleteCard={handleDeleteCard} onReply={handleReplyComment} replyEditor={showReplyEditor} handleReplyEditor={handleReplyEditor}/>
            <CommentEditor user={commentbase.currentUser} onSend={handleSendComment} />
        </div>
    )
}

const commentReducer = produce((draft, action)=>{
    switch(action.type) {
        case "SEND_COMMENT": {
            draft.comments.push(action.payload)
        }
        case "RATE_COMMENT": {
            const findComment = (comments, commentId, nestKey) => {
                for(const i in comments) {
                    const comment = comments[i];

                    if(comment.id === commentId) {
                        return comment;
                    }
                    if(comment[nestKey] && comment[nestKey].length !== 0) {
                        const ratedReply = findComment(comment[nestKey], commentId, nestKey);
                        if(ratedReply) {
                            return ratedReply;
                        }
                    }
                }
                
                return null;
            }
            const ratedComment = findComment(draft.comments, action.payload.id, "replies") || 0;
            ratedComment && (ratedComment.score = action.payload.score);
        }
        case "DELETE_COMMENT": {
            
        }
        default: {
            draft
        }
    }
})


export default App;