'use client'
import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { updateBlog } from '../action/actions';
import { useRouter } from 'next/navigation'



export default function BlogForm({blog}) {
  const { register, handleSubmit, reset } = useForm();
  console.log(blog);
  const router = useRouter()

  const { id, title, description, imageUrl, category } = blog || {};
  const ref=useRef();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('imageUrl', data.imageUrl);
      formData.append('category', data.category);

      await updateBlog(id,formData); // Directly call the server action

      ref?.current?.reset(); // Reset form after successful submission
      console.log("Blog updated successfully!");

    router.push('/blogs');
    } catch (error) {
      console.error("Error UPDATED blog:", error);
    }
  };
 

  

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Update Blog post</h2>

        {/* Correctly using handleSubmit here */}
        <form ref={ref} onSubmit={handleSubmit(onSubmit)}className="space-y-4">
          {/* Title Field */}
          <TextField
            id="title"
            label="Title"
            variant="outlined"
            defaultValue={title}
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
            defaultValue={description}
            fullWidth
            {...register('description', { required: true })}
          />

          {/* Image URL Field */}
          <TextField
            id="imageUrl"
            label="Upadte Image URL"
            variant="outlined"
            defaultValue={imageUrl?imageUrl:""}
            fullWidth
            {...register('imageUrl', { required: true })}
          />

          {/* Category Field */}
          <TextField
            id="category"
            label="Category"
            variant="outlined"
            defaultValue={category}
            fullWidth
            {...register('category', { required: true })}
          />

          {/* Submit Button */}
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Update Blog
          </Button>
        </form>
      </div>
    </div>
  );
}
