
import React, { useState, useEffect } from 'react'
import Container from '../components/container/Container'
import PostCard from '../components/PostCard'
import blogService from '../appwrite/blog'

function AllPostsPage() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    blogService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents)
      }
    })
  }, [])

  return (
    <div className="w-full py-10 bg-gray-50 min-h-screen">
      <Container>
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">All Posts</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <PostCard key={post.$id} {...post} />
          ))}
        </div>
      </Container>
    </div>
  )
}

export default AllPostsPage
