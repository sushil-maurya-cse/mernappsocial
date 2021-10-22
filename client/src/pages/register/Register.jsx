import axios from "axios";
import { useRef, useState } from "react";
import "./register.css";
import { useHistory } from "react-router";

export default function Register() {
  const username = useRef();
  const [passerr,setPasserr]=useState("");
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
      setPasserr("Passwords do not match")
      
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post(" /api/auth/register", user);
        history.push("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <div className="bg-grey-lighter min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center">Sign Up Here</h1>
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="fullname" ref={username}
              placeholder="Full Name" />

            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="email"
              ref={email}
              placeholder="Email" />

            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="password"
              ref={password}
              placeholder="Password" />
            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="confirm_password"
              ref={passwordAgain}
              placeholder="Confirm Password" />
              {passerr}

            <button
              type="submit" onClick={handleClick}
              className="w-full text-center py-3 rounded bg-green text-white hover:bg-green-dark focus:outline-none my-1"
            >Create Account</button>

            <div className="text-center text-sm text-grey-dark mt-4">
              By signing up, you agree to the
              <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                Terms of Service
              </a> and
              <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                Privacy Policy
              </a>
            </div>
          </div>

          <div className="text-grey-dark mt-6">
            Already have an account?
            <a className="no-underline border-b border-blue text-blue" href="../login/">
              Log in
            </a>.
          </div>
        </div>
      </div>
    </>
  );
}
