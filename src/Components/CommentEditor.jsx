import UserImage from "../assets/images/avatars/image-juliusomo.png"
import Editor from "./Editor"

function CommentEditor ({user}) {
    return (
        <div className="bg-white mx-auto max-w-md space-y-3 shadow-lg flex flex-col sm:flex m-5 rounded p-5">
                <Editor />
                <div className="flex flex-row justify-between content-center">
                    <img src={UserImage} className="h-7 w-7"/>
                    <button>SEND</button>
                </div>
        </div>
    )
}
export default CommentEditor