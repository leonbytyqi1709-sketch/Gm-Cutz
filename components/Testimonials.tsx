import { Star, Quote, CheckCircle2 } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  cut: string;
  rating: number;
  text: string;
}

const reviews: Testimonial[] = [
  {
    name: "Leon B.",
    role: "Stammkunde",
    cut: "Low Taper Fade + Tressa Spray",
    rating: 5,
    text: "Ehrlich gesagt der beste Barber weit und breit. Der Übergang ist so sauber verblendet, dass selbst nach 2 Wochen alles noch fresh aussieht. Keller-Studio Vibe ist 10/10.",
  },
  {
    name: "David M.",
    role: "First Time Client",
    cut: "Skin Fade & Beard Lineup",
    rating: 5,
    text: "Kein 08/15 Barber, bei dem man wie am Fließband abgearbeitet wird. Gio nimmt sich echte Zeit für die Konturen und berät ehrlich. Ich komme nur noch hierher.",
  },
  {
    name: "Kaan S.",
    role: "Stammkunde",
    cut: "Burst Fade & Textured Crop",
    rating: 5,
    text: "Das Keller-Studio hat absolut exklusiven Charakter. Gute Musik, gechillte Atmosphäre und handwerklich einfach Weltklasse. Tressa Hair Wax riecht und hält brutal.",
  },
];

export default function Testimonials() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-20">
      <div className="text-center">
        <div className="inline-flex items-center gap-1 text-[11px] font-bold tracking-[0.3em] text-amber">
          <Star size={14} className="fill-amber text-amber" />
          <Star size={14} className="fill-amber text-amber" />
          <Star size={14} className="fill-amber text-amber" />
          <Star size={14} className="fill-amber text-amber" />
          <Star size={14} className="fill-amber text-amber" />
          <span className="ml-2 text-white/90">5.0 CLIENT RATING</span>
        </div>
        <h2 className="mt-3 text-3xl font-black tracking-tight text-warm sm:text-5xl">
          WAS DIE CLIENTS SAGEN
        </h2>
        <p className="mt-2 text-xs font-semibold tracking-[0.25em] text-muted">
          100% ECHTE ERFAHRUNGEN AUS DEM KELLER-STUDIO
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {reviews.map((rev, i) => (
          <div
            key={i}
            className="glow-border relative flex flex-col justify-between rounded-2xl bg-card p-7 transition-all hover:-translate-y-1 hover:border-amber/40"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="flex gap-1 text-amber">
                  {[...Array(rev.rating)].map((_, idx) => (
                    <Star key={idx} size={14} className="fill-amber" />
                  ))}
                </div>
                <Quote size={20} className="text-white/10" />
              </div>

              <p className="mt-5 text-sm leading-relaxed text-warm/90">
                "{rev.text}"
              </p>
            </div>

            <div className="mt-8 border-t border-white/5 pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="flex items-center gap-1.5 text-xs font-bold text-warm">
                    {rev.name}
                    <CheckCircle2 size={13} className="text-amber" />
                  </h4>
                  <p className="text-[10px] tracking-wider text-muted">
                    {rev.role}
                  </p>
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[9px] font-semibold text-amber">
                  {rev.cut}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
