import React from "react";

export default function Post({ data }) {
  return (
    <div className="mb-4 overflow-hidden border w-[450px] border-purple-500 rounded-lg">
      <div>
        <img className="w-full h-[250px] object-cover" src={data.imageUrl} />
        <p className="p-3 font-medium text-sm">{data.title}</p>
      </div>
      <button className="w-full block border-t hover:bg-purple-500 hover:text-white text-purple-500 rounded-b-lg p-2 border-purple-500">Read article</button>
    </div>
  );
}
