import axios from '../utils/axios';
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updatePost } from '../redux/features/post/postSlice';

export const EditPostPage = () => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  
  const params = useParams();
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const fetchPost = useCallback(async () => {
    const { data } = await axios.get(`/posts/${params.id}`)
    setTitle(data.title)
    setText(data.text)
  }, [params.id])

  const submitHandler = () => {
    try {
      const updatedPost = new FormData();
      updatedPost.append("title", title);
      updatedPost.append("text", text);
      updatedPost.append("id", params.id);
      
      //console.log(title, text, params.id);
      dispatch(updatePost({ title, text, id: params.id }));
      navigate("/posts");
    } catch (error) {
      console.log(error);
    }
  };

  const cleanHandler = () => {
    setTitle("");
    setText("");
  };

  useEffect(() => {
    fetchPost()
  },[fetchPost])
  
   return (
     <form className="w-1/3 mx-auto py-10" onSubmit={(e) => e.preventDefault()}>

       <label className="text-xs text-white opacity-70">
         Post title:
         <input
           type="text"
           value={title}
           onChange={(e) => setTitle(e.target.value)}
           placeholder="Title"
           className="mt-1 placeholder:text-gray-700 text-xs outline-none text-black w-full rounded-lg bg-gray-400 border py-1 px-2"
         />
       </label>

       <label className="text-xs text-white opacity-70">
         Text of post:
         <textarea
           placeholder="Text"
           value={text}
           onChange={(e) => setText(e.target.value)}
           className="mt-1 resize-none h-40 placeholder:text-gray-700 text-xs outline-none text-black w-full rounded-lg bg-gray-400 border py-1 px-2"
         />
       </label>
       <div className="flex gap-8 items-center justify-center mt-4">
         <button
           onClick={submitHandler}
           className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4"
         >
           Update post
         </button>
         <button
           onClick={cleanHandler}
           className="flex justify-center items-center bg-red-600 text-xs text-white rounded-sm py-2 px-4"
         >
           Undo changes
         </button>
       </div>
     </form>
   );
}
