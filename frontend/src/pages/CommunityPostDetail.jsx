import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCommunity } from '../hooks/useCommunity';
import { ArrowLeft, Send, ShieldQuestion } from 'lucide-react';

export default function CommunityPostDetail() {
  const { id } = useParams();
  const { currentPost, fetchPostDetail, createComment, isLoading } = useCommunity();
  const [commentContent, setCommentContent] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  useEffect(() => {
    fetchPostDetail(id);
  }, [id, fetchPostDetail]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentContent) return;
    await createComment(id, commentContent, isAnonymous);
    setCommentContent('');
    setIsAnonymous(false);
  };

  const formatDate = (dateString) => {
    const d = new Date(dateString);
    return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  if (isLoading && !currentPost) return <div className="p-8 text-center text-gray-500">Memuat diskusi...</div>;
  if (!currentPost) return <div className="p-8 text-center text-gray-500">Postingan tidak ditemukan.</div>;

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <header className="flex items-center gap-4 mb-8">
        <Link to="/community" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-500 hover:text-gray-800 shadow-sm border border-gray-100 transition">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-xl font-bold text-gray-900">Kembali ke Komunitas</h1>
      </header>

      {/* Main Post */}
      <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 mb-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-lg">
            {currentPost.author_name.charAt(0)}
          </div>
          <div>
            <p className="font-bold text-gray-900">{currentPost.author_name}</p>
            <p className="text-xs text-gray-400">{formatDate(currentPost.created_at)}</p>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{currentPost.title}</h2>
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
          {currentPost.content}
        </p>
      </div>

      {/* Comments Section */}
      <h3 className="text-lg font-bold text-gray-800 mb-4 ml-2">Komentar ({currentPost.comments?.length || 0})</h3>
      
      <div className="space-y-4 mb-8">
        {currentPost.comments?.map(comment => (
          <div key={comment.id} className="bg-white p-5 rounded-2xl border border-gray-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center font-bold text-xs">
                {comment.author_name.charAt(0)}
              </div>
              <p className="text-sm font-bold text-gray-800">{comment.author_name}</p>
              <span className="text-[10px] text-gray-400">• {formatDate(comment.created_at)}</span>
            </div>
            <p className="text-sm text-gray-600 pl-11">{comment.content}</p>
          </div>
        ))}
      </div>

      {/* Reply Box */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 sticky bottom-8 shadow-lg shadow-teal-900/5">
        <form onSubmit={handleCommentSubmit} className="flex flex-col gap-3">
          <textarea
            placeholder="Tulis dukungan atau balasanmu..."
            className="w-full bg-gray-50 border-none rounded-xl p-4 text-sm h-24 resize-none focus:ring-2 focus:ring-teal-500"
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            required
          />
          
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="anon_comment"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="rounded text-teal-600 focus:ring-teal-500 w-4 h-4 cursor-pointer"
              />
              <label htmlFor="anon_comment" className="text-xs font-semibold text-gray-600 cursor-pointer flex items-center gap-1">
                Balas Anonim <ShieldQuestion size={14} className="text-gray-400" />
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading || !commentContent}
              className="bg-teal-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-teal-700 transition flex items-center gap-2 disabled:opacity-50"
            >
              <Send size={16} />
              Kirim
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}
