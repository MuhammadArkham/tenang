import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function HabitLog() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <header className="flex items-center gap-4 mb-8">
        <Link to="/dashboard" className="text-gray-500 hover:text-gray-800 transition">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Habit Log</h1>
      </header>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 h-96 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Segera Hadir</h2>
          <p className="text-gray-500">Fitur pelacakan kebiasaan (Habit Log) sedang dikembangkan.</p>
        </div>
      </div>
    </div>
  );
}
