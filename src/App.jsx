import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Header from "./components/Header";
import Signup from "./components/Signup";

function App() {
  return (
    <div className="__app bg-slate-700 text-white">
      <Header />
      <Routes>
        <Route path="/" element={<>home</>}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
      </Routes>
    </div>
  );
}

export default App;
