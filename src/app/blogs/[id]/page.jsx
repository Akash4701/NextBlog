'use client';
import React, { useState, useEffect } from 'react';
import { IndividualBlog, IndividualComments, likeblogs, numberoflikes, checkLikeStatus } from '../../../../action/actions';
import Image from 'next/image';
import Link from 'next/link';
import AddComment from '../../../../components/CommentAddForm';
import { Heart } from 'lucide-react';

const BlogDetail = ({ params }) => {
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  const id = params?.id;

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const [fetchedBlog, fetchedComments, fetchedLikes, initialLikeStatus] = await Promise.all([
          IndividualBlog(id),
          IndividualComments(id),
          numberoflikes(id),
          checkLikeStatus(id) // Get initial like status
        ]);

        setBlog(fetchedBlog);
        setComments(fetchedComments);
        setLikes(fetchedLikes);
        setLiked(initialLikeStatus); // Set initial like state from server
      } catch (error) {
        console.error('Error fetching blog data:', error);
      }
    };

    fetchBlogData();
  }, [id]);

  const handleLike = async () => {
    try {
      const newLikeState = await likeblogs(id); 
      setLiked(newLikeState); 
      setLikes((prevLikes) => (newLikeState ? prevLikes + 1 : prevLikes - 1));
    } catch (error) {
      console.error('Error liking the blog:', error);
    }
  };

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 text-white p-10">
        <div className="max-w-6xl mx-auto bg-gray-800 border border-white rounded-3xl shadow-2xl p-8">
          <div className="relative overflow-hidden rounded-lg mb-8 shadow-lg">
            <img
              src={blog.imageUrl}
              alt={blog.title}
              width={1280}
              height={720}
              className="w-full h-[400px] object-cover transition-transform transform hover:scale-110 duration-300"
            />
          </div>

          <div className="flex justify-between items-center">
  <div className="flex flex-col items-center">
    <button 
      onClick={handleLike} 
      aria-label="Like Button" 
      className="mb-2 transition-colors duration-300 transform hover:scale-110"
    >
      <Heart
        size={40}
        color={liked ? 'red' : 'gray'}
        fill={liked ? 'red' : 'none'}
        className="transition-all duration-300"
      />
    </button>
    <p className="text-white text-lg font-semibold">{likes}</p>
  </div>

  <div className="inline-block text-sm font-bold uppercase text-green-300  border-2 border-green-400 px-4 py-2 rounded-full shadow-lg mb-6 transform transition-transform duration-300 hover:scale-105">
    {blog.category}
  </div>
</div>

          <h1 className="text-4xl font-extrabold text-yellow-300 mb-6 leading-tight">{blog.title}</h1>

{/* Blog description */}
<p className="text-lg text-gray-300 leading-relaxed mb-8">{blog.description}</p>

{/* Blog published date */}
<div className="text-sm text-gray-400">
  Published on{' '}
  <span className="font-medium text-gray-300">
    {new Date(blog.publishedAt).toLocaleDateString()}
  </span>
</div>

{/* Update blog button */}
<div className="flex justify-center items-center p-4">
  <Link
    href={`/blogs/UpdateBlog/${id}`}
    className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-center"
  >
    Update Blog
  </Link>
</div>

          {/* Rest of your JSX remains the same */}
        </div>
      </div>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 text-white p-10">
        <div className="max-w-6xl mx-auto bg-gray-800 border border-white rounded-3xl shadow-2xl p-8">
          <AddComment comments={comments} blogId={id} />
        </div>
      </div>
    </>
  );
};

export default BlogDetail;