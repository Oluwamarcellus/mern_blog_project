import { FaGithub } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border border-purple-200 border-t-4 rounded-t-xl p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between gap-6 pb-4 border-b">
        <Link to="/">
          <div className="cursor-pointer font-medium">
            <span className="text-white p-2 rounded-md bg-gradient-to-r from-orange-500 to-purple-500">
              Yowale's
            </span>
            Blog
          </div>
        </Link>
        <div className="flex gap-14">
          <div>
            <h2 className="font-semibold text-sm text-gray-500 pb-4">
              FOLLOW US
            </h2>
            <div className="flex flex-col text-sm text-gray-500 gap-3">
              <a href="#">Github</a>
              <a href="#">Twitter</a>
            </div>
          </div>
          <div className="flex flex-col">
            <h2 className="font-semibold text-sm text-gray-500 pb-4">LEGAL</h2>
            <div className="flex flex-col text-sm text-gray-500 gap-3">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms & Condition</a>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-5 text-gray-500 flex flex-col sm:flex-row sm:justify-between gap-5">
        <p className="text-sm">&copy; 2024 Yowale's blog</p>
        <div className="flex gap-4 text-xl">
          <a href="https://github.com" target="_blank">
            <FaGithub />
          </a>
          <a href="https://x.com" target="_blank">
            <FaTwitter />
          </a>
          <a href="https://linkedin.com" target="_blank">
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
}
