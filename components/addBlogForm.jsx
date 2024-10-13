import React from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { addBlog } from '../action/actions';


export default function BlogForm() {
  const { register, handleSubmit, reset } = useForm();

  const addBlogForm = async (formdata) => {
    await addBlog(formdata); // This will call the backend action to add the blog
    console.log(formdata); // Logs the form data
    // reset(); // Resets the form after successful submission
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create a new blog post</h2>

        {/* Correctly using handleSubmit here */}
        <form onSubmit={handleSubmit()} className="space-y-4">
          {/* Title Field */}
          <TextField
            id="title"
            label="Title"
            variant="outlined"
            fullWidth
            {...register('title')}
          />

          {/* Description Field */}
          <TextField
            id="description"
            label="Description"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            {...register('description', { required: true })}
          />

          {/* Image URL Field */}
          <TextField
            id="imageUrl"
            label="Image URL"
            variant="outlined"
            fullWidth
            {...register('imageUrl', { required: true })}
          />

          {/* Category Field */}
          <TextField
            id="category"
            label="Category"
            variant="outlined"
            fullWidth
            {...register('category', { required: true })}
          />

          {/* Submit Button */}
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Add Blog
          </Button>
        </form>
      </div>
    </div>
  );
}
