
import React from 'react'
import { Link } from 'react-router-dom'
import blogService from '../appwrite/blog'

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`} className="block w-full">
      <div className="w-full h-full bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden border border-gray-200">
        <div className="w-full h-52 sm:h-64 md:h-72 lg:h-80 overflow-hidden">
          <img
            src={blogService.getFilePreview(featuredImage)}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div className="p-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-300">
            {title}
          </h2>
        </div>
      </div>
    </Link>
  )
}

export default PostCard
