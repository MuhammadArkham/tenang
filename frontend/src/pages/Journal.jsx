import { useState } from 'react';
import { useJournal } from '../hooks/useJournal';
import JournalCard from '../components/JournalCard';

export default function Journal() {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const { journalEntries, isLoadingEntries, submitJournal, isSubmitting } = useJournal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (content.trim().length < 5) {
      setError('Tulislah jurnal sedikit lebih panjang ya.');
      return;
    }
    setError('');
    
    try {
      await submitJournal(content);
      setContent('');
    } catch (err) {
      setError(err.response?.data?.detail || 'Terjadi kesalahan saat menyimpan jurnal.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-teal-600 text-white px-6 py-6 shadow-md">
        <h1 className="text-2xl font-bold">Jurnal Refleksi</h1>
        <p className="text-teal-100 text-sm mt-1">Tuangkan pikiranmu, AI kami akan mencoba mendengarkan.</p>
      </header>

      <main className="max-w-3xl mx-auto px-4 mt-6 space-y-8">
        {/* Form Jurnal */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <form onSubmit={handleSubmit}>
            {error && <div className="mb-3 text-red-600 text-sm">{error}</div>}
            <textarea
              className="w-full h-32 p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none text-gray-800"
              placeholder="Apa yang mengganjal di pikiranmu hari ini?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={isSubmitting}
            />
            <div className="mt-3 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting || !content.trim()}
                className="bg-teal-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-teal-700 disabled:opacity-50 transition flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin text-xl">⏳</span>
                    AI sedang membaca...
                  </>
                ) : (
                  'Tulis Jurnal'
                )}
              </button>
            </div>
          </form>
        </section>

        {/* List Jurnal */}
        <section>
          <h2 className="text-lg font-bold text-gray-800 mb-4">Riwayat Jurnal</h2>
          {isLoadingEntries ? (
            <p className="text-center text-gray-500 py-8">Memuat riwayat jurnal...</p>
          ) : journalEntries && journalEntries.length > 0 ? (
            <div className="space-y-3">
              {journalEntries.map(entry => (
                <JournalCard key={entry.id} entry={entry} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-white rounded-xl border border-gray-100 border-dashed">
              <span className="text-4xl mb-3 block">📖</span>
              <p className="text-gray-500">Belum ada jurnal yang ditulis.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
