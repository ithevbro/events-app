import EventsList from "./components/Events-List/Events-List"
import Register from "./components/Register-Form/Register"
import EventParticipants from "./components/Event-participants/EventParticipants"
import { Routes, Route } from "react-router-dom"

function App() {

  return (
    <Routes>
      <Route path="/" element={<EventsList />} />
      <Route path="/register/:id" element={<Register />} />
      <Route path="/events/:id" element={<EventParticipants />} />
      <Route path="*" element={<h1>404 page not found</h1>} />
    </Routes>
  )
}

export default App
