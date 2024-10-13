
"use client"; // This makes the component a client component

import React from "react";
import { deleteComment, IndividualComments } from "../action/actions";
import { toast,ToastContainer } from "react-toastify";
import ScrollToTop from "react-scroll-to-top";

import { useSession } from "next-auth/react";
import "react-toastify/dist/ReactToastify.css"; 

const CommentList = ({
  optimisticComments,
  deleteOptimisticComment,
  blogId,
}) => {
  const session = useSession();
  console.log(session)

  // Filter comments to show only those related to the specific blog
  const filteredComments = optimisticComments.filter(comment => comment.blogId === blogId);

  const deleteCommentHandler = async (commentId) => {
    const isDelete = confirm(
      `Are you sure you want to delete this comment with id: ${commentId}`
    );

    if (isDelete) {
      await deleteOptimisticComment(commentId, blogId);

      toast.error("Comment Deleted!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <div className="mt-20 max-w-4xl mx-auto">
      <ToastContainer/>
      <h2 className="text-4xl font-extrabold text-yellow-300 mt-10 mb-6 text-center">
        Comments({filteredComments.length})
      </h2>

      {filteredComments.length === 0 ? (
        <p className="text-gray-400 text-lg text-center">
          No comments yet. Be the first to comment!
        </p>
      ) : (
        <div className="space-y-8">
          {filteredComments.map((comment) => (
            <div
              key={comment.id}
              className="w-full px-4 py-3 bg-gray-800 text-gray-800 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <div className="text-xl font-bold text-green-400 mb-4">
                Written by:{" "}
                {comment.authorName ? comment.authorName : "Anonymous"}
              </div>

              <p className="text-lg text-gray-200 leading-relaxed">
                {comment.text}
              </p>

              <div className="text-sm text-gray-400 text-right mt-4">
                Published on:{" "}
                {new Date(comment.createdAt).toLocaleDateString("en-GB")}
              </div>

              <div className="flex justify-end mt-4">
              {session?.status === "authenticated" &&  session?.data?.user?.id === comment.authorId && (
                  <button
                    onClick={() => deleteCommentHandler(comment.id)}
                    className="px-6 py-3 bg-black text-white border-slate-200 font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 text-center"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      <ScrollToTop smooth color="#6f00ff" />
    </div>
  );
};
export default CommentList;
