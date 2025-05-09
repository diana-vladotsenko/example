import './App.css';
import MainPage from './pages/MainPage';
import { Route, Routes } from 'react-router-dom'
import Menu from './components/Menu';
import ManageWords from './pages/ManageWords';
import SingleWord from './pages/SingleWord';
import EditWord from './pages/EditWord';
import AdminList from './pages/Admins';
import AdminWords from './pages/SingleAdminWords';


function App() {
  return (
    <>
      <Menu />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/addWord" element={<ManageWords />} />
        <Route path="/words/:wordId" element={<SingleWord />} />
        <Route path="/editWord/:wordId" element={<EditWord />} />
        <Route path="/admins" element={<AdminList />} />
        <Route path="/admins/:id" element={<AdminWords />} />
        <Route path="/*" element={<div>Page Not Found</div>} />
      </Routes>
    </>
  )
}

export default App
