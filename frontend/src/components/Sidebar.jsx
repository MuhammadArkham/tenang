import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Smile, 
  BookOpen, 
  CheckSquare, 
  BarChart2, 
  BookMarked, 
  User, 
  Settings,
  Users
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export default function Sidebar() {
  const { user } = useAuthStore();
  const menuItems = [
    { name: 'Beranda', path: '/dashboard', icon: <Home size={20} /> },
    { name: 'Mood Check-in', path: '/mood/checkin', icon: <Smile size={20} /> },
    { name: 'Jurnal', path: '/journal', icon: <BookOpen size={20} /> },
    { name: 'Komunitas', path: '/community', icon: <Users size={20} /> },
    { name: 'Habit Log', path: '/habit', icon: <CheckSquare size={20} /> },
    { name: 'Laporan Mingguan', path: '/laporan', icon: <BarChart2 size={20} /> },
    { name: 'Resources', path: '/resources', icon: <BookMarked size={20} /> },
    { name: 'Profil', path: '/profil', icon: <User size={20} /> },
    { name: 'Pengaturan', path: '/pengaturan', icon: <Settings size={20} /> },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-100 h-screen sticky top-0 flex flex-col pt-8 pb-6 px-4 shrink-0">
      <Link to="/" className="flex items-center gap-2 px-4 mb-10 hover:opacity-80 transition">
        <span className="text-teal-600 text-2xl">🌿</span>
        <h1 className="text-xl font-bold tracking-tight text-gray-900">Tenang</h1>
      </Link>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item, index) => {
          // Tambahkan divider setelah resources
          const isDivider = item.name === 'Resources';
          
          return (
            <div key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${
                    isActive
                      ? 'bg-teal-50 text-teal-700'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                {item.icon}
                {item.name}
              </NavLink>
              {isDivider && <div className="h-px bg-gray-100 my-4 mx-4"></div>}
            </div>
          );
        })}
      </nav>

      {/* Profil Mini Card di bawah */}
      <div className="mt-auto px-2">
        <div className="flex items-center gap-3 px-3 py-2 bg-gray-50 rounded-xl border border-gray-100">
          <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-800 font-bold text-xs uppercase">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div>
            <p className="text-xs font-bold text-gray-800 truncate max-w-[120px]">{user?.name || 'User'}</p>
            <p className="text-[10px] text-gray-500">Akun Gratis</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
