import React from 'react'
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function PostList() {

const [posts, setPosts] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
    fetch("http://127.0.0.1:3000/api/v1/posts") // Fetch from Rails API
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading posts...</p>;

  return (
    <>
     <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Posts</h2>
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="p-4 border rounded-lg shadow">
            <h3 className="text-xl font-semibold">{post.title}</h3>
            <h3 className="text-xl font-semibold">{post.id}</h3>
            <p className="text-gray-600">{post.desc}</p>
            <p className="text-gray-600">{post.date_post}</p>
             <Link
              to={`/posts/${post.id}`}
              className="text-blue-500 hover:underline"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
    </>
  )
}

export default PostList