'use client';
import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { updateBlog } from '../action/actions';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function BlogForm({ blog }) {
  const { register, handleSubmit, reset } = useForm();
  const router = useRouter();
  const ref = useRef();

  const { id, title, description, imageUrl, category } = blog || {};

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('imageUrl', data.imageUrl);
      formData.append('category', data.category);

      await updateBlog(id, formData); // Directly call the server action

      ref?.current?.reset(); // Reset form after successful submission
      
      // Show success toast notification
      toast.success('Blog updated successfully!', {
        position: 'top-right',
        autoClose: 3000, 
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });

      router.push('/blogs');
    } catch (error) {
      // Show error toast notification
      toast.error('Error updating blog. Please try again.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
      console.error("Error updating blog:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 text-white flex justify-center items-center py-12">
      <div className="w-full max-w-lg mx-auto bg-gray-800 border border-gray-700 rounded-3xl shadow-2xl p-8">
        <h2 className="text-3xl font-extrabold text-center text-white mb-8">Update Blog Post</h2>

        {/* ToastContainer to display notifications */}
        <ToastContainer />

        <form ref={ref} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Title Field */}
          <TextField
            id="title"
            label="Title"
            variant="filled"
            fullWidth
            defaultValue={title}
            {...register('title')}
            InputLabelProps={{ className: "text-gray-300" }}
            InputProps={{ className: "text-white bg-gray-700" }}
          />

          {/* Description Field */}
          <TextField
            id="description"
            label="Description"
            variant="filled"
            multiline
            rows={4}
            fullWidth
            defaultValue={description}
            {...register('description', { required: true })}
            InputLabelProps={{ className: "text-gray-300" }}
            InputProps={{ className: "text-white bg-gray-700" }}
          />

          {/* Image URL Field */}
          <TextField
            id="imageUrl"
            label="Update Image URL"
            variant="filled"
            fullWidth
            defaultValue={imageUrl || ""}
            {...register('imageUrl', { required: true })}
            InputLabelProps={{ className: "text-gray-300" }}
            InputProps={{ className: "text-white bg-gray-700" }}
          />

          {/* Category Field */}
          <TextField
            id="category"
            label="Category"
            variant="filled"
            fullWidth
            defaultValue={category}
            {...register('category', { required: true })}
            InputLabelProps={{ className: "text-gray-300" }}
            InputProps={{ className: "text-white bg-gray-700" }}
          />

          {/* Submit Button */}
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            fullWidth
            className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
          >
            Update Blog
          </Button>
        </form>
      </div>
    </div>
  );
}
0