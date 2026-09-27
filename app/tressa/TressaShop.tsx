"use client";

import Image from "next/image";
import { useState } from "react";
import { Package, Sparkles, Check, Shield, Truck } from "lucide-react";
import IgIcon from "@/components/IgIcon";
import FadeIn from "@/components/FadeIn";

type Edition = "Summer" | "Winter";

const shirtImages = [
  { id: 1, src: "/images/tressa-shirt-1.jpg", label: "Front View" },
  { id: 2, src: "/images/tressa-shirt-2.jpg", label: "Detail View" },
  { id: 3, src: "/images/tressa-shirt-3.jpg", label: "Fit View" },
];

const teeColors = [
  { name: "Onyx Black", hex: "#111113" },
  { name: "Vintage Chalk", hex: "#e5e2da" },
];
const teeSizes = ["S", "M", "L", "XL"];

export default function TressaShop() {
  const [activeShirtImg, setActiveShirtImg] = useState(0);
  const [teeColor, setTeeColor] = useState(teeColors[0].name);
  const [teeSize, setTeeSize] = useState("L");
  const [edition, setEdition] = useState<Edition>("Summer");

  const getTeeOrderUrl = () => {
    const msg = `Hey Gio! Ich möchte das TRESSA Heavyweight Tee anfragen:%0A%0A👕 Produkt: TRESSA Heavyweight Tee%0A🎨 Farbe: ${teeColor}%0A📏 Größe: ${teeSize}%0A%0AIst das noch verfügbar?`;
    return `https://ig.me/m/gmcutz_z?text=${msg}`;
  };

  const getBagOrderUrl = () => {
    const msg = `Hey Gio! Ich möchte das TRESSA Grooming Bag Set anfragen:%0A%0A🌊 Edition: ${edition} Edition%0AInklusive Sea Salt Spray + Carbon Tail Comb.%0A%0AGibt es noch Sets im Studio?`;
    return `https://ig.me/m/gmcutz_z?text=${msg}`;
  };

  return (
    <div className="mx-auto max-w-6xl px-5 pb-28">
      {/* Brand Header */}
      <section className="py-20 text-center">
        <FadeIn>
          {/* Authentic TRESSA Logo */}
          <div className="mx-auto flex h-24 w-52 items-center justify-center rounded-2xl border border-amber/30 bg-card p-4 shadow-[0_0_40px_rgba(232,186,132,0.15)]">
            <div className="relative h-full w-full">
              <Image
                src="/images/tressa-logo.png"
                alt="TRESSA Logo"
                fill
                priority
                className="object-contain"
              />
            </div>
          </div>

          <h1 className="mt-6 text-4xl font-black tracking-tight text-warm sm:text-6xl">
            STREETWEAR & GROOMING
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted">
            Entstanden im Keller-Studio von Gm-Cutz. Limitierte Textilien und professionelle Styling-Produkte — direkt per Instagram-DM oder vor Ort im Studio erhältlich.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-muted">
            <span className="flex items-center gap-1.5">
              <Truck size={14} className="text-amber" /> Versand oder Abholung im Keller-Studio
            </span>
            <span className="flex items-center gap-1.5">
              <Shield size={14} className="text-amber" /> Streng limitierte Stückzahlen
            </span>
          </div>
        </FadeIn>
      </section>

      {/* Products Grid: 2 Products (Tee & Grooming Bag Set) */}
      <section className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
        {/* PRODUCT 1: HEAVYWEIGHT TEE */}
        <FadeIn>
          <div className="glow-border flex h-full flex-col rounded-2xl bg-card p-6 sm:p-7">
            <div className="flex items-center justify-between">
              <span className="rounded-full border border-amber/30 bg-amber/10 px-3 py-1 text-[9px] font-bold tracking-widest text-amber">
                LIMITED DROP
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[9px] font-mono text-muted">
                DROP #01
              </span>
            </div>

            {/* Real Photography for T-Shirts: Switchable Pictures 1-3 */}
            <div className="relative mt-5 aspect-[4/5] overflow-hidden rounded-xl border border-white/10 bg-charcoal">
              <Image
                src={shirtImages[activeShirtImg].src}
                alt={`Tressa Shirt View ${activeShirtImg + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-all duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60" />

              {/* Thumbnails to choose Bild 1, 2, 3 */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-xl border border-white/15 bg-black/70 p-2 backdrop-blur-md">
                <span className="text-[10px] font-bold tracking-wider text-amber uppercase">
                  BILD {activeShirtImg + 1} / 3
                </span>
                <div className="flex gap-1.5">
                  {shirtImages.map((img, idx) => (
                    <button
                      key={img.id}
                      onClick={() => setActiveShirtImg(idx)}
                      className={`h-7 px-2.5 rounded-lg text-[10px] font-bold transition ${
                        activeShirtImg === idx
                          ? "border border-amber bg-amber text-black"
                          : "border border-white/20 bg-white/10 text-white hover:bg-white/20"
                      }`}
                    >
                      Bild {idx + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-5 flex-1">
              <span className="text-[9px] font-bold tracking-[0.25em] text-muted">
                STREETWEAR ESSENTIAL
              </span>
              <h3 className="mt-1 text-xl font-black text-warm">
                TRESSA Heavyweight Tee
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                280 GSM schwere Premium-Baumwolle mit lässigem Boxy-Schnitt, Drop-Shoulders und langlebigem Brand-Print.
              </p>

              {/* Color Switcher */}
              <div className="mt-4">
                <span className="text-[9px] font-bold tracking-widest text-muted block mb-2 uppercase">
                  FARBE
                </span>
                <div className="flex gap-2">
                  {teeColors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setTeeColor(c.name)}
                      className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
                        teeColor === c.name
                          ? "border-amber bg-amber/10 text-warm"
                          : "border-white/10 bg-matte text-muted hover:border-white/20"
                      }`}
                    >
                      <span
                        className="h-3 w-3 rounded-full border border-white/20"
                        style={{ backgroundColor: c.hex }}
                      />
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Switcher */}
              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[9px] font-bold tracking-widest text-muted uppercase">
                    GRÖSSE
                  </span>
                  <span className="text-[9px] text-amber font-mono">
                    BOXY FIT (TRUE TO SIZE)
                  </span>
                </div>
                <div className="flex gap-2">
                  {teeSizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setTeeSize(s)}
                      className={`flex-1 rounded-lg border py-2 text-xs font-bold transition ${
                        teeSize === s
                          ? "border-amber bg-amber text-black"
                          : "border-white/10 bg-matte text-muted hover:border-white/20 hover:text-warm"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 border-t border-white/10 pt-4">
              <a
                href={getTeeOrderUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shimmer flex w-full items-center justify-center gap-2 rounded-full border border-amber/60 py-3.5 text-xs font-bold tracking-widest text-warm transition hover:border-amber hover:text-amber"
              >
                <IgIcon size={14} /> VIA DM ANFRAGEN ({teeSize})
              </a>
            </div>
          </div>
        </FadeIn>

        {/* PRODUCT 2: GROOMING BAG SET (Summer: Beach / Winter: Winter Image) */}
        <FadeIn delay={0.1}>
          <div className="glow-border flex h-full flex-col rounded-2xl bg-card p-6 sm:p-7">
            <div className="flex items-center justify-between">
              <span className="rounded-full border border-amber/30 bg-amber/10 px-3 py-1 text-[9px] font-bold tracking-widest text-amber">
                BESTSELLER SET
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[9px] font-mono text-muted">
                KIT #01
              </span>
            </div>

            {/* Real Photography for Bag Set: Summer = Sea Salt Spray Beach, Winter = Winter Image */}
            <div className="relative mt-5 aspect-[4/5] overflow-hidden rounded-xl border border-white/10 bg-charcoal">
              <Image
                src={edition === "Summer" ? "/images/tressa-spray-beach.png" : "/images/tressa-spray-3.png"}
                alt={`Tressa Grooming Bag ${edition} Edition`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-matte via-transparent to-transparent opacity-60" />

              <div className="absolute top-3 left-3 rounded-md bg-black/70 px-2.5 py-1 text-[9px] font-bold text-amber backdrop-blur-md">
                {edition.toUpperCase()} EDITION
              </div>
            </div>

            <div className="mt-5 flex-1">
              <span className="text-[9px] font-bold tracking-[0.25em] text-muted">
                COMPLETE KIT
              </span>
              <h3 className="mt-1 text-xl font-black text-warm">
                TRESSA Grooming Bag Set
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                Original Sea Salt Texture Spray + antistatischer Carbon Tail Comb im wetterfesten TRESSA Pouch Bag.
              </p>

              {/* Edition Switcher */}
              <div className="mt-4">
                <span className="text-[9px] font-bold tracking-widest text-muted block mb-2 uppercase">
                  WÄHLE DEINE EDITION
                </span>
                <div className="flex gap-2">
                  {(["Summer", "Winter"] as Edition[]).map((e) => (
                    <button
                      key={e}
                      onClick={() => setEdition(e)}
                      className={`flex-1 rounded-lg border py-2 text-xs font-bold transition ${
                        edition === e
                          ? "border-amber bg-amber/15 text-amber"
                          : "border-white/10 bg-matte text-muted hover:border-white/20 hover:text-warm"
                      }`}
                    >
                      {e} Edition
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-3 text-[11px] text-muted">
                {edition === "Summer"
                  ? "🌴 Summer Edition (Beach): Frische Meeresbrise & natürliche Beach-Waves Textur."
                  : "🌲 Winter Edition: Würzige, holzige Noten & satter Grip für voluminöses Haar."}
              </div>
            </div>

            <div className="mt-6 border-t border-white/10 pt-4">
              <a
                href={getBagOrderUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shimmer flex w-full items-center justify-center gap-2 rounded-full border border-amber/60 py-3.5 text-xs font-bold tracking-widest text-warm transition hover:border-amber hover:text-amber"
              >
                <IgIcon size={14} /> VIA DM ANFRAGEN ({edition})
              </a>
            </div>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
