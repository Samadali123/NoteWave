
import React, { useEffect, useState } from 'react';
import blogService from '../appwrite/blog';
import Container from '../components/container/Container';
import PostCard from '../components/PostCard';
import Loader from '../components/Loader';

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // loading state

  useEffect(() => {
    blogService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="py-8 mt-4 text-center w-screen">
        <Container>
          <Loader /> 
        </Container>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="py-8 mt-4 text-center w-screen">
        <Container>
          <h1 className="text-2xl font-bold hover:text-gray-500">
            Please Login to Continue
          </h1>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-8 w-full">
      <Container>
        {/* Use grid here instead of flex-wrap + width classes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-20">
          {posts.map((post) => (
            <PostCard key={post.$id} {...post} />
          ))}
        </div>
      </Container>
    </div>
  );
}

export default HomePage;

