import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock, Scissors, Shield, Sparkles, CheckCircle2, Phone, Mail, Calendar } from "lucide-react";
import IgIcon from "@/components/IgIcon";
import FadeIn from "@/components/FadeIn";

const studioPerks = [
  {
    icon: Shield,
    title: "100% PRIVATE SESSIONS",
    desc: "Nur du und Gio. Keine anderen Kunden im Raum, keine Blicke von der Straße, keine Hektik.",
  },
  {
    icon: Sparkles,
    title: "EXKLUSIVER DETAILFOKUS",
    desc: "Jeder Übergang wird mit Liebe zum Detail und handwerklicher Präzision ausgearbeitet.",
  },
  {
    icon: Scissors,
    title: "HANDWERK OHNE ZEITDRUCK",
    desc: "Hier wird kein Cut durchgepeitscht. Du hast die volle, ungeteilte Aufmerksamkeit für dein Haar.",
  },
  {
    icon: MapPin,
    title: "DISKRETE PRIVATSPHÄRE",
    desc: "Echtes Underground Studio ohne Publikumsverkehr oder störende Blicke.",
  },
];

export default function StudioPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-28">
      {/* Studio Header */}
      <section className="py-20 text-center">
        <FadeIn>
          <div className="inline-flex items-center gap-2 rounded-full border border-amber/30 bg-amber/10 px-4 py-1.5 text-[10px] font-bold tracking-[0.3em] text-amber">
            <Scissors size={12} />
            PRIVATE UNDERGROUND SPACE
          </div>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-warm sm:text-6xl">
            THE KELLER-STUDIO
          </h1>
          <p className="mx-auto mt-4 text-xs font-semibold tracking-[0.35em] text-muted">
            KEIN SALON. KEIN STRESS. NUR DU & DER CUT.
          </p>
          <div className="mx-auto mt-6 h-px w-20 bg-gradient-to-r from-transparent via-amber to-transparent" />
        </FadeIn>
      </section>

      {/* Main Feature Story: Gio + Atmosphere */}
      <section className="grid gap-10 lg:grid-cols-12 lg:items-center">
        {/* Left: Founder Gio Portrait & Studio Imagery */}
        <div className="relative lg:col-span-6">
          <FadeIn>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-white/10 bg-card shadow-2xl">
              <Image
                src="/images/gallery-1.jpg"
                alt="Gio im Gmcutz Keller-Studio"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-matte via-transparent to-transparent opacity-80" />

              <div className="absolute bottom-6 left-6 right-6">
                <span className="rounded-full border border-amber/40 bg-black/70 px-3 py-1 text-[9px] font-bold tracking-widest text-amber backdrop-blur-md">
                  GIO · FOUNDER & BARBER
                </span>
                <h3 className="mt-2 text-2xl font-black text-warm">
                  „Perfektion braucht Zeit und Ruhe.“
                </h3>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Right: The Philosophy */}
        <div className="space-y-6 lg:col-span-6">
          <FadeIn delay={0.1}>
            <div className="glow-border rounded-2xl bg-card p-8 sm:p-10">
              <span className="text-[10px] font-mono tracking-widest text-amber uppercase">
                DIE VISION DAHINTER
              </span>
              <h2 className="mt-3 text-2xl font-black tracking-tight text-warm sm:text-3xl">
                WARUM EIN PRIVATES KELLER-STUDIO?
              </h2>

              <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted">
                <p>
                  Gm-Cutz ist ganz bewusst kein gewöhnlicher Barbershop. Klassische Salons sind oft laut, überfüllt und von Hektik getrieben — man ist die Nummer 8 im Stuhl und nach 20 Minuten muss der Nächste ran.
                </p>
                <p>
                  Im Gm-Cutz Keller-Studio schließt sich die Tür hinter dir. Du betrittst eine exklusive, fokussierte Ästhetik mit warmem LED-Licht, absoluter Ruhe und 100% Konzentration auf dein Haar und deine Konturen.
                </p>
                <p>
                  Hier wurde auch <strong className="text-warm font-semibold">TRESSA</strong> geboren: die Schnittstelle aus authentischer Barber-Kultur, Premium Hair Grooming und modernem Streetwear-Lifestyle.
                </p>
              </div>

              <div className="mt-8 border-t border-white/10 pt-6">
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-amber/30 bg-black/60 p-0.5">
                    <Image
                      src="/images/gmcutz-logo.png"
                      alt="GM-CUTZ Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-warm">GM-CUTZ × TRESSA</p>
                    <p className="text-[11px] text-muted">Bespoke Cuts & Limited Apparel Drops</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Perks Grid */}
      <section className="mt-20">
        <FadeIn>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {studioPerks.map((perk, i) => {
              const Icon = perk.icon;
              return (
                <div
                  key={i}
                  className="glow-border flex flex-col rounded-2xl bg-card p-6"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-amber/30 bg-amber/10 text-amber">
                    <Icon size={22} />
                  </div>
                  <h3 className="mt-5 text-sm font-black tracking-wider text-warm">
                    {perk.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted">
                    {perk.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </FadeIn>
      </section>

      {/* Location, Hours & Direct Contact */}
      <section className="mt-20">
        <FadeIn>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="glow-border rounded-2xl bg-card p-8">
              <h3 className="text-lg font-black text-warm">LOCATION & ANREISE</h3>
              <p className="mt-2 text-xs text-muted">
                Um die Privatsphäre jedes Kunden zu wahren, ist das Keller-Studio nur mit bestätigtem Termin zugänglich.
              </p>

              <div className="mt-6 flex items-start gap-3 rounded-xl border border-white/5 bg-matte/60 p-4">
                <MapPin className="text-amber mt-0.5 shrink-0" size={20} />
                <div>
                  <p className="text-xs font-bold text-warm">DISCRETE LOCATION</p>
                  <p className="mt-1 text-xs text-muted">
                    Die exakte Adresse und Anfahrtsbeschreibung erhältst du direkt in deiner Buchungsbestätigung und in deinem Kalendereintrag.
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-start gap-3 rounded-xl border border-white/5 bg-matte/60 p-4">
                <Clock className="text-amber mt-0.5 shrink-0" size={20} />
                <div>
                  <p className="text-xs font-bold text-warm">ÖFFNUNGSZEITEN & SLOTS</p>
                  <div className="mt-1.5 space-y-1 text-xs text-muted">
                    <p><strong className="text-warm">Mo — Fr:</strong> 15:30 — 21:30 Uhr</p>
                    <p><strong className="text-warm">Sa — So:</strong> 13:00 — 21:00 Uhr</p>
                    <p className="text-[11px] text-amber/80 pt-1">Ausschließlich mit persönlicher Voranmeldung.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glow-border flex flex-col justify-between rounded-2xl bg-gradient-to-b from-card to-matte p-8">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-amber uppercase">
                  DIREKTER KONTAKT
                </span>
                <h3 className="mt-2 text-xl font-black text-warm">
                  BEREIT FÜR DEINEN BESUCH?
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-muted">
                  Buche deinen Slot direkt online oder kontaktiere Gio telefonisch bzw. via WhatsApp und Instagram bei speziellen Fragen.
                </p>

                {/* Direct Contact Data */}
                <div className="mt-6 space-y-2.5 rounded-xl border border-white/5 bg-black/40 p-4 text-xs">
                  <div>
                    <a
                      href="tel:+4915115565427"
                      className="flex items-center gap-2 font-bold text-warm transition hover:text-amber"
                    >
                      <Phone size={14} className="text-amber" /> +49 151 15565427
                    </a>
                  </div>
                  <div>
                    <a
                      href="mailto:gmcutzz774@gmail.com"
                      className="flex items-center gap-2 text-muted transition hover:text-amber"
                    >
                      <Mail size={14} className="text-amber" /> gmcutzz774@gmail.com
                    </a>
                  </div>
                </div>

                <div className="mt-4 space-y-2 text-xs text-muted">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-amber" />
                    <span>Keine Wartezeit vor Ort</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-amber" />
                    <span>Barzahlung & PayPal möglich</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-amber" />
                    <span>Tressa Produkte direkt zum Mitnehmen</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/cuts#booking"
                  className="btn-shimmer flex flex-1 items-center justify-center gap-2 rounded-full border border-amber bg-amber/15 py-3.5 text-xs font-bold tracking-[0.2em] text-warm transition hover:bg-amber hover:text-black"
                >
                  <Calendar size={14} /> TERMIN RESERVIEREN
                </Link>
                <a
                  href="https://wa.me/4915115565427"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-full border border-white/10 px-5 py-3.5 text-xs font-bold tracking-widest text-muted transition hover:border-amber/50 hover:text-amber"
                >
                  WHATSAPP
                </a>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
