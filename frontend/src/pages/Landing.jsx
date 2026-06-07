import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100 flex flex-col justify-center items-center text-center px-4">
      <h1 className="text-5xl md:text-6xl font-bold text-teal-800 mb-6">Tenang 🧘</h1>
      <p className="text-xl text-teal-600 mb-8 max-w-xl">
        Aplikasi jurnal harian dan mood tracker untuk membantu mahasiswa mengelola keseimbangan hidup.
      </p>
      <div className="flex gap-4">
        <Link to="/register" className="bg-teal-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-teal-700 transition">
          Mulai Sekarang
        </Link>
        <Link to="/login" className="bg-white text-teal-600 px-6 py-3 rounded-xl font-semibold shadow hover:bg-teal-50 transition">
          Masuk
        </Link>
      </div>
    </div>
  );
}
