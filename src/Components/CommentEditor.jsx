import { useState } from "react";
import Editor from "./Editor";

function CommentEditor ({user, onSend}) {
    const [content, setContent] = useState("");
    const handleContent = (content) => {
        setContent(content);
    }
    const handleSend = () => {
        onSend(content);
    }
    return (
        <div className="bg-white mx-auto max-w-[80%] md:max-w-md space-y-3 shadow-lg flex flex-col sm:flex m-5 rounded p-5">
                <Editor onEdit={handleContent}/>
                <div className="flex flex-row justify-between content-center">
                    <img src={user.image.webp} className="h-7 w-7"/>
                    <button className="bg-moderate-blue text-white rounded p-1 w-20" onClick={handleSend}>SEND</button>
                </div>
        </div>
    )
}
export default CommentEditor;