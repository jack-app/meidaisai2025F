// import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import { Pnf } from "./pages/Pnf";
import { Program } from "./pages/Program";
import { Result } from "./pages/Result";
import { Select } from "./pages/Select";

export default function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <ul>
        </ul>
        <Routes>
          <Route  path="*"element={<Pnf />}/>
          <Route  path="/"element={<Select />}/>
          <Route  path="/select"element={<Select />}/>
          <Route  path="/program"element={<Program />}/>
          <Route  path="/result"element={<Result />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}