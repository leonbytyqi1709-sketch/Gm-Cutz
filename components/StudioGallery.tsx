"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Maximize2, X, ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import FadeIn from "./FadeIn";

export interface StudioImageItem {
  id: string;
  src: string;
  alt: string;
}

export const studioImages: StudioImageItem[] = [
  { id: "studio-1", src: "/images/studio-1.jpeg", alt: "Gm-Cutz Keller-Studio Impression 1" },
  { id: "studio-2", src: "/images/studio-2.jpeg", alt: "Gm-Cutz Keller-Studio Impression 2" },
  { id: "studio-3", src: "/images/studio-3.jpeg", alt: "Gm-Cutz Keller-Studio Impression 3" },
  { id: "studio-4", src: "/images/studio-4.jpeg", alt: "Gm-Cutz Keller-Studio Impression 4" },
  { id: "studio-5", src: "/images/studio-5.jpeg", alt: "Gm-Cutz Keller-Studio Impression 5" },
  { id: "studio-6", src: "/images/studio-6.jpeg", alt: "Gm-Cutz Keller-Studio Impression 6" },
];

export default function StudioGallery() {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const currentImage = activeImageIndex !== null ? studioImages[activeImageIndex] : null;

  const handleNext = useCallback(() => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((prev) => (prev! + 1) % studioImages.length);
  }, [activeImageIndex]);

  const handlePrev = useCallback(() => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((prev) => (prev! - 1 + studioImages.length) % studioImages.length);
  }, [activeImageIndex]);

  const handleClose = useCallback(() => {
    setActiveImageIndex(null);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeImageIndex === null) return;
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeImageIndex, handleClose, handleNext, handlePrev]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeImageIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeImageIndex]);

  return (
    <section className="mt-28">
      {/* Section Header */}
      <FadeIn>
        <div className="text-center">
          <span className="text-[10px] font-bold tracking-[0.35em] text-amber uppercase">
            EINBLICKE
          </span>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-warm sm:text-4xl">
            STUDIO GALLERY
          </h2>
          <p className="mt-2 text-xs font-semibold tracking-widest text-muted uppercase">
            Das private Keller-Studio im Detail · Zum Vergrößern antippen
          </p>
        </div>
      </FadeIn>

      {/* Studio Image Grid */}
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {studioImages.map((item, index) => (
          <FadeIn key={item.id} delay={index * 0.08}>
            <div
              onClick={() => setActiveImageIndex(index)}
              className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-card shadow-xl transition-all duration-300 hover:border-amber/50 hover:shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
              role="button"
              tabIndex={0}
              aria-label={`Studio Bild ${index + 1} vergrößern`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setActiveImageIndex(index);
                }
              }}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Hover Overlay with Zoom Icon */}
              <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-amber/40 bg-black/75 text-amber backdrop-blur-md transition-transform duration-300 group-hover:scale-110 shadow-2xl">
                  <Maximize2 size={18} />
                </div>
              </div>

              {/* Subtle bottom indicator */}
              <div className="absolute bottom-3 right-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="rounded-full border border-white/20 bg-black/60 px-2.5 py-1 text-[10px] font-mono text-warm backdrop-blur-md">
                  Vollbild
                </span>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Lightbox Modal (like Cuts Gallery) */}
      {activeImageIndex !== null && currentImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 p-4 backdrop-blur-md animate-in fade-in duration-200"
          onClick={handleClose}
        >
          <div
            className="relative flex max-h-[92vh] max-w-5xl w-full flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar with Badge, Counter and Close Button */}
            <div className="mb-3 flex w-full items-center justify-between px-2 text-warm">
              <div className="flex items-center gap-3">
                <span className="rounded-full border border-amber/40 bg-amber/15 px-3 py-1 text-xs font-bold tracking-wider text-amber uppercase">
                  Studio Einblick
                </span>
                <span className="text-xs font-mono text-muted">
                  {activeImageIndex + 1} / {studioImages.length}
                </span>
              </div>

              <button
                onClick={handleClose}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-card text-muted transition hover:border-amber hover:text-amber"
                aria-label="Schließen"
              >
                <X size={18} />
              </button>
            </div>

            {/* Main Image Container - Full image uncropped with object-contain */}
            <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full max-h-[72vh] overflow-hidden rounded-2xl border border-white/15 bg-black/80 shadow-2xl flex items-center justify-center">
              <Image
                src={currentImage.src}
                alt={currentImage.alt}
                fill
                priority
                sizes="(max-width: 1200px) 95vw, 1200px"
                className="object-contain"
              />
            </div>

            {/* Bottom Controls: Prev/Next & Direct Booking CTA */}
            <div className="mt-4 flex w-full items-center justify-between gap-4 px-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-card text-warm transition hover:border-amber hover:text-amber"
                  aria-label="Vorheriges Bild"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={handleNext}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-card text-warm transition hover:border-amber hover:text-amber"
                  aria-label="Nächstes Bild"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              <a
                href="#booking"
                onClick={handleClose}
                className="btn-shimmer flex items-center gap-2 rounded-full border border-amber bg-amber/15 px-4 py-2 text-xs font-bold tracking-wider text-warm transition hover:bg-amber hover:text-black"
              >
                <Calendar size={14} /> TERMIN RESERVIEREN
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
