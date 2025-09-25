import React from 'react';
import { PostForm, Container } from '../components';

function AddPost() {
  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <Container>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
          Create a New Post
        </h1>
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-md">
          <PostForm />
        </div>
      </Container>
    </div>
  );
}

export default AddPost;
