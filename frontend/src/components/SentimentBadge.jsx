export default function SentimentBadge({ label }) {
  if (!label) return null;

  const config = {
    positive: { text: 'Positif', bg: 'bg-green-100', textCol: 'text-green-700', border: 'border-green-200' },
    neutral: { text: 'Netral', bg: 'bg-gray-100', textCol: 'text-gray-700', border: 'border-gray-200' },
    negative: { text: 'Negatif', bg: 'bg-orange-100', textCol: 'text-orange-700', border: 'border-orange-200' }
  };

  const badge = config[label.toLowerCase()] || config.neutral;

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${badge.bg} ${badge.textCol} ${badge.border}`}>
      {badge.text}
    </span>
  );
}
