
import React, { useState, useEffect } from 'react'
import Container from '../components/container/Container'
import PostCard from '../components/PostCard'
import blogService from '../appwrite/blog'
import Loader from '../components/Loader' // ✅ Ensure this component exists and spins

function AllPostsPage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true) // ✅ loader state

  useEffect(() => {
    setLoading(true)
    blogService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents)
      }
      setLoading(false)
    }).catch(() => {
      setLoading(false)
    })
  }, [])

  return (
    <div className="w-full py-10 min-h-screen">
      <Container>
        <h1 className="text-3xl font-bold mt-10 text-center mb-8 text-gray-800">All Blogs</h1>

        {loading ? (
          <div className="flex justify-center items-center min-h-[40vh]">
            <Loader /> {/* 🔄 Replace with your spinner component */}
          </div>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {posts.map((post) => (
              <PostCard key={post.$id} {...post} />
            ))}
          </div>

        ) : (
          <p className="text-center text-gray-600 text-lg">No posts available</p>
        )}
      </Container>
    </div>
  )
}

export default AllPostsPage
