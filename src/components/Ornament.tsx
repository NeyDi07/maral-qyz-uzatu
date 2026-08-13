type OrnamentProps = {
  tone?: 'gold' | 'lavender';
  className?: string;
};

export function Ornament({ tone = 'lavender', className = '' }: OrnamentProps) {
  const color = tone === 'gold' ? 'bg-[var(--lavender-soft)]' : 'bg-[var(--lavender-deep)]';

  return (
    <div className={`flex justify-center ${className}`} aria-hidden="true">
      <div className={`main-ornament-mask h-24 w-24 ${color} drop-shadow-[0_0_22px_rgba(123,63,160,0.5)]`} />
    </div>
  );
}
