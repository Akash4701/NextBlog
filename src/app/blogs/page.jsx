import React from 'react';
import { fetchBlogs } from '../../../action/actions';
import BlogItem from '../../../components/BlogItem';
import Search from '../../../components/Search'
import {SearchBlogs} from '../../../action/actions'
// import Navbar from '../../../components/Navbar';

const Blogs = async ({searchParams}) => {
  // const blogs = await fetchBlogs();
  console.log(searchParams);
  console.log(searchParams.query)
  const query=searchParams.query;
  // console.log(blogs);
  const blogs=await SearchBlogs(query);

  

  return (
    <>
  
    
    <div className="min-h-screen bg-gradient-to-br from-gray-900  to-gray-700 text-white p-2">
    <div className="w-full mx-auto bg-gray-800 border  rounded-3xl shadow-2xl p-8">
  
    <Search/>
      <h1 className='text-center text-4xl font-extrabold mt-8 px-4 py-6 text-violet-500 border-2 border-violet-600  bg-clip-text'>
        All Blogs
      </h1>
      <div className=' mx-auto'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 mb-12 px-6'>
          {blogs?.length > 0 &&
            blogs.map((blog) => (
              <BlogItem key={blog?.id} blog={blog} />
            ))}
        </div>
      </div>
      </div>
      </div>
      

    </>
  );
};

export default Blogs;
