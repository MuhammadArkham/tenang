import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCommunityPost } from '../hooks/useCommunity';

export default function CommunityPostDetail() {
  const { id } = useParams();
  const { post, isLoadingPost, comments, isLoadingComments, addComment, isAddingComment } = useCommunityPost(id);
  
  const [commentText, setCommentText] = useState('');
  const [isAnon, setIsAnon] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (commentText.trim().length < 2) {
      setError('Komentar minimal 2 huruf.');
      return;
    }
    setError('');
    
    try {
      await addComment({ content: commentText, is_anonymous: isAnon });
      setCommentText('');
      setIsAnon(false);
    } catch (err) {
      setError('Gagal mengirim komentar.');
    }
  };

  if (isLoadingPost) {
    return <div className="min-h-screen bg-gray-50 flex justify-center pt-20 text-gray-500">Memuat postingan...</div>;
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-20">
        <p className="text-gray-500 mb-4">Postingan tidak ditemukan.</p>
        <Link to="/community" className="text-teal-600 font-medium">Kembali ke Komunitas</Link>
      </div>
    );
  }

  const dateStr = new Date(post.created_at).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-white border-b px-4 py-4 flex items-center sticky top-0 z-10 shadow-sm">
        <Link to="/community" className="text-gray-600 hover:text-teal-600 font-medium flex items-center gap-1">
          <span>← Kembali</span>
        </Link>
      </header>

      <main className="max-w-2xl mx-auto px-4 mt-6">
        {/* Original Post */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-800 font-bold">
                {post.author_name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-bold text-gray-800">{post.author_name}</p>
                <p className="text-xs text-gray-500">{dateStr}</p>
              </div>
            </div>
            {post.is_anonymous && (
              <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-2 py-1 rounded-md">Anonim</span>
            )}
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-3">{post.title}</h1>
          <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{post.content}</p>
        </section>

        {/* Comments Section */}
        <section>
          <h2 className="text-lg font-bold text-gray-800 mb-4">Komentar ({post.comment_count})</h2>
          
          {/* Comment Form */}
          <form onSubmit={handleSubmit} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6">
            {error && <div className="text-red-500 text-xs mb-2">{error}</div>}
            <textarea
              className="w-full h-20 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none resize-none text-sm mb-3"
              placeholder="Berikan dukungan atau tanggapanmu..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              disabled={isAddingComment}
            />
            <div className="flex justify-between items-center">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={isAnon}
                  onChange={(e) => setIsAnon(e.target.checked)}
                  className="rounded text-teal-600 focus:ring-teal-500"
                  disabled={isAddingComment}
                />
                <span className="text-xs text-gray-600 font-medium">Balas Anonim</span>
              </label>
              <button 
                type="submit"
                disabled={isAddingComment || !commentText.trim()}
                className="bg-teal-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-teal-700 disabled:opacity-50 transition"
              >
                {isAddingComment ? '...' : 'Kirim'}
              </button>
            </div>
          </form>

          {/* Comment List */}
          {isLoadingComments ? (
            <p className="text-center text-gray-500 py-4">Memuat komentar...</p>
          ) : comments && comments.length > 0 ? (
            <div className="space-y-4">
              {comments.map(c => (
                <div key={c.id} className="bg-transparent border-b border-gray-200 pb-4 flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center text-gray-600 font-bold text-xs mt-1">
                    {c.author_name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="font-semibold text-gray-800 text-sm">{c.author_name}</span>
                      <span className="text-xs text-gray-500">
                        {new Date(c.created_at).toLocaleDateString('id-ID', {day:'numeric', month:'short'})}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{c.content}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm text-center py-6 bg-white rounded-xl border border-dashed border-gray-200">
              Belum ada komentar. Jadilah yang pertama memberikan dukungan!
            </p>
          )}
        </section>
      </main>
    </div>
  );
}
