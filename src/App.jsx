import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import About from './pages/About'
import Consult from './pages/Consult'
import Realtor from './pages/Realtor'
import Investments from './pages/Investments'
import Foreclosures from './pages/Foreclosures'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/consult" element={<Consult />} />
          <Route path="/realtor" element={<Realtor />} />
          <Route path="/investments" element={<Investments />} />
          <Route path="/foreclosures" element={<Foreclosures />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
