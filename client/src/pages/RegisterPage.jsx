import React, {useState,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkIsAuth, registerUser } from '../redux/features/auth/authSlice';
import { toast } from 'react-toastify';

export const RegisterPage = () => {
  const isAuth = useSelector(checkIsAuth);
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const { status } = useSelector((state) => state.auth)
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (status) {
    toast(status)
    }
    if(isAuth) navigate('/')
  },[status,isAuth,navigate])

  const handleSubmit = () => {
  try {
    dispatch(registerUser({username,password,email}))
    setUsername('')
    setPassword('')
    setEmail('')
  } catch (error) {
    throw new error(error)
  }
}

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="h-60 mx-auto mt-48 min-w-[25%] w-96"
    >
      <h1 className="text-lg text-white text-center">Register</h1>

      <label className="text-xs text-gray-400">
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-sm outline-none placeholder:text-gray-700"
        />
      </label>

      <label className="text-xs text-gray-400">
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-sm outline-none placeholder:text-gray-700"
        />
      </label>

      <label className="text-xs text-gray-400">
        Password:
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-sm outline-none placeholder:text-gray-700"
        />
      </label>

      <div className="flex gap-8 justify-center mt-4">
        <button
          type="submit"
          onClick={handleSubmit}
          className=" bg-gray-500 text-base whitespace-nowrap text-white rounded-xl py-2 px-4 "
        >
          Sign In
        </button>
        <div className="inline-flex items-center">
          <span className="text-gray-400 whitespace-nowrap">
            Already have an account?
          </span>
          <Link
            to="/login"
            className="px-2 text-base whitespace-nowrap text-white"
          >
            Log In
          </Link>
        </div>
      </div>
    </form>
  );
}
