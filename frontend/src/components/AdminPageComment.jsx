import React, { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { useSelector } from "react-redux";

export default function AdminPageComment() {
  const [comments, setComments] = useState(null);
  const user = useSelector((state) => state.user.activeUser);

  const handleDelete = async (commentId) => { 
    if (!user || !user.anAdmin) { 
      alert("Unauthorized to delete the comment");
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
        setComments(comments.filter((comment) => comment._id !== commentId));
      }
    } catch (error) { 
      console.log(error.message);
    }
  }

  const getComments = async () => {
    try {
      const data = await fetch("/api/comment/allcomments");
      const res = await data.json();
      if (!data.ok) {
        throw new Error(res.errorMessage);
      }
      setComments(res.comments);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <div className="p-4 overflow-auto grow">
      <div className="flex rounded-md gap-2 dark:bg-gray-600 bg-gray-100/80 py-2 text-sm font-medium justify-between px-4">
        <h2 className="w-[15%]">DATE</h2>
        <h2 className="w-[30%]">COMMENT</h2>
        <h2 className="w-[50%]">USER ID</h2>
        <h2 className="w-[5%]">DEL</h2>
      </div>

      {comments &&
        comments.map((comment, i) => {
          return (
              <div
                key={i}
                className="flex gap-2 rounded-md py-2 text-sm font-medium justify-between items-center px-3"
              >
                <h2 className="w-[15%] text-xs font-thin">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </h2>
                <h2 className="relative pl-1 w-[30%] rounded-lg font-thin text-xs overflow-hidden">
                      { comment.content}
                </h2>
                <h2 className="w-[50%] font-thin text-xs overflow-hidden">{comment.userId}</h2>
              <div onClick={ () => handleDelete(comment._id) } className="w-[5%]">
                  <MdDeleteForever className="text-red-500 cursor-pointer text-lg" />
                </div>
              </div>
          );
        })}
    </div>
  );
}
