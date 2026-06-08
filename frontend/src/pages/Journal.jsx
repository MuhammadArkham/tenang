import { useState } from 'react';
import { useJournal } from '../hooks/useJournal';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Journal() {
  const [content, setContent] = useState('');
  const { journalEntries, isLoadingEntries, submitJournal, isSubmitting } = useJournal();
  
  // Dummy AI Insight for Side-by-Side view before submission
  const dummyInsight = {
    mood: "Netral Positif",
    sentiment: "positive",
    insight: "Kamu tampak lelah karena tekanan akademik, namun tetap menunjukkan optimisme untuk menyelesaikan tugasmu. Dukungan teman membantu menjaga semangatmu.",
    keywords: ["lelah", "tugas", "revisi", "teman", "optimis"]
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (content.length < 5) return;
    await submitJournal(content);
    setContent('');
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <header className="flex items-center gap-4 mb-8">
        <Link to="/dashboard" className="text-gray-500 hover:text-gray-800 transition">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Jurnal & AI Insight</h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* Left: Input Form */}
        <div className="lg:col-span-3 bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col">
          <h2 className="text-lg font-bold text-gray-800 mb-2">Tulis Jurnal</h2>
          <p className="text-sm text-gray-500 mb-6">Apa yang ingin kamu ceritakan hari ini?</p>
          
          <form onSubmit={handleSubmit} className="flex flex-col flex-1">
            <textarea
              className="w-full flex-1 border border-gray-200 rounded-2xl p-5 focus:ring-2 focus:ring-teal-500 focus:outline-none resize-none text-gray-700 leading-relaxed min-h-[300px] mb-6"
              placeholder="Hari ini cukup melelahkan. Banyak tugas menumpuk dan revisi. Tapi senang karena bisa diskusi dengan teman dan dapat ide baru untuk penelitian."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={isSubmitting}
            />
            
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400">
                {content.length}/1000
              </span>
              <button
                type="submit"
                disabled={isSubmitting || content.length < 5}
                className="bg-teal-700 text-white px-8 py-3 rounded-xl font-semibold text-sm hover:bg-teal-800 transition disabled:opacity-50"
              >
                {isSubmitting ? 'Menganalisis...' : 'Analisis Sekarang'}
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-4 text-center">
              AI akan menganalisis tulisanmu secara privat.
            </p>
          </form>
        </div>

        {/* Right: AI Insight Preview */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-6">Hasil Analisis</h2>
            
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-center justify-between mb-6">
              <div>
                <p className="text-xs text-gray-500 mb-1">Mood Tulisanmu</p>
                <p className="font-bold text-gray-800">{dummyInsight.mood}</p>
              </div>
              <span className="text-3xl">🙂</span>
            </div>

            <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
              Insight AI <span className="text-yellow-400">✨</span>
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              {dummyInsight.insight}
            </p>

            <h3 className="text-sm font-bold text-gray-800 mb-3">Kata Kunci</h3>
            <div className="flex flex-wrap gap-2">
              {dummyInsight.keywords.map(kw => (
                <span key={kw} className="px-3 py-1 bg-teal-50 text-teal-700 text-xs font-semibold rounded-full border border-teal-100">
                  {kw}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
