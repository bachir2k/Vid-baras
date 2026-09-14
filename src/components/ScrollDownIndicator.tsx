export default function ScrollDownIndicator({ className = 'text-white/60' }: { className?: string }) {
  return (
    <>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-hero-bounce">
        <svg className={`w-6 h-6 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
      <style>{`
        @keyframes hero-bounce-arrow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-hero-bounce {
          animation: hero-bounce-arrow 2s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
