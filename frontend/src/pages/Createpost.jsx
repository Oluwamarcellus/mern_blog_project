import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function () {
  return (
    <div className="min-h-screen p-3 mx-auto max-w-3xl">
      <h1 className="mt-6 text-center text-3xl font-medium">Create post</h1>
      <form className="mt-6">
        <input
          className="text-sm border w-full p-2 rounded-lg outline-none focus:border-2 focus:border-purple-400"
          type="text"
          name="title"
          id="title"
          placeholder="Title"
          required
        />
        <div className="mt-4 border-4 border-dotted border-purple-400 p-4 rounded-md flex justify-between items-center">
          <label
            className="flex items-center overflow-hidden border rounded-lg "
            htmlFor="image"
          >
            <h1 className="text-white text-sm p-2 cursor-pointer bg-black/60 font-medium">
              Choose File
            </h1>
            <h1 className="p-2 text-sm">{"No file chosen"}</h1>
          </label>
          <input className="hidden" type="file" name="image" id="image" />
          <button
            className="text-sm font-medium border hover:text-white hover:bg-black/60 border-purple-500/30 rounded-xl px-3 py-2 cursor-pointer"
            type="button"
          >
            Upload Image
          </button>
        </div>
        <ReactQuill
          className="mt-4 h-80"
          theme="snow"
          placeholder="Type here..."
          required
        />
        <button type="submit" className="bg-gradient-to-r from-orange-500 to-purple-500 rounded-xl px-3 py-2 cursor-pointer w-full text-white mt-14 mb-2 ">Upload post</button>
      </form>
    </div>
  );
}
