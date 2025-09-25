import React, { useEffect, useState } from 'react';
import service from '../appwriter/Config';
import { PostForm, Container } from '../components';
import { useParams, useNavigate } from 'react-router-dom';

function EditPost() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (slug) {
            service.getPost(slug)
                .then((data) => setPost(data))
                .catch(() => navigate("/")); // redirect if not found
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    if (!post) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="text-center">
                    <p className="text-lg font-medium text-gray-700">Loading post...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="py-12 bg-gray-50 min-h-screen">
            <Container>
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Post</h1>
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <PostForm post={post} />
                </div>
            </Container>
        </div>
    );
}

export default EditPost;
