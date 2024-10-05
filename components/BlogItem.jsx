'use client';
import Link from 'next/link';
import React from 'react';

function BlogItem({ blog }) {
  const { id, title, description, imageUrl, category } = blog || {};

  return (
    <div className="bg-slate-700 p-8 border-2 border-gray-200 hover:border-yellow-500 transition-all duration-300 mx-4 my-6 rounded-3xl shadow-lg transform hover:scale-110 hover:shadow-2xl">
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
        <h2 className="text-3xl md:text-4xl text-yellow-300 font-bold mb-4 tracking-tight leading-snug hover:text-yellow-400 transition-colors duration-300 mt-3">
          {title}
        </h2>
      </Link>

      {/* Blog Description */}
      <p className="italic text-gray-500 text-base leading-relaxed line-clamp-3">
        {description.slice(0, 40)} ...
      </p>

      {/* Read More Button */}
      <Link href={`/blogs/${id}`}>
        <button className="mt-6 bg-yellow-500 text-gray-500 font-semibold py-2 px-6 rounded-full shadow-md hover:bg-yellow-400 transition-colors duration-300">
          Read More...
        </button>
      </Link>
    </div>
  );
}

export default BlogItem;
