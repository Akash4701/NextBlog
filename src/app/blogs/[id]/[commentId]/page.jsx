import React from 'react'

function Comment({params}) {
    console.log(params);
    console.log(params?.commentId);
  return (
    <div>Comment</div>
  )
}

export default Comment