
import React from 'react';
import { IndividualBlog, IndividualComments } from '../../../../action/actions';
import Image from 'next/image';
import Link from 'next/link';
import AddComment from '../../../../components/CommentAddForm'
import Commentlist from '../../../../components/commentListing'


const BlogDetail = async ({ params }) => {
  const id = params?.id;
  console.log(params);
  console.log(id);
  const blog = await IndividualBlog(id);
  console.log(blog);
  const comments=await IndividualComments(id);
  console.log(comments)

  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-gray-900  to-gray-700 text-white p-10">
      <div className="max-w-6xl mx-auto bg-gray-800 border border-white rounded-3xl shadow-2xl p-8">
        {/* Blog Image */}
        <div className="relative overflow-hidden rounded-lg mb-8 shadow-lg">
          <img
            src={blog.imageUrl}
            alt={blog.title}
            width={1280} // You can adjust width/height to the actual dimensions of your image
            height={720} // to maintain image aspect ratio
            className="w-full h-[400px] object-cover transition-transform transform hover:scale-110 duration-300"
          />
        </div>

        {/* Blog Category */}
        <div className="inline-block text-sm font-bold uppercase text-green-300 bg-gray-900 border-2 border-green-400 px-4 py-2 rounded-full mb-6 shadow-md">
          {blog.category}
        </div>

        
      
        <h1 className="text-4xl font-extrabold text-yellow-300 mb-6 leading-tight">
          {blog.title}
        </h1>

        {/* Blog Description */}
        <p className="text-lg text-gray-300 leading-relaxed mb-8">
          {blog.description}
        </p>

        {/* Published Date */}
        <div className="text-sm text-gray-400">
          Published on{' '}
          <span className="font-medium text-gray-300">
            {new Date(blog.publishedAt).toLocaleDateString()}
          </span>
        </div>
        <div className="flex justify-center items-center p-4">
      <Link 
        href={`/blogs/UpdateBlog/${id}`}
        className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-center"
      >
        Update Blog
      </Link>
    </div>
   

      </div>
    </div>
    <div className="min-h-screen bg-gradient-to-br from-gray-900  to-gray-700 text-white p-10">
    <div className="max-w-6xl mx-auto bg-gray-800 border border-white rounded-3xl shadow-2xl p-8">
     <AddComment comments={comments}  blogId={id}/>
     {/* <Commentlist blogId={id}/> */}
     </div>
     </div>     

     </>
  );
};

export default BlogDetail;
