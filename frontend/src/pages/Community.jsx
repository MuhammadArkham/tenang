import { useEffect, useState } from 'react';
import { useCommunity } from '../hooks/useCommunity';
import { Link } from 'react-router-dom';
import { MessageCircle, ShieldQuestion, Send } from 'lucide-react';

export default function Community() {
  const { posts, fetchPosts, createPost, isLoading } = useCommunity();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return;
    await createPost(title, content, isAnonymous);
    setTitle('');
    setContent('');
    setIsAnonymous(false);
  };

  const formatDate = (dateString) => {
    const d = new Date(dateString);
    return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Komunitas Tenang</h1>
        <p className="text-sm text-gray-500">Berbagi cerita, beban, dan saling mendukung di ruang yang aman.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col: Create Post */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 sticky top-8">
            <h2 className="text-sm font-bold text-gray-800 mb-4">Buat Postingan</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Judul postingan..."
                className="w-full bg-gray-50 border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-teal-500"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={100}
                required
              />
              <textarea
                placeholder="Apa yang ingin kamu ceritakan atau tanyakan?"
                className="w-full bg-gray-50 border-none rounded-xl p-4 text-sm h-32 resize-none focus:ring-2 focus:ring-teal-500"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
              
              <div className="flex items-center gap-2 px-1">
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="rounded text-teal-600 focus:ring-teal-500 w-4 h-4 cursor-pointer"
                />
                <label htmlFor="anonymous" className="text-xs font-semibold text-gray-600 cursor-pointer flex items-center gap-1">
                  Posting sebagai Anonim <ShieldQuestion size={14} className="text-gray-400" />
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading || !title || !content}
                className="w-full bg-teal-600 text-white py-3 rounded-xl font-bold text-sm hover:bg-teal-700 transition flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
              >
                <Send size={16} />
                Bagikan
              </button>
            </form>
          </div>
        </div>

        {/* Right Col: Feed */}
        <div className="lg:col-span-2 space-y-4">
          {isLoading && posts.length === 0 ? (
            <div className="text-center py-10 text-gray-500">Memuat postingan...</div>
          ) : posts.length === 0 ? (
            <div className="bg-white p-10 rounded-[2rem] text-center border border-gray-100">
              <div className="text-4xl mb-4">🌱</div>
              <p className="text-gray-500 font-medium">Jadilah yang pertama berbagi cerita di komunitas ini.</p>
            </div>
          ) : (
            posts.map(post => (
              <Link to={`/community/${post.id}`} key={post.id} className="block group">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-teal-300 hover:shadow-md transition">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-sm">
                        {post.author_name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{post.author_name}</p>
                        <p className="text-[11px] text-gray-400">{formatDate(post.created_at)}</p>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-gray-800 text-lg mb-2 group-hover:text-teal-700 transition">{post.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-4 leading-relaxed">
                    {post.content}
                  </p>
                  
                  <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
                    <MessageCircle size={16} />
                    <span>Diskusi</span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
