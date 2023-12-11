import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllNotes } from "../redux/slices/notesSlice";
import NoteElement from "../components/NoteElement";

export default function MyNotes() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllNotes());
  });
  const allNotes = useSelector((state) => state.notesSlice.allNotes);
  return (
    <div className="__my_notes min-h-[calc(100dvh-60px)]">
      {allNotes?.length <= 0 ? (
        <div className="p-3 text-center text-slate-400 select-none">
          No existing notes found, <a href="/">create one</a>
        </div>
      ) : (
        <div className="__notes_container grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3 p-3">
          {allNotes?.map((note, index) => {
            return (
              <NoteElement
                key={index}
                title={note.title}
                desc={note.desc}
                id={note._id}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
