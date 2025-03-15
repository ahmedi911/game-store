import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    fetch(`http://127.0.0.1:3000/api/v1/posts/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((responseData) => {
        // Extract the post data from the nested structure
        setPost(responseData.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching post:", error);
        setError(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading post...</p>;
  if (error) return <p>Error loading post: {error.message || "Unknown error"}</p>;
  if (!post) return <p>No post found!</p>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-2xl font-bold text-gray-800 mb-2">{post.title}</h3>
      <h4 className="text-lg font-medium text-gray-500 mb-4">{`ID: ${post.id}`}</h4>
      <p className="text-gray-600 text-base mb-4">{post.desc}</p>
      <p className="text-gray-500 text-sm">{`Posted on: ${post.date_post}`}</p>
    </div>
  );
}

export default PostDetails;