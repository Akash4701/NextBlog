'use server';
import { PrismaClient } from '@prisma/client';
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export const addBlog = async (formData) => {
  try {
    const imageUrl = formData.get('imageUrl');
    const title = formData.get('title');
    const category = formData.get('category');
    const description = formData.get('description');

    console.log('Received form data:', { imageUrl, title, category, description });

    if (!title || !category || !description) {
      throw new Error('Missing required fields: title, category, or description');
    }

    const new_blog = await prisma.blog.create({
      data: {
        imageUrl: imageUrl || null,
        title,
        category,
        description,
      },
    });

    console.log('New blog created:', new_blog);
    return new_blog;
  } catch (error) {
    console.error('Error in addBlog function:', error.message || error);
    throw new Error('Failed to create blog');
  } finally {
    await prisma.$disconnect(); // Ensure disconnection
  }
};

export const fetchBlogs = async () => {
  try {
    const blogs = await prisma.blog.findMany();
    return blogs;
  } catch (error) {
    console.error('Error in fetching blogs:', error.message || error);
    throw new Error('Failed to fetch blog');
  } finally {
    await prisma.$disconnect(); // Ensure disconnection
  }
};

 export const IndividualBlog=async(id)=>{
  try{
    const blog=await prisma.blog.findFirst({
      where:{
        id:id
      }
    })
    return blog
  }catch(error){
    console.log("error in fetching individula blog",error.message||error);
    throw new Error('Failed to fetch blog');
  }
 }



export const updateBlog = async (id, formData) => {
  try {
    const imageUrl = formData.get('imageUrl');
    const title = formData.get('title');
    const category = formData.get('category');
    const description = formData.get('description');

    console.log('Received form data:', { imageUrl, title, category, description });

    if (!title || !category || !description) {
      throw new Error('Missing required fields: title, category, or description');
    }

    // Update the blog post in the database
    const updated_blog = await prisma.blog.update({
      where: {
        id: id
      },
      data: {
        imageUrl: imageUrl || null,
        title,
        category,
        description,
      }
    });

    console.log('New blog updated:', updated_blog);

    // Revalidate the path to refresh the blog page
    revalidatePath(`/blogs/UpdateBlog/${id}`);

    // Redirect to the blogs list page after the update
    
    
    return updated_blog; // Return the updated blog data if needed

  } catch (error) {
    console.error('Error in updateBlog function:', error.message || error);
    throw new Error('Failed to update blog');
  } finally {
    await prisma.$disconnect(); // Ensure disconnection
  }
};

export const SearchBlogs=async(query)=>{
  try {
    const blogs=await prisma.blog.findMany({
      where:query?{
        OR:[
          {title:{contains:query}},
          {category:{contains:query}}
        ],
      }:{}
      
    })

    revalidatePath(`\blogs`)
    return blogs;
  
  }catch(error){
    console.log("error in searching blogs",error.message||error)
    throw new error("failed to search blogs");
  }
}

export const AddComment = async (id, formData) => {
  try {
    // Extract the text value from formData
    const text = formData.get('text');

    // Create the comment in the database
    const added_comment = await prisma.comments.create({
      data: {
        blogId: id, // Assuming you're relating the comment to a blog post via its ID
        text: text
      }
    });
    

    revalidatePath(`/blogs/${id}`)

    return added_comment;

  } catch (error) {
    console.log("Error in adding comment", error.message || error);
  }
};

export const IndividualComments=async({id})=>{
  try{
    const comments=await prisma.comments.findMany({
      where:{
        id:id
    },
    orderBy:{
      createdAt:"desc"
    }

  })
  revalidatePath(`/blogs/${id}`)

  return comments
  }catch(error){
    console.log("error in fetching individual comments",error.message||error);
    throw new error("failed to fetch individual comments");
  }
}

export const deleteComment=async(Commentid,BLogId)=>{

  try{
    const deletedcomments=await prisma.comments.delete({
      where:{
        id:Commentid

      }
  })
  revalidatePath(`/blogs/${BLogId}`)
  return deletedcomments

  
  }catch(error){
    console.log("error in deleting comment",error.message||error);
    throw new Error("failed to delete comment");
  }
}


