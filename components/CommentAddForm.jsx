'use client'
import React from 'react';
import { useForm } from 'react-hook-form';
import { AddComment } from '../action/actions';

function SubmitComment({ blogId }) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append('text', data.comment);

    console.log(data);
    AddComment(blogId, formData); // Make sure you're passing the correct blogId
  
    reset(); // Reset the form after submission
  };

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold text-violet-400 mb-4">Leave a Comment</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" p-6 rounded-lg shadow-lg space-y-4"
      >
        {/* Label and Textarea for Comment */}
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

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-slate-800 text-white py-2 rounded-lg font-semibold transition duration-300 ease-in-out shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 "
        >
          Add Comment
        </button>
      </form>
    </div>
  );
}

export default SubmitComment;
