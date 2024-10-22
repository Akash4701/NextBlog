'use client';
import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { updateBlog } from '../action/actions';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Styled TextField component with custom styles
const StyledTextField = styled(TextField)({
  '& label': {
    color: 'rgb(209 213 219)', // text-gray-300
  },
  '& label.Mui-focused': {
    color: 'rgb(209 213 219)',
  },
  '& .MuiFilledInput-root': {
    backgroundColor: 'rgb(55 65 81)', // bg-gray-700
    color: 'white',
    '&:hover': {
      backgroundColor: 'rgb(75 85 99)', // slightly lighter on hover
    },
    '&.Mui-focused': {
      backgroundColor: 'rgb(55 65 81)',
    },
    '& input': {
      color: 'white',
    },
    '& textarea': {
      color: 'white',
    }
  }
});

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

      await updateBlog(id, formData);
      ref?.current?.reset();
      
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

        <ToastContainer />

        <form ref={ref} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <StyledTextField
            id="title"
            label="Title"
            variant="filled"
            fullWidth
            defaultValue={title}
            {...register('title')}
          />

          <StyledTextField
            id="description"
            label="Description"
            variant="filled"
            multiline
            rows={4}
            fullWidth
            defaultValue={description}
            {...register('description', { required: true })}
          />

          <StyledTextField
            id="imageUrl"
            label="Update Image URL"
            variant="filled"
            fullWidth
            defaultValue={imageUrl || ""}
            {...register('imageUrl', { required: true })}
          />

          <StyledTextField
            id="category"
            label="Category"
            variant="filled"
            fullWidth
            defaultValue={category}
            {...register('category', { required: true })}
          />

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