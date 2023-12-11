import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleError } from "../utils/handleError";
import axiosClient from "../utils/axiosClient";
import { updateLoginStatus, updateUser } from "../redux/slices/appSlice";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.appSlice.isLoggedIn);
  const user = useSelector((state) => state.appSlice.user);
  const handleLogout = async () => {
    try {
      await axiosClient.post("/user/logout");
      dispatch(updateUser({}));
      dispatch(updateLoginStatus(false));
      navigate("/login");
    } catch (error) {
      handleError(error);
    }
  };
  return (
    <div className="__header p-3 h-[60px] bg-slate-800 flex justify-between items-center">
      <h2 onClick={() => navigate("/")} className=" text-2xl cursor-pointer">
        iNote
      </h2>
      <div className="__nav_btns flex gap-2">
        {isLoggedIn ? (
          <div className="flex gap-3 justify-center items-center">
            <p>{user.username}</p>
            <button
              onClick={() => navigate("/my-notes")}
              className=" bg-green-500 p-3 py-2 rounded transition hover:bg-green-600"
            >
              My Notes
            </button>
            <button
              onClick={handleLogout}
              className=" bg-red-700 p-3 py-2 rounded transition hover:bg-red-800"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className=" bg-slate-900 p-3 py-2 rounded transition hover:bg-slate-950"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
}
