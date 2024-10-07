"use client"; // This makes the component a client component

import React, { useState ,useEffect} from 'react';
import { deleteComment, IndividualComments } from '../action/actions';

const CommentList = ({ blogId }) => {
  const [comments, setComments] = useState([]);

  // Fetch comments when the component mounts
  useEffect(() => {
    const fetchComments = async () => {
      const fetchedComments = await IndividualComments(blogId);
      setComments(fetchedComments);
    };
    fetchComments();
  }, [blogId],[comments.id]);

  // Function to handle comment deletion
  const handleDelete = async (commentId) => {
    try {
      const isDelete=confirm(`Are you sure you want to delete this comment with ${commentId}`)
      if(isDelete){
      await deleteComment(commentId, blogId);
      }
      // Optionally, you can trigger a re-fetch or refresh the page to update the comment list
      setComments(comments.filter((comment) => comment.id !== commentId)); // Update UI after deletion
    } catch (error) {
      console.error("Error deleting comment:", error.message || error);
    }
  };

  return (
    <div className="mt-20 max-w-4xl mx-auto">
      {/* Section title */}
      <h2 className="text-4xl font-extrabold text-yellow-300 mt-10 mb-6 text-center">
        Comments({comments.length})
      </h2>

      {/* Comment section */}
      {comments.length === 0 ? (
        <p className="text-gray-400 text-lg text-center">
          No comments yet. Be the first to comment!
        </p>
      ) : (
        <div className="space-y-8">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-gray-900 p-8 rounded-3xl shadow-xl border border-gray-700 hover:shadow-2xl transition duration-300 ease-in-out"
            >
              {/* Author Name */}
              <div className="text-xl font-bold text-green-400 mb-4">
                Written by: {comment.authorName ? comment.authorName : 'Anonymous'}
              </div>

              {/* Comment Text */}
              <p className="text-lg text-gray-200 leading-relaxed ">
                {comment.text}
              </p>

              {/* Date at the Bottom Right */}
              <div className="text-sm text-gray-400 text-right mt-4">
                Published on: {new Date(comment.createdAt).toLocaleDateString()}
              </div>

              {/* Delete Button aligned to the right */}
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => handleDelete(comment.id)} // Pass comment.id to handleDelete
                  className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 text-center"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentList;
