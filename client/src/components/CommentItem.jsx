import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { removeComment} from '../redux/features/comment/commentSlice';

export const CommentItem = ({ postId, cmt }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
 
  const commentId = cmt._id;
  const isCommentAuthor = cmt.author._id === user?._id;

  console.log(cmt)
  console.log(postId, commentId);

  const avatar = user?.username.trim().toUpperCase().split("").slice(0, 2);
 
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center justify-center shrink-0 rounded-full w-10 h-10 text-sm bg-blue-300">
        {avatar}
      </div>
      <div className="flex gap-3 text-gray-300 text-sm">{cmt.comment}</div>
      {isCommentAuthor && (
        <button
          type="button"
          onClick={() => dispatch(removeComment({ postId, commentId }))}
          className="text-sm px-4 py-2 flex bg-red-400 hover:bg-red-500 transition-all text-white cursor-pointer"
        >
          Delete
        </button>
      )}
    </div>
  );
};
