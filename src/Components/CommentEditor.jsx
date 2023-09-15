import { useState } from "react";
import UserImage from "../assets/images/avatars/image-juliusomo.png";
import Editor from "./Editor"

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
                    <img src={UserImage} className="h-7 w-7"/>
                    <button onClick={handleSend}>SEND</button>
                </div>
        </div>
    )
}
export default CommentEditor;