import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useMood } from '../hooks/useMood';
import MoodCard from '../components/MoodCard';

export default function Dashboard() {
  const user = useAuthStore(state => state.user);
  const logout = useAuthStore(state => state.logout);
  const navigate = useNavigate();
  
  const { moodEntries, isLoadingEntries } = useMood();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Cek apakah sudah check-in hari ini
  const todayStr = new Date().toLocaleDateString('id-ID');
  const hasCheckedInToday = moodEntries?.some(entry => {
    return new Date(entry.created_at).toLocaleDateString('id-ID') === todayStr;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-teal-600 text-white px-6 py-8 rounded-b-3xl shadow-md">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold">Halo, {user?.name?.split(' ')[0]} 👋</h1>
            <p className="text-teal-100 mt-1">Semoga harimu menyenangkan!</p>
          </div>
          <button onClick={handleLogout} className="text-sm font-medium bg-teal-700 px-3 py-1.5 rounded-lg hover:bg-teal-800 transition">
            Keluar
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 mt-6 space-y-6">
        {/* Mood Section */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">Mood Tracker</h2>
            <Link to="/mood" className="text-teal-600 text-sm font-semibold hover:underline">
              Lihat Grafik
            </Link>
          </div>

          {!hasCheckedInToday ? (
            <div className="bg-white p-6 rounded-2xl border border-teal-100 shadow-sm text-center">
              <div className="text-4xl mb-3">💭</div>
              <h3 className="font-semibold text-gray-800 mb-1">Bagaimana perasaanmu hari ini?</h3>
              <p className="text-sm text-gray-500 mb-4">Ceritakan sedikit agar kamu merasa lebih lega.</p>
              <Link to="/mood/checkin" className="inline-block bg-teal-600 text-white font-semibold py-2 px-6 rounded-xl hover:bg-teal-700 transition shadow-sm">
                Check-in Sekarang
              </Link>
            </div>
          ) : (
            <div className="bg-teal-50 p-4 rounded-2xl border border-teal-100 text-center">
              <span className="text-teal-800 font-medium">✨ Terima kasih sudah check-in hari ini!</span>
            </div>
          )}
        </section>

        {/* Menu Utama Section */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">Menu Utama</h2>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-8">
            <Link to="/journal" className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm text-center hover:shadow-md transition">
              <div className="text-2xl mb-1">📖</div>
              <h3 className="text-sm font-semibold text-gray-800">Jurnal AI</h3>
            </Link>
            <Link to="/community" className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm text-center hover:shadow-md transition">
              <div className="text-2xl mb-1">🌍</div>
              <h3 className="text-sm font-semibold text-gray-800">Komunitas</h3>
            </Link>
            <Link to="/mood" className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm text-center hover:shadow-md transition">
              <div className="text-2xl mb-1">📊</div>
              <h3 className="text-sm font-semibold text-gray-800">Statistik</h3>
            </Link>
          </div>
        </section>

        {/* History Section */}
        <section>
          <h2 className="text-lg font-bold text-gray-800 mb-4">Riwayat Mood</h2>
          {isLoadingEntries ? (
            <p className="text-gray-500 text-center py-4">Memuat data...</p>
          ) : moodEntries && moodEntries.length > 0 ? (
            moodEntries.slice(0, 5).map(entry => (
              <MoodCard key={entry.id} entry={entry} />
            ))
          ) : (
            <p className="text-gray-500 text-center py-4 bg-white rounded-xl border border-gray-100">
              Belum ada riwayat mood.
            </p>
          )}
        </section>
      </main>
    </div>
  );
}
