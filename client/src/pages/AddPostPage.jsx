import React,{useState} from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../redux/features/post/postSlice';


export const AddPostPage = () => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [image, setImage] = useState('');

  const dispatch = useDispatch();

  const submitHandler = () => {
  try {
    const data = new FormData()
    data.append('title', title)
    data.append('text', text)
    data.append('image', image)
    dispatch(createPost(data))
    navigate('/')
  } catch (error) {
      throw new error(`problem with submitHandler func`)
  }
  }

  const navigate = useNavigate();
  
  const cleanHandler = () => {
    setText('')
    setTitle('')
  }

  return (
    <form className="w-1/3 mx-auto py-10" onSubmit={(e) => e.preventDefault()}>
      <label className="text-gray-300 py-2 bg-gray-600 text-xs mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer">
        Please, Attach the image:
        <input
          type="file"
          className="hidden"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </label>
      <div className="flex object-cover py-2">
        {image && (
          <img
            src={process.env.REACT_APP_SERVER_IMG_URL + image.name}
            alt={image.name}
          />
        )}
      </div>

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
          Add post
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
