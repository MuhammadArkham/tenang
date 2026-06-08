import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
  const dateStr = new Date(post.created_at).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit'
  });

  return (
    <Link to={`/community/${post.id}`} className="block bg-white p-5 rounded-xl shadow-sm border border-gray-100 mb-4 hover:shadow-md transition">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-800 font-bold text-sm">
            {post.author_name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">{post.author_name}</p>
            <p className="text-xs text-gray-500">{dateStr}</p>
          </div>
        </div>
        {post.is_anonymous && (
          <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-2 py-1 rounded-md">Anonim</span>
        )}
      </div>
      
      <h3 className="font-bold text-gray-900 mb-2">{post.title}</h3>
      <p className="text-gray-600 text-sm line-clamp-3 mb-3">{post.content}</p>
      
      <div className="flex items-center gap-4 border-t border-gray-50 pt-3 text-sm text-gray-500 font-medium">
        <div className="flex items-center gap-1 hover:text-teal-600 transition">
          <span>💬</span> {post.comment_count} Komentar
        </div>
      </div>
    </Link>
  );
}
