import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useMood } from '../hooks/useMood';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Edit3, CheckSquare, BarChart2, BookMarked, Bell } from 'lucide-react';

const mockChartData = [
  { name: 'Sab', score: 3 },
  { name: 'Min', score: 3 },
  { name: 'Sen', score: 4 },
  { name: 'Sel', score: 5 },
  { name: 'Rab', score: 2 },
  { name: 'Kam', score: 3 },
  { name: 'Hari ini', score: 4 },
];

export default function Dashboard() {
  const user = useAuthStore(state => state.user);
  const { moodEntries, isLoadingEntries } = useMood();
  
  // Dummy check for today
  const hasCheckedInToday = false; 

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Selamat pagi, {user?.name?.split(' ')[0] || 'User'} 👋
          </h1>
          <p className="text-gray-500 text-sm">Yuk, check-in dan jaga kesehatan mentalmu hari ini.</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-gray-400 hover:text-gray-600 transition">
            <Bell size={24} />
          </button>
          <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center font-bold text-teal-800">
            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
        </div>
      </header>

      {/* Top Row Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {/* Mood Hari Ini */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
          <h3 className="text-sm font-semibold text-gray-800 mb-4 w-full text-left">Mood Hari Ini</h3>
          <div className="w-24 h-24 rounded-full border-8 border-teal-500 flex items-center justify-center mb-2">
            <span className="text-3xl">🙂</span>
          </div>
          <p className="font-bold text-gray-800">Baik</p>
          <p className="text-xs text-gray-500">Skor 4/5</p>
        </div>

        {/* Energi */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
          <h3 className="text-sm font-semibold text-gray-800 mb-4 w-full text-left">Energi</h3>
          <div className="text-5xl text-yellow-400 mb-2">⚡</div>
          <p className="font-bold text-gray-800">4 / 5</p>
          <p className="text-xs text-gray-500">Cukup Berenergi</p>
        </div>

        {/* Check-in Card */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
          <h3 className="text-sm font-semibold text-gray-800 mb-2">Check-in</h3>
          <p className="text-gray-500 text-sm mb-4">Belum check-in hari ini</p>
          <Link to="/mood/checkin" className="w-full bg-teal-700 text-white py-2 rounded-lg text-center font-semibold text-sm hover:bg-teal-800 transition mb-2">
            Isi Sekarang
          </Link>
          <p className="text-[11px] text-gray-400 text-center">Cuma butuh &lt; 2 menit</p>
        </div>

        {/* Jurnal Terakhir */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
          <h3 className="text-sm font-semibold text-gray-800 mb-2">Jurnal Terakhir</h3>
          <p className="text-xs text-gray-400 mb-3">Kemarin</p>
          <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-1">
            Hari ini lumayan melelahkan tapi aku senang bisa menyelesaikan tugas.
          </p>
          <Link to="/journal" className="text-teal-600 text-sm font-semibold hover:underline">
            Lihat Jurnal
          </Link>
        </div>
      </div>

      {/* Middle Row (Charts & AI Insight) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        
        {/* Line Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-2">
          <h3 className="text-sm font-semibold text-gray-800 mb-6">Mood 7 Hari Terakhir</h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockChartData}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9CA3AF'}} dy={10} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#14b8a6" 
                  strokeWidth={3} 
                  dot={{ r: 6, fill: '#f59e0b', strokeWidth: 2, stroke: '#fff' }} 
                  activeDot={{ r: 8 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Insight AI */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
          <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
            Insight AI <span className="text-yellow-400 text-lg">✨</span>
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed mb-6 flex-1">
            Kamu cenderung merasa lebih stres di pertengahan minggu. Coba istirahat lebih cukup sebelum hari Rabu ya! 🌿
          </p>
          <button className="w-full border border-teal-600 text-teal-700 py-2 rounded-lg font-semibold text-sm hover:bg-teal-50 transition">
            Lihat Insight Lengkap
          </button>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Streak */}
        <div className="bg-teal-50 p-5 rounded-2xl shadow-sm border border-teal-100 flex flex-col items-center text-center">
          <h3 className="text-sm font-bold text-gray-800 mb-1">🔥 Streak Hari Ini</h3>
          <p className="text-xs text-gray-600 mb-3">7 hari berturut-turut. Pertahankan!</p>
          <div className="text-5xl mt-auto">🌱</div>
        </div>

        {/* Quick Access */}
        <div className="md:col-span-3 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-sm font-semibold text-gray-800 mb-4">Quick Access</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/journal" className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-teal-500 hover:bg-teal-50 transition group">
              <div className="text-teal-600 group-hover:scale-110 transition"><Edit3 size={20} /></div>
              <span className="text-sm font-medium text-gray-700">Tulis Jurnal</span>
            </Link>
            <Link to="/habit" className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-teal-500 hover:bg-teal-50 transition group">
              <div className="text-teal-600 group-hover:scale-110 transition"><CheckSquare size={20} /></div>
              <span className="text-sm font-medium text-gray-700">Habit Log</span>
            </Link>
            <Link to="/laporan" className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-teal-500 hover:bg-teal-50 transition group">
              <div className="text-teal-600 group-hover:scale-110 transition"><BarChart2 size={20} /></div>
              <span className="text-sm font-medium text-gray-700">Lihat Laporan</span>
            </Link>
            <Link to="/resources" className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-teal-500 hover:bg-teal-50 transition group">
              <div className="text-teal-600 group-hover:scale-110 transition"><BookMarked size={20} /></div>
              <span className="text-sm font-medium text-gray-700">Resources</span>
            </Link>
          </div>
        </div>
      </div>
      
    </div>
  );
}
