import Link from "next/link";
import Image from "next/image";
import { Scissors, Shirt, Sparkles, ArrowRight, Calendar } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import Marquee from "@/components/Marquee";
import CutLookbook from "@/components/CutLookbook";
import StudioVibe from "@/components/StudioVibe";
import IgIcon from "@/components/IgIcon";

export default function Home() {
  return (
    <div className="flex flex-col gap-0 overflow-hidden">
      {/* ===================== HERO SECTION ===================== */}
      <section className="hero-halo relative flex min-h-[90vh] flex-col justify-center px-5 pt-8 pb-16">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-12">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="flex flex-col items-center text-center lg:col-span-6 lg:items-start lg:text-left">
            <FadeIn>
              <div className="inline-flex items-center gap-2 rounded-full border border-amber/30 bg-amber/10 px-4 py-1.5 text-[10px] font-bold tracking-[0.3em] text-amber">
                <Sparkles size={12} />
                PRIVATE STUDIO × BESPOKE STREETWEAR
              </div>

              <h1 className="mt-6 text-4xl font-black leading-[1.05] tracking-tight text-warm sm:text-6xl lg:text-7xl">
                PRECISION CUTS.
                <br />
                <span className="gold-gradient-text">EXCLUSIVE VIBES.</span>
              </h1>

              <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
                Willkommen bei Gm-Cutz — deinem exklusiven 1-on-1 Keller-Studio für millimetergenaue Fades & Tapers. Gepaart mit TRESSA, der Streetwear & Grooming Brand für alle, die Perfektion leben.
              </p>

              {/* Call-to-Action Buttons */}
              <div className="mt-9 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
                <Link
                  href="/cuts#booking"
                  className="btn-shimmer flex items-center gap-2 rounded-full border border-amber/60 bg-amber/15 px-8 py-4 text-xs font-bold tracking-[0.25em] text-warm transition hover:bg-amber hover:text-black shadow-[0_0_30px_rgba(232,186,132,0.25)]"
                >
                  <Calendar size={16} /> TERMIN ONLINE BUCHEN
                </Link>
                <Link
                  href="/cuts"
                  className="rounded-full border border-white/10 bg-white/5 px-6 py-4 text-xs font-semibold tracking-[0.2em] text-muted transition hover:border-white/30 hover:text-warm"
                >
                  SERVICES ANSEHEN
                </Link>
              </div>

              {/* Key Trust Stats */}
              <div className="mt-12 grid grid-cols-2 gap-8 border-t border-white/10 pt-6 max-w-md">
                <div>
                  <p className="text-xl font-black text-warm sm:text-3xl">1-ON-1</p>
                  <p className="text-[10px] tracking-widest text-muted uppercase">PRIVATE SESSION</p>
                </div>
                <div>
                  <p className="text-xl font-black text-amber sm:text-3xl">KELLER-STUDIO</p>
                  <p className="text-[10px] tracking-widest text-muted uppercase">100% UNGETEILTER FOKUS</p>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: GM-CUTZ LED Logo in full size and reach */}
          <div className="relative lg:col-span-6 flex items-center justify-center w-full">
            <FadeIn delay={0.15} className="w-full">
              <div className="relative mx-auto w-full max-w-xl overflow-hidden rounded-3xl border border-amber/40 bg-black p-6 sm:p-10 shadow-[0_0_70px_rgba(232,186,132,0.25)]">
                {/* Intense ambient gold LED glow behind the neon sign */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,186,132,0.22),transparent_70%)]" />

                {/* The GM-CUTZ LED Logo in natural 3:1 proportions without any overlapping badges */}
                <div className="relative aspect-[2170/725] w-full">
                  <Image
                    src="/images/gmcutz-logo.png"
                    alt="GM-CUTZ Neon Logo"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                    className="object-contain drop-shadow-[0_0_40px_rgba(232,186,132,0.55)] transition-transform duration-700 hover:scale-[1.03]"
                  />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ===================== MARQUEE TICKER ===================== */}
      <Marquee />

      {/* ===================== SPLIT BRAND SHOWCASE ===================== */}
      <section className="mx-auto w-full max-w-6xl px-5 py-20">
        <div className="grid gap-6 md:grid-cols-2">
          {/* GMCUTZ CARD */}
          <FadeIn>
            <Link href="/cuts" className="group block h-full">
              <div className="relative flex h-full min-h-[380px] flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-card p-8 sm:p-10 transition-all duration-500 hover:border-amber/50 hover:shadow-[0_0_30px_rgba(232,186,132,0.15)]">
                {/* Background image subtle preview */}
                <div className="absolute inset-0 z-0 opacity-20 transition duration-700 group-hover:scale-105 group-hover:opacity-30">
                  <Image
                    src="/images/keller-1.jpg"
                    alt="Barber Studio"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/80 to-transparent" />
                </div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-amber/30 bg-amber/10 text-amber">
                      <Scissors size={24} strokeWidth={1.75} />
                    </div>
                    <span className="rounded-full border border-white/15 bg-black/50 px-3 py-1 text-[9px] font-bold tracking-widest text-muted backdrop-blur-md">
                      BARBER STUDIO
                    </span>
                  </div>

                  <h2 className="mt-8 text-2xl font-black tracking-tight text-warm sm:text-3xl">
                    GM-CUTZ BARBER
                  </h2>
                  <p className="mt-2 text-xs font-semibold tracking-[0.25em] text-amber">
                    SIGNATURE FADES & TAPERS
                  </p>
                  <p className="mt-4 text-xs leading-relaxed text-muted sm:text-sm">
                    Keine Massenabfertigung. Dein Termin im privaten Keller-Studio gehört ganz dir — maßgeschneiderte Konturen, messerscharfe Übergänge und absolute Ruhe.
                  </p>
                </div>

                <div className="relative z-10 mt-8 flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="text-xs font-bold tracking-[0.25em] text-muted transition group-hover:text-amber">
                    SERVICES ENTDECKEN →
                  </span>
                  <ArrowRight size={16} className="text-muted transition group-hover:translate-x-1 group-hover:text-amber" />
                </div>
              </div>
            </Link>
          </FadeIn>

          {/* TRESSA CARD */}
          <FadeIn delay={0.1}>
            <Link href="/tressa" className="group block h-full">
              <div className="relative flex h-full min-h-[380px] flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-card p-8 sm:p-10 transition-all duration-500 hover:border-amber/50 hover:shadow-[0_0_30px_rgba(232,186,132,0.15)]">
                {/* Background image subtle preview */}
                <div className="absolute inset-0 z-0 opacity-20 transition duration-700 group-hover:scale-105 group-hover:opacity-30">
                  <Image
                    src="/images/tressa-shirt-1.jpg"
                    alt="Tressa Apparel"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/80 to-transparent" />
                </div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-amber/30 bg-amber/10 text-amber">
                      <Shirt size={24} strokeWidth={1.75} />
                    </div>
                    <span className="rounded-full border border-white/15 bg-black/50 px-3 py-1 text-[9px] font-bold tracking-widest text-muted backdrop-blur-md">
                      LIMITED DROPS
                    </span>
                  </div>

                  <div className="mt-6 flex items-center gap-3">
                    <div className="relative h-10 w-28">
                      <Image
                        src="/images/tressa-logo.png"
                        alt="TRESSA Logo"
                        fill
                        className="object-contain object-left"
                      />
                    </div>
                  </div>

                  <p className="mt-2 text-xs font-semibold tracking-[0.25em] text-amber">
                    STREETWEAR & GROOMING ESSENTIALS
                  </p>
                  <p className="mt-4 text-xs leading-relaxed text-muted sm:text-sm">
                    Exklusive T-Shirt Drops, Sea Salt Texture Spray & Grooming Bags. Entwickelt für die perfekte Kombination aus Streetwear-Style und cleaner Haarstruktur.
                  </p>
                </div>

                <div className="relative z-10 mt-8 flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="text-xs font-bold tracking-[0.25em] text-muted transition group-hover:text-amber">
                    ZUM TRESSA SHOP →
                  </span>
                  <ArrowRight size={16} className="text-muted transition group-hover:translate-x-1 group-hover:text-amber" />
                </div>
              </div>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ===================== SIGNATURE CUT LOOKBOOK (No images, No duration) ===================== */}
      <section className="border-t border-white/5 py-12">
        <CutLookbook />
      </section>

      {/* ===================== STUDIO VIBE & GIO (No sound, Keller-Bild 2) ===================== */}
      <section className="border-t border-white/5 bg-charcoal/30">
        <StudioVibe />
      </section>

      {/* ===================== BOTTOM VIP BOOKING BANNER ===================== */}
      <section className="relative overflow-hidden border-t border-white/10 bg-gradient-to-b from-card to-matte px-5 py-24 text-center">
        <div className="hero-halo pointer-events-none absolute inset-0" />
        <div className="relative z-10 mx-auto max-w-2xl">
          <FadeIn>
            <span className="rounded-full border border-amber/40 bg-amber/10 px-4 py-1.5 text-[10px] font-bold tracking-[0.3em] text-amber">
              BEGRENZTE SLOTS PRO WOCHE
            </span>
            <h2 className="mt-5 text-3xl font-black tracking-tight text-warm sm:text-5xl">
              BEREIT FÜR DEINEN NEXT LEVEL CUT?
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Sichere dir deinen Wunschtermin im privaten Keller-Studio. Schreib Gio direkt auf Instagram mit deinem Wunschservice & Tag.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/cuts#booking"
                className="btn-shimmer flex items-center gap-2 rounded-full border border-amber/60 bg-amber/15 px-8 py-4 text-xs font-bold tracking-[0.25em] text-warm transition hover:bg-amber hover:text-black shadow-[0_0_30px_rgba(232,186,132,0.25)]"
              >
                <Calendar size={16} /> JETZT TERMIN ONLINE BUCHEN
              </Link>
              <a
                href="https://ig.me/m/gmcutz_z"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-white/15 px-8 py-4 text-xs font-semibold tracking-widest text-muted transition hover:border-white/30 hover:text-warm"
              >
                <IgIcon size={16} /> INSTAGRAM (@gmcutz_z)
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
