// MathBackground.jsx
const MathBackground = () => {
  const symbols = [
    'π', '∑', '√', '∫', 'Δ', 'θ', 'λ', 'σ', 'Ω', '×',
    '÷', '±', '%', '∞', '≈', '≠', '≤', '≥', 'α', 'β',
    'γ', 'φ', '∂', '∇', '∈', '∀', '∃', '²', '³', '∠',
    '∴', '⊥', '∥', 'f', 'x', 'n', '!', '?', 'log', 'sin'
  ];

  const total = 2600;

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-white mx-auto">
      
      {/* Symbol Grid */}
      <div className="absolute inset-0 grid gap-0"
        style={{
          gridTemplateColumns: 'repeat(auto-fill, 28px)',
          gridTemplateRows: 'repeat(auto-fill, 28px)',
        }}
      >
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            className={`
              flex items-center justify-center
              text-[0.55rem] font-serif select-none
              ${i % 11 === 0 ? 'text-black '
              : i % 7 === 0  ? 'text-black '
              : i % 5 === 0  ? 'text-black '
              : 'text-black '}
            `}
          >
            {symbols[i % symbols.length]}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MathBackground;