import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Button } from "../components";
import PostCard from "../components/PostCard";
import service from "../appwriter/Config";
import { Query } from "appwrite";

function YourPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = useSelector((state) => state.auth.userdata);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchUserPosts = async () => {
      try {
        const response = await service.getPosts([
          Query.equal("userId", user.$id),
          Query.equal("status", "active"),
        ]);

        // Instead of calling getFileUrl here, just pass the value Service returned
        // This is exactly how AllPost / EditPost work
        setPosts(response.documents);
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="py-12 bg-gray-50 min-h-screen flex items-center justify-center">
        <p className="text-gray-700 text-lg">Loading your posts...</p>
      </div>
    );
  }

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <Container>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
          Your Posts
        </h1>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {posts.map((post) => {
              // Only pass a string URL or null to PostCard
              const featuredImageUrl =
                post.featuredImage && typeof post.featuredImage === "string"
                  ? post.featuredImage
                  : post.featuredImage
                  ? service.getFileUrl(post.featuredImage)
                  : null;

              return (
                <PostCard
                  key={post.$id}
                  $id={post.$id}
                  title={post.title}
                  featuredImage={featuredImageUrl}
                />
              );
            })}
          </div>
        ) : (
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <p className="text-gray-700 mb-4">
              You haven’t shared any posts yet.
            </p>
            <Button onClick={() => navigate("/add-post")}>
              Post Your First Photo
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
}

export default YourPosts;
