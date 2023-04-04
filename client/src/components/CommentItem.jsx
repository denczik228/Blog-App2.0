import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { removeComment } from '../redux/features/comment/commentSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'

export const CommentItem = ({ postId, cmt }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const commentId = cmt._id;

  console.log({ cmt });

  const removeCommentHandler = () => {
    dispatch(removeComment({ postId, commentId }));
    toast(`Comment was deleted`);
    navigate(`/posts`);
  };

  console.log({ postId, commentId });

  const avatar = user?.username.trim().toUpperCase().split("").slice(0, 2);
  //console.log(avatar);
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center justify-center shrink-0 rounded-full w-10 h-10 text-sm bg-blue-300">
        {avatar}
      </div>
      <div className="flex gap-3 text-gray-300 text-sm">{cmt.comment}</div>
      <div
          onClick={removeCommentHandler}
          className="text-sm px-4 py-2 flex bg-red-400 hover:bg-red-500 transition-all text-white cursor-pointer"
        >
          Delete
        </div>
    </div>
  );
};
