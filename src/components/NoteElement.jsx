import React, { useState } from "react";
import { handleError } from "../utils/handleError";
import axiosClient from "../utils/axiosClient";
import { useDispatch } from "react-redux";
import { fetchAllNotes } from "../redux/slices/notesSlice";
import { toast } from "react-toastify";

export default function NoteElement({ title, desc, id }) {
  const [currentTitle, setCurrentTitle] = useState("");
  const [currentDesc, setCurrentDesc] = useState("");
  const [editModal, setEditModal] = useState(false);
  const dispatch = useDispatch();
  const handleDeleteNote = async () => {
    try {
      await axiosClient.delete(`/note/delete/${id}`);
      dispatch(fetchAllNotes);
    } catch (error) {
      handleError(error);
    }
  };

  const handleUpdateNote = async (e) => {
    e.preventDefault();
    try {
      if (currentTitle === "" || currentDesc === "") {
        toast.warn("Title or description can't be empty!");
      } else {
        await axiosClient.put(`/note/update/${id}`, {
          title: currentTitle,
          desc: currentDesc,
        });
        setEditModal(false);
        dispatch(fetchAllNotes());
        toast.success("Note updated successfully!");
      }
    } catch (error) {
      handleError(error);
    }
  };
  const openEditModal = async () => {
    try {
      setCurrentDesc(desc);
      setCurrentTitle(title);
      setEditModal(true);
    } catch (error) {
      handleError(error);
    }
  };
  return (
    <>
      <div className="__note_element p-3 rounded bg-slate-800 relative pb-[50px]">
        <h3 className=" text-xl font-bold break-words">{title}</h3>
        <p className=" text-slate-400 break-words">{desc}</p>
        <div className="__btn_container flex gap-1 mt-2 absolute bottom-[8px]">
          <button
            onClick={handleDeleteNote}
            className="p-2 py-1 bg-red-500 rounded transition hover:bg-red-600"
          >
            Delete
          </button>
          <button
            onClick={openEditModal}
            className="p-2 py-1 bg-green-500 rounded transition hover:bg-green-600"
          >
            Edit
          </button>
        </div>
      </div>
      {editModal && (
        <div className="__modal w-full h-full bg-[#00000070] flex justify-center items-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          <form className="bg-slate-700 p-4 rounded flex justify-center items-start flex-col gap-2">
            <input
              className="text-black p-2 rounded outline-none w-full"
              type="text"
              value={currentTitle}
              placeholder="Enter update title"
              onChange={(e) => setCurrentTitle(e.target.value)}
            />
            <textarea
              className="text-black p-2 rounded outline-none resize-none w-full"
              value={currentDesc}
              onChange={(e) => setCurrentDesc(e.target.value)}
              placeholder="Enter updated description"
              id=""
              cols="30"
              rows="10"
            ></textarea>
            <div className="__btn_container flex gap-2">
              <button
                type="submit"
                onClick={handleUpdateNote}
                className="p-2 py-1 bg-green-500 rounded transition hover:bg-green-600"
              >
                Confrim
              </button>
              <button
                className="p-2 py-1 bg-red-500 rounded transition hover:bg-red-600"
                onClick={(e) => {
                  e.preventDefault();
                  setEditModal(false);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
