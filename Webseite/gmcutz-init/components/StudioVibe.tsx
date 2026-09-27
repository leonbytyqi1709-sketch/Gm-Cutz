import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Sparkles, MapPin, Scissors, ArrowRight } from "lucide-react";
import IgIcon from "./IgIcon";

export default function StudioVibe() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-20">
      <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
        {/* Left: Authentic Photos of Gio & Studio */}
        <div className="relative lg:col-span-6">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-white/10 bg-card shadow-2xl">
            <Image
              src="/images/gallery-1.jpg"
              alt="Gio — Barber & Founder Gmcutz"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-matte via-transparent to-transparent opacity-80" />

            <div className="absolute bottom-6 left-6 right-6">
              <span className="rounded-full border border-amber/40 bg-black/70 px-3 py-1 text-[10px] font-bold tracking-[0.3em] text-amber backdrop-blur-md">
                FOUNDER & HEAD BARBER
              </span>
              <h3 className="mt-2 text-2xl font-black tracking-tight text-warm sm:text-3xl">
                GIO × GM-CUTZ
              </h3>
              <p className="mt-1 text-xs text-muted">
                1-on-1 Sessions im privaten Keller-Studio.
              </p>
            </div>
          </div>

          {/* Floating Secondary Image: Keller-Bild 2 */}
          <div className="absolute -bottom-6 -right-4 hidden sm:block w-48 aspect-square overflow-hidden rounded-xl border-2 border-amber/30 bg-matte shadow-2xl">
            <Image
              src="/images/keller-2.jpg"
              alt="Gmcutz Keller-Studio"
              fill
              sizes="200px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <span className="absolute bottom-2 left-2 text-[9px] font-bold tracking-widest text-warm">
              KELLER-STUDIO VIBE
            </span>
          </div>
        </div>

        {/* Right: Story, Philosophy & Features */}
        <div className="flex flex-col lg:col-span-6">
          <div className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.35em] text-amber">
            <Scissors size={14} />
            THE UNDERGROUND EXPERIENCE
          </div>

          <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-warm sm:text-5xl">
            KEIN SALON.
            <br />
            <span className="gold-gradient-text">DEINE PRIVATE VIP-SESSION.</span>
          </h2>

          <p className="mt-6 text-sm leading-relaxed text-muted sm:text-base">
            Vergiss überfüllte Barbershops, hektische 15-Minuten-Fließbandarbeit und laute Warteräume. Bei Gm-Cutz betrittst du ein privates Keller-Studio — gedämpftes Licht, volle Ruhe und 100% ungeteilte Aufmerksamkeit für deinen Haarschnitt.
          </p>

          {/* Feature Grid: Without Drink & Vibe, without Sound */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-white/5 bg-card/60 p-4 backdrop-blur-sm">
              <ShieldCheck className="text-amber" size={20} />
              <h4 className="mt-2 text-xs font-bold tracking-wider text-warm">
                1-ON-1 EXKLUSIVITÄT
              </h4>
              <p className="mt-1 text-[11px] text-muted">
                Nur du & Gio. Keine störenden Gäste, keine Hektik.
              </p>
            </div>

            <div className="rounded-xl border border-white/5 bg-card/60 p-4 backdrop-blur-sm">
              <Sparkles className="text-amber" size={20} />
              <h4 className="mt-2 text-xs font-bold tracking-wider text-warm">
                PRECISION BLENDING
              </h4>
              <p className="mt-1 text-[11px] text-muted">
                Jeder Cut wird mit Detailverliebtheit ausgearbeitet.
              </p>
            </div>

            <div className="rounded-xl border border-white/5 bg-card/60 p-4 backdrop-blur-sm">
              <MapPin className="text-amber" size={20} />
              <h4 className="mt-2 text-xs font-bold tracking-wider text-warm">
                DISKRETE PRIVATSPHÄRE
              </h4>
              <p className="mt-1 text-[11px] text-muted">
                Echtes Underground Keller-Studio ohne Publikum.
              </p>
            </div>

            <div className="rounded-xl border border-white/5 bg-card/60 p-4 backdrop-blur-sm">
              <Scissors className="text-amber" size={20} />
              <h4 className="mt-2 text-xs font-bold tracking-wider text-warm">
                SHARP LINEUPS
              </h4>
              <p className="mt-1 text-[11px] text-muted">
                Messerscharfe Kanten und perfektes Konturen-Finishing.
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="https://ig.me/m/gmcutz_z"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shimmer flex items-center gap-2 rounded-full border border-amber/60 px-8 py-3.5 text-xs font-bold tracking-[0.25em] text-warm transition hover:border-amber hover:text-amber"
            >
              <IgIcon size={16} /> TERMIN ANFRAGEN
            </a>
            <Link
              href="/studio"
              className="flex items-center gap-2 rounded-full border border-white/10 px-6 py-3.5 text-xs font-semibold tracking-widest text-muted transition hover:border-white/30 hover:text-warm"
            >
              MEHR ÜBER DAS STUDIO <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
