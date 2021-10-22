import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Topbar() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div class="antialiased bg-gray-100 dark-mode:bg-gray-900 bg-purple-600 bg-opacity-30">
      <div class="w-full text-white-700 bg-white dark-mode:text-white-200 dark-mode:bg-gray-800 bg-transparent  ">
        <div x-data="{ open: true }" class="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
          <div class="flex flex-row items-center justify-between p-4">
            <Link to="/" className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-115"><a href="#" class="text-lg font-semibold tracking-widest text-yellow-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105">MySocial App</a></Link>
            <button class="rounded-lg md:hidden focus:outline-none focus:shadow-outline" >
              <svg fill="currentColor" viewBox="0 0 20 20" class="w-6 h-6">
                <path x-show="!open" fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z" clip-rule="evenodd"></path>
                <path x-show="open" fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
              </svg>
            </button>
          </div>
          <nav class=" flex-col flex-grow hidden my-3 pb-8 md:pb-0 md:flex md:justify-end md:flex-row ">
            <div>
              <Link to={`/profile/${user.username}`} className="profilebanner transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105">
              <img class ="avatarImage" src={user.profilePicture?PF +user.profilePicture:   "/images/person/noAvatar.png"} />
               <p className="text-sm font-semibold px-4">{user.username} </p>
            </Link>
            </div>
            <button class="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-yellow-200 md:mt-0 md:ml-4 hover:text-yellow-900 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105" href="#">Posts</button>
            <button class="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-yellow-200 md:mt-0 md:ml-4 hover:text-yellow-900 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105" href="#">Nothing</button>
            <button class="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-yellow-200 md:mt-0 md:ml-4 hover:text-yellow-900 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105" onClick={(e) => {
              localStorage.removeItem("user")
              window.location.href = "/login";

            }}>Logout</button>
            <div class="relative" x-data="{open: true }">
            </div>
          </nav>
        </div >
      </div >
    </div >

  );
}
