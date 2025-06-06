// import logo from './logo.svg';
// import { Checkpoint } from './Checkpoint.otf';
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
import { PotionCreateResult2 } from "./pages/potion-create-result2";
import { Ending } from "./pages/Ending";
import { Firststory } from "./pages/Firststory"; 
import {SelectTettin1} from "./pages/select-tettin"; 
import { SelectTettin2 } from "./pages/select-tettin2";
import { SelectTettin3 } from "./pages/select-tettin3";
import { SelectTyupei } from "./pages/select-tyupei";
import { SelectAlto } from "./pages/select-alto";
import Titlelogo from "./pages/Titlelogo";
import TitleScreen from "./pages/TitleScreen"; // パスは適宜調整

export default function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <ul>
        </ul>
        <Routes>
          <Route  path="*"element={<Pnf />}/>
          <Route path="/FirstStory" element={<Firststory />} />
          {/*<Route  path="/"element={<Select />}/>*/}
           <Route  path="/"element={<Titlelogo />}/>
          <Route  path="/select"element={<Select />}/>
          <Route  path="/program"element={<Program />}/>
          <Route  path="/programAlto"element={<ProgramAlto />}/>
          <Route  path="/programTyupei"element={<ProgramTyupei />}/>
          <Route  path="/programTettin"element={<Game />}/>
          <Route  path="/result"element={<Result />}/>
          <Route  path="/potion-create"element={<PotionCreate />}/>
          <Route  path="/potion-create-2"element={<PotionCreate2 />}/>
          <Route  path="/potion-create-result"element={<PotionCreateResult />}/>
          <Route  path="/potion-create-result2"element={<PotionCreateResult2 />}/>
          <Route  path="/select-tettin1"element={<SelectTettin1 />}/>
          <Route  path="/select-tettin2"element={<SelectTettin2 />}/>
          <Route  path="/select-tettin3"element={<SelectTettin3 />}/>
          <Route  path="/select-tyupei"element={<SelectTyupei />}/>
          <Route  path="/select-alto"element={<SelectAlto />}/>
          <Route  path="/ending"element={<Ending />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}