// import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import { Pnf } from "./pages/Pnf";
import { Program } from "./pages/Program";
import { ProgramAlto } from "./pages/ProgramAlto";
import { ProgramTyupei } from "./pages/ProgramTyupei";
import { Game } from "./pages/ProgramTettin"
import { Result } from "./pages/Result";
import { Select } from "./pages/Select";
import { PotionCreate } from "./pages/Potion-create";
import { PotionCreate2 } from "./pages/Potion-create-2";
import { PotionCreateResult } from "./pages/Potion-create-result";

export default function App() {
  return (
    <div className="background-image-magic">
    <div className="app">
      <BrowserRouter>
        <ul>
        </ul>
        <Routes>
          <Route  path="*"element={<Pnf />}/>
          <Route  path="/"element={<Select />}/>
          <Route  path="/select"element={<Select />}/>
          <Route  path="/program"element={<Program />}/>
          <Route  path="/programAlto"element={<ProgramAlto />}/>
          <Route  path="/programTyupei"element={<ProgramTyupei />}/>
          <Route  path="/programTettin"element={<Game />}/>
          <Route  path="/result"element={<Result />}/>
          <Route  path="/potion-create"element={<PotionCreate />}/>
          <Route  path="/potion-create-2"element={<PotionCreate2 />}/>
          <Route  path="/potion-create-result"element={<PotionCreateResult />}/>
        </Routes>
      </BrowserRouter>
    </div>
    </div>
  );
}