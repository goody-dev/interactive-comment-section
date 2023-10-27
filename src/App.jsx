import './App.css';
import Comment from './Components/Comment.jsx';
import CommentEditor from './Components/CommentEditor';
import Data from './data.json';
import DeleteCard from './Components/DeleteCard';

import { useState, useReducer, useEffect } from 'react';
import { comment } from 'postcss';

function App() {
    const [commentbase, dispatch] = useReducer(dataReducer, Data);
    const [timeStamp, setTimeStamp] = useState("now");
    const [screenWidth, setScreenWidth] = useState(window.screen.width);

    useEffect(
        ()=>setScreenWidth(window.screen.width)
    , [window])

    const handleSendComment = (content) => {
        dispatch({
            type: "SEND_COMMENT",
            payload: {
                id: commentbase.comments.length + 1,
                content: content,
                createdAt: timeStamp,
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
    const handleDeleteComment = () => {
        dispatch({
            type: "DELETE_COMMENT",
        })
    }
    const handleRating = (id, score) => {
        dispatch({
            type: "RATE_COMMENT",
            payload: {id, score}
        })
    }


    return (
        <>
            <div>
            {commentbase.comments.map((comment, id) => (
                <Comment screenWidth={screenWidth} key={id} id={comment.id} username={comment.user.username} content={comment.content} createdAt={comment.createdAt} rating={comment.score} img={comment.user.image.webp} currentUser={commentbase.currentUser.username} onRate={handleRating}/>
            ))}
            </div>
            <CommentEditor user={commentbase.currentUser} onSend={handleSendComment}/>
        </>
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
            return {
                ...commentbase,
                comments: commentbase.comments.map((comment)=> {
                    if(comment.id===action.payload.id) {
                        return {...comment, score:action.payload.score}
                    }
                    return comment;
                })
            }
        }
        default: {
            return commentbase;
        }
    }
}

export default App;