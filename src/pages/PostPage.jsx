
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import blogService from "../appwrite/blog";
import Button from '../components/Button';
import Container from "../components/container/Container";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import Loader from '../components/Loader'

export default function PostPage() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true); 
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            setLoading(true);
            blogService.getPost(slug).then((fetchedPost) => {
                if (fetchedPost) {
                    setPost(fetchedPost);
                } else {
                    navigate("/");
                }
                setLoading(false);
            }).catch(() => {
                navigate("/");
                setLoading(false);
            });
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    const deletePost = () => {
        blogService.deletePost(post.$id).then((status) => {
            if (status) {
                blogService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader />
            </div>
        );
    }

    return post ? (
        <div className="py-6 px-4 md:px-8">
            <Container>
                <div className="w-full mt-15 max-w-5xl mx-auto flex flex-col gap-6">
                    <div className="relative w-full rounded-xl overflow-hidden shadow-md">
                        <img
                            src={blogService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="w-full h-[250px] sm:h-[350px] md:h-[450px] object-cover"
                        />

                        {isAuthor && (
                            <div className="absolute top-4 right-4 z-50 flex flex-col sm:flex-row items-center gap-2 sm:gap-3 px-3 py-2 backdrop-blur-sm border border-gray-300 rounded-xl shadow-lg transition-all duration-300">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <button className="flex items-center cursor-pointer gap-1 px-2 py-1 text-xs sm:text-sm font-semibold text-white ">
                                        <FiEdit2 className="text-white cursor-pointer" size={14} />
                                        Edit
                                    </button>
                                </Link>

                                <button
                                    onClick={deletePost}
                                    className="flex items-center cursor-pointer gap-1 px-2 py-1 text-xs sm:text-sm font-semibold text-white  rounded-lg transition"
                                >
                                    <FiTrash2 className="text-white cursor-pointer" size={14} />
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>

                    <h1 className="text-2xl md:text-4xl font-bold text-center break-words">
                        {post.title}
                    </h1>

                    <div className="prose prose-sm sm:prose md:prose-lg lg:prose-xl max-w-full dark:prose-invert browser-css">
                        {parse(post.content)}
                    </div>
                </div>
            </Container>
        </div>
    ) : null;
}
