const MOOD_EMOJIS = {
  1: '😫',
  2: '😞',
  3: '😐',
  4: '🙂',
  5: '😁'
};

const MOOD_LABELS = {
  1: 'Sangat Buruk',
  2: 'Buruk',
  3: 'Biasa Saja',
  4: 'Baik',
  5: 'Sangat Baik'
};

export default function MoodSlider({ label, value, onChange }) {
  return (
    <div className="w-full py-4">
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <span className="text-sm font-semibold text-teal-600">
          {MOOD_LABELS[value] || 'Pilih...'}
        </span>
      </div>
      
      <div className="flex justify-between items-center mb-4 text-3xl">
        {[1, 2, 3, 4, 5].map((level) => (
          <button
            key={level}
            type="button"
            onClick={() => onChange(level)}
            className={`transition-transform duration-200 ${
              value === level ? 'scale-125 filter drop-shadow-md' : 'opacity-50 hover:opacity-80 hover:scale-110'
            }`}
          >
            {MOOD_EMOJIS[level]}
          </button>
        ))}
      </div>
      
      <input
        type="range"
        min="1"
        max="5"
        step="1"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
      />
    </div>
  );
}
