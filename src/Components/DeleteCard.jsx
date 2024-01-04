import {useSpring, animated, useTransition} from '@react-spring/web';

const DeleteCard = ({handleDeleteCard, handleDeleteComment, focusCommentId, showDeleteCard}) => {
    const handleCancel = () => {
        handleDeleteCard(false)
    }
    const handleDelete = () => {
        handleDeleteComment(focusCommentId);
        handleDeleteCard(false);
    }
    const deleteCardTransition = useTransition(showDeleteCard, {
        from: {
             opacity: 0,
             y:-10
        },
        enter: {
            opacity: 1,
            y:0
        },
        leave: {
            opacity: 0,
            y:10
        }
    })

    return(
        
        <div className="m-0 p-0 h-[100dvh] fixed flex justify-center bg-grayish-blue w-[100vw] bg-opacity-70 z-50">
            {deleteCardTransition((style, item)=>
                item? <animated.div style={style} className="p-5 rounded-lg bg-white shadow-lg w-[90%] m-auto max-w-[275px] space-y-2">
                <h1>Delete Comment</h1>
                <p className="text-sm">Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
                <div className="flex flex-row justify-between">
                    <button onClick={handleCancel} className="p-1 bg-grayish-blue rounded-sm text-white" >NO, CANCEL</button>
                    <button onClick={handleDelete} className="p-1 bg-soft-red rounded-sm text-white" >YES, DELETE</button>
                </div>
            </animated.div>: ''
            )}
        </div>
    
    )
}

export default DeleteCard;