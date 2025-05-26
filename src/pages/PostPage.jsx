// import React, { useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import blogService from "../appwrite/blog";
// import Button from '../components/Button'
// import Container from "../components/container/Container";
// import parse from "html-react-parser";
// import { useSelector } from "react-redux";

// export default function PostPage() {
//     const [post, setPost] = useState(null);
//     const { slug } = useParams();
//     const navigate = useNavigate();

//     const userData = useSelector((state) => state.auth.userData);

//     const isAuthor = post && userData ? post.userId === userData.$id : false;

//     useEffect(() => {
//         if (slug) {
//             blogService.getPost(slug).then((post) => {
//                 if (post) setPost(post);
//                 else navigate("/");
//             });
//         } else navigate("/");
//     }, [slug, navigate]);

//     const deletePost = () => {
//         blogService.deletePost(post.$id).then((status) => {
//             if (status) {
//                 blogService.deleteFile(post.featuredImage);
//                 navigate("/");
//             }
//         });
//     };

//     return post ? (
//         <div className="py-8">
//             <Container>
//                 <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
//                     <img
//                         src={blogService.getFilePreview(post.featuredImage)}
//                         alt={post.title}
//                         className="rounded-xl"
//                     />

//                     {isAuthor && (
//                         <div className="absolute right-6 top-6">
//                             <Link to={`/edit-post/${post.$id}`}>
//                                 <Button bgColor="bg-green-500" className="mr-3">
//                                     Edit
//                                 </Button>
//                             </Link>
//                             <Button bgColor="bg-red-500" onClick={deletePost}>
//                                 Delete
//                             </Button>
//                         </div>
//                     )}
//                 </div>
//                 <div className="w-full mb-6">
//                     <h1 className="text-2xl font-bold">{post.title}</h1>
//                 </div>
//                 <div className="browser-css">
//                     {parse(post.content)}
//                     </div>
//             </Container>
//         </div>
//     ) : null;
// }



import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import blogService from "../appwrite/blog";
import Button from "../components/Button";
import Container from "../components/container/Container";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function PostPage() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            blogService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        blogService.deletePost(post.$id).then((status) => {
            if (status) {
                blogService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-6 px-4 md:px-8">
            <Container>
                <div className="w-full flex flex-col items-center mb-6 gap-4">
                    <div className="w-full max-w-4xl relative">
                        <img
                            src={blogService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="w-full max-h-[400px] object-cover rounded-xl shadow-md"
                        />

                        {isAuthor && (
                            <div className="absolute top-4 right-4 flex flex-wrap gap-2 z-10">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button bgColor="bg-green-500">Edit</Button>
                                </Link>
                                <Button bgColor="bg-red-500" onClick={deletePost}>
                                    Delete
                                </Button>
                            </div>
                        )}
                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold text-center break-words px-2">
                        {post.title}
                    </h1>

                    <div className="w-full max-w-4xl prose prose-sm sm:prose lg:prose-lg dark:prose-invert browser-css">
                        {parse(post.content)}
                    </div>
                </div>
            </Container>
        </div>
    ) : null;
}
