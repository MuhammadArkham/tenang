import { useState } from 'react';
import { useCommunity } from '../hooks/useCommunity';
import PostCard from '../components/PostCard';
import { Link } from 'react-router-dom';

export default function Community() {
  const { posts, isLoadingPosts, createPost, isCreatingPost } = useCommunity();
  const [showForm, setShowForm] = useState(false);
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isAnon, setIsAnon] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim().length < 3 || content.trim().length < 10) {
      setError('Judul (min 3 huruf) dan cerita (min 10 huruf) harus diisi.');
      return;
    }
    setError('');
    
    try {
      await createPost({ title, content, is_anonymous: isAnon });
      setTitle('');
      setContent('');
      setIsAnon(false);
      setShowForm(false);
    } catch (err) {
      setError(err.response?.data?.detail || 'Terjadi kesalahan saat memposting.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-teal-600 text-white px-6 py-6 shadow-md">
        <div className="flex items-center gap-2 mb-1">
          <Link to="/dashboard" className="text-teal-200 hover:text-white text-sm">← Dashboard</Link>
        </div>
        <h1 className="text-2xl font-bold">Ruang Komunitas</h1>
        <p className="text-teal-100 text-sm mt-1">Saling mendukung, berbagi tanpa beban.</p>
      </header>

      <main className="max-w-3xl mx-auto px-4 mt-6">
        
        {/* Create Post Button / Form */}
        <div className="mb-8">
          {!showForm ? (
            <button 
              onClick={() => setShowForm(true)}
              className="w-full bg-white p-4 rounded-xl border border-gray-200 shadow-sm text-left text-gray-500 hover:bg-gray-50 transition flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl">✍️</div>
              <span className="font-medium">Bagikan ceritamu hari ini...</span>
            </button>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white p-5 rounded-2xl shadow-sm border border-teal-100">
              <h3 className="font-bold text-gray-800 mb-4">Buat Postingan Baru</h3>
              {error && <div className="text-red-500 text-sm mb-3">{error}</div>}
              
              <input
                type="text"
                placeholder="Judul cerita (contoh: Bingung tugas akhir)"
                className="w-full mb-3 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:outline-none"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={isCreatingPost}
              />
              
              <textarea
                placeholder="Ceritakan apa yang kamu rasakan..."
                className="w-full h-32 mb-3 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:outline-none resize-none"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                disabled={isCreatingPost}
              />
              
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <div className="relative">
                    <input 
                      type="checkbox" 
                      className="sr-only" 
                      checked={isAnon} 
                      onChange={(e) => setIsAnon(e.target.checked)}
                      disabled={isCreatingPost}
                    />
                    <div className={`block w-10 h-6 rounded-full transition ${isAnon ? 'bg-teal-500' : 'bg-gray-300'}`}></div>
                    <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${isAnon ? 'transform translate-x-4' : ''}`}></div>
                  </div>
                  <span className="text-sm font-medium text-gray-700">Kirim sebagai Anonim</span>
                </label>
                
                <div className="flex gap-2">
                  <button 
                    type="button" 
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-xl transition"
                    disabled={isCreatingPost}
                  >
                    Batal
                  </button>
                  <button 
                    type="submit"
                    disabled={isCreatingPost || !title || !content}
                    className="px-4 py-2 text-sm font-medium bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition disabled:opacity-50"
                  >
                    {isCreatingPost ? 'Memposting...' : 'Kirim'}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Feed */}
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-4">Postingan Terbaru</h2>
          {isLoadingPosts ? (
            <p className="text-center text-gray-500 py-10">Memuat cerita teman-teman...</p>
          ) : posts && posts.length > 0 ? (
            posts.map(post => <PostCard key={post.id} post={post} />)
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-200">
              <span className="text-4xl block mb-3">🌱</span>
              <p className="text-gray-500 font-medium">Jadilah yang pertama berbagi cerita di komunitas ini!</p>
            </div>
          )}
        </div>

      </main>
    </div>
  );
}
