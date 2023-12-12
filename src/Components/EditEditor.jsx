import React, { useState } from 'react';
import Editor from './Editor';

const EditEditor = ({onUpdate, comment, commentId, handleEditEditor, replyingTo}) => {
  const [commentUpdated, setCommentUpdated] = useState(0);
  const [content, setContent] = useState(null);
  const handleContent = (content) => {
      setContent(content);
  }

  const handleUpdate = () => {
    if(content){
      onUpdate(content, commentId);
      setCommentUpdated(commentUpdated+1);
      handleEditEditor(false);
    }
  }

  //<Editor onEdit={handleContent} status={commentUpdated}>{content}</Editor>

  return (
    <div className="flex flex-col mx-auto w-[100%] justify-end rounded gap-3">
      <Editor onEdit={handleContent} status={commentUpdated} >{comment}</Editor>
      <button onClick={handleUpdate} className="bg-moderate-blue hover:bg-light-grayish-blue text-white rounded p-1 w-20 h-fit md:h-10 sm:order-2">UPDATE</button>
    </div>
  )
}

export default EditEditor;
