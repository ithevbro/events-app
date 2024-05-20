import EventsList from "./components/Events-List/Events-List"
import Register from "./components/Register-Form/Register"
import { Routes, Route } from "react-router-dom"

function App() {

  return (
    <Routes>
      <Route path="/" element={<EventsList />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}

export default App
