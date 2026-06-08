import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function LaporanMingguan() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <header className="flex items-center gap-4 mb-8">
        <Link to="/dashboard" className="text-gray-500 hover:text-gray-800 transition">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Laporan Mingguan</h1>
        <div className="ml-auto">
          <button className="text-sm font-medium border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50">
            Unduh PDF
          </button>
        </div>
      </header>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 h-96 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">📊</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Segera Hadir</h2>
          <p className="text-gray-500">Fitur Laporan Mingguan masih dalam tahap pengembangan.</p>
        </div>
      </div>
    </div>
  );
}
