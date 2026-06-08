import { useParams, Link, useNavigate } from 'react-router-dom';
import { useJournal } from '../hooks/useJournal';
import SentimentBadge from '../components/SentimentBadge';

export default function JournalDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getJournalDetail, deleteJournal } = useJournal();
  
  const { data: entry, isLoading } = getJournalDetail(id);

  const handleDelete = async () => {
    if (window.confirm('Yakin ingin menghapus jurnal ini?')) {
      await deleteJournal(id);
      navigate('/journal');
    }
  };

  if (isLoading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-500">Memuat jurnal...</div>;
  }

  if (!entry) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <p className="text-gray-500 mb-4">Jurnal tidak ditemukan.</p>
        <Link to="/journal" className="text-teal-600 font-medium hover:underline">Kembali ke Daftar</Link>
      </div>
    );
  }

  const dateStr = new Date(entry.created_at).toLocaleDateString('id-ID', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute:'2-digit'
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-white border-b px-4 py-4 flex items-center justify-between sticky top-0 z-10">
        <Link to="/journal" className="text-gray-600 hover:text-teal-600 font-medium flex items-center gap-1">
          <span>← Kembali</span>
        </Link>
        <button onClick={handleDelete} className="text-red-500 text-sm font-medium hover:underline">
          Hapus
        </button>
      </header>

      <main className="max-w-2xl mx-auto px-4 mt-6 space-y-6">
        
        {/* Support Banner if crisis detected */}
        {entry.crisis_message && (
          <div className="bg-red-50 border border-red-200 p-4 rounded-xl">
            <h3 className="text-red-800 font-bold mb-1 flex items-center gap-2">
              <span className="text-xl">❤️</span> Kami peduli padamu
            </h3>
            <p className="text-red-700 text-sm leading-relaxed">{entry.crisis_message}</p>
          </div>
        )}

        {/* AI Insight Card */}
        {entry.ai_insight && (
          <div className="bg-gradient-to-br from-teal-50 to-emerald-50 border border-teal-100 p-5 rounded-2xl shadow-sm relative overflow-hidden">
            <div className="absolute -right-4 -top-4 text-6xl opacity-10">✨</div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">✨</span>
              <h2 className="font-bold text-teal-800">Insight dari Teman AI</h2>
            </div>
            
            <p className="text-teal-900 leading-relaxed mb-4">"{entry.ai_insight}"</p>
            
            {entry.suggested_action && (
              <div className="bg-white/60 p-3 rounded-lg border border-teal-200/50">
                <p className="text-sm font-semibold text-teal-800 mb-1">Coba lakukan ini hari ini:</p>
                <p className="text-sm text-teal-700">{entry.suggested_action}</p>
              </div>
            )}
          </div>
        )}

        {/* User's Original Journal */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-100">
            <span className="text-sm text-gray-500 font-medium">{dateStr}</span>
            <SentimentBadge label={entry.sentiment_label} />
          </div>
          
          <div className="prose prose-teal max-w-none text-gray-800 whitespace-pre-wrap leading-relaxed">
            {entry.content}
          </div>
        </section>

      </main>
    </div>
  );
}
