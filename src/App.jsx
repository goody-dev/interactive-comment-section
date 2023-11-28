import './App.css';
import Comments from './Components/Comments.jsx';
import CommentEditor from './Components/CommentEditor';
import Data from './data.json';
import DeleteCard from './Components/DeleteCard';

import { useState, useReducer, useEffect } from 'react';

function App() {
    const [commentbase, dispatch] = useReducer(dataReducer, Data);
    const [lastId, setLastId] = useState(4);
    const [showDeleteCard, setShowDeleteCard]= useState(false);

    const handleDeleteCard = () => {
        setShowDeleteCard(!showDeleteCard);
    }

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
    const handleReplyComment = () => {
        dispatch({
            type: "REPLY_COMMENT"
        })
    }
    const handleUpdateComment = () => {
        dispatch({
            type: "UPDATE_COMMENT",
            comment: content
        })
    }
    const handleDeleteComment = (id) => {
        dispatch({
            type: "DELETE_COMMENT",
            payload: {id}
        })
    }
    const handleRating = (id, score) => {
        dispatch({
            type: "RATE_COMMENT",
            payload: {id, score}
        })
    }

    return (
        <div>
            {showDeleteCard && <DeleteCard handleDeleteCard={handleDeleteCard}/>}
            <Comments comments={...commentbase.comments} currentUser={commentbase.currentUser} onRate={handleRating} handleDeleteCard={handleDeleteCard}/>
            <CommentEditor user={commentbase.currentUser} onSend={handleSendComment}/>
        </div>
    )
}

let nextID = 4;
const dataReducer = (commentbase, action) => {
    switch(action.type) {
        case "SEND_COMMENT": {
            //console.log(commentbase.comments);
            return {
                ...commentbase, 
                comments: [ 
                    ...commentbase.comments,
                    action.payload
                ],
            };
        }
        case "RATE_COMMENT": {
            const rate = (comment)=> {
                if(comment.id===action.payload.id) {
                    return {...comment, score:action.payload.score}
                } else if (comment.id!==action.payload.id && comment.replies) {
                    return {...comment, replies: comment.replies.map(rate)}
                }
                return comment;
            }
            return {
                ...commentbase,
                comments: commentbase.comments.map(rate)
            }
        }
        default: {
            return commentbase;
        }
    }
}

export default App;