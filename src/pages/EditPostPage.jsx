// import React, {useEffect, useState} from 'react'
// import Container from '../components/container/Container'
// import PostForm from '../components/Postform/Postform'
// import blogService from '../appwrite/blog';
// import { useNavigate,  useParams } from 'react-router-dom';

// function EditPostPage() {
//     const [post, setPosts] = useState(null)
//     const {slug} = useParams()
//     const navigate = useNavigate()

//     useEffect(() => {
//         if (slug) {
//             blogService.getPost(slug).then((post) => {
//                 if (post) {
//                     setPosts(post)
//                 }
//             })
//         } else {
//             navigate('/')
//         }
//     }, [slug, navigate])
//   return post ? (
//     <div className='py-8'>
//         <Container>
//             <PostForm post={post} />
//         </Container>
//     </div>
//   ) : null
// }

// export default EditPostPage



import React, { useEffect, useState } from "react";
import Container from "../components/container/Container";
import PostForm from "../components/Postform/Postform";
import blogService from "../appwrite/blog";
import { useNavigate, useParams } from "react-router-dom";

function EditPostPage() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (slug) {
            blogService.getPost(slug).then((fetchedPost) => {
                if (fetchedPost) {
                    setPost(fetchedPost);
                } else {
                    navigate("/"); // Redirect if post not found
                }
            });
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    return post ? (
        <div className="py-6 px-4 md:px-8">
            <Container>
                <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">Edit Post</h1>
                <PostForm post={post} />
            </Container>
        </div>
    ) : (
        <div className="w-full h-[50vh] flex items-center justify-center text-lg font-medium">
            Loading post data...
        </div>
    );
}

export default EditPostPage;
