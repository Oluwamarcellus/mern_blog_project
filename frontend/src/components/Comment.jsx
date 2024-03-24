import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiFillLike } from "react-icons/ai";

export default function Comment() {
  const user = useSelector((state) => state.user.activeUser);
  const [textareaLimit, setTextareaLimit] = useState(200);
  const [commentData, setCommentData] = useState(null);

  console.log(user);
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
                className="w-full p-3 text-sm outline-none border rounded-lg placeholder:text-sm"
                name="comment"
                id="comment"
                maxLength={200}
                placeholder="Write you comment..."
                onChange={(e) => setTextareaLimit(200 - e.target.value.length)}
              ></textarea>
              <div className="flex items-center justify-between py-2">
                <span className="text-xs text-gray-500/70">
                  {textareaLimit.toString()} characters remaining
                </span>
                <button className="text-sm font-medium border-2 border-teal-500 hover:bg-teal-300 hover:border-teal-300 hover:text-white px-3 py-2 rounded-lg">
                  Submit
                </button>
              </div>
            </div>
          </div>
        ) : (
          <h1 className="text-sm text-green-400">
            You need to sign in to comment.{" "}
            <Link className="text-blue-400" to="/login">
              Log in
            </Link>
          </h1>
        )}
      </div>
      <div className="py-6 ">
        {!commentData ? (
          <div className="">
            <div className="text-sm">
              <h1>
                Comments <span className="border p-1 border-black/40">48</span>
              </h1>
            </div>

            <div className="p-6 my-4">
                          
              <div className="flex gap-3 border-b py-4">
                <img
                  className="h-10 w-10 rounded-full object-cover"
                  src={user.imageUrl}
                  alt=""
                />
                <div>
                  <h1 className="text-sm mb-2 font-medium">@{user.username}</h1>
                  <p className="text-xs text-gray-500/90">
                    You are one of youtubers that still give me hope not to give
                    up on programing and continue learning like you, thank you
                    sir much love- Zambia.
                  </p>
                  <div className="flex mt-3 gap-4">
                    <div className="flex items-center gap-1">
                      <AiFillLike />
                      <span className="text-xs">1 like</span>
                    </div>
                  </div>
                </div>
              </div>
                          
            </div>
          </div>
        ) : (
          <h1 className="text-center">Fetching Ccomments...</h1>
        )}
      </div>
    </div>
  );
}
