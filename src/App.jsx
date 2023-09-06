import './App.css';
import Comment from './Components/Comment.jsx';
import CommentEditor from './Components/CommentEditor';
import Data from './data.json';

import { useState, useContext } from 'react';

function App() {
    const [database, setDatabase] = useState(Data);
    return (
        <>
            <div>
            {database.comments.map((comment) => 
                (<Comment id={comment.id} username={comment.user.username} content={comment.content} createdAt={comment.createdAt} rating={comment.score} img={comment.user.image.png} currentUser={database.currentUser.username}/>)
            )}
            </div>
            <CommentEditor user={Data.currentUser}/>
        </>
    )
}

export default App;
