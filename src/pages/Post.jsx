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

  return post ? (
    <div className="py-12 bg-gray-50">
      <Container>
        {/* Featured Image */}
        {post.featuredImage && (
          <div className="w-full flex justify-center mb-6 relative rounded-xl overflow-hidden shadow-md">
            <img
              src={service.getFileUrl(post.featuredImage)}
              alt={post.title}
              className="rounded-xl object-cover w-full max-h-[500px]"
            />

            {isAuthor && (
              <div className="absolute top-4 right-4 flex space-x-3">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button bgColor="bg-green-500" className="hover:bg-green-600">
                    Edit
                  </Button>
                </Link>
                <Button
                  bgColor="bg-red-500"
                  className="hover:bg-red-600"
                  onClick={deletePost}
                >
                  Delete
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-extrabold mb-6 text-gray-800">
          {post.title}
        </h1>

        {/* Content */}
        <div className="prose max-w-none text-gray-700">
          {parse(post.content)}
        </div>
      </Container>
    </div>
  ) : (
    <div className="py-20 text-center text-gray-500">Loading post...</div>
  );
}
