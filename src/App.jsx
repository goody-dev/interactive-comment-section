import './App.css';
import Comment from './Components/Comment.jsx';
import CommentEditor from './Components/CommentEditor';
import Data from './data.json';

import { useState, useReducer } from 'react';

function App() {
    const [database, dispatch] = useReducer(dataReducer, Data);
    //const [content, setContent] = useState(null);
    const [timeStamp, setTimeStamp] = useState("now");

    const handleSendComment = (content) => {
        dispatch({
            type: "SEND_COMMENT",
            id: 5,
            content: content,
            createdAt: timeStamp,
            score: 0,
            user: database.currentUser,
            replies:[]
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

    return (
        <>
            <div>
            {database.comments.map((comment) => 
                (<Comment id={comment.id} username={comment.user.username} content={comment.content} createdAt={comment.createdAt} rating={comment.score} img={comment.user.image.webp} currentUser={database.currentUser.username}/>)
            )}
            </div>
            <CommentEditor user={database.currentUser} onSend={handleSendComment}/>
        </>
    )
}

let nextID = 4;
const dataReducer = (database, action) => {
    switch(action.type) {
        case "SEND_COMMENT": {
            console.log(database.comments);
            return {
                ...database, 
                comments: [ 
                    ...database.comments,
                    {
                        id: action.id,
                        content:action.content,
                        createdAt: action.createdAt,
                        score: action.score,
                        user: action.user,
                        replies: action.replies,
                    }
                ],
            };
        }
        default: {
            return database;
        }
    }
}

export default App;
