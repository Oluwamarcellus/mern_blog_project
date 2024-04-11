import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiFillLike } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

export default function Comment({ postId }) {
  const user = useSelector((state) => state.user.activeUser);
  const [textareaLimit, setTextareaLimit] = useState(200);
  const [textareaData, setTextareaData] = useState("");
  const [commentData, setCommentData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const textAreaRef = useRef(null);

  const handleCommentSubmit = async () => {
    if (!textareaData) return;
    try {
      setIsLoading(true);
      const data = await fetch("/api/comment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: textareaData,
          postId: postId,
          userId: user._id,
          userImage: user.imageUrl,
          userName: user.username,
        }),
      });
      const res = await data.json();
      if (!data.ok) {
        throw new Error(res.errorMessage);
      } else {
        setIsLoading(false);
        setCommentData([res, ...commentData]);
        setTextareaData("");
        textAreaRef.current.value = "";
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err.message);
    }
  };

  useEffect(() => {
    const fetchComment = async () => {
      try {
        setIsLoading(true);
        const data = await fetch(`/api/comment/getcomment/${postId}`);
        const res = await data.json();
        if (!data.ok) {
          throw new Error(res.errorMessage);
        } else {
          setIsLoading(false);
          setCommentData(res);
          setTextareaData("");
        }
      } catch (err) {
        setIsLoading(false);
        console.log(err.message);
      }
    };

    fetchComment();
  }, [postId]);
  
  const handleLike = async (commentId) => {
    if (!user) {
      alert("Please sign in to like a comment");
      return;
    }
    try { 
      const data = await fetch(`/api/comment/likecomment/${commentId}`, {
        method: "PUT",
      });
      const res = await data.json();
      if (!data.ok) {
        throw new Error(res.errorMessage);
      } else {
        setCommentData(commentData.map((comment) => {
          return comment._id !== commentId ? comment : res;
        }));
      }
    } catch (err) {
      console.log(err.message);
     }
  }
  
  const handleDelete = async (commentId) => {
    if (!user) {
      alert("Please sign in");
      return;
    }
    const validate = confirm("Proceed to delete the comment?");
    if (!validate) {
      return;
    }
    try { 
      const data = await fetch(`/api/comment/deletecomment/${commentId}`, {
        method: "DELETE",
      });
      const res = await data.json();
      if (!data.ok) {
        throw new Error(res.errorMessage);
      } else {
        setCommentData(commentData.filter((comment) => comment._id !== commentId));
      }
    } catch (err) {
      console.log(err.message);
     }
  }

  return (
    <div className="pt-2">
      <div>
        {user ? (
          <div>
            <div className="flex items-center">
              <h1 className="text-sm">Signed in as: </h1>
              <img
                className="ml-1 h-5 w-5 object-cover rounded-full"
                src={user.imageUrl}
              />
              <Link
                to="/profile?action=profile"
                className="text-xs ml-1 text-blue-400"
              >
                @{user.username}
              </Link>
            </div>
            <div className="border-2 rounded-lg overflow-hidden p-4 mt-3">
              <textarea
                className="dark:text-gray-600 w-full p-3 text-sm outline-none border rounded-lg placeholder:text-sm"
                name="comment"
                id="comment"
                maxLength={200}
                placeholder="Write you comment..."
                ref={ textAreaRef}
                onChange={(e) => {
                  setTextareaLimit(200 - e.target.value.length);
                  setTextareaData(e.target.value);
                }}
              ></textarea>
              <div className="flex items-center justify-between py-2">
                <span className="dark:text-gray-300 text-xs text-gray-500/70">
                  {textareaLimit.toString()} characters remaining
                </span>
                <button
                  disabled={isLoading}
                  onClick={handleCommentSubmit}
                  className={`${
                    isLoading ? "opacity-50" : ""
                  } text-sm font-medium border-2 border-teal-500 hover:bg-teal-300 hover:border-teal-300 hover:text-white px-3 py-2 rounded-lg`}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        ) : (
          <h1 className="text-sm text-green-400">
            You need to sign in to comment.{" "}
            <Link className="text-blue-400" to="/signin">
              Log in
            </Link>
          </h1>
        )}
      </div>
      <div className="py-6 ">
        {commentData.length > 0 ? (
          <div className="">
            <div className="text-sm">
              <h1>
                Comments{" "}
                <span className="dark:border-gray-400 border p-1 border-black/40">
                  {commentData.length}
                </span>
              </h1>
            </div>

            <div className="p-6 my-4">
              {commentData.map((comment, i) => (
                <div key={i} className="flex gap-3 border-b py-4">
                  <img
                    className="h-10 w-10 rounded-full object-cover"
                    src={comment.userImage || ""}
                    alt=""
                  />
                  <div>
                    <h1 className="text-sm mb-2 font-medium">
                      @{comment.userName || "Anonymous"}
                    </h1>
                    <p className="dark:text-gray-400 text-xs text-gray-500/90">
                      {comment.content}
                    </p>
                    <div className="flex mt-3 gap-4">
                      <div className="flex items-center gap-1">
                        <AiFillLike onClick={() => handleLike(comment._id)} className={`${user && comment.likes.includes(user._id) ? "text-blue-400" : ""} cursor-pointer`} />
                        <span className="text-xs">
                          {comment.totalLikes}{" "}
                          {comment.totalLikes > 1 ? "likes" : "like"}
                        </span>
                      </div>

                      { (user?.anAdmin || user?._id === comment.userId) && <div onClick={() => handleDelete(comment._id)} className="group flex items-center gap-1 cursor-pointer">
                        <MdDelete className="group-hover:text-red-500"/>
                        <span className="group-hover:text-red-400 text-xs">Delete</span>
                      </div> }

                    </div>
                  </div>
                </div>
              ))}

            </div>
          </div>
        ) : isLoading ? (
          <h1 className="text-center">Fetching comments...</h1>
        ) : (
          <h1 className="text-center">No comments</h1>
        )}
      </div>
    </div>
  );
}
