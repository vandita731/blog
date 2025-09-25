import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwriter/Config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userdata);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    service.deletePost(post.$id).then((status) => {
      if (status) {
        service.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  if (!post)
    return (
      <div className="text-center text-gray-400 py-20 text-lg">
        Loading post...
      </div>
    );

  return (
    <div className="py-8 md:py-12 bg-gray-50 min-h-full">
      <Container className="max-w-4xl mx-auto px-4 md:px-0">
        {/* Featured Image */}
        {post.featuredImage && (
  <div className="relative mb-8 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex justify-center">
    <img
      src={service.getFileUrl(post.featuredImage)}
      alt={post.title}
      className="w-full max-w-3xl h-auto object-cover rounded-2xl"
    />

    {isAuthor && (
      <div className="absolute top-4 right-4 flex space-x-3">
        <Link to={`/edit-post/${post.$id}`}>
          <Button
            bgColor="bg-green-500"
            className="hover:bg-green-600 transition-colors"
          >
            Edit
          </Button>
        </Link>
        <Button
          bgColor="bg-red-500"
          className="hover:bg-red-600 transition-colors"
          onClick={deletePost}
        >
          Delete
        </Button>
      </div>
    )}
  </div>
)}

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-gray-900 leading-tight">
          {post.title}
        </h1>

        {/* Author & Date */}
        {post.userName && (
          <div className="mb-6 text-gray-500 text-sm md:text-base flex flex-wrap gap-2">
            <span>By {post.userName}</span>
            {post.createdAt && (
              <span>• {new Date(post.createdAt).toLocaleDateString()}</span>
            )}
          </div>
        )}

        {/* Post Content */}
        <div className="prose prose-lg md:prose-xl max-w-none text-gray-800 prose-a:text-blue-600 hover:prose-a:text-blue-800 transition-colors">
          {parse(post.content)}
        </div>
      </Container>
    </div>
  );
}
