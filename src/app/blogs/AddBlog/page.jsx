'use client';
import React, { useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";
import { techCategories } from '../../../../components/tech/techcategories';
import { techtags } from '../../../../components/tech/techtags'
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { addBlog } from '../../../../action/actions';

export default function BlogForm() {
  const [selectedTags, setSelectedTags] = useState([]);
  const router = useRouter();
  const { register, handleSubmit, reset, control, setValue, formState: { errors } } = useForm();
  const ref = useRef();

  // Handles adding a tag from dropdown
  const handleTagChange = (event) => {
    setSelectedTags(event.target.value);
    setValue('tags', event.target.value); // Set form value for tags
  };

  const onSubmit = async (data) => {
    console.log('data',data);
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('imageUrl', data.imageUrl);
      formData.append('category', data.category);
      // formData.append('tags', JSON.stringify(selectedTags));
      data.tags.forEach(tag => {
        formData.append('tags[]', tag);  // Append each tag separately
      });

      const res = await addBlog(formData);
      console.log('formData',formData)
      if (res) {
        router.push('/blogs');
        toast.success("Blog created successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        ref?.current?.reset();
      }
    } catch (error) {
      toast.error(`Error creating blog: ${error.message}`, {
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 text-white flex justify-center items-center py-12">
      <ToastContainer />
      <div className="w-full max-w-lg mx-auto bg-gray-800 border border-gray-700 rounded-3xl shadow-2xl p-8">
        <h2 className="text-3xl font-extrabold text-center text-violet-500 mb-8">Create a New Blog Post</h2>
        
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
            select
            {...register('category', { required: true })}
            InputLabelProps={{ className: "text-gray-300" }}
            InputProps={{ className: "text-white bg-gray-700" }}
          >
            {techCategories.map((category) => (
              <MenuItem key={category.value} value={category.value}>
                {category.label}
              </MenuItem>
            ))}
          </TextField>

          {/* Tags Input - Dropdown with Chips */}
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-300">Blog Tags *</label>
            <Controller
              name="tags"
              control={control}
              defaultValue={[]}
              render={({ field }) => (
                <Select
                  {...field}
                  multiple
                  value={selectedTags}
                  onChange={handleTagChange}
                  renderValue={(selected) => (
                    <div className="flex flex-wrap gap-2">
                      {selected.map((tag) => (
                        <Chip key={tag} 
                        label={tag} 
                        onDelete={() => handleTagDelete(tag)}
                        className="bg-gray-700 text-white" />
                      ))}
                    </div>
                  )}
                  className="mt-2 w-full bg-gray-800 text-white"
                  inputProps={{
                    MenuProps: {
                      PaperProps: {
                        style: {
                          backgroundColor: "#333",
                          color: "#fff",
                        },
                      },
                    },
                  }}
                >
                  {techtags.map((tag) => (
                    <MenuItem key={tag.value} value={tag.value}>
                      {tag.label}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </div>

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
