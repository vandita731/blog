import React, { useEffect, useState } from 'react';
import service from '../appwriter/Config';
import { PostCard, Container } from '../components';

function AllPost() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        service.getPosts()
            .then((res) => {
                if (res) setPosts(res.documents);
            })
            .catch((err) => console.error("Error fetching posts:", err));
    }, []);

    if (!posts.length) {
        return (
            <div className="w-full py-20 text-center bg-gray-50 min-h-screen">
                <Container>
                    <h1 className="text-3xl font-semibold text-gray-700">
                        No posts available yet
                    </h1>
                    <p className="mt-2 text-gray-500">
                        Login to see posts or create a new one
                    </p>
                </Container>
            </div>
        );
    }

    return (
        <div className='w-full py-12 bg-gray-50 min-h-screen'>
            <Container>
                <h1 className="text-3xl font-bold text-gray-800 mb-6">All Posts</h1>
                <div className='flex flex-wrap -mx-2'>
                    {posts.map((post) => (
                        <div key={post.$id} className='px-2 py-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default AllPost;
