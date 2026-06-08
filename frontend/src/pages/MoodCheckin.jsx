import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MoodSlider from '../components/MoodSlider';
import { useMood } from '../hooks/useMood';

const CONTEXT_OPTIONS = [
  'kuliah', 'tugas', 'ujian', 'organisasi', 'keluarga', 'pertemanan', 'personal', 'lainnya'
];

export default function MoodCheckin() {
  const [moodScore, setMoodScore] = useState(3);
  const [energyLevel, setEnergyLevel] = useState(3);
  const [context, setContext] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const { submitMood, isSubmitting } = useMood();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      await submitMood({
        mood_score: moodScore,
        energy_level: energyLevel,
        context: context || null,
        note: note || null
      });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.detail || 'Terjadi kesalahan saat menyimpan data.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Check-in Hari Ini</h2>
        <p className="text-sm text-gray-600 mb-6">Bagaimana perasaan dan energimu saat ini?</p>

        {error && (
          <div className="mb-4 bg-red-50 text-red-600 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <MoodSlider label="Skor Mood" value={moodScore} onChange={setMoodScore} />
          <MoodSlider label="Level Energi" value={energyLevel} onChange={setEnergyLevel} />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Konteks (Apa yang paling mempengaruhi perasaanmu?)
            </label>
            <select
              value={context}
              onChange={(e) => setContext(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md border"
            >
              <option value="">-- Pilih Konteks --</option>
              {CONTEXT_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt.charAt(0).toUpperCase() + opt.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Catatan Singkat (Opsional)
            </label>
            <textarea
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              placeholder="Ceritakan sedikit lebih detail..."
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50"
          >
            {isSubmitting ? 'Menyimpan...' : 'Simpan Mood'}
          </button>
        </form>
      </div>
    </div>
  );
}
