import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import StudentsPage from './pages/StudentsPage'
import StudentFormPage from './pages/StudentFormPage'
import CoursesPage from './pages/CoursesPage'
import CourseFormPage from './pages/CourseFormPage'
import InstructorsPage from './pages/InstructorsPage'
import InstructorFormPage from './pages/InstructorFormPage'

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

  return (
    <BrowserRouter>
      <div data-theme={theme}>
        <Navbar toggleTheme={toggleTheme} theme={theme} />
        <main className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/students" element={<StudentsPage />} />
            <Route path="/students/new" element={<StudentFormPage />} />
            <Route path="/students/:id" element={<StudentFormPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/courses/new" element={<CourseFormPage />} />
            <Route path="/courses/:id" element={<CourseFormPage />} />
            <Route path="/instructors" element={<InstructorsPage />} />
            <Route path="/instructors/new" element={<InstructorFormPage />} />
            <Route path="/instructors/:id" element={<InstructorFormPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
