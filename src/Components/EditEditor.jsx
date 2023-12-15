import React, { useState } from 'react';
import Editor from './Editor';

const EditEditor = ({onUpdate, comment, commentId, handleEditEditor, replyingTo}) => {
  const [commentUpdated, setCommentUpdated] = useState(0);
  const [content, setContent] = useState(null);
  const handleContent = (content) => {
    let tagRegex = /[@]{1}[a-z]+/g;
    let formatedContent = content.replace(tagRegex, ""); //the content after the tag in the editor has been removed.
    setContent(formatedContent);
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
    <div className="flex flex-col min-w-[100%] rounded gap-3">
      <Editor onEdit={handleContent} status={commentUpdated} >{replyingTo? "@"+replyingTo+comment: comment}</Editor>
      <button onClick={handleUpdate} className="bg-moderate-blue hover:bg-light-grayish-blue text-white rounded p-1 w-20 h-fit md:h-10 sm:order-2">UPDATE</button>
    </div>
  )
}

export default EditEditor;
