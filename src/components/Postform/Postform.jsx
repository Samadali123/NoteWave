
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import blogService from "../../appwrite/blog";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        control,
        getValues,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const [loading, setLoading] = useState(false);

    const submit = async (data) => {
        setLoading(true);

        try {
            if (!userData || !userData.$id) {
                alert("User not authenticated. Please login again.");
                setLoading(false);
                return;
            }

            const titleLimit = 255;
            const contentLimit = 255;

            if (data.title.length > titleLimit) {
                alert(`Title must be less than ${titleLimit} characters.`);
                setLoading(false);
                return;
            }

            if (data.content.length > contentLimit) {
                alert(`Content must be less than ${contentLimit} characters.`);
                setLoading(false);
                return;
            }

            let file = null;

            if (!post && (!data.image || data.image.length === 0)) {
                alert("Please select an image to create a post.");
                setLoading(false);
                return;
            }

            if (data.image && data.image.length > 0) {
                file = await blogService.uploadFile(data.image[0]);
            }

            if (post) {
                if (file) {
                    await blogService.deleteFile(post.featuredImage);
                }

                const updatedPost = await blogService.updatePost(post?.$id, {
                    ...data,
                    featuredImage: file ? file?.$id : post.featuredImage,
                });

                if (updatedPost) {
                    navigate(`/post/${updatedPost?.$id}`);
                }
            } else {
                const newPost = await blogService.createPost({
                    ...data,
                    featuredImage: file?.$id,
                    userId: userData.$id,
                });

                if (newPost) {
                    navigate(`/post/${newPost?.$id}`);
                }
            }
        } catch (err) {
            console.error("Error submitting post:", err.message);
            alert("Failed to submit post. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const slugTransform = useCallback((value) => {
        return value
            ? value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, "-").replace(/\s/g, "-")
            : "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Section */}
            <div className="lg:col-span-2 space-y-4 mt-17">
                <Input
                    label="Title :"
                    placeholder="Enter title"
                    {...register("title", {
                        required: "Title is required",
                        maxLength: {
                            value: 255,
                            message: "Title must be less than 255 characters",
                        },
                    })}
                />
                {errors.title && <p className="text-red-600">{errors.title.message}</p>}

                <Input
                    label="Slug :"
                    placeholder="URL Slug"
                    {...register("slug", { required: "Slug is required" })}
                    onInput={(e) =>
                        setValue("slug", slugTransform(e.currentTarget.value), {
                            shouldValidate: true,
                        })
                    }
                />
                {errors.slug && <p className="text-red-600">{errors.slug.message}</p>}

                <RTE
                    label="Content :"
                    name="content"
                    control={control}
                    defaultValue={getValues("content")}
                />
            </div>

            {/* Right Section */}
            <div className="space-y-4 mt-17">
                <Input
                    label="Featured Image :"
                    type="file"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {errors.image && <p className="text-red-600">Image is required</p>}

                {post && (
                    <div className="w-full">
                        <img
                            src={blogService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg w-full object-cover max-h-60"
                        />
                    </div>
                )}

                <Select
                    label="Status"
                    options={["active", "inactive"]}
                    {...register("status", { required: true })}
                />

                <Button
                    type="submit"
                    bgColor={post ? "bg-green-500" : undefined}
                    className="w-full flex justify-center items-center gap-2"
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    fill="none"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                />
                            </svg>
                            {post ? "Updating..." : "Creating..."}
                        </>
                    ) : post ? (
                        "Update Post"
                    ) : (
                        "Create Post"
                    )}
                </Button>
            </div>
        </form>
    );
}
