'use client';
import React, { useRef } from 'react';
import { useForm } from "react-hook-form";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { addBlog } from'../../../../action/actions'; // Import the server action

export default function BlogForm() {
  const { register, handleSubmit, reset } = useForm();
  const ref = useRef();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('imageUrl', data.imageUrl);
      formData.append('category', data.category);

      await addBlog(formData); // Directly call the server action

      ref?.current?.reset(); // Reset form after successful submission
      console.log("Blog created successfully!");
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 text-white flex justify-center items-center py-12">
      <div className="w-full max-w-lg mx-auto bg-gray-800 border border-gray-700 rounded-3xl shadow-2xl p-8">
        <h2 className="text-3xl font-extrabold text-center text-white mb-8">Create a New Blog Post</h2>
        
        <form ref={ref} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          {/* Title Field */}
          <TextField
            id="title"
            label="Title"
            variant="filled"
            fullWidth
            {...register('title', { required: true })}
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
            {...register('description', { required: true })}
            InputLabelProps={{ className: "text-gray-300" }}
            InputProps={{ className: "text-white bg-gray-700" }}
          />

          {/* Image URL Field */}
          <TextField
            id="imageUrl"
            label="Image URL"
            variant="filled"
            fullWidth
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
            Add Blog
          </Button>

        </form>
      </div>
    </div>
  );
}
