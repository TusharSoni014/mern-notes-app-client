import React from "react";
import AddNote from "../components/AddNote";

export default function Home() {
  return (
    <div className="__home h-[calc(100dvh-60px)]">
      <div className="__hero h-1/2 w-full flex justify-center items-center flex-col">
        <h1 className=" text-[50px]">iNote</h1>
        <p className=" text-slate-400">A simple MERN Stack Notes app</p>
      </div>
      <AddNote />
    </div>
  );
}
