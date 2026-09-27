export default function Marquee() {
  const items = [
    "GMCUTZ PRIVATE BARBER STUDIO",
    "1-ON-1 VIP SESSIONS",
    "SIGNATURE FADES & TAPERS",
    "TRESSA STREETWEAR & GROOMING",
    "STRICTLY PRIVATE",
    "PRECISION CRAFT",
  ];

  return (
    <div className="relative w-full overflow-hidden border-y border-white/10 bg-charcoal/60 py-3.5 backdrop-blur-md">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-matte to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-matte to-transparent" />

      <div className="animate-marquee flex items-center">
        {[...items, ...items, ...items, ...items].map((text, i) => (
          <div key={i} className="flex items-center gap-6 px-4">
            <span className="text-[11px] font-bold tracking-[0.35em] text-white/80 transition-colors hover:text-amber">
              {text}
            </span>
            <span className="inline-block h-1 w-1 rounded-full bg-amber/60" />
          </div>
        ))}
      </div>
    </div>
  );
}
