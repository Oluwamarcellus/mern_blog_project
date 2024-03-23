import React from 'react'
import { useParams } from 'react-router-dom';

export default function PostPage() {
    const { postId } = useParams();

  return (
    <div>PostPage</div>
  )
}
