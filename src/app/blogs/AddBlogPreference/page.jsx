import React from 'react'
import { findBlogTags } from '../../../../action/actions';

const Addblogpreference=async()=> {
  const tags=await findBlogTags();
  console.log('tags..',tags);

  return (
    <h1 className='text-3xl justify-center align-middle'>Add Blog Preference</h1>
  )
}

export default Addblogpreference;