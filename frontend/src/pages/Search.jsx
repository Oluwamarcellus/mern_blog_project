import Post from "../components/Post";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Search() {
  const [formData, setFormData] = useState({});
  const [postData, setPostData] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [fetchingError, setFetchingError] = useState("");
  const location = useLocation();

  const getPost = async (searchterm = null, sortBy = null) => {
    try {
      const urlQuery = new URLSearchParams({
        ...(searchterm && { searchterm: searchterm }),
        ...(sortBy && { sortBy: sortBy }),
      });

      setIsFetching(true);
      setFetchingError("");
      const data = await fetch(`/api/post/getpost?${urlQuery.toString()}`);
      const res = await data.json();
      if (!data.ok) {
        throw new Error(res.errorMessage);
      }
      setPostData(res.posts);
      setIsFetching(false);
    } catch (err) {
      console.log(err.message);
      setFetchingError(err.message || "Error fetching posts");
      setIsFetching(false);
    }
  };

  const handleFilter = () => { 
    if (Object.keys(formData).length === 0) { 
      setFetchingError("Please fill search fields");
      return
    }
    const query = formData.searchterm;
    const sortDir = formData.sortBy;
    getPost(query, sortDir);
  }

  useEffect(() => {
    const searchQuery = new URLSearchParams(location.search);
    const searchterm = searchQuery.get("searchterm");
    getPost(searchterm);
  }, [location.search]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="md:border-r border-[rgba(0,0,0,.4)] w-full md:w-64 ">
        <form className="px-4 py-8 text-sm">
          <label className="font-medium" htmlFor="searchterm">
            Search Word:{" "}
          </label>
          <input
            className="w-28 p-3 mb-8 placeholder:text-xs outline-none border rounded-lg"
            type="text"
            placeholder="Search for..."
            id="searchterm"
            name="searchterm"
            onChange={(e) =>
              setFormData({ ...formData, searchterm: e.target.value })
            }
          />
          <div></div>
          <label className="font-semibold " htmlFor="sort">
            Sort:{" "}
          </label>
          <select
            className="w-28 p-3 outline-none border rounded-lg"
            id="sort"
            name="sort"
            onChange={(e) =>
              setFormData({ ...formData, sortBy: e.target.value })
            }
          >
            <option value="desc">Latest</option>
            <option value="asc">Oldest</option>
          </select>
          <button
            className={`${isFetching ? 'opacity-50' : ''} block mt-8 w-full border-2 border-purple-500 hover:bg-gradient-to-r hover:text-white hover:border from-purple-500 to-orange-500 p-2 rounded-lg`}
            type="button"
            disabled={isFetching}
            onClick={handleFilter}
          >
            Apply Filter
          </button>
        </form>
        {fetchingError && <p className="text-red-500 text-center text-sm pb-4">{ fetchingError}!</p> }
      </div>
      <div className="border grow">
        <h1 className="text-2xl font-medium text-center pt-8 pb-4 border-b border-[rgba(0,0,0,.4)]">
          Posts result
        </h1>

        <div className="p-6 flex flex-wrap gap-5 items-center justify-center ">
          {/* <Post data={data} />
          <Post data={data} />
          <Post data={data} />
          <Post data={data} /> */}

          {isFetching ? (
            <h1>Fetching...</h1>
          ) : (
            <>
              {postData && postData.length > 0 ? (
                postData.map((data, i) => {
                  return <Post data={data} key={i} />;
                })
              ) : (
                <h1>No result found</h1>
              )}
            </>
          )}

        </div>
      </div>
    </div>
  );
}
