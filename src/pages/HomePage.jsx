// import React, {useEffect, useState} from 'react'
// import blogService from '../appwrite/blog';
// import Container from '../components/container/Container';
// import PostCard from '../components/PostCard';

// function HomePage() {
//     const [posts, setPosts] = useState([])

//    useEffect(() => {}, [])
//     blogService.getPosts([]).then((posts) => {
//         if (posts) {
//             setPosts(posts.documents)
//         }
//     })
  
//     if (posts.length === 0) {
//         return (
//             <div className="py-8 mt-4 text-center">
//                 <Container/>
//                     <div className="flex flex-wrap">
//                         <div className="p-2 w-full">
//                             <h1 className="text-2xl font-bold hover:text-gray-500">
//                                 Login to read posts
//                             </h1>
//                         </div>
//                     </div>
//                 <Container/>
//             </div>
//         )
//     }
//     return (
//         <div className='py-8'>
//             <Container>
//                 <div className='flex flex-wrap'>
//                     {posts.map((post) => (
//                         <div key={post.$id} className='p-2 w-1/4'>
//                             <PostCard {...post} />
//                         </div>
//                     ))}
//                 </div>
//             </Container>
//         </div>
//     )
// }

// export default HomePage




import React, { useEffect, useState } from 'react';
import blogService from '../appwrite/blog';
import Container from '../components/container/Container';
import PostCard from '../components/PostCard';

function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    blogService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  if (posts.length === 0) {
    return (
      <div className="py-8 mt-4 text-center w-screen ">
        <Container>
          <div className="flex flex-wrap justify-center">
            <div className="w-ful ">
              <h1 className="text-2xl text-centerfont-bold hover:text-gray-500">
                Please Login to Continue
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-8 w-full">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div
              key={post.$id}
              className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
            >
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default HomePage;
