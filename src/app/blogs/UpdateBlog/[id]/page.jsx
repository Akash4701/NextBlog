
import React from 'react'
import { IndividualBlog } from '../../../../../action/actions';
import UpdateBlogForm from '../../../../../components/UpdateBlogForm';

const updateBlog=async({params})=> {
    const id=params?.id;
    const blog=await IndividualBlog(id);
    console.log(blog)

  return (
    <>
    <div>UpdateBlog:{id}</div>

    <UpdateBlogForm blog={blog}/>
    </>
  )
}

export default updateBlog