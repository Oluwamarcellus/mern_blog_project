import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="px-4 py-10">
      <div className="pt-10 min-h-screen w-full max-w-[800px] mx-auto">
        <h2 className="text-center text-2xl font-medium pb-6">About Yowale's Blog!</h2>
        <p className="text-center pb-6 text-base text-black/50">
        Welcome to Yowale's Blog, your ultimate destination for insightful articles and tutorials crafted by Yowale, a dedicated developer with a passion for technology and innovation.
        </p>
        <p className="text-center pb-6 text-base text-black/50">
        Yowale's Blog was born out of a personal project, driven by the desire to share knowledge, experiences, and ideas with fellow enthusiasts, developers, and learners worldwide.
        </p>
        <p className="text-center pb-6 text-base text-black/50">
        Explore a diverse range of topics, from web development to software engineering, and delve into the intricacies of various programming languages. Yowale is committed to providing you with high-quality content that educates, inspires, and empowers.
        </p>
        <p className="text-center pb-6 text-base text-black/50">
        Stay tuned for weekly updates, as Yowale regularly shares his latest discoveries, insights, and tips. Whether you're a seasoned professional or an aspiring coder, there's always something new to learn on Yowale's Blog.
        </p>
        <p className="text-center pb-6 text-base text-black/50">
        We encourage you to actively participate in the community by leaving comments, sharing your thoughts, and engaging with other readers. Together, let's foster a culture of collaboration, growth, and continuous learning.
        </p>
        <p className="text-center pb-6 text-base text-black/50">
        Thank you for joining us on this journey. Let's embark on an exciting adventure of exploration, discovery, and innovation together!
        </p>
      </div>
      <div className="mt-6 border bg-black/10 rounded-lg">
        <h2 className="text-center py-2 italic text-black/40">Follow me@</h2>
        <div className="flex justify-center gap-5 mb-3">
          <a href="https://twitter.com/Hayyddex" target="_blank" className="text-xl cursor-pointer text-blue-300"><FaTwitter /></a>
          <a href="https://www.linkedin.com/in/devmarc" target="_blank" className="text-xl cursor-pointer text-blue-600"><FaLinkedin /></a>
          <a href="https://github.com/Oluwamarcellus" target="_blank" className="text-xl cursor-pointer text-black/70"><FaGithub /></a>
        </div>
      </div>
    </div>
  );
}
