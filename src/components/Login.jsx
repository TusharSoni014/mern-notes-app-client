import React, { useState } from "react";
import { handleError } from "../utils/handleError";
import axiosClient from "../utils/axiosClient";
import { updateLoginStatus, updateUser } from "../redux/slices/appSlice";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosClient.post("/user/login", {
        email: email,
        password: password,
      });
      dispatch(updateUser(response.data));
      dispatch(updateLoginStatus(true));
      navigate("/");
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="__login_page h-[calc(100dvh-60px)]">
      <div className="__form_container p-3 flex justify-center items-center flex-col h-full">
        <form
          onSubmit={handleLogin}
          className=" max-w-[300px] flex justify-center items-center gap-3 flex-col"
        >
          <input
            className="p-2 rounded outline-none text-black"
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="p-2 rounded outline-none text-black"
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="p-2 rounded bg-slate-900 w-full transition hover:bg-slate-950"
            type="submit"
          >
            Login
          </button>
        </form>
        <p>
          New to iNote?{" "}
          <a className=" text-blue-400" href="/signup">
            Create Account
          </a>
        </p>
      </div>
    </div>
  );
}
