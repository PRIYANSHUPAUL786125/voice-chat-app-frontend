import { Route,Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Room from "./Pages/Room";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/room/:roomId" element={<Room/>}></Route>
    </Routes>
  )
}
