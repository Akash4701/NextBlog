'use client';

import React, { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { AddComment, deleteComment } from '../action/actions';
import CommentList from './commentListing';
import { toast, ToastContainer} from 'react-toastify'; // Make sure to import toast
import { useSession } from 'next-auth/react';
import "react-toastify/dist/ReactToastify.css"; 

function SubmitComment({ comments, blogId }) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isPending, startTransition] = useTransition();
  const [optimisticComments, setOptimisticComments] = useState(comments || []);
  const session=useSession();

  const onSubmit = (data) => {
    console.log('session',session);
    const formData = new FormData();
    console.log('data',data);
    formData.append('text', data.comment);
    console.log('comments',comments)
    console.log('id',session?.data?.user?.id);

    // Optimistic update: Add the comment immediately
    startTransition(() => {
      setOptimisticComments((prevComments) => [
        ...prevComments,
        {
          id: Math.random(), 
          text: data.comment,
          blogId: blogId,
          authorId: session?.data?.user?.id,
          authorName: session?.data?.user?.username,
          createdAt: new Date(),
        },
      ]);
    });

   
    AddComment(blogId, formData)
      .then(() => {
        toast.success('New Comment Added', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
      })
      .catch((error) => {
        toast.error('Error adding comment', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
        // Optionally, revert the optimistic comment if there's an error
        setOptimisticComments((prevComments) =>
          prevComments.filter(
            (comment) => comment.text !== data.comment // Revert the optimistic update
          )
        );
      });

    reset();
  };

  const deleteOptimisticComment = async (commentId, blogId) => {
    // Optimistically remove the comment
    startTransition(() => {
      setOptimisticComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );
    });

   
    await deleteComment(commentId, blogId);
  };

  return (
    <>
       <ToastContainer/>
      <div className="mt-10">
     
        <h2 className="text-2xl font-bold text-violet-400 mb-4">Leave a Comment</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 rounded-lg shadow-lg space-y-4"
        >
          <div>
            <textarea
              id="comment"
              {...register('comment', { required: true })}
              className="w-full px-4 py-3 bg-gray-700 text-gray-800 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Write your comment here..."
            ></textarea>
            {errors.comment && (
              <p className="text-red-500 text-sm mt-1">Comment is required.</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-slate-800 text-white py-2 rounded-lg font-semibold transition duration-300 ease-in-out shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2"
          >
            Add Comment
          </button>
        </form>
      </div>

      <div className="my-5 py-5">
        <CommentList
          optimisticComments={optimisticComments}
          deleteOptimisticComment={deleteOptimisticComment}
          blogId={blogId}
        />
      </div>
    </>
  );
}

export default SubmitComment;
