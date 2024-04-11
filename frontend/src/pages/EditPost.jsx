import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom'
import app from '../firebase/firbase';

export default function EditPost() {
  const { postId } = useParams();
  const [loading, setIsLoading] = useState(false);
  const [postData, setPostData] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [imageUploadProgress, setImageUploadProgress] = useState(false);
  const [postUploadProgress, setPostUploadProgress] = useState(false);
  const [imageUploadError, setImageUploadError] = useState("");
  const [postUploadError, setPostUploadError] = useState("");
  const [postUploadSuccess, setPostUploadSuccess] = useState("");
  const user = useSelector((state) => state.user.activeUser);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    try {
      setImageData(e.target.files[0]);
      setImageUploadError("");
      setPostUploadSuccess("");
    } catch (err) {
      console.log(err.mesage);
    }
  };

  const handleImageUpload = async () => {
    if (!imageData) {
      setImageUploadError("Please select an image");
    }
    try {
      const storage = getStorage(app);
      const fileName = imageData.name + new Date().getTime();
      const storageRef = ref(storage, fileName);
      const task = uploadBytesResumable(storageRef, imageData);
      task.on(
        "state_changed",
        (snapshot) => {
          setImageUploadProgress(true);
        },
        (error) => {
          setImageUploadError(error.message);
          setImageUploadProgress(false);
        },
        () => {
          getDownloadURL(task.snapshot.ref).then((downloadURL) => {
            setPostData({ ...postData, postImage: downloadURL });
            setImageUrl(downloadURL);
            setImageUploadProgress(false);
          });
        }
      );
    } catch (err) {
      setImageUploadError("Error uploading image, try again later!");
    }
  };

  const handlePostUpload = async () => {
    setPostUploadSuccess("");
    setPostUploadProgress(true);
    if (Object.keys(postData).length === 0) {
      setPostUploadError("Please fill out the form");
      return;
    }
    const { content, title } = postData;
    if (!content || !title) {
      setPostUploadError("Post content and title cannot be empty");
      return;
    }

    try {
      const data = await fetch(`/api/post/editpost/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...postData }),
      });
      const res = await data.json();
      if (!data.ok) {
        setPostUploadError(res.errorMessage);
        setPostUploadProgress(false);
      } else {
        setPostUploadSuccess("Post published successfully");
        setPostUploadProgress(false);
        navigate(`/post/${res?._id}`);
      }
    } catch (err) {
      setPostUploadError(err.message || "Failed to upload, try again later");
      setPostUploadProgress(false);
    }
  };

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
          setImageUrl(res.posts[0].postImage);
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
      <div className="min-h-screen p-3 mx-auto max-w-3xl">
        <h1 className="mt-6 text-center text-3xl font-medium">Edit post</h1>
        <form className="mt-6 mb-4">
          <input
            className="dark:text-gray-600 text-sm border w-full p-2 rounded-lg outline-none focus:border-2 focus:border-purple-400"
            type="text"
            name="title"
            id="title"
            value={postData.title}
            placeholder="Title"
            required
            onChange={(e) => {
              setPostData({ ...postData, title: e.target.value });
            }}
          />
          <div className="mt-4 border-4 border-dotted border-purple-400 p-4 rounded-md flex justify-between items-center">
            <label
              className="flex items-center overflow-hidden border rounded-lg "
              htmlFor="image"
            >
              <h1 className="text-white text-sm p-2 cursor-pointer bg-black/60 font-medium">
                Choose File
              </h1>
              <h1 className="p-2 text-sm truncate w-28">
                {imageData?.name || "No file chosen"}
              </h1>
            </label>
            <input
              onChange={handleImageChange}
              className="hidden"
              type="file"
              accept="image/*"
              name="image"
              id="image"
            />
            <button
              disabled={imageUploadProgress}
              className={`${
                imageUploadProgress && "opacity-50"
              } text-sm font-medium border hover:text-white hover:bg-black/60 border-purple-500/30 rounded-xl px-3 py-2 cursor-pointer`}
              type="button"
              onClick={handleImageUpload}
            >
              Upload Image
            </button>
          </div>
          {imageUploadError && (
            <p className="text-center text-red-500 text-sm mt-2">
              {imageUploadError}!
            </p>
          )}
          {imageUrl && (
            <img className="h-80 w-full object-cover pt-4" src={imageUrl} />
          )}
          <ReactQuill
            value={ postData.content}
            className="my-4 h-80 "
            theme="snow"
            placeholder="Type here..."
            required
            onChange={(e) => {
              setPostData({ ...postData, content: e.toString() });
            }}
          />
          <button
            onClick={handlePostUpload}
            disabled={imageUploadProgress || postUploadProgress}
            type="button"
            className={`${
              imageUploadProgress || (postUploadProgress && "opacity-50")
            } bg-gradient-to-r from-orange-500 to-purple-500 rounded-xl px-3 py-2 cursor-pointer w-full text-white mt-14 mb-2`}
          >
            Save changes
          </button>
          {postUploadError && (
            <p className="text-center text-red-500 text-sm">{postUploadError}!</p>
          )}
          {postUploadSuccess && (
            <p className="text-center text-green-500 text-sm">
              {postUploadSuccess}!
            </p>
          )}
        </form>
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