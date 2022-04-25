import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import SigninLayout from './pages/auth'
import ClassLayout from './pages/class'
import DashboardLayout from './pages/dashboard'
import ErrorLayout from './pages/error'
import FacultyLayout from './pages/faculty'
import LevelLayout from './pages/level'
import ProfileLayout from './pages/profile'
import ProgramLayout from './pages/program'
import RoomLayout from './pages/room'
import SpecialityLayout from './pages/speciality'
import SubjectLayout from './pages/subject'
import TeacherLayout from './pages/teacher'

const Navigation = () => {
  return (
    <Router>
      <Routes>
        <Route path='/'>
          <Route index element={<DashboardLayout />} />

          <Route path='profile' element={<ProfileLayout />} />
          <Route path='faculties' element={<FacultyLayout />} />
          <Route path='levels' element={<LevelLayout />} />
          <Route path='classes' element={<ClassLayout />} />
          <Route path='specialities' element={<SpecialityLayout />} />
          <Route path='subjects' element={<SubjectLayout />} />
          <Route path='teachers' element={<TeacherLayout />} />
          <Route path='rooms' element={<RoomLayout />} />
          <Route path='programs' element={<ProgramLayout />} />
          <Route path='signin' element={<SigninLayout />} />

          <Route path='*' element={<ErrorLayout />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default Navigation