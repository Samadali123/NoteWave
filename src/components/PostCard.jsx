import React, { useEffect } from 'react'
import blogService from '../appwrite/blog'
import {Link} from 'react-router-dom'

function PostCard({$id, title, featuredImage}) {

  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4 border-1'>
            <div className='w-full justify-center mb-4'>
                <img src={blogService.getFilePreview(featuredImage)} alt={title}
                className='rounded-xl' />

            </div>
            <h2
            className='text-xl font-bold'
            >{title}</h2>
        </div>
    </Link>
  )
}


export default PostCard