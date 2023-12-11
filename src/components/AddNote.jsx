import React, { useState } from "react";
import { handleError } from "../utils/handleError";
import axiosClient from "../utils/axiosClient";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AddNote() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const isLoggedIn = useSelector((state) => state.appSlice.isLoggedIn);
  const navigate = useNavigate();
  const handleCreateNote = async (e) => {
    e.preventDefault();
    try {
      if (isLoggedIn) {
        const response = await axiosClient.post("/note/create", {
          title: title,
          desc: desc,
        });
        console.log(response.data);
        toast.success("Note Created successfully!");
        setDesc("");
        setTitle("");
      } else {
        navigate("/login");
      }
    } catch (error) {
      handleError(error);
    }
  };
  return (
    <div className="__add_note p-3 bg-slate-700 flex justify-center items-center">
      <form
        onSubmit={handleCreateNote}
        className="flex justify-center items-center flex-col gap-2 w-full"
      >
        <input
          className="outline-none text-black p-2 rounded w-full max-w-[350px]"
          type="text"
          placeholder="Title"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="resize-none outline-none text-black p-2 rounded w-full max-w-[350px]"
          placeholder="Description"
          cols="30"
          rows="4"
          value={desc}
          required
          onChange={(e) => setDesc(e.target.value)}
        ></textarea>
        <button
          className=" bg-green-500 p-3 rounded w-full max-w-[350px] transition hover:bg-green-600"
          type="submit"
        >
          + Create Note
        </button>
      </form>
    </div>
  );
}
