import Image from "next/image";
import { Scissors, Sparkles, CheckCircle2, HelpCircle } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import Booking from "./Booking";
import CutsGallery from "@/components/CutsGallery";

const signatureServices = [
  {
    name: "Seiten auf 0 / Skin Fade",
    desc: "Messerscharfer Skin Fade von 0mm nahtlos verblendet — inklusive präzisem Konturenfinishing mit Razor Blade.",
    features: ["Folienrasierer / Shaver", "Präzise Übergänge", "Styling-Finish"],
  },
  {
    name: "Low / Mid / High Taper Fade",
    desc: "Der moderne Streetwear-Klassiker. Ausgearbeitete Koteletten & Nackenpartie bei vollem Seitenvolumen.",
    features: ["Natürlicher Flow", "Scharfe C-Cup Kontur", "Sea Salt Textur"],
  },
  {
    name: "Burst Fade & Crop",
    desc: "Runder Fade um das Ohr, perfekt harmonierend mit strukturiertem French Crop oder V-Shape Nacken.",
    features: ["Auffälliger Look", "Strukturiertes Deckhaar", "Razor Lineup"],
  },
];

const chemicalTreatments = [
  {
    name: "Dauerwelle / Modern Perm",
    desc: "Gezielte Wellen- oder Lockenstruktur für langanhaltendes Volumen und lässige Beach-Vibes.",
    features: ["Inkl. Pflegestufe", "Haarschnitt inklusive", "Tressa Styling Guide"],
  },
  {
    name: "Strähnen & Highlights",
    desc: "Feine bis kräftige Akzente für mehr Dimension, Kontrast und Tiefe im Deckhaar.",
    features: ["Farbharmonisch abgestimmt", "Schonende Formulierung", "Schnitt inklusive"],
  },
];

const kellerGallery = [
  { src: "/images/keller-1.jpg", title: "Keller-Studio 1", subtitle: "Private Atmosphere" },
  { src: "/images/keller-2.jpg", title: "Keller-Studio 2", subtitle: "Authentic Vibe" },
  { src: "/images/keller-3.jpg", title: "Keller-Studio 3", subtitle: "Barber Station" },
  { src: "/images/keller-4.jpg", title: "Keller-Studio 4", subtitle: "Precision Workspace" },
];

const faqs = [
  {
    q: "Wie läuft ein 1-on-1 Termin im Keller-Studio ab?",
    a: "Ganz entspannt und ohne Hektik. Du kommst zu deinem gebuchten Slot an, wir besprechen deine Wünsche und arbeiten den Cut mit voller Präzision und Konzentration aus.",
  },
  {
    q: "Wie bereite ich mich am besten vor?",
    a: "Am besten kommst du mit frisch gewaschenen Haaren ohne schwere Stylingprodukte (wie Gel oder Kleber), damit wir die natürliche Haarstruktur direkt perfekt beurteilen können.",
  },
  {
    q: "Wo genau befindet sich das Keller-Studio?",
    a: "Es ist ein privates Studio, um maximale Ruhe und Exklusivität zu gewährleisten. Die genaue Anschrift erhältst du direkt nach deiner Terminvereinbarung via Instagram-DM.",
  },
  {
    q: "Welche Bezahlmöglichkeiten gibt es?",
    a: "Vor Ort kannst du ganz unkompliziert bar oder via PayPal bezahlen.",
  },
];

export default function CutsPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-24">
      {/* Editorial Header */}
      <section className="py-20 text-center">
        <FadeIn>
          <div className="inline-flex items-center gap-2 rounded-full border border-amber/30 bg-amber/10 px-4 py-1.5 text-[10px] font-bold tracking-[0.3em] text-amber">
            <Scissors size={12} />
            BESPOKE BARBER CRAFT
          </div>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-warm sm:text-6xl">
            SERVICES & SCHNITTE
          </h1>
          <div className="mx-auto mt-6 h-px w-20 bg-gradient-to-r from-transparent via-amber to-transparent" />
          <p className="mx-auto mt-6 max-w-lg text-sm leading-relaxed text-muted">
            Jeder Haarschnitt wird im privaten Keller-Studio mit höchster Präzision, scharfen Rasierklingen und Detailfokus umgesetzt. Keine Massenabfertigung — nur du und dein Cut.
          </p>
        </FadeIn>
      </section>

      {/* Services Grid (Without Prices) */}
      <section className="grid gap-8 lg:grid-cols-2">
        {/* Signature Cuts */}
        <FadeIn>
          <div className="glow-border flex h-full flex-col rounded-2xl bg-card p-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="text-lg font-black tracking-tight text-warm">
                SIGNATURE FADES & CUTS
              </h2>
              <span className="rounded-full border border-amber/30 bg-amber/10 px-2.5 py-0.5 text-[10px] font-bold text-amber">
                MEISTGEBUCHT
              </span>
            </div>

            <div className="mt-6 space-y-6 flex-1">
              {signatureServices.map((s) => (
                <div key={s.name} className="border-b border-white/5 pb-6 last:border-0 last:pb-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-base font-bold text-warm">{s.name}</h3>
                    </div>
                  </div>

                  <p className="mt-2 text-xs leading-relaxed text-muted">{s.desc}</p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {s.features.map((f) => (
                      <span
                        key={f}
                        className="inline-flex items-center gap-1 rounded-md bg-white/5 px-2 py-0.5 text-[10px] font-medium text-white/80"
                      >
                        <CheckCircle2 size={10} className="text-amber" /> {f}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Chemical Treatments & Specials */}
        <FadeIn delay={0.1}>
          <div className="glow-border flex h-full flex-col rounded-2xl bg-card p-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="text-lg font-black tracking-tight text-warm">
                SPECIALS & TREATMENTS
              </h2>
              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-bold text-muted">
                EXKLUSIV
              </span>
            </div>

            <div className="mt-6 space-y-6 flex-1">
              {chemicalTreatments.map((s) => (
                <div key={s.name} className="border-b border-white/5 pb-6 last:border-0 last:pb-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-base font-bold text-warm">{s.name}</h3>
                    </div>
                  </div>

                  <p className="mt-2 text-xs leading-relaxed text-muted">{s.desc}</p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {s.features.map((f) => (
                      <span
                        key={f}
                        className="inline-flex items-center gap-1 rounded-md bg-white/5 px-2 py-0.5 text-[10px] font-medium text-white/80"
                      >
                        <CheckCircle2 size={10} className="text-amber" /> {f}
                      </span>
                    ))}
                  </div>
                </div>
              ))}

              <div className="rounded-xl border border-amber/20 bg-amber/5 p-4 mt-6">
                <p className="text-xs font-bold text-amber">
                  ✨ Styling Finish inklusive
                </p>
                <p className="mt-1 text-[11px] text-muted">
                  Jeder Service beinhaltet die persönliche Beratung und ein professionelles Styling mit den originalen Tressa Textur-Produkten.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Interactive Booking Module */}
      <section className="mt-20">
        <FadeIn>
          <div className="mb-8 text-center">
            <span className="rounded-full border border-amber/40 bg-amber/10 px-3.5 py-1 text-[10px] font-bold tracking-[0.3em] text-amber">
              INSTAGRAM CONCIERGE
            </span>
            <h2 className="mt-3 text-3xl font-black text-warm sm:text-4xl">
              DEINEN TERMIN KONFIGURIEREN
            </h2>
          </div>
          <Booking />
        </FadeIn>
      </section>

      {/* Editorial Studio Gallery: Keller-Bilder 1-4 */}
      <section className="mt-28">
        <FadeIn>
          <div className="text-center">
            <span className="text-[10px] font-bold tracking-[0.35em] text-amber">
              EINBLICKE
            </span>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-warm sm:text-4xl">
              STUDIO GALLERY
            </h2>
            <p className="mt-2 text-xs font-semibold tracking-widest text-muted">
              DAS PRIVATE KELLER-STUDIO IM DETAIL
            </p>
          </div>
        </FadeIn>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {kellerGallery.map((item, i) => (
            <FadeIn key={item.src} delay={i * 0.08}>
              <div className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/10 bg-card shadow-xl transition-all duration-300 hover:border-amber/50">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-90" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[10px] font-mono tracking-widest text-amber block uppercase">
                    {item.subtitle}
                  </span>
                  <span className="text-sm font-bold text-warm block">
                    {item.title}
                  </span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Cuts Gallery: New portfolio gallery grouped by category */}
      <CutsGallery />

      {/* FAQ Section */}
      <section className="mt-28 border-t border-white/10 pt-16">
        <FadeIn>
          <div className="text-center">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.3em] text-amber">
              <HelpCircle size={14} /> HÄUFIGE FRAGEN
            </div>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-warm sm:text-3xl">
              ALLES ZU DEINEM BESUCH
            </h2>
          </div>

          <div className="mx-auto mt-10 grid max-w-4xl gap-4 md:grid-cols-2">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="glow-border rounded-xl bg-card p-6"
              >
                <h3 className="text-sm font-bold text-warm">{faq.q}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted">{faq.a}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
