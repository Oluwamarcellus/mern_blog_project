import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Comment from "../components/Comment";

export default function PostPage() {
  const { postId } = useParams();
  const [loading, setIsLoading] = useState(false);
  const [postData, setPostData] = useState(true);

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
          setIsLoading(false);
        }
      } catch (err) {
        console.log(err.message);
        setIsLoading(false);
      }
    };

    //fetchPost();
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
      <div className="px-6 py-12">
        <h1 className="text-3xl text-center mb-10 md:max-w-[50%] mx-auto">
          Installing Next.js with Tailwind CSS: A Seamless Integration Guide
        </h1>
        <img
          className="w-full md:max-w-[80%] mx-auto"
          src="https://firebasestorage.googleapis.com/v0/b/mern-blog-test-8ff4d.appspot.com/o/1708829612247-Screenshot%202023-11-22%20at%209.47.52%E2%80%AFam.png?alt=media&token=14c6f9bd-3336-4d08-ab9a-bbf3f7585514"
        />
        <div className="w-full md:max-w-[50%] mx-auto">
          <div className="flex items-center justify-between mt-6 border-b pb-6">
            <span className="text-xs">{"11/20/2023"}</span>
            <span className="text-xs italic">{"3 mins read"}</span>
          </div>
          <div
            className="py-6 quill-control"
            dangerouslySetInnerHTML={{
              __html: `<p>Next.js, a popular React framework, takes front-end development to the next level by providing a streamlined and efficient development experience. When paired with Tailwind CSS, a utility-first CSS framework, you can create visually stunning and responsive web applications effortlessly. In this blog post, we'll guide you through the steps to install Next.js with Tailwind CSS for a seamless development experience.</p><h2>Prerequisites</h2><p>Before we start, ensure that you have Node.js and npm (Node Package Manager) installed on your machine. If not, you can download and install them from <a href=\"https://nodejs.org/\" rel=\"noopener noreferrer\" target=\"_blank\">nodejs.org</a>.</p><h2>Step 1: Create a new Next.js app</h2><p>Open your terminal and run the following commands to create a new Next.js app:</p><pre class=\"ql-syntax\" spellcheck=\"false\">npx create-next-app my-next-app\ncd my-next-app\n</pre><p>This will create a new Next.js app in a directory named <code>my-next-app</code>.</p><h2>Step 2: Install Tailwind CSS and its dependencies</h2><p>Next, install Tailwind CSS and its dependencies by running the following commands:</p><pre class=\"ql-syntax\" spellcheck=\"false\">npm install -D tailwindcss postcss autoprefixer\n</pre><h2>Step 3: Set up Tailwind CSS</h2><p>Generate the Tailwind CSS configuration file and the PostCSS configuration file:</p><pre class=\"ql-syntax\" spellcheck=\"false\">npx tailwindcss init -p\n</pre><h2>Step 4: Configure PostCSS</h2><p>Open the <code>postcss.config.js</code> file in the root of your project and configure it to use Tailwind CSS:</p><pre class=\"ql-syntax\" spellcheck=\"false\">module.exports = {\n  plugins: {\n    tailwindcss: {},\n    autoprefixer: {},\n  },\n};\n</pre><h2>Step 5: Create a styles directory</h2><p>Create a new directory named <code>styles</code> in your project's <code>src</code> folder. Inside the <code>styles</code> directory, create a new CSS file, for example, <code>styles/globals.css</code>.</p><h2>Step 6: Import Tailwind CSS in your styles</h2><p>Open the <code>styles/globals.css</code> file and import Tailwind CSS:</p><pre class=\"ql-syntax\" spellcheck=\"false\">/* styles/globals.css */\n@import 'tailwindcss/base';\n@import 'tailwindcss/components';\n@import 'tailwindcss/utilities';\n</pre><h2>Step 7: Import the CSS file in your Next.js app</h2><p>Open your <code>pages/_app.js</code> file and import the CSS file you created:</p><pre class=\"ql-syntax\" spellcheck=\"false\">// pages/_app.js\nimport '../styles/globals.css';\n\nfunction MyApp({ Component, pageProps }) {\n  return &lt;Component {...pageProps} /&gt;;\n}\n\nexport default MyApp;\n</pre><h2>Step 8: Start your development server</h2><p>Run the following command to start your Next.js development server:</p><pre class=\"ql-syntax\" spellcheck=\"false\">npm run dev\n</pre><p>Visit <a href=\"http://localhost:3000\" rel=\"noopener noreferrer\" target=\"_blank\">http://localhost:3000</a> in your browser to see your Next.js app with Tailwind CSS in action.</p><h2>Conclusion</h2><p>You've successfully set up a Next.js app with Tailwind CSS, combining the power of a robust React framework with a utility-first CSS framework for efficient and visually appealing web development. Enjoy building your next-generation web applications!</p>`,
            }}
          />

          <Comment />
        </div>
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
