"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Scissors, Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";
import IgIcon from "./IgIcon";
import FadeIn from "./FadeIn";

export interface CutImageItem {
  id: string;
  src: string;
  category: "Taper Fade" | "Mid Fade" | "Burst Fade" | "Dauerwelle" | "Färbung";
  alt: string;
}

export const cutsData: CutImageItem[] = [
  // Taper Fade (6)
  { id: "taper-1", src: "/images/cuts/taper-fade-1.jpg", category: "Taper Fade", alt: "Taper Fade Signature Cut" },
  { id: "taper-2", src: "/images/cuts/taper-fade-2.jpg", category: "Taper Fade", alt: "Taper Fade Signature Cut" },
  { id: "taper-3", src: "/images/cuts/taper-fade-3.jpg", category: "Taper Fade", alt: "Taper Fade Signature Cut" },
  { id: "taper-4", src: "/images/cuts/taper-fade-4.jpg", category: "Taper Fade", alt: "Taper Fade Signature Cut" },
  { id: "taper-5", src: "/images/cuts/taper-fade-5.jpg", category: "Taper Fade", alt: "Taper Fade Signature Cut" },
  { id: "taper-6", src: "/images/cuts/taper-fade-6.jpg", category: "Taper Fade", alt: "Taper Fade Signature Cut" },

  // Mid Fade (5)
  { id: "mid-1", src: "/images/cuts/mid-fade-1.jpg", category: "Mid Fade", alt: "Mid Fade Signature Cut" },
  { id: "mid-2", src: "/images/cuts/mid-fade-2.jpg", category: "Mid Fade", alt: "Mid Fade Signature Cut" },
  { id: "mid-3", src: "/images/cuts/mid-fade-3.jpg", category: "Mid Fade", alt: "Mid Fade Signature Cut" },
  { id: "mid-4", src: "/images/cuts/mid-fade-4.jpg", category: "Mid Fade", alt: "Mid Fade Signature Cut" },
  { id: "mid-5", src: "/images/cuts/mid-fade-5.jpg", category: "Mid Fade", alt: "Mid Fade Signature Cut" },

  // Burst Fade (3)
  { id: "burst-1", src: "/images/cuts/burstfade-1.jpg", category: "Burst Fade", alt: "Burst Fade Signature Cut" },
  { id: "burst-2", src: "/images/cuts/burstfade-2.jpg", category: "Burst Fade", alt: "Burst Fade Signature Cut" },
  { id: "burst-3", src: "/images/cuts/burstfade-3.jpg", category: "Burst Fade", alt: "Burst Fade Signature Cut" },

  // Dauerwelle (2)
  { id: "perm-1", src: "/images/cuts/dauerwelle-1.jpg", category: "Dauerwelle", alt: "Dauerwelle / Perm Treatment" },
  { id: "perm-2", src: "/images/cuts/dauerwelle-2.jpg", category: "Dauerwelle", alt: "Dauerwelle / Perm Treatment" },

  // Färbung (2)
  { id: "faerbung-1", src: "/images/cuts/faerbung-1.jpg", category: "Färbung", alt: "Färbung & Highlights Special" },
  { id: "faerbung-2", src: "/images/cuts/faerbung-2.jpg", category: "Färbung", alt: "Färbung & Highlights Special" },
];

const categoryTabs = [
  { id: "all", label: "Alle Cuts" },
  { id: "Taper Fade", label: "Taper Fade" },
  { id: "Mid Fade", label: "Mid Fade" },
  { id: "Burst Fade", label: "Burst Fade" },
  { id: "Dauerwelle", label: "Dauerwelle" },
  { id: "Färbung", label: "Färbung" },
] as const;

export default function CutsGallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const filteredCuts = cutsData.filter(
    (item) => selectedCategory === "all" || item.category === selectedCategory
  );

  const currentCut = activeImageIndex !== null ? filteredCuts[activeImageIndex] : null;

  const handleNext = useCallback(() => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((prev) => ((prev! + 1) % filteredCuts.length));
  }, [activeImageIndex, filteredCuts.length]);

  const handlePrev = useCallback(() => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((prev) => ((prev! - 1 + filteredCuts.length) % filteredCuts.length));
  }, [activeImageIndex, filteredCuts.length]);

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
          <div className="inline-flex items-center gap-2 rounded-full border border-amber/30 bg-amber/10 px-4 py-1.5 text-[10px] font-bold tracking-[0.3em] text-amber">
            <Scissors size={12} />
            PORTFOLIO & RESULTS
          </div>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-warm sm:text-5xl">
            CUTS GALLERY
          </h2>
          <p className="mx-auto mt-3 max-w-md text-xs font-semibold tracking-widest text-muted uppercase">
            Echte Meisterwerke & Transformationen aus dem Keller-Studio
          </p>
        </div>
      </FadeIn>

      {/* Category Tabs */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-2 px-2">
        {categoryTabs.map((tab) => {
          const count =
            tab.id === "all"
              ? cutsData.length
              : cutsData.filter((c) => c.category === tab.id).length;
          const isActive = selectedCategory === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => {
                setSelectedCategory(tab.id);
                setActiveImageIndex(null);
              }}
              className={`group flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold tracking-wider transition-all duration-300 ${
                isActive
                  ? "border border-amber bg-amber/15 text-amber shadow-[0_0_15px_rgba(232,186,132,0.15)]"
                  : "border border-white/10 bg-card text-muted hover:border-amber/40 hover:text-warm"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`rounded-full px-1.5 py-0.2 text-[10px] font-mono transition-colors ${
                  isActive
                    ? "bg-amber/20 text-amber"
                    : "bg-white/5 text-muted group-hover:text-warm"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Image Grid - Clean cuts without filenames */}
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4">
        {filteredCuts.map((item, index) => (
          <div
            key={item.id}
            onClick={() => setActiveImageIndex(index)}
            className="group relative aspect-[3/4] cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-card shadow-xl transition-all duration-300 hover:border-amber/50 hover:shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-40 transition-opacity duration-300 group-hover:opacity-80" />

            {/* Bottom Tag & Zoom Icon on Hover */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="rounded-full border border-amber/30 bg-black/60 px-2.5 py-1 text-[10px] font-bold tracking-wider text-amber backdrop-blur-md">
                {item.category}
              </span>
              <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-black/60 text-warm backdrop-blur-md transition-transform group-hover:scale-110">
                <Maximize2 size={13} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeImageIndex !== null && currentCut && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md animate-in fade-in duration-200"
          onClick={handleClose}
        >
          <div
            className="relative flex max-h-[92vh] max-w-4xl flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar with Category and Close */}
            <div className="mb-3 flex w-full items-center justify-between px-2 text-warm">
              <div className="flex items-center gap-3">
                <span className="rounded-full border border-amber/40 bg-amber/15 px-3 py-1 text-xs font-bold tracking-wider text-amber">
                  {currentCut.category}
                </span>
                <span className="text-xs font-mono text-muted">
                  {activeImageIndex + 1} / {filteredCuts.length}
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

            {/* Main Image Container */}
            <div className="relative aspect-[3/4] h-[65vh] sm:h-[72vh] overflow-hidden rounded-2xl border border-white/15 bg-card shadow-2xl">
              <Image
                src={currentCut.src}
                alt={currentCut.alt}
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 800px"
                className="object-contain sm:object-cover"
              />
            </div>

            {/* Navigation and Instagram Request */}
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
                href={`https://ig.me/m/gmcutz_z?text=${encodeURIComponent(
                  `Hey Gio! Ich feiere diesen ${currentCut.category}-Look aus der Gallery und möchte genau so einen Cut anfragen.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shimmer flex items-center gap-2 rounded-full border border-amber/50 px-4 py-2 text-xs font-bold tracking-wider text-warm transition hover:border-amber hover:text-amber"
              >
                <IgIcon size={14} /> DIESEN LOOK ANFRAGEN
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
