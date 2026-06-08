import { useState } from 'react';
import { useMood } from '../hooks/useMood';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  GraduationCap, 
  ClipboardList, 
  FileText, 
  Users, 
  Heart, 
  Dumbbell,
  MoreHorizontal
} from 'lucide-react';

const MOODS = [
  { score: 1, emoji: '😠', label: 'Sangat Buruk', color: 'text-red-500' },
  { score: 2, emoji: '🙁', label: 'Buruk', color: 'text-orange-500' },
  { score: 3, emoji: '😐', label: 'Biasa Saja', color: 'text-yellow-500' },
  { score: 4, emoji: '🙂', label: 'Baik', color: 'text-teal-500' },
  { score: 5, emoji: '😁', label: 'Sangat Baik', color: 'text-green-500' }
];

const CONTEXTS = [
  { id: 'Kuliah', icon: <GraduationCap size={24} strokeWidth={1.5} /> },
  { id: 'Tugas', icon: <ClipboardList size={24} strokeWidth={1.5} /> },
  { id: 'Ujian', icon: <FileText size={24} strokeWidth={1.5} /> },
  { id: 'Organisasi', icon: <Users size={24} strokeWidth={1.5} /> },
  { id: 'Personal', icon: <Heart size={24} strokeWidth={1.5} /> },
  { id: 'Olahraga', icon: <Dumbbell size={24} strokeWidth={1.5} /> },
  { id: 'Lainnya', icon: <MoreHorizontal size={24} strokeWidth={1.5} /> },
];

export default function MoodCheckin() {
  const [score, setScore] = useState(4);
  const [energy, setEnergy] = useState(3);
  const [selectedContexts, setSelectedContexts] = useState(['Kuliah']);
  const [note, setNote] = useState('');
  
  const { submitMood, isSubmitting } = useMood();
  const navigate = useNavigate();

  const toggleContext = (ctxId) => {
    if (selectedContexts.includes(ctxId)) {
      setSelectedContexts(selectedContexts.filter(c => c !== ctxId));
    } else {
      setSelectedContexts([...selectedContexts, ctxId]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitMood({ 
        score, 
        energy_level: energy, 
        context: selectedContexts.join(', '), 
        note 
      });
      navigate('/dashboard');
    } catch (error) {
      alert('Gagal menyimpan mood');
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <header className="flex items-center gap-4 mb-6">
        <Link to="/dashboard" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-500 hover:text-gray-800 shadow-sm border border-gray-100 transition">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-xl font-bold text-gray-900">Mood Check-in</h1>
      </header>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
        
        {/* Mood Selection */}
        <div className="mb-10">
          <label className="block text-sm font-bold text-gray-800 mb-6 text-center">Bagaimana perasaanmu hari ini?</label>
          <div className="flex justify-between items-center px-4">
            {MOODS.map(mood => (
              <div key={mood.score} className="flex flex-col items-center gap-2">
                <button
                  type="button"
                  onClick={() => setScore(mood.score)}
                  className={`text-[40px] leading-none transition-all duration-300 ${
                    score === mood.score 
                      ? 'scale-[1.3] filter-none drop-shadow-md' 
                      : 'grayscale opacity-40 hover:grayscale-0 hover:opacity-100 hover:scale-110'
                  }`}
                  title={mood.label}
                >
                  {mood.emoji}
                </button>
                <span className={`text-[10px] font-bold mt-2 transition-opacity ${score === mood.score ? mood.color : 'opacity-0'}`}>
                  {mood.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Energy Slider */}
        <div className="mb-10 px-2">
          <label className="block text-sm font-bold text-gray-800 mb-6 text-center">Energi</label>
          <div className="relative pt-1">
            <input
              type="range"
              min="1"
              max="5"
              value={energy}
              onChange={(e) => setEnergy(parseInt(e.target.value))}
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-500"
            />
            <div className="flex items-center justify-between text-[11px] font-semibold text-gray-400 mt-3">
              <span className={energy <= 2 ? "text-orange-500" : ""}>Sangat Lelah</span>
              <span className={energy >= 4 ? "text-teal-600" : ""}>Penuh Energi</span>
            </div>
          </div>
        </div>

        {/* Context Grid */}
        <div className="mb-8">
          <label className="block text-sm font-bold text-gray-800 mb-4 text-center">Konteks (Pilih beberapa)</label>
          <div className="grid grid-cols-4 sm:grid-cols-4 gap-3">
            {CONTEXTS.map(ctx => {
              const isSelected = selectedContexts.includes(ctx.id);
              return (
                <button
                  key={ctx.id}
                  type="button"
                  onClick={() => toggleContext(ctx.id)}
                  className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all duration-200 ${
                    isSelected
                      ? 'bg-teal-50 border-teal-500 text-teal-700 shadow-sm'
                      : 'bg-white border-gray-100 text-gray-500 hover:bg-gray-50 hover:border-gray-200'
                  }`}
                >
                  <div className={`mb-2 ${isSelected ? 'text-teal-600' : 'text-gray-400'}`}>
                    {ctx.icon}
                  </div>
                  <span className={`text-[11px] font-semibold ${isSelected ? 'text-teal-800' : 'text-gray-500'}`}>
                    {ctx.id}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Catatan */}
        <div className="mb-10">
          <label className="block text-sm font-bold text-gray-800 mb-3 ml-1">Catatan (Opsional)</label>
          <textarea
            className="w-full bg-gray-50 border-none rounded-2xl p-5 focus:ring-2 focus:ring-teal-500 focus:bg-white transition-colors resize-none h-28 text-sm text-gray-700 placeholder-gray-400"
            placeholder="Apa yang terjadi hari ini? (Misal: Presentasi berjalan lancar...)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center px-2">
          <Link to="/dashboard" className="text-gray-400 font-bold text-sm hover:text-gray-700 transition">
            Batal
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-teal-600 text-white px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-teal-700 hover:shadow-lg hover:shadow-teal-600/20 transition-all disabled:opacity-50 disabled:hover:shadow-none"
          >
            {isSubmitting ? 'Menyimpan...' : 'Simpan Check-in'}
          </button>
        </div>
      </form>
    </div>
  );
}
