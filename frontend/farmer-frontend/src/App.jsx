import { Navigate, Route, Routes } from 'react-router-dom'
import FarmerApp from './pages/FarmerApp.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/farmer/splash" replace />} />
      <Route path="/*" element={<FarmerApp />} />
    </Routes>
  )
}
