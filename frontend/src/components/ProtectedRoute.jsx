import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import Sidebar from './Sidebar';

export default function ProtectedRoute() {
  const { user, isLoading } = useAuthStore();

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center text-gray-500">Memuat sesi...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar />
      <div className="flex-1 overflow-x-hidden">
        <Outlet />
      </div>
    </div>
  );
}
