type OrnamentProps = {
  tone?: 'gold' | 'lavender';
  className?: string;
};

export function Ornament({ tone = 'lavender', className = '' }: OrnamentProps) {
  const color = tone === 'gold' ? 'bg-lavender-soft' : 'bg-lavender-soft';

  return (
    <div className={`flex justify-center ${className}`} aria-hidden="true">
      <div className={`main-ornament-mask h-24 w-24 ${color} drop-shadow-[0_0_18px_rgba(200,173,212,0.35)]`} />
    </div>
  );
}
