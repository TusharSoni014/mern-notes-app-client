import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosClient from "../utils/axiosClient";
import { updateLoginStatus, updateUser } from "../redux/slices/appSlice";
import { handleError } from "../utils/handleError";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosClient.post("/user/signup", {
        email: email,
        password: password,
        username: username,
      });
      dispatch(updateUser(response.data));
      dispatch(updateLoginStatus(true));
      navigate("/");
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="__signup_page h-[calc(100dvh-60px)]">
      <div className="__form_container p-3 flex justify-center items-center flex-col h-full">
        <form
          onSubmit={handleSignup}
          className=" max-w-[300px] flex justify-center items-center gap-3 flex-col"
        >
          <input
            className="p-2 rounded outline-none text-black"
            type="text"
            placeholder="Username"
            value={username}
            required
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            className="p-2 rounded outline-none text-black"
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            className="p-2 rounded outline-none text-black"
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button
            className="p-2 rounded bg-slate-900 w-full transition hover:bg-slate-950"
            type="submit"
          >
            Singup
          </button>
        </form>
        <p>
          Already have an account?{" "}
          <a className=" text-blue-400" href="/login">
            Login Instead
          </a>
        </p>
      </div>
    </div>
  );
}
