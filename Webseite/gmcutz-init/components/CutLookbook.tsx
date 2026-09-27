"use client";

import Link from "next/link";
import { Scissors, ArrowRight } from "lucide-react";
import IgIcon from "./IgIcon";

interface CutItem {
  id: string;
  name: string;
  category: string;
  desc: string;
}

const cuts: CutItem[] = [
  {
    id: "skin-fade",
    name: "Skin Fade / Seiten auf 0",
    category: "SIGNATURE",
    desc: "Messerscharfer Übergang von Haut auf volles Deckhaar. Maximale Kontur, saubere Linien und absolut nahtloser Gradient.",
  },
  {
    id: "taper-fade",
    name: "Low / Mid Taper Fade",
    category: "STREETWEAR FAVORITE",
    desc: "Der Trend-Cut der Stunde. Sanfter Taper an den Koteletten und im Nacken, während die Fülle an den Seiten erhalten bleibt.",
  },
  {
    id: "burst-fade",
    name: "Burst Fade & Crop",
    category: "EXCLUSIVE",
    desc: "Kreisförmiger Fade um das Ohr herum, der nach hinten in volleres Haar übergeht. Ein auffälliger, dynamischer Statement-Look.",
  },
  {
    id: "perm-texture",
    name: "Dauerwelle / Perm & Fade",
    category: "SPECIAL TREATMENT",
    desc: "Volumen, Locken und unverwechselbare Struktur für das Deckhaar kombiniert mit einem cleanen Taper oder Fade an den Seiten.",
  },
];

export default function CutLookbook() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-16">
      {/* Header */}
      <div className="mb-10 flex flex-col items-center justify-between gap-4 md:flex-row md:items-end">
        <div>
          <div className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.35em] text-amber">
            <Scissors size={13} />
            SIGNATURE LOOKBOOK
          </div>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-warm sm:text-5xl">
            FINDE DEINEN CUT
          </h2>
          <p className="mt-2 text-sm text-muted">
            Jeder Schnitt wird millimetergenau auf deine Kopfform und Haarstruktur angepasst.
          </p>
        </div>

        <Link
          href="/cuts"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-semibold tracking-widest text-warm transition hover:border-amber/50 hover:text-amber"
        >
          ALLE SERVICES ANSEHEN <ArrowRight size={14} />
        </Link>
      </div>

      {/* Clean Grid of Cuts (No images, No duration) */}
      <div className="grid gap-6 md:grid-cols-2">
        {cuts.map((cut) => {
          const bookingUrl = `https://ig.me/m/gmcutz_z?text=${encodeURIComponent(
            `Hey Gio! Ich möchte einen Termin für den "${cut.name}" im Keller-Studio anfragen.`
          )}`;

          return (
            <div
              key={cut.id}
              className="glow-border group flex flex-col justify-between rounded-2xl bg-card p-6 sm:p-8 transition-all duration-300 hover:border-amber/50"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-amber/30 bg-amber/10 px-3 py-1 text-[9px] font-bold tracking-[0.25em] text-amber">
                    {cut.category}
                  </span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-matte text-muted group-hover:border-amber/40 group-hover:text-amber transition-colors">
                    <Scissors size={14} />
                  </div>
                </div>

                <h3 className="mt-5 text-xl font-bold tracking-tight text-warm sm:text-2xl">
                  {cut.name}
                </h3>

                <p className="mt-3 text-xs leading-relaxed text-muted sm:text-sm">
                  {cut.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
                <a
                  href={bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-shimmer inline-flex items-center gap-2 rounded-full border border-amber/50 px-5 py-2.5 text-xs font-bold tracking-widest text-warm transition hover:border-amber hover:text-amber"
                >
                  <IgIcon size={14} /> TERMIN ANFRAGEN
                </a>
                <Link
                  href="/cuts"
                  className="text-xs font-semibold tracking-wider text-muted hover:text-warm transition"
                >
                  Details →
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
