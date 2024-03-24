import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Comment from "../components/Comment";

export default function PostPage() {
  const { postId } = useParams();
  const [loading, setIsLoading] = useState(false);
  const [postData, setPostData] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true);
        const data = await fetch(`/api/post/getpost?postId=${postId}`);
        const res = await data.json();
        if (!data.ok) {
          throw new Error(res.errMessage);
        } else {
          setPostData(res.posts[0]);
          setIsLoading(false);
        }
      } catch (err) {
        console.log(err.message);
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-3xl">
        <h1 className="text-center">Fetching...</h1>
      </div>
    );
  }

  if (postData) {
    return (
      <div className="px-6 py-12">
        <h1 className="text-3xl text-center mb-10 md:max-w-[50%] mx-auto">{ postData.title}</h1>
        <img
          className="w-full md:max-w-[80%] mx-auto"
          src={ postData.postImage}
        />
        <div className="w-full md:max-w-[50%] mx-auto">
          <div className="flex items-center justify-between mt-6 border-b pb-6">
            <span className="text-xs">{new Date(postData.createdAt).toLocaleString()}</span>
            <span className="text-xs italic">{parseInt(postData.content.length / 1000)} mins read</span>
          </div>
          <div
            className="py-6 quill-control"
            dangerouslySetInnerHTML={{
              __html: postData.content }}
          />

          <Comment postId={ postData._id} />
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-3xl">
      <h1>No post found</h1>{" "}
      <Link to={"/search"} className="text-sm text-blue-500 cursor-pointer">
        Back
      </Link>
    </div>
  );
}
