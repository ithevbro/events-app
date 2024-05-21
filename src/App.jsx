import EventsList from "./components/Events-List/Events-List"
import Register from "./components/Register-Form/Register"
import EventParticipants from "./components/Event-participants/EventParticipants"
import { Routes, Route } from "react-router-dom"

function App() {

  return (
    <Routes>
      <Route path="/" element={<EventsList />} />
      <Route path="/register/:id" element={<Register />} />
      <Route path=":id" element={<EventParticipants />} />
    </Routes>
  )
}

export default App
