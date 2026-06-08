export default function MoodCard({ entry }) {
  const dateStr = new Date(entry.created_at).toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const emojis = { 1: '😫', 2: '😞', 3: '😐', 4: '🙂', 5: '😁' };
  
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-3 flex items-start gap-4">
      <div className="text-4xl">{emojis[entry.mood_score]}</div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h4 className="font-semibold text-gray-800">
            {entry.context ? entry.context.charAt(0).toUpperCase() + entry.context.slice(1) : 'Tanpa Konteks'}
          </h4>
          <span className="text-xs text-gray-500">{dateStr}</span>
        </div>
        <div className="mt-1 flex items-center gap-2 text-xs font-medium text-gray-600">
          <span className="bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full">
            Energi: {entry.energy_level}/5
          </span>
        </div>
        {entry.note && (
          <p className="mt-2 text-sm text-gray-600 italic">"{entry.note}"</p>
        )}
      </div>
    </div>
  );
}
