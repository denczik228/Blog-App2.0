import axios from '../utils/axios';
import React, { useCallback, useEffect, useState } from 'react'
import { AiFillEye, AiOutlineMessage, AiFillDelete, AiTwotoneEdit} from "react-icons/ai";
import Moment from "react-moment";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deletePosts } from '../redux/features/post/postSlice';
import { createComment, getPostComments } from '../redux/features/comment/commentSlice';
import { toast } from 'react-toastify'
import { CommentItem } from '../components/CommentItem';

export const PostPage = () => {
  
 const {comments}=useSelector((state)=>state.comment)
  const { user } = useSelector((state) => state.auth)
  const navigate = useNavigate();
  
  console.log({ comments })
  const [post, setPost] = useState('');
  const [comment, setComment] = useState('');

  const params = useParams();
  const dispatch = useDispatch();
  
  const fetchPost = useCallback(async () => {
    const { data } = await axios.get(`/posts/${params.id}`)
    setPost(data)
  }, [params.id]) 
  
  const removeHandler = () => {
  try {
    dispatch(deletePosts(params.id))
    toast(`Post was deleted`)
    navigate('/posts')
  } catch (error) {
    throw new error(`problem with removeHandler - post deleting func`)
  }
}

  const handleSubmit = () => {
    try {
      const postId = params.id
      dispatch(createComment({ postId, comment }))
      setComment('')
    } catch (error) {
       throw new error(`problem with submitHandler - of comment form`)
    }
  }
  
  const fetchComments = useCallback(async () => {
  try {
    dispatch(getPostComments(params.id))
  } catch (error) {
    console.log(`problem with fetching comments of post`)
  }
},[params.id,dispatch])

  useEffect(() => {
    fetchPost()
  }, [fetchPost])
  
  useEffect(() => {
    fetchComments()
  }, [fetchComments]);

  return (
    <div>
      <button className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4">
        <Link className="flex" to={"/"}>
          Back
        </Link>
      </button>

      <div className="flex gap-10 py-8">
        <div className="w-2/3">
          <div className="flex flex-col basis-1/4 flex-grow">
            <div
              className={
                post?.imgUrl
                  ? "flex rounded-sm h-80 justify-center"
                  : "flex rounded-sm"
              }
            >
              {post?.imgUrl && (
                <img
                  src={process.env.REACT_APP_SERVER_IMG_URL+post.imgUrl}
                  alt="img"
                  className="object-cover w-2/3"
                />
              )}
            </div>
          </div>

          <div className="flex justify-between items-center pt-2">
            <div className="text-xs text-white opacity-50">{post.username}</div>
            <div className="text-xs text-white opacity-50">
              <Moment date={post.createdAt} format="D MMM YYYY" />
            </div>
          </div>
          <div className="text-white text-xl">{post.title}</div>
          <p className="text-white opacity-60 text-xs pt-4">{post.text}</p>

          <div className="flex gap-3 items-center mt-2 justify-between">
            <div className="flex gap-3 mt-4">
              <button className="flex items-center justify-center gap-2 text-xs text-white opacity-50">
                <AiFillEye />
                <span>{post.views}</span>
              </button>
              <button className="flex items-center justify-center gap-2 text-xs text-white opacity-50">
                <AiOutlineMessage /> <span>{post.comments?.length || 0}</span>
              </button>
            </div>

            {user?._id === post.author && (
              <div className="flex gap-3 mt-4">
                <button className="flex items-center justify-center gap-2 text-white opacity-50">
                  <Link to={`/${params.id}/edit`}>
                    <AiTwotoneEdit />
                  </Link>
                </button>
                <button
                  onClick={removeHandler}
                  className="flex items-center justify-center gap-2 text-white opacity-50"
                >
                  <AiFillDelete />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="w-1/3 p-8 bg-gray-700 flex flex-col gap-2 rounded-sm">
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Comment"
              className="text-black w-full rounded-sm bg-gray-400 border p-2 text-xs outline-none placeholder:text-gray-700"
            />
            <button
              type="submit"
              onClick={handleSubmit}
              className="flex justify-center items-center bg-gray-600 text-xs rounded-sm py-2 px-4"
            >
              Send
            </button>
          </form>
          {comments?.map((cmt) => (
            <CommentItem key={cmt._id} cmt={cmt} postId={post._id} />
          ))}
        </div>
      </div>
    </div>
  );
}
