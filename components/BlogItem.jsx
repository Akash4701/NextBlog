'use client';
import Link from 'next/link';
import React from 'react';
import { deleteBlogs } from '../action/actions';

function BlogItem({ blog }) {
  const { id, title, description, imageUrl, category } = blog || {};

  const deletebloghandler = async (blogid) => {
    try {
      const deleteBlog = await deleteBlogs(blogid);
      if (deleteBlog) {
        console.log('Blog deleted successfully');
      }
    } catch (error) {
      console.log('Failed to delete blog');
      console.error(error.message || error);
    }
  };

  return (
    <div className="bg-gray-700 p-8 border-2 border-gray-600 hover:border-yellow-500 transition-all duration-300 mx-4 my-6 rounded-3xl shadow-lg transform hover:scale-105 hover:shadow-2xl">
      {/* Blog Image */}
      <div className="relative overflow-hidden rounded-xl shadow-lg mb-6 transition-transform duration-300 transform hover:scale-105">
        <Link href={`/blogs/${id}`}>
          <img
            src={imageUrl}
            className="w-full h-[350px] object-cover rounded-xl transition-transform duration-500 hover:scale-110"
            alt="blog"
          />
        </Link>
      </div>

      {/* Category Tag */}
      <div className="inline-block bg-indigo-500 text-green-300 border-2 border-green-400 text-xs font-bold uppercase px-4 py-2 rounded-full mb-4 tracking-wider shadow-md">
        {category}
      </div>

      {/* Blog Title */}
      <Link href={`/blogs/${id}`}>
        <h2 className="text-3xl md:text-4xl text-yellow-300 font-bold mb-4 tracking-tight leading-snug hover:text-yellow-400 transition-colors duration-300">
          {title}
        </h2>
      </Link>

      {/* Blog Description */}
      <p className="italic text-gray-400 text-base leading-relaxed line-clamp-3 mb-4">
        {description.slice(0, 80)}...
      </p>

      {/* Read More Button */}
      <Link href={`/blogs/${id}`}>
        <button className="mt-4 bg-yellow-500 text-gray-800 font-semibold py-2 px-6 rounded-full shadow-md hover:bg-yellow-400 transition-colors duration-300">
          Read More...
        </button>
      </Link>

      {/* Delete Blog Button */}
      <button
        className="mt-6 ml-5 bg-red-600 text-white font-semibold py-2 px-6 rounded-full shadow-md hover:bg-red-500 hover:text-gray-100 transition-colors duration-300"
        onClick={() => deletebloghandler(id)}
      >
        Delete Blog
      </button>
    </div>
  );
}

export default BlogItem;
