import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

// Pages
import Home from './pages/Home'
import Explore from './pages/Explore'
import ProjectDetails from './pages/ProjectDetails'
import CreateProject from './pages/CreateProject'
import Profile from './pages/Profile'

// Components
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="/create" element={<CreateProject />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App