import React from 'react'
import { Link, NavLink } from 'react-router-dom';

export const Navbar = () => {
    const isAuth = true;
    const activeStyles = {
        color:'white',
    }

  return (
    <div className="flex py-4 justify-between items-center">
      <span className="flex justify-center items-center w-32 h-6 bg-gray-600 text-sm text-white rounded-xl">
        Den's Blog
      </span>

      {isAuth && (
        <ul className="flex gap-8">
          <li>
            <NavLink
              to={"/"}
              href="/"
              style={({ isActive }) => (isActive ? activeStyles : undefined)}
              className="text-sm text-gray-400 hover:text-red"
            >
              Main Page
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/posts"}
              style={({ isActive }) => (isActive ? activeStyles : undefined)}
              href="/posts"
              className="text-sm text-gray-400 hover:text-white"
            >
              My Posts
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/new"}
              href="/new"
              style={({ isActive }) => (isActive ? activeStyles : undefined)}
              className="text-sm text-gray-400 hover:text-blue"
            >
              Add Post
            </NavLink>
          </li>
        </ul>
      )}

      <div className="flex justify-center items-center bg-gray-600 w-22 h-6 text-sm text-white rounded-xl px-4">
        {isAuth ? (<button>Log Out</button>) : (
          <Link to={'/login'}>Log In</Link>
        )}
      </div>
    </div>
  );
}
