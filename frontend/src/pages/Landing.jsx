import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function Landing() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-teal-100">
      
      {/* Navbar */}
      <nav className="border-b border-gray-100 px-8 py-4 flex justify-between items-center sticky top-0 bg-white z-50">
        <div className="flex items-center gap-2">
          <span className="text-teal-600 text-2xl">🌿</span>
          <span className="text-xl font-bold tracking-tight text-gray-900">Tenang</span>
        </div>
        
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
          <a href="#fitur" className="hover:text-teal-600 transition">Fitur</a>
          <a href="#tentang" className="hover:text-teal-600 transition">Tentang</a>
          <a href="#keamanan" className="hover:text-teal-600 transition">Keamanan</a>
          <a href="#blog" className="hover:text-teal-600 transition">Blog</a>
        </div>

        <div className="flex gap-4">
          {isAuthenticated ? (
            <Link to="/dashboard" className="bg-teal-700 text-white px-6 py-2 rounded-full font-semibold hover:bg-teal-800 transition">
              Dashboard
            </Link>
          ) : (
            <>
              <Link to="/login" className="border border-gray-200 text-gray-700 px-6 py-2 rounded-full font-medium hover:bg-gray-50 transition">
                Masuk
              </Link>
              <Link to="/register" className="bg-teal-700 text-white px-6 py-2 rounded-full font-medium hover:bg-teal-800 transition shadow-sm">
                Mulai Gratis
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-8 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Kenali dirimu,<br/>jaga mentalmu,<br/>hidup lebih <span className="text-teal-600 italic">tenang.</span>
          </h1>
          <p className="text-gray-600 text-lg mb-10 max-w-md leading-relaxed">
            Catat mood, tulis jurnal, dan dapatkan insight pribadi untuk membantumu memahami diri sebelum stres menjadi berlebihan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Link to="/register" className="bg-teal-700 text-white px-8 py-4 rounded-xl font-semibold text-center hover:bg-teal-800 transition shadow-lg shadow-teal-900/20">
              Mulai Gratis
            </Link>
            <button className="border border-gray-200 text-gray-700 px-8 py-4 rounded-xl font-semibold text-center hover:bg-gray-50 transition">
              Lihat Demo
            </button>
          </div>
          
          <div className="flex items-center gap-6 text-xs text-gray-500 font-medium">
            <span className="flex items-center gap-1">✨ Gratis selamanya</span>
            <span className="flex items-center gap-1">🔒 Privat & Aman</span>
            <span className="flex items-center gap-1">💳 Tanpa Kartu Kredit</span>
          </div>
        </div>

        <div className="relative">
          <img 
            src="/hero.png" 
            alt="Ilustrasi mahasiswa rileks dengan laptop" 
            className="w-full object-cover rounded-[3rem] shadow-sm border border-teal-50"
          />
        </div>
      </main>

      {/* Features Cards */}
      <section className="bg-[#F8FAFC] border-t border-gray-100 py-20">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition group">
              <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition">🙂</div>
              <h3 className="font-bold text-gray-900 mb-3">Mood Tracker</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Check-in mood harian kurang dari 2 menit dan lihat pola perubahanmu.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition group">
              <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition">📖</div>
              <h3 className="font-bold text-gray-900 mb-3">AI Journal</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Tulis bebas. AI akan membantu memahami perasaanmu lebih dalam.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition group">
              <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition">📊</div>
              <h3 className="font-bold text-gray-900 mb-3">Weekly Insight</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Dapatkan laporan mingguan dan kenali pola yang mempengaruhi moodmu.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition group">
              <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition">📚</div>
              <h3 className="font-bold text-gray-900 mb-3">Resources</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Artikel, teknik relaksasi, dan kontak konselor kampus yang bisa diandalkan.
              </p>
            </div>
          </div>
          
          {/* Trust badges */}
          <div className="mt-16 pt-8 border-t border-gray-200 grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-sm font-medium text-gray-500">
            <div className="flex flex-col items-center gap-2">
              <span className="text-2xl">🔒</span>
              Privat dan Aman
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-2xl">🔐</span>
              Data terenkripsi
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-2xl">🚫</span>
              Tidak ada fitur sosial
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-2xl">👤</span>
              Kamu punya kendali penuh
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
