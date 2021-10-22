import { useContext, useRef } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { isFetching, dispatch } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  return (
    <>
      <div class="font-sans">
        <div class="relative min-h-screen flex flex-col sm:justify-center items-center bg-gray-100 ">
          <div class="relative sm:max-w-sm w-full">
            <div class="card bg-blue-400 shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6"></div>
            <div class="card bg-red-400 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6"></div>
            <div class="relative w-full rounded-3xl  px-6 py-4 bg-gray-100 shadow-md">
              <label for="" class="block mt-3 text-sm text-gray-700 text-center font-semibold">
                Login
              </label>
              <div>
                <input type="email" placeholder="Email" ref={email} class="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0" />
              </div>

              <div class="mt-7">
                <input type="password" ref={password} placeholder="password" class="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0" />
              </div>

              <div class="mt-7 flex">
                <label for="remember_me" class="inline-flex items-center w-full cursor-pointer">
                  <input id="remember_me" type="checkbox" class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" name="remember" />
                  <span class="ml-2 text-sm text-gray-600">
                    Remember
                  </span>
                </label>

                <div class="w-full text-right">
                  <a class="underline text-sm text-gray-600 hover:text-gray-900" href="#">
                    Forgot Password
                  </a>
                </div>
              </div>

              <div class="mt-7">
                <button onClick={handleClick} class="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                  Sign In
                </button>
              </div>

              <div class="flex mt-7 items-center text-center">
                <hr class="border-gray-300 border-1 w-full rounded-md" />
                <label class="block font-medium text-sm text-gray-600 w-full">
                  Social
                </label>
                <hr class="border-gray-300 border-1 w-full rounded-md" />
              </div>

              <div class="flex mt-7 justify-center w-full">
                <button class="mr-5 bg-blue-500 border-none px-4 py-2 rounded-xl cursor-pointer text-white shadow-xl hover:shadow-inner transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">

                  Facebook
                </button>

                <button class="bg-red-500 border-none px-4 py-2 rounded-xl cursor-pointer text-white shadow-xl hover:shadow-inner transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                  Google
                </button>
              </div>

              <div class="mt-7">
                <div class="flex justify-center items-center">
                  <label class="mr-2" >New to SocialApp</label>
                  <a href="/register" class=" text-blue-500 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                    Register Here
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
