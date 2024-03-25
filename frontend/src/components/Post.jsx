import React from "react";
import { useNavigate } from "react-router-dom";

export default function Post({ data }) {
  const navigate = useNavigate();
  
  return (
    <div className="group mb-4 overflow-hidden border w-[450px] border-purple-300 rounded-lg">
      <div className="overflow-hidden">
        <img className="group-hover:scale-x-110 w-full h-[250px] object-cover" src={data.postImage} />
        <p className="p-3 font-medium text-sm">{data.title}</p>
      </div>
      <button onClick={ () => navigate(`/post/${data._id}`) } className="w-full block border-t hover:bg-purple-400 hover:text-white text-purple-400 rounded-b-lg p-2 border-purple-300">Read article</button>
    </div>
  );
}
