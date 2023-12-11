import React from "react";

export default function Signup() {
  return (
    <div className="__signup_page h-[calc(100dvh-60px)]">
      <div className="__form_container p-3 flex justify-center items-center flex-col h-full">
        <form className=" max-w-[300px] flex justify-center items-center gap-3 flex-col">
          <input
            className="p-2 rounded outline-none text-black"
            type="text"
            placeholder="Username"
          />
          <input
            className="p-2 rounded outline-none text-black"
            type="email"
            placeholder="Email"
          />
          <input
            className="p-2 rounded outline-none text-black"
            type="password"
            placeholder="Password"
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
