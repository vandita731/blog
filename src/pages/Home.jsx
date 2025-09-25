import React, { useEffect, useState } from 'react';
import service from '../appwriter/Config';
import { PostCard, Container } from '../components';

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    service.getPosts().then((res) => {
      if (res) setPosts(res.documents);
    });
  }, []);

  if (posts.length === 0) {
    return (
      <div className="w-full py-16 text-center bg-gradient-to-b from-indigo-50 to-purple-50">
        <Container>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-700 mb-4">
            Login to read posts
          </h1>
          <p className="text-gray-500">
            Explore amazing content once you sign in.
          </p>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-12 bg-gray-50">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <PostCard key={post.$id} {...post} />
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
