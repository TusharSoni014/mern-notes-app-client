import React from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  return (
    <div className="__header p-3 h-[60px] bg-slate-800 flex justify-between items-center">
      <h2 className=" text-2xl">iNote</h2>
      <div className="__nav_btns flex gap-2">
        <button
          onClick={() => navigate("/login")}
          className=" bg-slate-900 p-3 py-2 rounded transition hover:bg-slate-950"
        >
          Login
        </button>
        <button className=" bg-red-700 p-3 py-2 rounded transition hover:bg-red-800">
          Logout
        </button>
      </div>
    </div>
  );
}
