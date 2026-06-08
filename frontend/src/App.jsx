import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import MoodCheckin from './pages/MoodCheckin';
import Journal from './pages/Journal';
import JournalDetail from './pages/JournalDetail';
import Community from './pages/Community';
import CommunityPostDetail from './pages/CommunityPostDetail';
import HabitLog from './pages/HabitLog';
import LaporanMingguan from './pages/LaporanMingguan';
import Resources from './pages/Resources';
import ProtectedRoute from './components/ProtectedRoute';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/mood/checkin" element={<MoodCheckin />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/journal/:id" element={<JournalDetail />} />
            <Route path="/community" element={<Community />} />
            <Route path="/community/:id" element={<CommunityPostDetail />} />
            <Route path="/habit" element={<HabitLog />} />
            <Route path="/laporan" element={<LaporanMingguan />} />
            <Route path="/resources" element={<Resources />} />
          </Route>
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
