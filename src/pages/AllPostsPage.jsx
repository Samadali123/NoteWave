
import React, { useState, useEffect, use } from 'react'
import Container from '../components/container/Container'
import PostCard from '../components/PostCard'
import blogService from '../appwrite/blog'
import Loader from '../components/Loader'
import { useSelector } from 'react-redux'

function AllPostsPage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const userData = useSelector((state) => state.auth.userData)

  useEffect(() => {
    if (userData == null || userData === 'undefined')  {
      setLoading(false)
      return
    }

    setLoading(true)
    blogService.getPosts([]) // Get all posts
      .then((result) => {
        if (result?.documents) {
          // Filter posts by logged-in user only
          const userPosts = result.documents.filter(
            (post) => post.userId === userData.$id
          )
          setPosts(userPosts)
        }
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [userData])

  return (
    <div className="w-full py-10 min-h-screen">
      <Container>
         {posts && posts.length > 0  ?         <h1 className="text-3xl font-bold mt-10 text-center mb-8 text-gray-800">My Blogs</h1> : null}

        {loading ? (
          <div className="flex justify-center items-center min-h-[40vh]">
            <Loader />
          </div>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {posts.map((post) => (
              <PostCard key={post.$id} {...post} />
            ))}
          </div>
        ) : (
          <p className="text-center  mt-50 text-gray-600 text-lg">You haven't written any Blogs yet.</p>
        )}
      </Container>
    </div>
  )
}

export default AllPostsPage


