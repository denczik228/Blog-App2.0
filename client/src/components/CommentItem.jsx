import React from 'react'
import { useSelector } from 'react-redux';

export const CommentItem = ({cmt}) => {
   const { user } = useSelector((state) => state.auth);
  
  const avatar = user.username.trim().toUpperCase().split('').slice(0,2)
  return (
    <div className='flex items-center gap-3'>
      <div className='flex items-center justify-center shrink-0 rounded-full w-10 h-10 text-sm bg-blue-300'>
        {avatar}
      </div>
      <div className='flex text-gray-300 text-[10px]'>
        {cmt.comment}
      </div>
    </div>
  )
}
