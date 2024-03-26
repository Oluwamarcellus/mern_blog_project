import { FaUsers } from "react-icons/fa6";
import { MdComment } from "react-icons/md";
import { MdPostAdd } from "react-icons/md";
import { FaArrowUpLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [comments, setComments] = useState(null);
  const [users, setUsers] = useState(null);
  const [posts, setPosts] = useState(null);

  const getComments = async () => {
    try {
      const data = await fetch("/api/comment/allcomments");
      const res = await data.json();
      if (!data.ok) {
        throw new Error(res.errorMessage);
      }
      setComments(res);
    } catch (err) {
      console.log(err.message);
    }
  };

  const getUsers = async () => {
    try {
      const data = await fetch("/api/user/getusers");
      const res = await data.json();
      if (!data.ok) {
        throw new Error(res.errorMessage);
      }
      setUsers(res);
    } catch (err) {
      console.log(err.message);
    }
  };

  const getPosts = async () => {
    try {
      const data = await fetch("/api/post/getpost?limit=5");
      const res = await data.json();
      if (!data.ok) {
        throw new Error(res.errorMessage);
      }
      setPosts(res);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getComments();
    getUsers();
    getPosts();
  }, []);

  return (
    <div className="px-6 py-8 min-h-screen grow">
      <div className="justify-center flex flex-col flex-wrap gap-6 md:flex-row items-center">
        <div className="w-full md:w-[31%] bg-gray-300/20 rounded-lg p-3 shadow-md">
          <div className="flex justify-between pb-4">
            <div>
              <h2>TOTAL USERS</h2>
              <p className="text-3xl">{users ? users.totalUser : "0"}</p>
            </div>
            <div className="bg-gray-400 rounded-full p-2 w-10 h-10 flex justify-center items-center">
              <FaUsers className=" text-white" />
            </div>
          </div>
          <div className="flex gap-4 text-sm">
            <div className="flex">
              <FaArrowUpLong className="text-green-400" />
              <span>{users ? users.totalUserLastMonth : "0"}</span>
            </div>
            <p className="text-sm">Last month</p>
          </div>
          <Link
            to="/profile?action=users"
            className="block mx-auto text-center bg-teal-400 p-2 rounded-lg text-white mt-4 cursor-pointer hover:bg-teal-300 text-sm"
          >
            Explore
          </Link>
        </div>

        <div className="w-full md:w-[31%] bg-gray-300/20 rounded-lg p-3 shadow-md">
          <div className="flex justify-between pb-4">
            <div>
              <h2>TOTAL POSTS</h2>
              <p className="text-3xl">{posts ? posts.totalPosts : "0"}</p>
            </div>
            <div className="bg-blue-400 rounded-full p-2 w-10 h-10 flex justify-center items-center">
              <MdPostAdd className=" text-white" />
            </div>
          </div>
          <div className="flex gap-4 text-sm">
            <div className="flex">
              <FaArrowUpLong className="text-green-400" />
              <span>{posts ? posts.totalPostsLastMonth : "0"}</span>
            </div>
            <p className="text-sm">Last month</p>
          </div>
          <Link
            to="/profile?action=posts"
            className="block mx-auto text-center bg-teal-400 p-2 rounded-lg text-white mt-4 cursor-pointer hover:bg-teal-300 text-sm"
          >
            Explore
          </Link>
        </div>

        <div className="w-full md:w-[31%] bg-gray-300/20 rounded-lg p-3 shadow-md">
          <div className="flex justify-between pb-4">
            <div>
              <h2>TOTAL COMMENTS</h2>
              <p className="text-3xl">
                {comments ? comments.totalComment : "0"}
              </p>
            </div>
            <div className="bg-green-400 rounded-full p-2 w-10 h-10 flex justify-center items-center">
              <MdComment className=" text-white" />
            </div>
          </div>
          <div className="flex gap-4 text-sm">
            <div className="flex">
              <FaArrowUpLong className="text-green-400" />
              <span>{comments ? comments.totalCommentLastMonth : "0"}</span>
            </div>
            <p className="text-sm">Last month</p>
          </div>
          <Link
            to="/profile?action=comments"
            className="block mx-auto text-center bg-teal-400 p-2 rounded-lg text-white mt-4 cursor-pointer hover:bg-teal-300 text-sm"
          >
            Explore
          </Link>
        </div>
      </div>

      <div className="mt-10">
        <div className="md:max-w-[70%] md:mx-auto">
          <div className="flex justify-between px-4 py-2 items-center">
            <h2 className="font-medium">Recent posts</h2>
            <Link
              className="border p-2 rounded-lg text-sm font-medium bg-teal-400 text-white hover:bg-teal-200"
              to="/profile?action=posts"
            >
              See all
            </Link>
          </div>
          <div className="flex rounded-md bg-gray-100/80 py-2 text-sm font-medium justify-between px-4">
            <h2 className="w-[25%]">POST IMAGE</h2>
            <h2 className="w-[50%]">POST TITLE</h2>
            <h2 className="w-[25%] text-start">TIME CREATED</h2>
          </div>
          {posts &&
            posts.posts.map((post, i) => {
              return (
                <div
                  key={i}
                  className="flex gap-2 rounded-md py-2 text-sm font-medium justify-between items-center px-4"
                >
                  <h2 className="w-[25%] rounded-lg overflow-hidden">
                    <img
                      className="rounded-lg h-10 w-16"
                      src={post.postImage}
                    />
                  </h2>
                  <h2 className="w-[50%] font-thin text-sm">{post.title}</h2>
                  <h2 className="w-[25%] text-start text-xs font-thin">
                    {new Date(post.createdAt).toLocaleString()}
                  </h2>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
