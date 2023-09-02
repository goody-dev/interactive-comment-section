import './App.css';
import Comment from './Components/Comment.jsx';
import Data from './data.json';

import { useState, useContext } from 'react';

function App() {
    const [database, setDatabase] = useState(Data);
    return (
        <>
            {database.comments.map((comment) => 
                (<Comment id={comment.id} username={comment.user.username} content={comment.content} createdAt={comment.createdAt} rating={comment.score}/>)
            )}
        </>
    )
}

export default App;
