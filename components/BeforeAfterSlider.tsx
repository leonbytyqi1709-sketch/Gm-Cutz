"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { Sparkles, MoveHorizontal } from "lucide-react";

interface BeforeAfterSliderProps {
  beforeImage?: string;
  afterImage?: string;
  beforeLabel?: string;
  afterLabel?: string;
  title?: string;
  subtitle?: string;
}

export default function BeforeAfterSlider({
  beforeImage = "/images/gallery-4.jpg",
  afterImage = "/images/gallery-3.jpg",
  beforeLabel = "BEFORE",
  afterLabel = "SIGNATURE FADE",
  title = "THE TRANSFORMATION",
  subtitle = "PRÄZISION BIS AUF DEN MILLIMETER",
}: BeforeAfterSliderProps) {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.min(Math.max((x / rect.width) * 100, 5), 95);
    setSliderPos(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <div className="relative mx-auto w-full max-w-4xl px-4">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber/30 bg-amber/5 px-3 py-1 text-[10px] font-semibold tracking-[0.3em] text-amber">
          <Sparkles size={12} />
          TRANSFORMATION
        </div>
        <h2 className="mt-3 text-2xl font-black tracking-tight text-warm sm:text-4xl">
          {title}
        </h2>
        <p className="mt-2 text-xs font-semibold tracking-[0.25em] text-muted">
          {subtitle}
        </p>
      </div>

      <div
        ref={containerRef}
        className="group relative aspect-[4/5] sm:aspect-[16/10] w-full select-none overflow-hidden rounded-2xl border border-white/10 bg-card shadow-2xl"
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        {/* AFTER IMAGE (Base layer) */}
        <div className="absolute inset-0">
          <Image
            src={afterImage}
            alt={afterLabel}
            fill
            sizes="(max-width: 768px) 100vw, 80vw"
            className="object-cover"
            priority
          />
          <div className="absolute top-4 right-4 rounded-full border border-white/20 bg-black/60 px-3.5 py-1 text-[10px] font-bold tracking-[0.25em] text-amber backdrop-blur-md">
            {afterLabel}
          </div>
        </div>

        {/* BEFORE IMAGE (Clipped on top) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPos}%` }}
        >
          <div className="relative h-full w-[100cqi] min-w-[700px] sm:min-w-[900px]">
            <Image
              src={beforeImage}
              alt={beforeLabel}
              fill
              sizes="(max-width: 768px) 100vw, 80vw"
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute top-4 left-4 rounded-full border border-white/20 bg-black/60 px-3.5 py-1 text-[10px] font-bold tracking-[0.25em] text-white/80 backdrop-blur-md">
            {beforeLabel}
          </div>
        </div>

        {/* DIVIDER LINE & GRABBER */}
        <div
          className="pointer-events-none absolute inset-y-0 z-20 w-0.5 bg-gradient-to-b from-amber/80 via-white to-amber/80 shadow-[0_0_12px_rgba(232,186,132,0.8)]"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-amber/60 bg-matte/90 text-amber shadow-xl backdrop-blur-md">
            <MoveHorizontal size={18} />
          </div>
        </div>

        {/* Slider input for accessibility & keyboard */}
        <input
          type="range"
          min="5"
          max="95"
          value={sliderPos}
          onChange={(e) => setSliderPos(Number(e.target.value))}
          className="absolute inset-0 z-30 h-full w-full cursor-ew-resize opacity-0"
          aria-label="Vergleichsslider"
        />

        {/* Bottom hint badge */}
        <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-black/50 px-4 py-1 text-[10px] tracking-widest text-muted/90 backdrop-blur-md">
          ← SCHIEBER BEWEGEN ZUM VERGLEICHEN →
        </div>
      </div>
    </div>
  );
}
