import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

export default function AdminPagePost() {
  const [posts, setPosts] = useState(null);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [chkOffset, setChkOffset] = useState(true);
  const [isFilter, setIsFilter] = useState(false);
  const [fetchingMore, setFetchingMore] = useState(false);
  const user = useSelector((state) => state.user.activeUser);

  const handleMorePost = async () => { 
    try {
      setFetchingMore(true);
      const data = await fetch(
        `/api/post/getpost?offset=${offset + limit}&limit=${limit}${isFilter ? `&userId=${user._id}` : ''}`
      );
      const res = await data.json();
      if (!data.ok) {
        throw new Error(res.errorMessage);
      }
      setChkOffset(res.posts.length === limit);
      setPosts([...posts, ...res.posts]);
      setOffset(offset + limit);
      setFetchingMore(false);
    } catch (err) {
      console.log(err.message);
      setFetchingMore(false);
      setChkOffset(res.posts.length === limit);
    }
  }

  const handleDelete = async (postId) => {
    const validate = confirm("Proceed with deleting post?");
    if (validate && postId) {
      try {
        const data = await fetch(`/api/post/deletepost/${postId}`, {
          method: "DELETE",
        });
        const res = await data.json();
        if (!data.ok) {
          throw new Error(res.errorMessage);
        } else {
          toast.success("Post deleted successfully");
          setPosts(posts.filter((post) => post._id !== postId));
        }
      } catch (err) {
        toast.error("Error deleting post");
        console.log(err.message);
      }
    }
  };

  const handleFilter = async (filter) => {
    try {
      const data = await fetch(
        `/api/post/getpost?offset=0&limit=${limit}${filter ? `?userId=${filter}` : ""}`
      );
      setIsFilter(filter ? true : false);
      setChkOffset(true);
      const res = await data.json();
      if (!data.ok) {
        throw new Error(res.errorMessage);
      }
      setPosts(res.posts);
      setOffset(0);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    handleFilter(user._id);
  }, []);

  return (
    <div className="p-4 grow">
      <div className="w-full py-2 my-2 dark:bg-gray-700 bg-gray-300/50 border rounded-lg px-2 text-center">
        <select
          className="outline-none text-sm bg-transparent"
          onChange={(e) => handleFilter(e.target.value)}
          name=""
          id=""
        >
          <option className='dark:text-gray-600' value={user._id}>My posts</option>
          <option className='dark:text-gray-600' value="">All posts</option>
        </select>
      </div>

      <div className="flex rounded-md gap-3 dark:bg-gray-600 bg-gray-100/80 py-2 text-sm font-medium justify-between px-4">
        <h2 className="w-[20%]">DATE</h2>
        {/* <h2 className="w-[17%]">POST IMAGE</h2> */}
        <h2 className="w-[45%]">POST TITLE</h2>
        <h2 className="w-[20%]">DELETE</h2>
        <h2 className="w-[15%]">EDIT</h2>
      </div>

      {posts &&
        posts.map((post, i) => {
          return (
            <div
              key={i}
              className="flex gap-3 rounded-md py-2 text-sm font-medium justify-between items-start px-3"
            >
              <h2 className="w-[20%] text-xs font-thin">
                {new Date(post.createdAt).toLocaleDateString()}
              </h2>
              {/* <h2 className="w-[17%] rounded-lg overflow-hidden">
                <img className="rounded-lg h-10 w-16" src={post.postImage} />
              </h2> */}
              <h2 className="w-[45%] font-thin text-sm">{post.title}</h2>
              <Link
                onClick={() => handleDelete(post._id)}
                className="w-[20%] text-red-500 cursor-pointer hover:text-red-300"
              >
                Delete
              </Link>
              <Link
                to={`/post/edit/${post._id}`}
                className="w-[15%] text-green-500 cursor-pointer hover:text-green-300"
              >
                Edit
              </Link>
            </div>
          );
        })}
      {posts && posts.length % limit === 0 && chkOffset && <div className="text-center my-6"><button onClick={handleMorePost} disabled={fetchingMore} className="disabled:bg-gray-200/40 text-sm border p-2 rounded-lg bg-gray-300/40 hover:bg-gray-300/90 text-[#6e666e]">{fetchingMore ? 'Showing ...' : `Show More`}</button></div>}
    </div>
  );
}
