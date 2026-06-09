import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function Pengaturan() {
  const navigate = useNavigate();
  const logout = useAuthStore(state => state.logout);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Pengaturan</h1>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Akun</h3>
        <p className="text-gray-500 text-sm mb-6">Kelola pengaturan akun dan keamanan Anda di sini.</p>
        
        <div className="space-y-4">
          <button className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors font-medium text-gray-700">
            Ubah Kata Sandi
          </button>
          <button className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors font-medium text-gray-700">
            Notifikasi
          </button>
        </div>

        <h3 className="text-lg font-bold text-red-600 mt-10 mb-4">Zona Berbahaya</h3>
        <div className="p-4 bg-red-50 rounded-xl border border-red-100 space-y-4">
          <p className="text-sm text-red-800">Tindakan di bawah ini tidak dapat dibatalkan.</p>
          <button 
            onClick={handleLogout}
            className="w-full sm:w-auto px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow-sm transition-colors"
          >
            Keluar (Logout)
          </button>
        </div>
      </div>
    </div>
  );
}
