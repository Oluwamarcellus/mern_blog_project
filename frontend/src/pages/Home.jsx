import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Post from "../components/Post";

export default function Home() {
  const [postData, setPostData] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await fetch("/api/post/getpost?limit=6");
        const res = await data.json();
        if (!data.ok) {
          throw new Error(res.errMessage);
        } else {
          setPostData(res.posts);
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchPost();
  }, []);

  return (
    <div className="min-h-screen px-3 pb-10 pt-24">
      <div className="flex flex-col lg:flex-row items-center gap-4">
        <div className="w-full mb-16 flex-1">
          <h2 className="text-3xl font-medium mb-4">Welcome,</h2>
          <p className="text-sm mb-2">
            {" "}
            Here, you'll discover an array of meticulously crafted articles and
            tutorials covering an extensive spectrum of topics, including web
            development, software engineering, and programming languages
          </p>
          <Link
            className="text-sm font-medium text-blue-400/70 hover:text-blue-400/100"
            to="/search"
          >
            Continue to posts section
          </Link>
        </div>
        <img
          className="w-full h-80 flex-1"
          src="https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/12/blog-examples-1.jpg"
        />
      </div>
      <div className="my-20">
        <h2 className="text-center text-2xl font-medium">Recent Posts</h2>
        <div className="my-4 flex flex-wrap justify-center gap-x-8 gap-y-4">
          {postData.length > 0 ? (
            postData.map((post, i) => <Post data={post} height={ 2 } />)
          ) : isLoading ? (
            <h2>Loading...</h2>
          ) : (
            <h2>No posts found</h2>
          )}
        </div>
        <div className="text-center">
        <Link className="text-sm border p-2 rounded-lg bg-gray-300/40 hover:bg-gray-300/90 text-[#6e666e]" to={"/search"}>Explore more posts</Link>
      </div>
      </div>
      
    </div>
  );
}
