import { Link } from 'react-router-dom';
import SentimentBadge from './SentimentBadge';

export default function JournalCard({ entry }) {
  const dateStr = new Date(entry.created_at).toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  });

  // Highlight if available, else snippet of content
  const preview = entry.highlight || (entry.content.slice(0, 80) + (entry.content.length > 80 ? '...' : ''));

  return (
    <Link to={`/journal/${entry.id}`} className="block bg-white p-5 rounded-xl shadow-sm border border-gray-100 mb-3 hover:shadow-md transition group">
      <div className="flex justify-between items-start mb-2">
        <span className="text-xs text-gray-500 font-medium">{dateStr}</span>
        <SentimentBadge label={entry.sentiment_label} />
      </div>
      <p className="text-gray-800 font-medium group-hover:text-teal-700 transition leading-snug">
        {preview}
      </p>
      <div className="mt-3 text-xs text-gray-400 flex items-center gap-1">
        <span>{entry.word_count} kata</span>
        {entry.ai_insight && <span>• Ada balasan AI ✨</span>}
      </div>
    </Link>
  );
}
